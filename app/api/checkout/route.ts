import { NextResponse } from "next/server";
import { checkoutSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";
import { obterIp } from "@/lib/ip";
import { supabaseServer } from "@/lib/supabase/server";
import { criarPreference } from "@/lib/mercadopago";

/**
 * 10 passos do docs/04-PAGAMENTOS.md, na ordem exata.
 * Sem MP_ACCESS_TOKEN configurada, degrada para 503 sem quebrar (docs/00-STATUS.md).
 */
export async function POST(request: Request) {
  // 1 e 2. Zod + rate limit por IP
  const ip = await obterIp();
  const limite = checkRateLimit(`checkout:${ip}`, { limit: 10, windowMs: 60 * 60 * 1000 });
  if (!limite.allowed) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente mais tarde." },
      { status: 429 }
    );
  }

  const corpo = await request.json().catch(() => null);

  // Honeypot: campo escondido que só um bot preenche.
  if (corpo && typeof corpo === "object" && "website" in corpo && corpo.website) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const parsed = checkoutSchema.safeParse(corpo);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }
  const { giftId, quantity, buyerName, buyerEmail, message, showName } = parsed.data;

  // 3. Buscar o presente no banco — nunca confiar em dado vindo do request
  const { data: gift } = await supabaseServer
    .from("gifts")
    .select("id, slug, title, price_cents, kind, quota_total, quota_sold, is_active")
    .eq("id", giftId)
    .maybeSingle();

  if (!gift || !gift.is_active) {
    return NextResponse.json({ error: "Presente não encontrado." }, { status: 404 });
  }

  // 4. Presente único já vendido
  if (gift.kind === "single") {
    const { data: pedidoPago } = await supabaseServer
      .from("orders")
      .select("id")
      .eq("gift_id", gift.id)
      .eq("status", "paid")
      .maybeSingle();
    if (pedidoPago) {
      return NextResponse.json({ error: "Esse presente já foi escolhido." }, { status: 409 });
    }
  }

  // 5. Cota esgotada
  if (gift.kind === "quota" && gift.quota_total !== null) {
    if (gift.quota_sold + quantity > gift.quota_total) {
      return NextResponse.json(
        { error: "Não há cotas suficientes disponíveis." },
        { status: 409 }
      );
    }
  }

  // 6. Preço vem SEMPRE do banco — se o corpo trouxer preço, é ignorado (nem chega a ser lido aqui)
  const totalCents = gift.price_cents * quantity;

  // 7. Cria a order pending; order.id vira external_reference
  const { data: order, error: erroOrder } = await supabaseServer
    .from("orders")
    .insert({
      gift_id: gift.id,
      quantity,
      unit_price_cents: gift.price_cents,
      total_cents: totalCents,
      buyer_name: buyerName,
      buyer_email: buyerEmail || null,
      message: message || null,
      show_name: showName,
    })
    .select("id")
    .single();

  if (erroOrder || !order) {
    return NextResponse.json({ error: "Não foi possível criar o pedido." }, { status: 500 });
  }

  try {
    // 8. Cria a preference no Mercado Pago
    const preference = await criarPreference({
      orderId: order.id,
      giftId: gift.id,
      giftTitle: gift.title,
      giftSlug: gift.slug,
      quantity,
      unitPriceCents: gift.price_cents,
    });

    // 9. Salva preference.id na order
    await supabaseServer
      .from("orders")
      .update({ mp_preference_id: preference.id })
      .eq("id", order.id);

    // 10. Retorna o link de pagamento
    return NextResponse.json({ init_point: preference.init_point });
  } catch {
    return NextResponse.json(
      { error: "Pagamento indisponível no momento. Tente novamente mais tarde." },
      { status: 503 }
    );
  }
}
