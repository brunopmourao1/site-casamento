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
| Catálogo de presentes | 🟡 rascunho **já semeado no banco** para dar pra construir a tela — falta o casal aprovar títulos/valores antes do go-live |
| Identidade visual | ✅ **aprovada** — `07-DESIGN.md` + `mockups/` |
| Código | 🟡 em andamento — Fases 1, 2 e 3 completas (T01-T22: catálogo, lista, detalhe, checkout, redirect e tela de retorno com polling), ver `09-BACKLOG.md`. Fase 4 (webhook e e-mails, T23-T29) ainda não começou — bloqueada pela credencial de teste do Mercado Pago |
| Deploy | ✅ no ar em produção — https://site-casamento-lyart.vercel.app (ainda sem domínio próprio) |

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
| **Credencial de TESTE do Mercado Pago** (`MP_ACCESS_TOKEN`, começa com `TEST-`) + **chave secreta do webhook** (`MP_WEBHOOK_SECRET`) | Sem elas não dá pra testar o checkout nem começar a Fase 4 (webhook, T23-T29) | o quanto antes | 🟡 passo a passo enviado ao casal em 10/08 (conta MP pessoa física + chave Pix + criar aplicação em *Suas integrações* + copiar Access Token de teste e assinatura secreta), aguardando retorno |
| Lista de presentes aprovada (títulos, piadas, valores) | O banco já tem o rascunho do doc 06 semeado (21 presentes) — dá pra usar o site, mas os textos/valores finais dependem do casal | até 11/08 | 🔴 aguardando |
| Domínio registrado | Webhook de produção depende da URL final | até 13/08 | 🔴 aguardando |
| Credencial de **produção** do Mercado Pago (`APP_USR-...`) + confirmação de que a chave Pix foi cadastrada + URL de notificação do webhook cadastrada no painel MP | Necessário só para T33 (Fase 5), não bloqueia o código agora | perto do go-live (13-14/08) | 🔴 vai ser pedido ao casal na mesma conversa, depois do token de teste |

## O que já está resolvido e não precisa perguntar de novo

Data, horário, local e endereço vieram do convite. Grafia dos nomes: **Mayara e Jhonatan**, nessa ordem. Paleta e fontes: doc 07. Fotos do hero e da história (IMG_4232 e IMG_8012, 1500×2000px, acima do mínimo de 1600px do doc 07), a história do casal (`mockups/historia.md`), o link do mapa, dress code (esporte fino), horário de chegada (até 13h) e o fechamento do RSVP (domingo, 16/08) — tudo confirmado pelo casal em 09/08 e já publicado no site.

## Ordem de leitura para quem chega agora

`00-STATUS` → `01-BRIEFING` → `02-ARQUITETURA` → `07-DESIGN` + `mockups/` → `09-BACKLOG` → `PROMPT-CLAUDE-CODE`.

Os docs `03`, `04` e `05` são consulta durante a implementação, não leitura de abertura — mas o `04` inteiro precisa estar lido antes de escrever uma linha do webhook.
