# 00 — Estado do projeto

Atualizado em **09/08/2026**. Leia este arquivo primeiro: ele diz o que já está decidido e o que ainda trava.

## Onde estamos

| Frente | Estado |
|---|---|
| Escopo e requisitos | ✅ fechado — `01-BRIEFING.md` |
| Arquitetura e stack | ✅ fechada — `02-ARQUITETURA.md` |
| Modelo de dados | ✅ aplicado no Supabase, RLS ligado — `03-MODELO-DADOS.md` |
| Integração de pagamento | ✅ especificada — `04-PAGAMENTOS.md` |
| Segurança e LGPD | ✅ especificada — `05-SEGURANCA-LGPD.md` |
| Catálogo de presentes | 🟡 rascunho — falta o casal aprovar |
| Identidade visual | ✅ **aprovada** — `07-DESIGN.md` + `mockups/` |
| Código | 🟡 em andamento — Fase 1 completa (T01-T08), ver `09-BACKLOG.md` |
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

| O quê | Por quê trava | Prazo |
|---|---|---|
| Conta Mercado Pago do casal + credenciais + assinatura do webhook | Sem isso não há checkout nem webhook | hoje |
| **Foto do hero em alta** (a atual tem 591×386 px) | Hero borrado derruba a percepção de qualidade do site inteiro | até 12/08 |
| Lista de presentes aprovada (títulos, piadas, valores) | Não dá para semear o banco | até 11/08 |
| História do casal, dress code, horário de chegada | Conteúdo da home | até 13/08 |
| Domínio registrado | Webhook de produção depende da URL final | até 13/08 |

## O que já está resolvido e não precisa perguntar de novo

Data, horário, local e endereço vieram do convite. Grafia dos nomes: **Mayara e Jhonatan**, nessa ordem. Paleta e fontes: doc 07. Foto do hero escolhida: o casal na estrada, no eucaliptal — falta só a versão em alta.

## Ordem de leitura para quem chega agora

`00-STATUS` → `01-BRIEFING` → `02-ARQUITETURA` → `07-DESIGN` + `mockups/` → `09-BACKLOG` → `PROMPT-CLAUDE-CODE`.

Os docs `03`, `04` e `05` são consulta durante a implementação, não leitura de abertura — mas o `04` inteiro precisa estar lido antes de escrever uma linha do webhook.
