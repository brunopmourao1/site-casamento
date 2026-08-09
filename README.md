# Site de Casamento — Jhonatan & Mayara

Site sob medida para o casamento de **Mayara Ketlin e Jhonatan Alves**, em **22/08/2026, às 13h, no Portal do Valle**.

Substitui plataformas prontas (tipo iCasei) por um site próprio, com identidade do casal e sem mensalidade.

## O que o site faz

1. **Home do casal** — história, data, local, contagem regressiva, informações práticas.
2. **Confirmação de presença (RSVP)** — convidado confirma por nome, com acompanhantes.
3. **Mural de recados** — mensagens para o casal, com moderação antes de publicar.
4. **Lista de presentes** — presentes simbólicos e bem-humorados, pagos online via **Pix ou cartão de crédito**.
5. **Painel do casal** — ver confirmações, aprovar recados, acompanhar presentes recebidos.

## Documentação

| Doc | Para que serve |
|---|---|
| [00-STATUS.md](docs/00-STATUS.md) | **Leia primeiro** — o que está decidido, o que trava, ordem de leitura |
| [01-BRIEFING.md](docs/01-BRIEFING.md) | Escopo, requisitos, o que fica fora |
| [02-ARQUITETURA.md](docs/02-ARQUITETURA.md) | Stack, estrutura de pastas, fluxos, variáveis de ambiente |
| [03-MODELO-DADOS.md](docs/03-MODELO-DADOS.md) | Schema SQL completo + políticas RLS |
| [04-PAGAMENTOS.md](docs/04-PAGAMENTOS.md) | Integração Mercado Pago (Pix + cartão), webhook, conciliação |
| [05-SEGURANCA-LGPD.md](docs/05-SEGURANCA-LGPD.md) | Modelo de ameaças, controles, dados pessoais, retenção |
| [06-CONTEUDO-PRESENTES.md](docs/06-CONTEUDO-PRESENTES.md) | Catálogo de presentes com títulos, textos e valores |
| [07-DESIGN.md](docs/07-DESIGN.md) | Direção visual, tokens, tipografia, copy |
| [08-ROADMAP.md](docs/08-ROADMAP.md) | Cronograma dia a dia até o go-live |
| [09-BACKLOG.md](docs/09-BACKLOG.md) | Tarefas granuladas para executar no Claude Code |
| [10-CHECKLIST-GO-LIVE.md](docs/10-CHECKLIST-GO-LIVE.md) | Verificação antes de divulgar e depois do casamento |

Além dos docs:

- **[PROMPT-CLAUDE-CODE.md](PROMPT-CLAUDE-CODE.md)** — prompts prontos, uma sessão por vez
- **[CLAUDE.md](CLAUDE.md)** — regras permanentes que o Claude Code lê a cada sessão
- **[mockup-telas.html](mockup-telas.html)** — as telas para abrir no navegador e mostrar ao casal
- **mockups/** — as mesmas telas em PNG, que o Claude Code usa como alvo visual
- **assets/** — recortes tratados da foto do casal, para usar como placeholder até o original chegar

## Como começar

```bash
# 1. copie este pacote para a pasta do projeto
# 2. abra o VS Code na pasta e rode:
claude
# 3. cole o bloco da "Sessão 1" do PROMPT-CLAUDE-CODE.md
```

## Identidade visual — aprovada

Herdada do convite impresso e congelada no `docs/07-DESIGN.md`:

| | |
|---|---|
| Paleta | linho `#F4EDE0` · pergaminho `#E8DCC8` · sépia `#4A3728` · cacau `#2C1F16` · eucalipto `#7C8B63` · musgo `#56603F` · ouro `#B08D57` |
| Tipografia | Pinyon Script (só os nomes) · Cormorant Garamond (estrutura e números) · Karla (corpo) |
| Assinatura | filete duplo dourado + bloco de três colunas com divisória |
| Navegação | monograma M&J + menu no topo; barra de ações fixa no rodapé do celular |

## Bloqueadores a resolver antes de codar (D0)

- [ ] Conta **Mercado Pago em nome do Jhonatan ou da Mayara** criada e verificada (o dinheiro **não** pode cair na conta do Bruno)
- [ ] Chave Pix do casal cadastrada nessa conta
- [ ] Credenciais de produção e de teste geradas em *Suas integrações*
- [ ] Lista de presentes aprovada pelo casal (títulos, piadas e valores) — ver doc 06
- [ ] **Foto do hero em alta** — a que chegou tem 591×386 px (compressão de aplicativo). Pedir o arquivo original; sem isso o hero sai borrado
- [ ] Mais 5 a 9 fotos do casal em boa resolução e os textos da história
- [ ] Dress code e horário sugerido de chegada (12h30?)
- [ ] Arquivo do convite em alta, para extrair a folhagem e a moldura
- [ ] Domínio definido e registrado

**Já resolvido pelo convite:** data 22/08/2026 às 13h, local Portal do Valle (Estrada Municipal Benedito Antônio Regagnin, 3480 — Bairro dos Pontos), grafia dos nomes (Mayara e Jhonatan) e identidade visual.
