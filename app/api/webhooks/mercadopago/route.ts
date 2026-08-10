import { NextResponse } from "next/server";
import { WebhookSignatureValidator, InvalidWebhookSignatureError } from "mercadopago";
import { supabaseServer } from "@/lib/supabase/server";
import { consultarPagamento } from "@/lib/mercadopago";
import { enviarEmail } from "@/lib/resend";
import { emailAvisoPresenteCasal, emailReciboConvidado } from "@/lib/emails";

const CODIGO_VIOLACAO_UNICA = "23505";

function mapearMetodo(paymentTypeId: string | undefined): string | null {
  if (!paymentTypeId) return null;
  return paymentTypeId === "bank_transfer" ? "pix" : paymentTypeId;
}

/**
 * docs/09-BACKLOG.md — Fase 4:
 * T23 valida a assinatura, T24 garante idempotência via webhook_events,
 * T25 consulta o pagamento na API e aplica a transição de status.
 */
export async function POST(request: Request) {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook não configurado." }, { status: 500 });
  }

  const url = new URL(request.url);
  const dataId = url.searchParams.get("data.id")?.toLowerCase() ?? null;
  const type = url.searchParams.get("type");
  const corpo = await request.json().catch(() => null);

  // T23. Validação da assinatura — nunca processar sem ela bater.
  try {
    WebhookSignatureValidator.validate({
      xSignature: request.headers.get("x-signature"),
      xRequestId: request.headers.get("x-request-id"),
      dataId,
      secret,
      toleranceSeconds: 10 * 60, // descarta notificações com mais de 10 min (docs/04-PAGAMENTOS.md)
    });
  } catch (erro) {
    if (erro instanceof InvalidWebhookSignatureError) {
      return NextResponse.json({ error: "Assinatura inválida." }, { status: 401 });
    }
    throw erro;
  }

  // Só o tópico "payment" nos interessa (docs/04): outros tipos, 200 sem fazer nada.
  if (type !== "payment" || !dataId) {
    return NextResponse.json({ received: true });
  }

  // T24. Idempotência: data.id único em webhook_events. Duplicata = sucesso, sai.
  const { error: erroEvento } = await supabaseServer
    .from("webhook_events")
    .insert({ mp_id: dataId, raw: corpo });

  if (erroEvento) {
    if (erroEvento.code === CODIGO_VIOLACAO_UNICA) {
      return NextResponse.json({ received: true });
    }
    throw erroEvento;
  }

  // T25. Nunca confiar no corpo da notificação — consultar o pagamento na API.
  const payment = await consultarPagamento(dataId);

  const orderId = payment.external_reference;
  if (!orderId) {
    return NextResponse.json({ received: true });
  }

  const { data: order } = await supabaseServer
    .from("orders")
    .select("id, gift_id, quantity, total_cents, status, buyer_name, buyer_email, message")
    .eq("id", orderId)
    .maybeSingle();

  if (!order || order.status !== "pending") {
    return NextResponse.json({ received: true });
  }

  const metodo = mapearMetodo(payment.payment_type_id);
  const amountCents =
    payment.transaction_amount != null ? Math.round(payment.transaction_amount * 100) : null;

  // Histórico bruto para conciliação (docs/04, seção Conciliação), sempre gravado.
  await supabaseServer.from("payments").insert({
    order_id: order.id,
    mp_payment_id: dataId,
    status: payment.status ?? "unknown",
    status_detail: payment.status_detail ?? null,
    amount_cents: amountCents,
    method: metodo,
    raw: payment,
  });

  // Valor divergente do banco: não marca como pago, fecha a porta para preço adulterado.
  if (amountCents !== order.total_cents) {
    return NextResponse.json({ received: true });
  }

  if (payment.status === "approved") {
    const { data: atualizada } = await supabaseServer
      .from("orders")
      .update({
        status: "paid",
        paid_at: new Date().toISOString(),
        paid_method: metodo,
        mp_payment_id: dataId,
      })
      .eq("id", order.id)
      .eq("status", "pending")
      .select("id")
      .maybeSingle();

    if (atualizada) {
      const { data: gift } = await supabaseServer
        .from("gifts")
        .select("title, kind, quota_sold")
        .eq("id", order.gift_id)
        .maybeSingle();

      if (gift?.kind === "quota") {
        await supabaseServer
          .from("gifts")
          .update({ quota_sold: gift.quota_sold + order.quantity })
          .eq("id", order.gift_id);
      }

      // T26: recibo ao convidado (se informou e-mail) + aviso ao casal. Nunca bloqueia o webhook.
      const dadosEmail = {
        giftTitle: gift?.title ?? "",
        giftKind: (gift?.kind ?? "single") as "single" | "quota",
        quantity: order.quantity,
        totalCents: order.total_cents,
        buyerName: order.buyer_name,
        message: order.message,
        paidMethod: metodo,
      };

      const casalEmail = process.env.CASAL_EMAIL;
      await Promise.all([
        order.buyer_email
          ? enviarEmail({ to: order.buyer_email, ...emailReciboConvidado(dadosEmail) })
          : Promise.resolve(),
        casalEmail
          ? enviarEmail({ to: casalEmail, ...emailAvisoPresenteCasal(dadosEmail) })
          : Promise.resolve(),
      ]);
    }
  } else if (payment.status === "rejected") {
    await supabaseServer
      .from("orders")
      .update({ status: "failed" })
      .eq("id", order.id)
      .eq("status", "pending");
  }

  return NextResponse.json({ received: true });
}
