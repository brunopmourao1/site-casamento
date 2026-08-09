# PROMPT-CLAUDE-CODE.md

Prompts prontos para copiar e colar. Um bloco por sessão, na ordem. Não pule sessão — cada uma assume a anterior pronta.

## Antes de abrir o terminal

1. Crie a pasta do projeto e copie para dentro dela: `CLAUDE.md`, a pasta `docs/` e a pasta `mockups/`.
2. Abra o VS Code nessa pasta e rode `claude` no terminal integrado.
3. Tenha em mãos: URL e chaves do Supabase, `MP_ACCESS_TOKEN` de teste e a assinatura secreta do webhook.

---

## Sessão 1 — Base do projeto (tarefas T01 a T08)

```
Leia CLAUDE.md e todos os arquivos em docs/ antes de qualquer coisa. As imagens em
mockups/ são o alvo visual aprovado — o resultado tem que ficar igual a elas.

Contexto: site do casamento de Mayara e Jhonatan, 22/08/2026 às 13h, no Portal do
Valle. Prazo curtíssimo, go-live em 14/08.

Execute as tarefas T01 a T08 do docs/09-BACKLOG.md (inclui a T06b, da navegação),
uma de cada vez, me mostrando o
resultado antes de passar para a próxima.

Regras desta sessão:
- Paleta, tipografia e o filete duplo exatamente como no docs/07-DESIGN.md. Crie os
  tokens no Tailwind e um componente <Moldura> reutilizável para o filete duplo, e um
  componente <Trio> para o bloco de três colunas com divisória. Todo o site usa esses
  dois.
- Mobile primeiro. Larguras a partir de 320px.
- content/evento.ts já nasce com os dados reais do convite (docs/01-BRIEFING.md).
  Foto e história ficam com placeholder marcado com TODO.
- Ao final, rode npm run build e npx tsc --noEmit e me mostre a saída.
```

## Sessão 2 — Presença e recados (T09 a T16)

```
Continue o projeto. Execute T09 a T16 do docs/09-BACKLOG.md.

Atenção especial:
- Toda escrita pública passa por Zod, honeypot, Turnstile e rate limit por IP.
- RSVP faz upsert pelo telefone normalizado (só dígitos). Se o telefone já existir,
  a nova resposta substitui e a interface avisa que a resposta foi atualizada.
- Recado entra com approved = false e não pode aparecer no mural em hipótese nenhuma
  antes de aprovado. Escreva um teste rápido que prove isso.
- O painel em /painel usa o middleware descrito em docs/02-ARQUITETURA.md. Comparação
  de senha em tempo constante, cookie httpOnly assinado, rate limit no login.

Não avance para a próxima tarefa sem eu confirmar.
```

## Sessão 3 — Lista de presentes e checkout (T17 a T22)

```
Continue o projeto. Execute T17 a T22 do docs/09-BACKLOG.md.

O endpoint POST /api/checkout precisa seguir os 10 passos do docs/04-PAGAMENTOS.md
na ordem exata. Em especial:
- O preço vem SEMPRE do banco. Se o corpo da requisição trouxer preço, ignore.
- Valide disponibilidade antes de criar o pedido.
- external_reference = id do pedido.

Quando terminar, escreva um teste que chame /api/checkout com um preço adulterado no
corpo e prove que o valor cobrado é o do banco.

A tela da lista tem que ficar igual a mockups/03-lista-presentes.png, e a de
presentear igual a mockups/04-presentear.png, incluindo o estado "já presenteado".
```

## Sessão 4 — Webhook e e-mails (T23 a T29)

```
Continue o projeto. Execute T23 a T29 do docs/09-BACKLOG.md.

Esta é a parte crítica. Siga docs/04-PAGAMENTOS.md ao pé da letra:
- Validar x-signature com HMAC-SHA256 sobre o template
  id:<data.id em minúsculas>;request-id:<x-request-id>;ts:<ts>;
- Rejeitar notificação com timestamp de mais de 10 minutos.
- Consultar o pagamento na API do Mercado Pago; nunca confiar no corpo recebido.
- Idempotência pela tabela webhook_events, com data.id único.
- Conferir o valor pago contra total_cents antes de marcar como pago.
- Assinatura inválida responde 401; evento que não interessa responde 200 sem fazer nada.

Depois, escreva testes cobrindo: assinatura inválida, notificação duplicada, valor
divergente e pagamento aprovado com sucesso.

A tela de confirmação tem que ficar igual a mockups/05-confirmacao.png, com o cartão
de presente e o botão de salvar imagem.
```

## Sessão 5 — Produção (T30 a T36)

```
Continue o projeto. Execute T30 a T36 do docs/09-BACKLOG.md.

Antes de me dizer que está pronto, rode o checklist de docs/05-SEGURANCA-LGPD.md item
por item e me mostre o resultado de cada um. Em especial:
- grep por SERVICE_ROLE, MP_ACCESS_TOKEN e PAINEL_PASSWORD em qualquer arquivo com
  "use client" ou dentro de app/ e components/
- cabeçalhos de segurança respondendo
- /painel inacessível sem cookie válido

Depois me liste, em ordem, os passos manuais que sobraram para mim: apontar domínio,
trocar credenciais, cadastrar o webhook de produção e fazer o teste real de R$ 5,00.
```

---

## Prompts avulsos, para quando travar

**Quando o webhook não confirmar em teste:**
```
O webhook não está marcando o pedido como pago no ambiente de teste. Antes de mudar
código, faça o diagnóstico nesta ordem e me diga em qual etapa quebrou:
1. A notificação está chegando? Mostre o log da requisição crua com headers.
2. A assinatura bate? Mostre o template montado e o hash calculado, sem vazar o segredo.
3. O data.id está em minúsculas no template?
4. As credenciais são as de TESTE nos dois lados?
5. A consulta na API retorna qual status?
```

**Quando quiser ajustar visual sem quebrar a identidade:**
```
Ajuste apenas <o que for>. Não altere paleta, tipografia, o filete duplo nem o bloco
de três colunas — são a identidade herdada do convite e já estão aprovados.
Compare o resultado com mockups/<arquivo>.png antes de me responder.
```

**No fim de cada dia:**
```
Faça um resumo do que ficou pronto hoje, marque as tarefas concluídas em
docs/09-BACKLOG.md e me liste o que está bloqueado esperando conteúdo do casal.
```

## O que não delegar

Faça você mesmo, com calma e sem pressa: cadastrar o webhook de produção, trocar as
credenciais de teste pelas de produção e o teste real de R$ 5,00 por Pix. Se algo
estiver errado nessas três coisas, o convidado paga e o casal não recebe.
