# 06 — Catálogo de presentes

> **Valores aprovados pelo casal em 10/08/2026 e já aplicados no banco de produção.** Títulos e textos seguem os originais deste doc; só os valores mudaram (nenhum abaixo de R$ 100). O convite é clássico e a cerimônia é às 13h — a graça fica **no texto**, nunca na forma: moldura, tipografia e cores seguem o doc 07 sem exceção.

Três blocos, propositalmente:

- **Simbólicos** (R$ 20 a R$ 80) — a graça da lista. Valor baixo, ninguém fica sem participar.
- **Lua de mel** (cotas) — onde o dinheiro de verdade entra, dividido em pedaços fáceis.
- **Casa nova** (cotas) — para quem prefere presentear algo "sério".

Sempre deixe um item de **contribuição livre** no fim.

## Simbólicos

| Título | Texto curto | Valor |
|---|---|---|
| Vassoura de manutenção conjugal | Para manter o marido na linha. Uso preventivo, nunca corretivo. | R$ 300 |
| Batom vermelho da noiva | O tom exato que vai marcar a camisa do noivo às 23h. | R$ 500 |
| Meia perdida do noivo | O par não acompanha. Nunca acompanha. | R$ 100 |
| Curso de fechar a tampa da privada | Carga horária: a vida inteira. | R$ 300 |
| Controle remoto com posse compartilhada | Documento de propriedade em nome dos dois. Boa sorte. | R$ 100 |
| Uma discussão vencida pela noiva | Válida uma única vez. Sem direito a recurso. | R$ 150 |
| Silêncio absoluto durante o jogo | Vale 90 minutos. Acréscimos não inclusos. | R$ 150 |
| Ronco tolerado por uma noite | Cupom de uma noite sem cotovelada. | R$ 350 |
| Café da manhã na cama (a ser cobrado) | O casal decide quem paga esta dívida. | R$ 140 |
| Kit sobrevivência do primeiro ano | Contém paciência, humor e um pote de "eu te avisei". | R$ 300 |
| Lado esquerdo da cama, alugado | Contrato vitalício, sem reajuste. | R$ 150 |
| Desculpa antecipada de aniversário esquecido | Presente mais útil desta lista. | R$ 200 |

## Lua de mel (cotas)

| Título | Texto curto | Valor da cota | Cotas |
|---|---|---|---|
| Jantar romântico dos dois | Aquele com vela, sobremesa e conta assustadora. | R$ 300 | 8 |
| Passeio ao pôr do sol | A foto que vai virar papel de parede do celular. | R$ 300 | 10 |
| Uma noite extra no hotel | Porque voltar cedo nunca é uma boa ideia. | R$ 350 | 10 |
| Café da manhã com vista | Café, vista e nada de despertador. | R$ 300 | 8 |
| Estrada até lá | Combustível, pedágio e a playlist da viagem. | R$ 250 | 12 |

## Casa nova (cotas)

| Título | Texto curto | Valor da cota | Cotas |
|---|---|---|---|
| Uma prateleira da geladeira nova | Escolha a sua. Sugerimos a das bebidas. | R$ 180 | 10 |
| Jogo de panelas | Para a fase em que os dois ainda cozinham juntos. | R$ 400 | 8 |
| Cama posta e toalhas macias | O básico que ninguém lembra de comprar. | R$ 200 | 6 |

## Contribuição livre

| Título | Texto curto | Valor | Regra |
|---|---|---|---|
| Contribuição livre | Escolha quantas cotas quiser. O casal agradece do mesmo jeito. | R$ 100 por cota | quantidade de 1 a 10 |

## Seed SQL

Valores em **centavos**, já com os preços aprovados pelo casal em 10/08/2026 (nenhum abaixo de R$ 100). Este SQL reflete o estado atual do banco de produção — só usar para recriar o catálogo do zero.

