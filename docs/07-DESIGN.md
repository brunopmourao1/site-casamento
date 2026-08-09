# 07 — Direção visual

> **Revisado em 09/08 depois do convite oficial.** A direção anterior ("festa à noite", fundo verde-escuro) foi descartada: o casamento é **às 13h**, ao ar livre, e o convite já define uma identidade rústica-clássica em papel. O site continua o convite — não compete com ele.

## A identidade já existe: está no convite

O convite entrega tudo o que precisamos. Papel texturizado cor de linho, tipografia caligráfica para os nomes, serifada em caixa alta com espaçamento largo para a estrutura, folhagem de eucalipto e mosquitinho, alianças douradas, juta, madeira e luzinhas quentes.

**O trabalho aqui não é criar uma identidade. É estender essa, com acabamento premium.** Quem receber o link no WhatsApp depois de ver o convite tem que reconhecer na hora que é a mesma festa.

O que separa "bonito" de "premium" neste caso: menos elementos, mais respiro, filete fino no lugar certo, foto grande e bem tratada, e nenhuma decoração que não venha do convite.

## Tokens

Cores tiradas diretamente do convite:

```css
--linho:      #F4EDE0;  /* papel do convite — fundo principal */
--pergaminho: #E8DCC8;  /* papel um tom abaixo — seções alternadas */
--sepia:      #4A3728;  /* marrom do texto do convite — texto e títulos */
--cacau:      #2C1F16;  /* marrom profundo — rodapé, alto contraste */
--eucalipto:  #7C8B63;  /* verde das folhas — acento vivo, estados de sucesso */
--musgo:      #56603F;  /* verde escuro — detalhes e hover */
--ouro:       #B08D57;  /* alianças e luzinhas — filetes, números, ornamento */
```

Sem terracota, sem rosa, sem gradiente. Sete cores é o teto — a elegância aqui vem da disciplina.

Regras de contraste: texto corrido sempre `--sepia` sobre `--linho` (passa AA com folga). `--ouro` só em filete, ornamento e número grande, nunca em texto pequeno. `--eucalipto` em texto só a partir de 18 px em peso médio.

## Tipografia

| Papel | Fonte | Uso |
|---|---|---|
| Caligráfica | **Pinyon Script** | Só os nomes do casal e no máximo dois títulos. Nada mais. |
| Display / estrutura | **Cormorant Garamond** | Títulos de seção em caixa alta com `letter-spacing: 0.18em`, e números grandes em peso light |
| Corpo e interface | **Karla** | Texto corrido, formulários, botões, rótulos |

A caligráfica é o item caro do guarda-roupa: usada uma vez, impressiona; usada em tudo, vira convite de festa infantil. Se aparecer em botão ou em label, está errado.

Escala: 13 / 15 / 17 / 22 / 30 / 44 / 72 px. Corpo em 17 px com entrelinha 1,65 — no celular, sob sol, generosidade de espaço lê como cuidado.

## Elemento assinatura: o filete duplo e o bloco de três colunas

Duas coisas no convite carregam a identidade melhor que a folhagem, e são as que vamos repetir:

**1. O filete duplo.** A moldura de duas linhas finas que emoldura o convite vira o recipiente de tudo no site: cartão de presente, caixa de recado, formulário, comprovante. Sempre a mesma moldura, sempre em `--ouro` a 1px e 3px de distância. É o que dá unidade sem precisar de enfeite.

**2. O bloco de três colunas com divisórias verticais** — no convite é `DIA 22 | ÀS 13H | AMOR, UNIÃO E UM NOVO COMEÇO`. Esse desenho se repete no site na contagem regressiva, nas informações do dia e no progresso das cotas de presente. Número grande em Cormorant light, rótulo em caixa alta minúscula, divisória em filete dourado.

A folhagem entra como **ornamento de canto, uma vez por seção, no máximo** — em marca d'água a 15% de opacidade. Eucalipto não é papel de parede.

## Navegação

Sim, tem barra de navegação — mas discreta, porque o site tem cinco destinos e o convidado precisa achar a lista de presentes sem rolar a página inteira.

**No celular:** barra no topo com o monograma **M&J** em caligráfica à esquerda e o menu à direita (duas linhas finas, a de baixo mais curta — detalhe que vale mais que um ícone genérico). Sobre o hero ela é transparente, com o monograma em `--cacau`, e a partir da rolagem ganha fundo `--linho` com filete dourado embaixo.

O menu abre em painel inteiro no papel linho, com os destinos dentro da mesma moldura de filete duplo, em Cormorant caixa alta espaçada, separados por hairline. No rodapé do painel, os nomes em caligráfica e a linha `22 . 08 . 2026 · Portal do Valle`. Abrir o menu é ver o convite de novo.

Destinos, nesta ordem: **Início · Onde e quando · Confirmar presença · Lista de presentes · Recados**.

**A barra fixa inferior continua.** Topo é para navegar, rodapé é para agir — as duas ações que justificam o site ficam sempre a um toque. Duas barras só incomodariam se ambas fossem pesadas; a de cima tem 55px e dois elementos.

