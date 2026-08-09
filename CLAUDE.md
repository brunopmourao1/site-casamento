# CLAUDE.md — Instruções do projeto

Site de casamento de Mayara e Jhonatan. Comece lendo `docs/00-STATUS.md`. Evento em 22/08/2026. Prazo curto: priorize entregar funcionando e seguro sobre entregar bonito e incompleto.

## Stack fixa (não trocar sem me perguntar)

- Next.js (App Router) + TypeScript estrito
- Tailwind CSS
- Supabase (Postgres) — acesso **apenas via server**, nunca do browser
- Mercado Pago Checkout Pro (redirect) — Pix e cartão
- Resend para e-mails transacionais
- Deploy na Vercel

## Alvo visual

As imagens em `mockups/` são o design **já aprovado**. Toda tela construída tem que
bater com a sua correspondente. Antes de dizer que uma tela está pronta, compare com
o PNG.

| Tela | Arquivo |
|---|---|
| Home (celular) | `mockups/01-home.png` |
| Onde e quando | `mockups/02-onde-e-quando.png` |
| Lista de presentes | `mockups/03-lista-presentes.png` |
| Presentear | `mockups/04-presentear.png` |
| Confirmação / cartão de presente | `mockups/05-confirmacao.png` |
| Confirmar presença | `mockups/06-confirmar-presenca.png` |
| Recados | `mockups/07-recados.png` |
| Menu | `mockups/08-menu.png` |
| Home (computador) | `mockups/09-desktop.png` |

`mockup-telas.html` é o mesmo material em HTML — útil para consultar medidas, mas é
maquete descartável, não código de produção.

## Regras inegociáveis

1. **Nenhum dado de cartão toca este código.** O convidado é redirecionado para o Mercado Pago. Nunca crie formulário de cartão, nunca instale SDK de tokenização de cartão.
2. **`SUPABASE_SERVICE_ROLE_KEY` e `MP_ACCESS_TOKEN` só existem no servidor.** Nunca prefixe com `NEXT_PUBLIC_`. Nunca importe em Client Component.
3. **Pagamento só vira `paid` pelo webhook**, depois de validar a assinatura HMAC e consultar o pagamento na API do Mercado Pago. A URL de retorno (`back_url`) nunca marca nada como pago.
4. **Valores vêm do banco, nunca do request.** O cliente manda o `gift_id`; o servidor busca o preço. Se aceitar preço vindo do front, o presente de R$ 300 vira R$ 0,01.
5. **Toda escrita vinda do público passa por validação Zod + rate limit + honeypot.**
6. Recado no mural só aparece publicamente depois de `approved = true`.
7. Nada de `console.log` com dados de convidado, e-mail ou payload de pagamento em produção.
8. Textos da interface em **português do Brasil**. Tom acolhedor e levemente formal, como o convite. A piada vive **só** na lista de presentes.
9. Grafia fixa em todo o site: **Mayara e Jhonatan**, nessa ordem, Jhonatan com H depois do J.
10. Paleta, tipografia, filete duplo e bloco de três colunas vêm do `docs/07-DESIGN.md` e não se negociam — são a identidade herdada do convite impresso.

## Comandos

```bash
npm run dev
npm run build      # tem que passar antes de qualquer deploy
npm run lint
npx tsc --noEmit
```

## Convenções

- Server Actions para formulários (RSVP, recado). Route Handlers apenas para checkout e webhook.
- Componentes de UI em `components/ui`, blocos de página em `components/sections`.
- Dois componentes são a espinha dorsal do visual e todo o resto os reutiliza: `<Moldura>` (filete duplo dourado) e `<Trio>` (bloco de três colunas com divisória vertical).
- Conteúdo estático (história do casal, presentes de referência, informações do evento) em `content/*.ts` tipado — sem CMS neste projeto.
- Dinheiro **sempre em centavos** (`integer`) no banco e no código. Formatação só na camada de apresentação.
- Datas sempre com timezone `America/Sao_Paulo`.

## Ao terminar cada tarefa

- Rode `npm run build` e `npx tsc --noEmit`.
- Marque a tarefa concluída em `docs/09-BACKLOG.md`.
- Não invente conteúdo real do casal: use os placeholders de `content/` e sinalize o que falta.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
