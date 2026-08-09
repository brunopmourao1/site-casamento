# 01 — Briefing e escopo

## Contexto

Mayara Ketlin e Jhonatan Alves se casam em **22/08/2026 (sábado)**. O Jhonatan pediu ao Bruno um site do casal. Referência citada: iCasei.

## Dados oficiais (do convite)

| | |
|---|---|
| Nomes, na ordem do convite | **Mayara e Jhonatan** |
| Data | 22 de agosto de 2026, sábado |
| Horário | **13h** |
| Local | **Portal do Valle** |
| Endereço | Estrada Municipal Benedito Antônio Regagnin, 3480 — Bairro dos Pontos |
| Frase do convite | "Amor, união e um novo começo" / "Contamos com a sua presença!" |

Grafia a respeitar em todo o site: **Jhonatan** (com H depois do J) e **Mayara**. Ordem dos nomes igual à do convite: a noiva primeiro.

Três consequências práticas do horário e do local:

1. **Cerimônia às 13h, ao ar livre.** O site é diurno, claro e quente — nada de estética noturna. Vale sugerir chegada às 12h30 e mencionar sol/calor no que vestir.
2. **Endereço em estrada municipal.** Botão de mapa é obrigatório, e vale um aviso curto de que o sinal de celular pode falhar na região.
3. Como o sinal pode falhar no local, **confirmar presença e presentear precisam acontecer antes do dia** — o que reforça publicar cedo.

Diferença em relação ao iCasei: lá o site é um template alugado e a plataforma fica com uma taxa sobre os presentes. Aqui o site é próprio, o visual é do casal e a única taxa é a do meio de pagamento.

## Prazo

13 dias até o casamento. Mas o prazo real é **menor**: o site precisa estar no ar cedo o bastante para os convidados confirmarem presença e comprarem presentes. Um site publicado dia 21 não serve para nada.

**Go-live alvo: 14/08.** Ver `08-ROADMAP.md`.

## Usuários

| Quem | O que quer fazer |
|---|---|
| Convidado | Ver data/local, confirmar presença, deixar recado, escolher e pagar um presente em menos de 2 minutos, no celular |
| Casal | Ver quem confirmou, ler recados, ver quanto entrou e de quem |
| Bruno | Publicar, corrigir e não ser responsável por dinheiro de terceiros |

**Praticamente todo o acesso será por celular, vindo de link no WhatsApp.** Mobile é o design principal, não a adaptação.

## Requisitos funcionais

### RF-01 — Home
Nomes (Mayara e Jhonatan), data com contagem regressiva, foto principal, história curta do casal, local com endereço, horário e link do mapa, dress code, dúvidas frequentes curtas. O hero reproduz o cartão do convite — ver `07-DESIGN.md`. Botões fixos: *Confirmar presença* e *Lista de presentes*.

### RF-02 — Confirmação de presença
- Campos: nome completo, WhatsApp, "vou / não vou", quantidade de acompanhantes (0–5), nomes dos acompanhantes (opcional), restrição alimentar (opcional), recado curto (opcional).
- Confirmação na tela + e-mail para o casal (digest, não um e-mail por confirmação).
- Sem login. Sem lista fechada de convidados (não há tempo de cadastrar a lista) — o painel do casal permite marcar confirmações duplicadas ou suspeitas.
- Permitir corrigir: se o mesmo WhatsApp confirmar de novo, a última resposta vale e a anterior fica no histórico.

### RF-03 — Mural de recados
- Campos: nome, mensagem (até 500 caracteres).
- **Entra como pendente.** Só aparece no site depois de aprovado no painel.
- Motivo: mural aberto na internet vira alvo de spam e piada de mau gosto no dia da festa.

### RF-04 — Lista de presentes
- Presentes simbólicos, com título engraçado, imagem/ilustração, texto curto e valor.
- Dois tipos: **presente único** (some da lista quando alguém compra) e **cota** (vários convidados contribuem, mostra progresso — ex.: jantar da lua de mel dividido em cotas).
- Fluxo: escolher presente → informar nome, e-mail (opcional) e recado (opcional) → pagar → tela de agradecimento.
- Opcional visível na lista: "quem já presenteou" (só nome, só se o convidado autorizar).

### RF-05 — Pagamento
- **Pix e cartão de crédito.**
- Checkout hospedado pelo Mercado Pago (redirect). O site não recebe nem armazena dados de cartão.
- Confirmação automática por webhook.
- Detalhes em `04-PAGAMENTOS.md`.

### RF-06 — Painel do casal (`/painel`)
- Acesso por senha única compartilhada com o casal.
- Abas: Confirmações (com totais e exportar CSV), Recados (aprovar/ocultar), Presentes (pagos, pendentes, total arrecadado).

## Requisitos não funcionais

- **Segurança**: ver `05-SEGURANCA-LGPD.md`. Nenhum dado de cartão no escopo do site.
- **Desempenho**: LCP < 2,5s em 4G. Imagens em WebP via `next/image`.
- **Disponibilidade**: precisa aguentar o pico de todo mundo abrindo o link ao mesmo tempo quando o convite for disparado no grupo do WhatsApp.
- **Acessibilidade**: contraste AA, foco visível, formulários com label.
- **Custo**: hospedagem grátis (Vercel Hobby) + Supabase grátis + domínio. Só a taxa do meio de pagamento.

## Fora de escopo (declarado)

- Login de convidado, lista de convidados importada, envio de convite por e-mail/SMS
- Multi-idioma, galeria de fotos pós-festa, upload de fotos por convidado
- App nativo, painel de administração genérico, CMS
- Boleto (não faz sentido: compensa depois do casamento)

## Restrições e decisões já tomadas

1. **A conta que recebe o dinheiro é do casal, não do Bruno.** Bruno integra, o casal é o titular. Isso evita que o Bruno movimente dinheiro de terceiros na conta dele e resolve quem responde por estorno.
2. Sem CMS. O casal não vai editar conteúdo em 13 dias — o conteúdo fica em arquivo e o Bruno ajusta.
3. Conteúdo real (fotos e textos) é bloqueador; enquanto não chegar, o desenvolvimento usa placeholder.
