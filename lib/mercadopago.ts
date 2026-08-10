import "server-only";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

// Uso exclusivo em servidor — nunca importar em Client Component.

function obterClienteMp(): MercadoPagoConfig {
  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error(
      "MP_ACCESS_TOKEN não definida — credenciais do Mercado Pago ainda não foram cadastradas (docs/00-STATUS.md)."
    );
  }
  return new MercadoPagoConfig({ accessToken });
}

type CriarPreferenceParams = {
  orderId: string;
  giftId: string;
  giftTitle: string;
  giftSlug: string;
  quantity: number;
  unitPriceCents: number;
};

/** Esqueleto exato do doc 04 — pagamento por Pix ou cartão, sem boleto. */
export async function criarPreference(params: CriarPreferenceParams) {
  const mp = obterClienteMp();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return new Preference(mp).create({
    body: {
      items: [
        {
          id: params.giftId,
          title: `Presente: ${params.giftTitle}`,
          quantity: params.quantity,
          unit_price: params.unitPriceCents / 100,
          currency_id: "BRL",
        },
      ],
      external_reference: params.orderId,
      notification_url: `${siteUrl}/api/webhooks/mercadopago`,
      statement_descriptor: "CASAMENTO",
      back_urls: {
        success: `${siteUrl}/presentes/obrigado?order=${params.orderId}`,
        pending: `${siteUrl}/presentes/obrigado?order=${params.orderId}`,
        failure: `${siteUrl}/presentes/${params.giftSlug}?erro=1`,
      },
      auto_return: "approved",
      payment_methods: {
        excluded_payment_types: [{ id: "ticket" }],
        installments: 6,
      },
      expires: true,
      expiration_date_to: new Date(Date.now() + 30 * 60_000).toISOString(),
    },
  });
}

/**
 * Webhook (docs/04-PAGAMENTOS.md): nunca confiar no corpo da notificação —
 * consultar o pagamento na API e usar o que ela responder.
 */
export async function consultarPagamento(paymentId: string) {
  const mp = obterClienteMp();
  return new Payment(mp).get({ id: paymentId });
}
