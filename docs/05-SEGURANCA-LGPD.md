# 05 — Segurança e LGPD

O site é público, tem dinheiro passando e guarda nome, telefone e e-mail de dezenas de convidados. Não é um site institucional.

## O que estamos protegendo

| Ativo | Risco | Impacto |
|---|---|---|
| Dinheiro dos presentes | Manipulação de preço, pagamento falso | Prejuízo ao casal |
| Dados dos convidados | Vazamento de nome + telefone + e-mail | Dano à imagem do casal e do Bruno; incidente LGPD |
| Mural de recados | Spam, xingamento, link malicioso | Constrangimento no dia da festa |
| Credenciais MP / Supabase | Vazamento em repositório ou bundle | Acesso ao dinheiro e ao banco |

## Controles obrigatórios

### Dinheiro
- Preço **sempre** do banco, nunca do request.
- `paid` só pelo webhook, com assinatura validada e consulta à API.
- Idempotência por `data.id` e por `mp_payment_id` único.
- Conferência de valor entre o pagamento e a order.
- Zero dado de cartão no código, no banco e nos logs.

### Segredos
- `.env.local` no `.gitignore`. Segredos de produção só nas Environment Variables da Vercel.
- Nada de segredo com prefixo `NEXT_PUBLIC_`.
- Antes de cada deploy, procurar vazamento no bundle do cliente.
- Se um token cair em commit: revogar no Mercado Pago **primeiro**, reescrever o histórico depois.

### Entradas públicas
- Zod em todo formulário e endpoint.
- Rate limit por IP: RSVP e recado 5/hora; checkout 10/hora.
- Honeypot (campo escondido que humano não preenche) + Cloudflare Turnstile.
- Sanitizar/escapar tudo que for renderizado no mural. Nunca `dangerouslySetInnerHTML` com texto de convidado.
- Limite de tamanho em todos os campos, validado também no servidor.

### Banco
- Acesso só pelo servidor, com service role key.
- RLS ligado em todas as tabelas, sem policy pública para tabelas com dados pessoais.
- Backup: exportar CSV de `rsvps`, `messages` e `orders` na véspera do casamento.

### Painel
- Senha longa e aleatória (20+ caracteres), comparada em tempo constante.
- Cookie `httpOnly`, `secure`, `sameSite=lax`, assinado, 7 dias.
- Rate limit no login.
- `noindex` na rota.

### Cabeçalhos e transporte
- HTTPS obrigatório (Vercel já entrega) + HSTS.
- CSP restritiva liberando apenas o necessário para o Mercado Pago e o Turnstile.
- `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`.

### Logs
- Nunca logar telefone, e-mail ou payload completo de pagamento.
- Em erro, logar `order.id` e o código — nunca o dado do convidado.

## LGPD

Os convidados são titulares de dados pessoais e o casal é o controlador. Nada complicado, mas três coisas precisam existir:

**1. Coletar o mínimo.** Nome, telefone e (opcional) e-mail. **Não pedir CPF, endereço nem data de nascimento** — não servem para nada aqui e só aumentam o risco.

**2. Avisar.** Página `/privacidade`, em linguagem simples: quem coleta, para quê (organizar o casamento e confirmar presentes), com quem compartilha (Mercado Pago para pagamento, Vercel e Supabase para hospedar), por quanto tempo guarda, e como pedir exclusão. Link no rodapé e uma linha abaixo de cada formulário, com checkbox de ciência no RSVP.

**3. Apagar depois.** Data-alvo: **30 dias após o casamento**. Script de expurgo:

```sql
-- Rodar por volta de 21/09/2026
delete from rsvps;
update messages set name = 'Convidado';   -- se o casal quiser guardar os recados
delete from orders where status in ('pending','failed','expired');
update orders set buyer_email = null where paid_at < now() - interval '30 days';
```

O casal decide se quer guardar os recados como recordação — se quiser, guarda o texto e tira o vínculo com contato.

Não há dado sensível envolvido (nada de saúde, biometria ou opinião). "Restrição alimentar" fica como campo livre e opcional, e entra no expurgo junto com o resto.

## Checklist de revisão antes do go-live

- [ ] `grep` por segredo em componentes client — limpo
- [ ] Preço vindo do request é ignorado — testado
- [ ] Webhook com assinatura inválida responde 401 — testado
- [ ] Notificação duplicada não paga duas vezes — testado
- [ ] Recado não aprovado não aparece no site — testado
- [ ] RSVP com 100 envios seguidos é barrado — testado
- [ ] `/painel` sem cookie redireciona para o login — testado
- [ ] Página de privacidade publicada e linkada
- [ ] Cabeçalhos de segurança respondendo em produção
