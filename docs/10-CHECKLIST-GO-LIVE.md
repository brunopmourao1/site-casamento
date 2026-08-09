# 10 — Checklist de go-live

## Antes de divulgar o link

### Funcional
- [ ] Home carrega em menos de 3 s no 4G, no celular
- [ ] Contagem regressiva com a data e o fuso corretos
- [ ] Endereços corretos e link do mapa abrindo no app certo
- [ ] RSVP grava, atualiza resposta repetida e mostra sucesso
- [ ] Recado entra como pendente e não aparece antes de aprovado
- [ ] Todos os presentes com título, texto, imagem e valor corretos
- [ ] Presente único esgotado aparece marcado e não deixa comprar
- [ ] Cota mostra progresso correto
- [ ] Checkout redireciona para o Mercado Pago
- [ ] Pagamento por Pix confirma sozinho
- [ ] Pagamento por cartão confirma sozinho
- [ ] Tela de agradecimento e comprovante corretos
- [ ] Painel abre, lista tudo e exporta CSV

### Segurança (doc 05)
- [ ] Nenhum segredo no bundle do cliente
- [ ] Preço vindo do request é ignorado
- [ ] Webhook com assinatura inválida responde 401
- [ ] Notificação duplicada não paga duas vezes
- [ ] Rate limit ativo nos formulários
- [ ] `/painel` inacessível sem senha e com `noindex`
- [ ] Cabeçalhos de segurança respondendo em produção

### Dinheiro
- [ ] Credenciais de **produção** ativas (não as de teste)
- [ ] Webhook de produção cadastrado e recebendo
- [ ] Teste real de R$ 5,00 por Pix confirmado na conta **do casal**
- [ ] Teste real no cartão confirmado
- [ ] Casal ciente do prazo de liberação de cada meio

### Conteúdo
- [ ] Zero texto ou foto de placeholder — procurar por "lorem", "exemplo", "TODO"
- [ ] Foto do hero na resolução original, não a versão comprimida — conferir no celular, com a tela no brilho máximo
- [ ] Cada tela comparada com o PNG correspondente em `mockups/`
- [ ] Menu abre, fecha e leva a todos os cinco destinos
- [ ] **Jhonatan** com H depois do J e **Mayara** com Y — confira letra por letra, em toda tela
- [ ] Ordem dos nomes igual à do convite: Mayara e Jhonatan
- [ ] 22 de agosto de 2026, **13h**, Portal do Valle — conferido contra o convite
- [ ] Endereço completo e link do mapa levando ao lugar certo (teste no Google Maps e no Waze)
- [ ] Aviso de sinal fraco na região e de chegada antecipada
- [ ] Site lado a lado com o convite no celular: mesma paleta, mesma sensação
- [ ] Prévia do link no WhatsApp com foto e texto certos — **mande para você mesmo antes**
- [ ] Página de privacidade publicada
- [ ] Revisão de português

### Operação
- [ ] Casal tem a senha do painel, por canal privado
- [ ] Casal sabe a quem recorrer se um convidado reclamar de pagamento
- [ ] Você tem backup das credenciais fora do repositório

## Mensagem de divulgação (rascunho para o casal)

> Gente, o site do nosso casamento está no ar 💛
> Confirmem a presença por lá, deixem um recado pra gente e, se quiserem, dêem uma olhada na lista de presentes — tem cada coisa.
> 👉 [link]
> Confirmem até dia 18, que é quando fechamos o número com o buffet.

## Depois do casamento

- [ ] Conciliar o total do painel com o extrato do Mercado Pago
- [ ] Entregar ao casal os recados, a lista de quem presenteou o quê e o CSV de confirmações
- [ ] Transferir de vez a titularidade dos acessos ao casal
- [ ] Decidir se o site sai do ar ou vira página de agradecimento
- [ ] ~21/09: rodar o expurgo de dados pessoais (doc 05)
- [ ] Pedir autorização para usar o projeto como case no portfólio — com prints sem dado de convidado
