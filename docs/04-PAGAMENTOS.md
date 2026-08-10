# 04 — Pagamentos (Mercado Pago)

## Decisão e justificativa

**Mercado Pago — Checkout Pro (redirect).**

- Pix e cartão de crédito na mesma integração, sem configurar Pix separado.
- O convidado é levado para uma página do Mercado Pago. **Nenhum dado de cartão passa pelo nosso servidor** — o site sai quase inteiro do escopo de PCI-DSS. Para um site feito em 5 dias, isso é o argumento decisivo.
- Marca conhecida no Brasil: o convidado confia na tela de pagamento, e confiança é o que faz ele concluir.
- Webhook com assinatura HMAC para confirmar automaticamente.
- Aceita conta pessoa física com CPF — o casal não precisa abrir CNPJ.

Alternativas descartadas para este prazo: Checkout Transparente (mais controle visual, mas coloca o formulário de cartão dentro do site e aumenta a responsabilidade), Stripe (excelente, porém a experiência de Pix é menos familiar para convidado brasileiro), Pix estático na chave do casal (não tem cartão, não tem confirmação automática, e ninguém sabe quem pagou o quê).

## Titularidade — resolver antes de qualquer linha de código

A conta Mercado Pago é do **Jhonatan ou da Mayara**. O Bruno recebe as credenciais da aplicação para integrar e depois entrega o acesso.

Por quê: presente de casamento é doação ao casal. Se o dinheiro cair na conta do Bruno, ele passa a movimentar recurso de terceiro, vira responsável por estorno e contestação, e ainda por cima entra na declaração dele. Não vale o incômodo.

Passo a passo com o casal (30 minutos, presencial ou por chamada):
1. Criar/usar a conta Mercado Pago do casal, com CPF verificado.
2. Cadastrar a chave Pix na conta.
3. Em *Suas integrações*, criar uma aplicação, anotar **Public Key** e **Access Token** (teste e produção) e gerar a **assinatura secreta do webhook**.
4. Cadastrar a URL do webhook de produção.
5. Conferir no painel as **taxas vigentes** e o **prazo de liberação** de cada meio.

> **Aviso importante para o casal:** as taxas e prazos variam por conta e por configuração. Pix costuma ter taxa bem menor e liberação quase imediata; cartão parcelado tem taxa maior e pode liberar o dinheiro semanas depois. Se eles pretendem usar o dinheiro na lua de mel, confira o prazo **antes** de divulgar o site — e destaque o Pix na interface.

## Criação do pagamento

`POST /api/checkout` (Route Handler, server-only).

```ts
// Regras que este endpoint precisa cumprir, em ordem:
// 1. Validar o corpo com Zod (giftId uuid, quantity 1..10, name 2..80, email opcional)
// 2. Rate limit por IP
// 3. Buscar o presente no banco. Se !is_active -> 404
// 4. Se kind='single' e já houver order paid -> 409 "presente já escolhido"
// 5. Se kind='quota' e quota_sold + quantity > quota_total -> 409
// 6. Calcular total NO SERVIDOR: gift.price_cents * quantity
// 7. Inserir order (status 'pending') e usar order.id como external_reference
// 8. Criar a preference no Mercado Pago
// 9. Salvar preference.id na order
// 10. Retornar { init_point }
```

Esqueleto da preference:

```ts
import { MercadoPagoConfig, Preference } from "mercadopago";

const mp = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

const pref = await new Preference(mp).create({
  body: {
    items: [{
      id: gift.id,
      title: `Presente: ${gift.title}`,
      quantity,
      unit_price: gift.price_cents / 100,   // MP trabalha em reais
      currency_id: "BRL",
    }],
    external_reference: order.id,           // ponte order <-> pagamento
    notification_url: `${SITE_URL}/api/webhooks/mercadopago`,
    statement_descriptor: "CASAMENTO",
    back_urls: {
      success: `${SITE_URL}/presentes/obrigado?order=${order.id}`,
      pending: `${SITE_URL}/presentes/obrigado?order=${order.id}`,
      failure: `${SITE_URL}/presentes/${gift.slug}?erro=1`,
    },
    auto_return: "approved",
    payment_methods: {
      excluded_payment_types: [{ id: "ticket" }],  // sem boleto
      installments: 6,
    },
    expires: true,
    expiration_date_to: new Date(Date.now() + 30 * 60_000).toISOString(),
  },
});
```

O front redireciona para `pref.init_point`.

## Webhook — a parte que não pode ser feita "quase certo"

`POST /api/webhooks/mercadopago`

### 1. Validar a assinatura

O Mercado Pago envia o header `x-signature` com dois campos: `ts` (timestamp) e `v1` (hash). Monte o template `id:<data.id>;request-id:<x-request-id>;ts:<ts>;` e calcule HMAC-SHA256 em hexadecimal usando a assinatura secreta como chave. Compare com `v1`.