```sql
insert into gifts (slug, title, description, price_cents, kind, quota_total, sort_order) values
-- simbólicos
('vassoura',        'Vassoura de manutenção conjugal', 'Para manter o marido na linha. Uso preventivo, nunca corretivo.', 30000, 'single', null, 10),
('batom-vermelho',  'Batom vermelho da noiva',         'O tom exato que vai marcar a camisa do noivo às 23h.',            50000, 'single', null, 20),
('meia-perdida',    'Meia perdida do noivo',           'O par não acompanha. Nunca acompanha.',                           10000, 'single', null, 30),
('curso-tampa',     'Curso de fechar a tampa da privada','Carga horária: a vida inteira.',                                30000, 'single', null, 40),
('controle-remoto', 'Controle remoto com posse compartilhada','Documento de propriedade em nome dos dois. Boa sorte.',    10000, 'single', null, 50),
('discussao',       'Uma discussão vencida pela noiva', 'Válida uma única vez. Sem direito a recurso.',                   15000, 'single', null, 60),
('silencio-jogo',   'Silêncio absoluto durante o jogo', 'Vale 90 minutos. Acréscimos não inclusos.',                      15000, 'single', null, 70),
('ronco',           'Ronco tolerado por uma noite',     'Cupom de uma noite sem cotovelada.',                             35000, 'single', null, 80),
('cafe-na-cama',    'Café da manhã na cama (a cobrar)', 'O casal decide quem paga esta dívida.',                          14000, 'single', null, 90),
('kit-primeiro-ano','Kit sobrevivência do primeiro ano','Contém paciência, humor e um pote de "eu te avisei".',           30000, 'single', null, 100),
('lado-da-cama',    'Lado esquerdo da cama, alugado',   'Contrato vitalício, sem reajuste.',                              15000, 'single', null, 110),
('desculpa',        'Desculpa antecipada de aniversário esquecido','Presente mais útil desta lista.',                     20000, 'single', null, 120),
-- lua de mel
('jantar',          'Jantar romântico dos dois',        'Aquele com vela, sobremesa e conta assustadora.',               30000, 'quota',  8,  200),
('por-do-sol',      'Passeio ao pôr do sol',            'A foto que vai virar papel de parede do celular.',               30000, 'quota', 10,  210),
('noite-extra',     'Uma noite extra no hotel',         'Porque voltar cedo nunca é uma boa ideia.',                      35000, 'quota', 10,  220),
('cafe-com-vista',  'Café da manhã com vista',          'Café, vista e nada de despertador.',                             30000, 'quota',  8,  230),
('estrada',         'Estrada até lá',                   'Combustível, pedágio e a playlist da viagem.',                   25000, 'quota', 12,  240),
-- casa
('geladeira',       'Uma prateleira da geladeira nova', 'Escolha a sua. Sugerimos a das bebidas.',                        18000, 'quota', 10,  300),
('panelas',         'Jogo de panelas',                  'Para a fase em que os dois ainda cozinham juntos.',              40000, 'quota',  8,  310),
('cama-mesa-banho', 'Cama posta e toalhas macias',      'O básico que ninguém lembra de comprar.',                        20000, 'quota',  6,  320),
-- livre
('livre',           'Contribuição livre',               'Escolha quantas cotas quiser. O casal agradece do mesmo jeito.', 10000, 'quota', 100, 900);
```

## Imagens

Ilustração em **traço fino sépia sobre papel linho**, no mesmo espírito da folhagem do convite. Um desenho por presente, mesmo traço, mesmo peso de linha, tudo dentro do filete duplo do doc 07. É o que faz uma lista de piadas parecer cara em vez de improvisada.

Não use emoji nem foto de produto de e-commerce: emoji derruba o acabamento e foto de produto faz o convidado achar que está comprando o objeto de verdade.

Se o tempo apertar, o plano B que não estraga nada: sem imagem alguma, só o título em Cormorant caixa alta espaçada dentro da moldura dourada, com o valor grande embaixo. Fica sóbrio e combina.
