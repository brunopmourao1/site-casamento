# 09 — Backlog

Tarefas na ordem de execução. Cada bloco é uma sessão de Claude Code. Marque conforme concluir.

## Fase 1 — Base (D1)

- [x] **T01** `create-next-app` com TypeScript, Tailwind, App Router, ESLint. Configurar `tsconfig` estrito.
- [x] **T02** Tokens do doc 07 no `tailwind.config.ts` (cores nomeadas, escala de tipo) e fontes via `next/font`. _(Next 16 veio com Tailwind v4 — tokens em `@theme` no `globals.css`, não em `tailwind.config.ts`; mesmo resultado.)_
- [x] **T03** Projeto Supabase + rodar o SQL do doc 03 + ligar RLS. Guardar as chaves.
- [x] **T04** `lib/supabase/server.ts` com service role. Adicionar comentário no topo: uso exclusivo em servidor.
- [x] **T05** `content/evento.ts`, `content/casal.ts`, `content/faq.ts` com placeholders tipados.
- [x] **T06** Layout raiz: cabeçalho, rodapé com link de privacidade, barra fixa de ações no mobile, metadados e Open Graph (a prévia no WhatsApp importa mais que qualquer outra coisa aqui).
- [x] **T06b** Navegação: barra superior (monograma + menu, transparente sobre o hero e sólida ao rolar), painel de menu em tela cheia, versão desktop com destinos e botão de confirmar presença. Alvo visual: `mockups/08-menu.png` e `mockups/09-desktop.png`.
- [x] **T07** Home: hero com contagem regressiva, história, cerimônia e festa com link de mapa, FAQ em acordeão.
- [x] **T08** Deploy inicial na Vercel com variáveis de ambiente.

## Fase 2 — Formulários (D2)

- [x] **T09** `lib/validations.ts` com os schemas Zod de RSVP, recado e checkout.
- [x] **T10** `lib/rate-limit.ts` por IP, em memória com janela deslizante (suficiente nesta escala).
- [x] **T11** Turnstile: componente no cliente + verificação do token no servidor. _(Some da tela até `NEXT_PUBLIC_TURNSTILE_SITE_KEY` ser cadastrada — conta ainda não criada.)_
- [x] **T12** RSVP: página, formulário, Server Action com honeypot, upsert por telefone normalizado, tela de sucesso, checkbox de ciência de privacidade.
- [x] **T13** Mural: listar só `approved = true and hidden = false`, formulário de envio criando registro pendente, mensagem de estado vazio.
- [x] **T14** ~~`middleware.ts`~~ `proxy.ts` (Next 16 renomeou) protegendo `/painel`; página de login com senha, cookie assinado, rate limit e comparação em tempo constante.
- [x] **T15** Painel — aba Confirmações: tabela, totais (confirmados, recusados, total de pessoas), busca, exportar CSV.
- [x] **T16** Painel — aba Recados: aprovar, ocultar, excluir.

## Fase 3 — Presentes e checkout (D3)

- [x] **T17** Seed do catálogo (doc 06) e `lib/money.ts` (centavos ↔ BRL). _(Precisou de uma coluna nova, `gifts.category`, para o filtro por bloco da T18 — doc 03 atualizado.)_
- [x] **T18** Página da lista: filtro por bloco, cartão com barra de progresso nas cotas, presente único esgotado aparece marcado, não some.
- [x] **T19** Página de detalhe: formulário de dados do presenteador (nome, e-mail opcional, recado, mostrar meu nome), seletor de quantidade quando for cota.
- [x] **T20** `POST /api/checkout` implementando os 10 passos do doc 04, na ordem. Testado: preço adulterado no corpo é ignorado (usa sempre `gift.price_cents` do banco). **Falta testar a criação real da preference** — sem `MP_ACCESS_TOKEN`, o endpoint responde 503 de forma controlada.
- [x] **T21** Redirect para `init_point` com estado de carregamento e tratamento de erro. _(Já estava implementado em `PresentearForm.tsx` desde a T19/T20 — checkbox só estava desatualizado. Confirmado no navegador: erro 503 controlado exibe "Pagamento indisponível no momento" e o botão volta ao normal.)_
- [x] **T22** `/presentes/obrigado`: consulta de status a cada 3 s por até 60 s, três estados (confirmando, confirmado, algo deu errado). _(Nova rota `GET /api/orders/[id]` só leitura, nunca escreve status. Testado no navegador: criei uma order de teste via `/api/checkout`, vi o estado "confirmando", marquei `status='paid'` direto no Supabase e confirmei a virada automática para "confirmado" no próximo poll; testei também o estado de erro sem `order` na URL. Order de teste removida depois.)_

## Fase 4 — Webhook e e-mails (D4)

- [ ] **T23** `POST /api/webhooks/mercadopago`: validar `x-signature` (com `data.id` em minúsculas), rejeitar timestamp velho, responder 401 se inválido.
- [ ] **T24** Idempotência: gravar `data.id` em `webhook_events`; duplicata responde 200 e sai.
- [ ] **T25** Consultar o pagamento na API, conferir valor contra `total_cents`, aplicar transição de status em transação, incrementar `quota_sold` quando aprovado.
- [ ] **T26** E-mails via Resend: recibo ao convidado (se informou e-mail), aviso de presente ao casal, digest diário de confirmações.
- [ ] **T27** Painel — aba Presentes: pagos, pendentes, total arrecadado, quem presenteou o quê, recados dos presentes.
- [ ] **T28** Comprovante na tela de agradecimento, com botão de salvar imagem.
- [ ] **T29** Testes 1 a 4 do doc 04 em sandbox, com túnel público para o webhook.

## Fase 5 — Produção (D5)

- [ ] **T30** Substituir todos os placeholders pelo conteúdo real; otimizar as fotos.
- [ ] **T31** Cabeçalhos de segurança e CSP no `next.config`.
- [ ] **T32** Página `/privacidade` e link no rodapé e nos formulários.
- [ ] **T33** Domínio apontado, credenciais de produção, webhook de produção cadastrado no painel do Mercado Pago.
- [ ] **T34** Checklist de segurança do doc 05, item por item.
- [ ] **T35** Teste real com dinheiro (Pix R$ 5,00 e cartão), conferindo o crédito na conta do casal.
- [ ] **T36** Revisão no celular junto com o casal. Ajustes finais. Publicar.

## Prompt inicial sugerido para o Claude Code

```
Leia CLAUDE.md e docs/01 a 09 antes de começar.
Execute a tarefa T01 do docs/09-BACKLOG.md.
Não avance para a próxima tarefa sem eu confirmar.
Ao terminar, rode npm run build e npx tsc --noEmit e me mostre o resultado.
```