```ts
import crypto from "crypto";

function assinaturaValida(req: Request, dataId: string) {
  const sig = req.headers.get("x-signature") ?? "";
  const reqId = req.headers.get("x-request-id") ?? "";
  const parts = Object.fromEntries(
    sig.split(",").map(p => p.trim().split("=").map(s => s.trim()) as [string, string])
  );
  const ts = parts.ts, v1 = parts.v1;
  if (!ts || !v1 || !reqId) return false;

  // tolerância de replay: descartar notificações muito antigas
  if (Math.abs(Date.now() - Number(ts)) > 10 * 60_000) return false;

  const template = `id:${dataId.toLowerCase()};request-id:${reqId};ts:${ts};`;
  const esperado = crypto
    .createHmac("sha256", process.env.MP_WEBHOOK_SECRET!)
    .update(template)
    .digest("hex");

  return crypto.timingSafeEqual(Buffer.from(esperado), Buffer.from(v1));
}
```

> Detalhe que já custou noite de gente: quando o `data.id` vem alfanumérico em maiúsculas, ele precisa entrar em **minúsculas** no template, senão o hash nunca bate.

### 2. Nunca confiar no corpo da notificação

O payload traz basicamente um id. **Consulte o pagamento na API** e use o que a API responder — status, valor e método.

```ts
const info = await new Payment(mp).get({ id: paymentId });
// info.status: 'approved' | 'pending' | 'rejected' | 'refunded' ...
// info.external_reference -> nosso order.id
// info.transaction_amount, info.payment_method_id
```

### 3. Idempotência

O Mercado Pago reenvia notificação, **e também notifica de novo quando o status do mesmo pagamento muda** (Pix: primeiro `pending_waiting_transfer`, depois `approved` — mesmo `data.id` nas duas). Por isso a chave de idempotência não pode ser só `data.id`: tem que ser `data.id` + o status observado na consulta à API (`${dataId}:${payment.status}`). Grave essa chave em `webhook_events` com índice único e trate duplicata (mesmo `data.id` **e** mesmo status) como sucesso (responda 200 e saia). Deduplicar só por `data.id` descarta a notificação de aprovação como "duplicata" da de criação — a order nunca sai de `pending` mesmo com o dinheiro já creditado. Isso aconteceu de verdade em teste com Pix real (10/08/2026) antes da correção.

### 4. Conferir o valor

Compare `info.transaction_amount * 100` com `order.total_cents`. Divergiu, não marque como pago: registre e avise. É barato e fecha a porta para manipulação de preço.

### 5. Responder rápido

Responda **200** assim que gravar. Erro seu não vira retry infinito: se a assinatura for inválida, responda **401**; se o payload não interessar (`type` diferente de `payment`), responda 200 sem fazer nada.

### 6. Transição de status

```
pending --approved--> paid       (grava paid_at, método, payment_id; incrementa quota_sold; dispara e-mails)
pending --rejected--> failed     (o convidado pode tentar de novo, gerando nova order)
pending --24h-------> expired
paid    --refunded--> refunded   (decrementa quota_sold; avisar o casal)
```

## Tela de retorno

`/presentes/obrigado?order=...` mostra "Recebemos! Estamos confirmando com o banco" e consulta o status da order a cada 3 segundos por até 1 minuto. Pix confirma em segundos; cartão às vezes leva mais.

**A tela de retorno nunca escreve status no banco.** Qualquer pessoa consegue abrir uma URL de sucesso.

## Testes obrigatórios antes de divulgar

1. **Sandbox**: pagar com os cartões de teste do Mercado Pago (aprovado, recusado por saldo, recusado por código de segurança) e com Pix de teste. Webhook local via túnel público (`ngrok`/`cloudflared`).
2. **Duplicata**: reenviar a mesma notificação e conferir que a order não é processada duas vezes.
3. **Assinatura falsa**: chamar o webhook com `x-signature` inválido e conferir o 401.
4. **Preço adulterado**: chamar `/api/checkout` com um preço no corpo e conferir que ele é ignorado.
5. **Produção, dinheiro de verdade**: o Bruno paga **R$ 5,00 por Pix** em um presente real. Confere se caiu na conta do casal, se a order virou `paid`, se o e-mail chegou. Depois o casal devolve os R$ 5,00. Sem esse teste, não se divulga o link.
6. Repetir o teste real com **cartão**, se possível.

## Conciliação

O painel mostra o total arrecadado a partir de `orders.status = 'paid'`. Antes de o casal sacar, comparar com o extrato do Mercado Pago. Divergência quase sempre é webhook perdido — a solução é uma rotina que relista pagamentos recentes na API e reconcilia por `external_reference`.
