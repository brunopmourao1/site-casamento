# 08 — Cronograma

Casamento: **sábado, 22/08/2026**. Hoje: **09/08**.

## O prazo real não é dia 22

O site só cumpre a função se estiver no ar com antecedência: convidado precisa de tempo para confirmar, e o buffet precisa do número fechado antes. Site publicado dia 20 é um site inútil.

- **Go-live: sexta, 14/08** — divulgação no grupo no mesmo dia
- **Fechamento do RSVP: terça, 18/08** — a tempo de passar o número ao buffet
- **Lista de presentes fica no ar até 22/08** (e pode continuar depois — presente atrasado é comum)

Isso dá **5 dias de desenvolvimento**. É apertado, mas cabe — desde que o D0 seja resolvido hoje.

## D0 — hoje, 09/08 (sem código)

Sem isso, o resto trava:

- [ ] Ligar para o Jhonatan e alinhar: o que entra no site, quem recebe o dinheiro, quando o link vai ao ar
- [ ] Conta Mercado Pago **do casal** criada/verificada, chave Pix cadastrada
- [ ] Aplicação criada em *Suas integrações*: Access Token de teste e de produção + assinatura secreta do webhook
- [ ] Conferir com eles a taxa e o **prazo de liberação** de Pix e cartão
- [ ] Enviar a lista de presentes (doc 06) para aprovarem e ajustarem valores
- [ ] Pedir: história do casal em 5 linhas, dress code, horário sugerido de chegada, e-mail do casal e o **arquivo do convite em alta**
- [ ] **Pedir o original da foto do hero** (a que chegou tem 591×386 px) e mais 5 a 9 fotos em boa resolução
- [ ] Registrar o domínio
- [ ] Criar as contas: Supabase, Resend, Cloudflare Turnstile

## D1 — segunda, 10/08 — esqueleto

- Projeto Next.js + Tailwind + TypeScript, repositório, deploy inicial na Vercel
- Supabase criado, SQL do doc 03 aplicado, RLS ligado
- Layout base, tokens de design, fontes, cabeçalho e rodapé
- Home: hero reproduzindo o cartão do convite, contagem regressiva, história (placeholder), local com mapa, FAQ
- Paleta, filete duplo e tipografia do doc 07 como componentes reutilizáveis — o acabamento premium se ganha aqui, não no fim
- Navegação (T06b): barra superior, painel de menu e versão desktop

## D2 — terça, 11/08 — formulários

- RSVP completo: Server Action, Zod, honeypot, Turnstile, rate limit, upsert por telefone
- Mural de recados: envio, moderação pendente, listagem só do aprovado
- Painel `/painel`: login, aba de confirmações com totais, aba de recados com aprovar/ocultar, exportar CSV

## D3 — quarta, 12/08 — presentes e checkout

- Seed do catálogo, página da lista e página de detalhe
- `POST /api/checkout` com todas as regras do doc 04
- Redirect para o Mercado Pago em ambiente de teste
- Tela de retorno com consulta de status

## D4 — quinta, 13/08 — webhook e testes

- `POST /api/webhooks/mercadopago`: assinatura, consulta na API, idempotência, conferência de valor, transição de status
- E-mails: recibo para o convidado, aviso de presente e digest de confirmações para o casal
- Bateria de testes do doc 04 (itens 1 a 4) no sandbox
- Comprovante do presente na tela de agradecimento

## D5 — sexta, 14/08 — conteúdo real, QA e go-live

- Trocar todo o placeholder pelo conteúdo real do casal
- Credenciais de produção, domínio apontado, webhook de produção cadastrado
- Checklist de segurança do doc 05
- **Teste real com dinheiro**: R$ 5,00 por Pix e, se possível, no cartão
- Página de privacidade publicada
- Revisão do site no celular, com o casal junto
- 🚀 **Divulgar o link**

## Depois do go-live

| Data | O quê |
|---|---|
| 15–17/08 | Monitorar erros, responder dúvidas de convidado, conferir se os pagamentos estão caindo |
| 18/08 | Lembrete de confirmação no grupo; fechar número para o buffet |
| 21/08 | Exportar CSV de confirmações, recados e presentes; imprimir a lista |
| 22/08 | Casamento. Site no ar, você não olha o celular. |
| 23–25/08 | Conciliar total do painel com o extrato do Mercado Pago; entregar acesso ao casal |
| ~21/09 | Rodar o expurgo de dados pessoais (doc 05) |

## Onde cortar se o prazo apertar

Corte nesta ordem, sem dó:

1. Comprovante para salvar como imagem (vira uma tela simples de agradecimento)
2. Exportar CSV (o casal olha na tela)
3. Mural de recados (o RSVP já tem campo de recado)
4. E-mail de recibo (o Mercado Pago já manda o dele)

**Nunca corte**: validação de assinatura do webhook, preço vindo do banco, idempotência e moderação do mural. É exatamente aí que o barato sai caro.