**No computador:** monograma à esquerda, destinos ao centro-direita em Cormorant espaçada, e *Confirmar presença* como botão de contorno dourado na ponta. Item ativo marcado com filete dourado embaixo.

## Layout (mobile primeiro)

```
┌──────────────────────────┐
│  ✧ luzinhas suaves ✧     │   Hero: foto do casal ocupando a tela,
│  ╔══════════════════╗    │   tratada em tom quente; sobre ela o cartão
│  ║ COM MUITA ALEGRIA║    │   em papel linho com o filete duplo —
│  ║    Mayara        ║    │   o próprio convite, agora vivo
│  ║       e          ║    │
│  ║    Jhonatan      ║    │
│  ║ 22 AGO │ 13H     ║    │   bloco de colunas, filete dourado
│  ╚══════════════════╝    │
│ [Confirmar presença]     │   sólido sépia
│ [Lista de presentes]     │   contorno dourado
├──────────────────────────┤
│  22d 04h 12m 30s         │   contagem no mesmo bloco de colunas
├──────────────────────────┤
│  Nossa história          │   linho, duas fotos, texto sereno
├──────────────────────────┤
│  Portal do Valle         │   pergaminho, endereço, botão do mapa,
│  Estrada Municipal...    │   aviso de "chegue 12h30" e de sinal fraco
├──────────────────────────┤
│  Lista de presentes      │   linho, cartões com filete duplo
├──────────────────────────┤
│  Recados                 │   pergaminho, recado em caligráfica pequena
├──────────────────────────┤
│  Dúvidas                 │   acordeão discreto
├──────────────────────────┤
│  rodapé em cacau         │   madeira escura, folhagem, aliança
└──────────────────────────┘
   barra fixa: Confirmar presença | Presentes
```

## No computador, o hero é dividido

Ampliar o layout do celular para 1400px deixa a foto gigante e o cartão flutuando no meio dela — e, pior, o cartão cobre o rosto dos dois. No desktop a home vira **duas colunas**: à esquerda, no papel linho, o texto do convite com os nomes grandes em caligráfica, o bloco de três colunas e os botões; à direita, a foto ocupando a altura toda, com o filete duplo desenhado por dentro da borda. A faixa da contagem regressiva atravessa o rodapé do hero em pergaminho.

## O comprovante virou cartão de presente

A ideia do talão com fonte monoespaçada não cabe mais — ali era humor, aqui é papelaria. Depois de pagar, o convidado recebe um **cartão em papel linho** com o filete duplo, os nomes em caligráfica, o presente escolhido, o recado que ele deixou e um selo dourado no rodapé. Botão *Salvar imagem*.

Continua sendo a peça que circula sozinha no grupo do WhatsApp — só que agora combina com o convite.

## Fotografia

É o que mais pesa na sensação de premium, mais que qualquer código.

- Tratamento único em todas: temperatura quente, contraste suave, leve dessaturação do verde para casar com o eucalipto. Nada de preto e branco — a paleta é quente.
- **Foto do hero escolhida:** o casal na estrada, no eucaliptal, contra a luz do fim de tarde. É a escolha certa — o eucalipto do fundo é literalmente a folhagem do convite, e a luz quente já entrega a paleta pronta.
- **Pendência crítica:** o arquivo que chegou tem 591×386 px, resolução de imagem comprimida por aplicativo de mensagem. Para o hero é pouco: em tela de celular moderna precisa de pelo menos 1600px no lado maior. **Peça o original ao fotógrafo ou pelo aplicativo em qualidade máxima.** Sem isso, o hero fica borrado e derruba sozinho toda a sensação de premium.
- No recorte vertical do celular, enquadrar os dois de joelho para cima e deixar o carro fora ou quase fora do quadro.
- Mínimo de 6, máximo de 10. Site de casamento com 30 fotos parece álbum de rede social.
- WebP via `next/image`, com `priority` só na do hero.

## Movimento

Discreto e uma vez só. O cartão do convite entra com um fade e uma subida de 12 px ao carregar. Luzinhas em bokeh com brilho lento e quase imperceptível no topo. Revelação suave ao rolar. `prefers-reduced-motion` respeitado. Qualquer coisa além disso derruba o acabamento.

## Texto da interface

- Tom do convite: acolhedor e um pouco formal, sem ser cerimonioso. *Contamos com a sua presença* é a régua.
- Verbo ativo, frase curta, nome de botão constante: *Confirmar presença* → *Presença confirmada*.
- **A piada mora só na lista de presentes.** No hero, no local, no pagamento e na confirmação, o tom é sóbrio. É esse contraste que faz a lista ter graça — e que impede o site de virar meme.
- Erro resolve: "Esse telefone já confirmou. Quer atualizar a resposta?"

## Piso de qualidade

Responsivo até 320 px, foco visível, `alt` em toda imagem, `label` de verdade, fontes com `display: swap` e pré-carregamento só da caligráfica do hero, imagem do Open Graph com o cartão do convite.
