# 02 — Arquitetura

## Stack

| Camada | Escolha | Por quê |
|---|---|---|
| Framework | Next.js (App Router) + TypeScript | Bruno já usa; Server Actions e Route Handlers resolvem tudo sem backend separado |
| Estilo | Tailwind CSS | Velocidade |
| Banco | Supabase (Postgres) | Postgres gerenciado, grátis no plano inicial, RLS nativo |
| Pagamento | Mercado Pago — Checkout Pro | Pix + cartão em uma integração; checkout hospedado tira o site do escopo de dados de cartão |
| E-mail | Resend | Digest de confirmações e recibo do presente |
| Hospedagem | Vercel | Padrão do Bruno; webhook precisa de URL pública HTTPS |
| Antiabuso | Cloudflare Turnstile (grátis) + honeypot + rate limit | Formulário público na internet |

**Sem CMS.** Conteúdo em `content/*.ts`.

## Estrutura de pastas

```
app/
  (site)/
    page.tsx                     # Home
    presenca/page.tsx            # RSVP
    recados/page.tsx             # Mural + formulário
    presentes/page.tsx           # Lista de presentes
    presentes/[slug]/page.tsx    # Detalhe + iniciar pagamento
    presentes/obrigado/page.tsx  # Retorno do Mercado Pago
    privacidade/page.tsx         # Aviso de privacidade (LGPD)
  painel/
    page.tsx                     # Painel do casal (protegido)
  api/
    checkout/route.ts            # POST -> cria pedido + preference MP
    webhooks/mercadopago/route.ts# POST <- notificação do MP
components/
  ui/         sections/
content/
  evento.ts   casal.ts   presentes.ts   faq.ts
  # evento.ts já pode nascer com o dado real: Portal do Valle,
  # Estrada Municipal Benedito Antônio Regagnin 3480, Bairro dos Pontos, 22/08/2026 13h
lib/
  supabase/server.ts       # client com service role (SÓ server)
  mercadopago.ts           # SDK + criação de preference
  validations.ts           # schemas Zod
  rate-limit.ts
  money.ts                 # centavos <-> BRL
middleware.ts              # protege /painel
```

## Variáveis de ambiente

```bash
# Público (pode ir para o browser)
NEXT_PUBLIC_SITE_URL="https://casamento.exemplo.com.br"
NEXT_PUBLIC_TURNSTILE_SITE_KEY=""

# Servidor — NUNCA prefixar com NEXT_PUBLIC_
SUPABASE_URL=""
SUPABASE_SERVICE_ROLE_KEY=""
MP_ACCESS_TOKEN=""            # produção: APP_USR-...  | teste: TEST-...
MP_WEBHOOK_SECRET=""          # assinatura secreta em "Suas integrações"
TURNSTILE_SECRET_KEY=""
RESEND_API_KEY=""
CASAL_EMAIL=""                # destino das notificações
PAINEL_PASSWORD=""            # senha do painel do casal
PAINEL_COOKIE_SECRET=""       # segredo para assinar o cookie de sessão
```

Regra: se a variável não tem `NEXT_PUBLIC_`, ela não pode ser importada em nenhum arquivo com `"use client"`. Verificar antes de cada deploy:
```bash
grep -rn "SERVICE_ROLE\|MP_ACCESS_TOKEN\|PAINEL_PASSWORD" app components | grep -v "app/api\|lib/"
```

## Fluxo 1 — Confirmação de presença

```
Convidado -> formulário (Server Action)
  -> valida Zod + honeypot + Turnstile + rate limit por IP
  -> upsert em rsvps (chave: telefone normalizado)
  -> tela de sucesso
  -> job diário envia digest ao casal
```

## Fluxo 2 — Recado

```
Convidado -> Server Action -> insert em messages (approved = false)
  -> "Recebemos! Seu recado aparece no mural depois que o casal ler."
Casal -> /painel -> aprova -> aparece no mural
```

## Fluxo 3 — Presente (o crítico)

```
1. Convidado escolhe presente e preenche nome/e-mail/recado
2. POST /api/checkout  { giftId, quantity, name, email?, message?, showName }
3. Servidor:
   - busca o presente NO BANCO e usa o preço de lá (nunca o do request)
   - checa disponibilidade (presente único já vendido? cota esgotada?)
   - cria order (status = 'pending', id = UUID)
   - cria preference no Mercado Pago com external_reference = order.id
   - grava preference_id na order
   - responde { init_point }
4. Browser redireciona para o init_point (checkout do Mercado Pago)
5. Convidado paga com Pix ou cartão, dentro do ambiente do Mercado Pago
6. Mercado Pago -> POST /api/webhooks/mercadopago
   - valida assinatura HMAC (x-signature)
   - consulta o pagamento na API pelo id
   - se approved: order.status = 'paid' (idempotente), grava payment_id,
     método e valor pago; dispara e-mails
7. Convidado volta para /presentes/obrigado
   - a tela mostra "estamos confirmando" e consulta o status da order
   - a tela NUNCA marca nada como pago por conta própria
```

Detalhes, códigos de erro e casos de borda em `04-PAGAMENTOS.md`.

## Autenticação do painel

Simples de propósito: `middleware.ts` protege `/painel`. Login com senha única (`PAINEL_PASSWORD`) comparada em tempo constante, cookie `httpOnly` + `secure` + `sameSite=lax` assinado com HMAC, validade 7 dias, rate limit de 5 tentativas por IP a cada 15 minutos.

Não vale a pena montar Supabase Auth para dois usuários e 13 dias. Mas a senha tem que ser longa e aleatória, e enviada ao casal por canal privado.

## Ambientes

| Ambiente | URL | Mercado Pago |
|---|---|---|
| Local | localhost:3000 | credenciais **TEST-** + túnel público para o webhook |
| Preview (Vercel) | *.vercel.app | credenciais **TEST-** |
| Produção | domínio final | credenciais **APP_USR-** |

Nunca misturar credencial de teste com credencial de produção: a notificação não chega no ambiente esperado e o diagnóstico vira caça ao fantasma.
