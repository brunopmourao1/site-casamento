# 00 — Estado do projeto

Atualizado em **10/08/2026**. Leia este arquivo primeiro: ele diz o que já está decidido e o que ainda trava.

## Onde estamos

| Frente | Estado |
|---|---|
| Escopo e requisitos | ✅ fechado — `01-BRIEFING.md` |
| Arquitetura e stack | ✅ fechada — `02-ARQUITETURA.md` |
| Modelo de dados | ✅ aplicado no Supabase, RLS ligado — `03-MODELO-DADOS.md` |
| Integração de pagamento | ✅ especificada — `04-PAGAMENTOS.md` |
| Segurança e LGPD | ✅ especificada — `05-SEGURANCA-LGPD.md` |
| Catálogo de presentes | ✅ **valores aprovados pelo casal em 10/08** e aplicados no banco de produção (21 presentes, nenhum abaixo de R$ 100) — `06-CONTEUDO-PRESENTES.md`. Títulos e piadas mantidos como no rascunho |
| Identidade visual | ✅ **aprovada** — `07-DESIGN.md` + `mockups/` |
| Código | 🟢 Fases 1-4 completas (T01-T29). Fase 5: T31, T32, T33, T34 e T35 feitos e testados; T30 parcial (só falta a arte do OG). Falta T36 (revisão com o casal), ver `09-BACKLOG.md` |
| Deploy | ✅ no ar em produção — https://jhowemayara.vercel.app (domínio final decidido pelo Bruno em 10/08: subdomínio da Vercel, sem comprar domínio próprio) — **checkout de produção ativo desde 10/08**, pagamento real vai para a conta do casal |

## Decisões congeladas

Não reabrir sem motivo forte — cada uma dessas já foi discutida:

1. **Next.js + Supabase + Mercado Pago Checkout Pro + Vercel.**
2. **A conta que recebe o dinheiro é do casal**, não do Bruno.
3. **Checkout por redirect.** Nenhum dado de cartão passa pelo nosso código.
4. **Sem CMS.** Conteúdo em arquivo, o Bruno ajusta.
5. **Identidade herdada do convite impresso** — paleta, tipografia, filete duplo, bloco de três colunas.
6. **Go-live em 14/08**, não no dia do casamento.
7. **Navegação**: monograma + menu no topo, barra de ações fixa no rodapé do celular.

## Bloqueadores — resolver com o casal

| O quê | Por quê trava | Prazo | Estado |
|---|---|---|---|
| **Credencial de TESTE do Mercado Pago** (`MP_ACCESS_TOKEN`, começa com `TEST-`) + **chave secreta do webhook** (`MP_WEBHOOK_SECRET`) | Sem elas não dá pra testar o checkout nem começar a Fase 4 (webhook, T23-T29) | o quanto antes | ✅ resolvido em 10/08 — app de teste `858076140954340` criada na conta MP pessoal do Bruno (via MCP), webhook sandbox configurado. **Isso é só para desenvolver**; segue a pendência abaixo para produção real na conta do casal |
| Lista de presentes aprovada (títulos, piadas, valores) | O banco já tem o rascunho do doc 06 semeado (21 presentes) — dá pra usar o site, mas os textos/valores finais dependem do casal | até 11/08 | ✅ resolvido em 10/08 — Bruno repassou os valores aprovados pelo casal, os 21 preços foram atualizados direto no banco de produção (nenhum abaixo de R$ 100). Títulos e piadas do rascunho original mantidos |
| Domínio registrado | Webhook de produção depende da URL final (por ora usando o domínio da Vercel, que já funciona) | até 13/08 | ✅ resolvido em 10/08 — decisão do Bruno: sem domínio próprio, fica o subdomínio da Vercel. Projeto renomeado para `jhowemayara`, `https://jhowemayara.vercel.app` no ar, `NEXT_PUBLIC_SITE_URL` e redeploy feitos |
| Credencial de **produção** do Mercado Pago (`APP_USR-...`) + confirmação de que a chave Pix foi cadastrada + URL de notificação do webhook cadastrada no painel MP | Necessário para T33 (Fase 5) | perto do go-live (13-14/08) | ✅ resolvido em 10/08 — app **Mayejhow** do casal, Bruno com acesso de colaborador no painel MP. `MP_ACCESS_TOKEN` e `MP_WEBHOOK_SECRET` de produção na Vercel. URL de notificação recadastrada pelo Bruno em 10/08 para `https://jhowemayara.vercel.app/api/webhooks/mercadopago` após a troca de domínio; endpoint testado e respondendo (401 pra assinatura inválida, mesmo comportamento validado antes). Confirmação da chave Pix cadastrada continua pendente de confirmar com o casal |

## O que já está resolvido e não precisa perguntar de novo

Data, horário, local e endereço vieram do convite. Grafia dos nomes: **Mayara e Jhonatan**, nessa ordem. Paleta e fontes: doc 07. Fotos do hero e da história (IMG_4232 e IMG_8012, 1500×2000px, acima do mínimo de 1600px do doc 07), a história do casal (`mockups/historia.md`), o link do mapa, dress code (esporte fino), horário de chegada (até 13h) e o fechamento do RSVP (domingo, 16/08) — tudo confirmado pelo casal em 09/08 e já publicado no site.

## Ordem de leitura para quem chega agora

`00-STATUS` → `01-BRIEFING` → `02-ARQUITETURA` → `07-DESIGN` + `mockups/` → `09-BACKLOG` → `PROMPT-CLAUDE-CODE`.

Os docs `03`, `04` e `05` são consulta durante a implementação, não leitura de abertura — mas o `04` inteiro precisa estar lido antes de escrever uma linha do webhook.
