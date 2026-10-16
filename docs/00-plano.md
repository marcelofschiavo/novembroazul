# 00 · Plano · Novembro Azul 2026 — para aprovação

> Status: **rascunho para aprovação** (15/10/2026). Nada de código foi escrito ainda.
> **Atualização:** a revisão didática e científica em [`02-revisao-didatica.md`](02-revisao-didatica.md)
> (metáfora "manual do proprietário", revisão por quilometragem, novo roteiro) prevalece onde conflitar com este plano.
> Projeto independente e **genérico**: serve a várias empresas, sem nome nem logo de cliente.
> Identidade e história próprias, sem referência a outras campanhas.

## 1. O que é

Três peças que contam a mesma história e usam o mesmo conteúdo (mora num lugar só, em `conteudo/`):

| Peça | Para quê | Onde |
|---|---|---|
| **Palco** | A palestra (40 min + 15 de perguntas) | `trilhanovembroazul.vercel.app/palco` |
| **Trilha** | Continuar depois: ferramentas, quiz, certificado | `/trilha` |
| **Campanha** | E-mails semanais de novembro, mensagens curtas, cartaz | `/campanha/*` + textos para o RH copiar |

Base técnica copiada do projeto anterior (Next 16, Tailwind 4, motion, jsPDF, service worker): palco
offline, acessível, navegação por teclado/passador, notas do apresentador, PDF gerado no aparelho,
**sem servidor e sem cadastro** (tudo em `localStorage`, prefixo `na26:`).

## 2. Nome e conceito

Saúde do homem **por inteiro** — a próstata entra, mas como uma parte de um check-up que inclui
coração, sono, cabeça, hábitos, relações e trabalho. O ângulo do palestrante (psicólogo, TCC):
**por que a gente adia o cuidado — e como destravar.**

### Opções de nome

| Opção | Força | Risco |
|---|---|---|
| **Por inteiro** *(recomendado como nome)* | Diz "saúde integral" sem jargão; cabe a roda da vida | Menos "chamativo" sozinho |
| **Revisão em dia** | Metáfora do carro, imediata para público masculino | Trata o corpo como máquina; o tom pode ficar só técnico |
| **Eu vou.** | Ação, compromisso; vira o fecho da palestra | Foca só em "ir ao médico" |
| **Bora junto** | Convite, inclui parceiras, filhos, amigos | Informal demais para algumas empresas |
| **Sem adiar** | Direto ao comportamento-alvo | Soa como cobrança (gera resistência) |
| **Manutenção não é fraqueza** | Desmonta o estigma | Longo; define pelo negativo |

**Recomendação — usar três, cada um no seu papel:**
- Nome da campanha: **Por inteiro** · *Saúde do homem, do check-up à conversa.*
- Gancho de abertura (e-mail 1, cartaz, slide 1): **"Você faz a revisão do carro. E a sua?"**
- Frase do compromisso no fim: **"Eu vou."** — e a versão para quem convida: **"Eu vou junto."**

## 3. A história (standalone)

Personagens fictícios, ilustrações em quadrinho (mesmo rosto em todas as cenas, via imagem de
referência), sem imagem de doença, hospital dramático ou exame.

- **Davi**, 36, coordenador de logística. Resolve o problema de todo mundo; o carro tem revisão em
  dia; ele não vai ao médico há cinco anos. Dorme mal, "tô de boa".
- **Roberto**, 61, pai do Davi. Levanta três vezes à noite pra ir ao banheiro. "É da idade."
- **Lia**, companheira do Davi — é por ela que entram os aportes para quem convive com um homem que adia.

**Início.** Segunda de manhã: Davi agenda a revisão do carro pelo celular. Na mesma tela, a
notificação "consulta de rotina — remarcar?", de dois anos atrás. Ele arrasta pro lado.

**Meio.** Dois tropeços e duas viradas:
1. Lia cobra: "Você precisa ir ao médico!" → Davi se irrita e adia mais (reatância). Lia muda:
   "Tô sentindo você cansado. Quer que a gente veja isso junto?" → ele escuta.
2. Com o pai, dois caminhos: "Você que sabe, pai" (a conversa morre) × "Pai, marquei pra nós dois. Eu vou junto."

**Fim.** Três meses depois. Roberto: os sintomas eram do aumento benigno da próstata; conversou com
o médico sobre o PSA e decidiram juntos; descobriu a pressão alta e trata. Davi: exames ok, mas sono
e ansiedade em vermelho na roda — começou a cuidar, voltou a jogar bola com os amigos às quintas.
Final realista: a consulta encontra coisas, quase nunca a que a gente temia.

## 4. Regras do projeto (vão para o `CLAUDE.md`)

1. **Sem apelo ao medo.** Nada de imagem de doença, contagem de mortos como choque, "faça senão…".
   Mensagem de medo só funciona com caminho claro de ação junto (Tannenbaum et al., 2015).
2. **Honestidade sobre o PSA.** Não há consenso: Ministério da Saúde/INCA não recomendam rastreamento
   populacional de homens sem sintomas; a SBU recomenda conversar com o urologista a partir dos 50
   (45 se negro ou com pai/irmão com a doença). Mensagem: **decisão compartilhada**, nunca "faça todo ano".
3. **Sem piada com o toque retal.** Reforça a barreira que a campanha quer tirar.
4. **Fonte e selo em todo dado** (consolidada · moderada · em debate · ferramenta reflexiva). DOIs
   conferidos no Crossref; dados oficiais nas páginas oficiais.
5. **Aviso fixo:** "Conteúdo educativo. Não substitui consulta." **CVV 188** no rodapé — a campanha fala
   de saúde mental masculina. Comunicação segura (OMS/CVV) quando o tema é suicídio.
6. **Benefícios genéricos:** "plano de saúde, programa de bem-estar, apoio psicológico, medicina do
   trabalho — confira com o RH o que existe aí". Nenhum benefício específico prometido.
7. **Escalas e ferramentas**: resultado em faixa + convite, sem diagnóstico; nada sai do aparelho.
8. **Revisão médica** do conteúdo clínico antes de publicar (recomendado).
9. Sem commit/push sem pedido explícito.

## 5. Saúde integral — possibilidades levantadas

| Ferramenta / ideia | O que é | Evidência | Onde entra |
|---|---|---|---|
| **Roda da Saúde do Homem** (adaptação da Roda da Vida) | 8 áreas, nota 0–10, vira um radar | Ferramenta **reflexiva** de coaching (Paul J. Meyer, anos 1960), **sem validação psicométrica** — dizer isso na tela | Palco (exercício ao vivo), trilha (interativa + PDF, refazer em 30 dias), e-mail 1 |
| **Modelo biopsicossocial** | Saúde = biologia + mente + contexto social | Engel, *Science* 1977 — base conceitual | Palco, bloco 2 |
| **Definição de saúde da OMS** | "Bem-estar físico, mental e social, não só ausência de doença" | Constituição da OMS, 1946 | Palco, e-mail 1 |
| **Life's Essential 8** | 8 itens do coração: alimentação, atividade, cigarro, sono, peso, colesterol, glicose, pressão | AHA, Lloyd-Jones et al., *Circulation* 2022 — consolidada | Palco bloco 4; trilha "Revisão do coração" |
| **Cinco caminhos para o bem-estar** | Conectar-se, mexer-se, reparar, aprender, doar | NEF/Foresight (UK), 2008 — síntese de evidências, moderada | Trilha "5 caminhos"; mensagens curtas |
| **Conexões sociais** | Relações como fator de saúde | Holt-Lunstad 2010 (148 estudos, ~50% mais sobrevivência); OMS Comissão de Conexão Social 2025 (~871 mil mortes/ano ligadas à solidão) | Palco bloco 5; trilha "Mapa de conexões"; e-mail 3 |
| **Estudo de Harvard** | 85 anos acompanhando homens: qualidade das relações prediz saúde | Waldinger & Schulz, 2023 — longitudinal, observacional | Palco bloco 5 (história curta) |
| **Ereção como sentinela do coração** | Disfunção erétil pode anteceder doença cardiovascular | Inman et al., *Mayo Clin Proc* 2009 — moderada | Palco bloco 4 (frase direta, sem constrangimento) |
| **Sono** | Adultos: 7 h ou mais | AASM/SRS, Watson et al. 2015 — consenso | Roda, e-mail 3 |
| **Atividade física** | 150–300 min/semana moderada | Diretrizes OMS 2020, Bull et al. — consolidada | Roda, Essential 8 |
| **Álcool** | Não há nível sem risco | OMS (2023) — consolidada; **AUDIT-C** (OMS) como autoavaliação | Trilha "Seu consumo de álcool" |
| **Sintomas urinários** | Quando procurar, o que costuma ser (benigno, na maioria) | **IPSS**, escala validada | Trilha "Sintomas urinários" |
| **Saúde mental masculina** | Homens buscam menos ajuda e morrem ~4× mais por suicídio | Ministério da Saúde (boletins); Addis & Mahalik 2003; Wong et al. 2017 | Palco bloco 5–6; trilha; CVV |
| **Propósito** | Ter propósito associado a menor mortalidade | Alimujiang et al., *JAMA Netw Open* 2019 — observacional, moderada | Raio da roda "Trabalho e propósito" |
| **Total Worker Health** | Saúde integrada ao trabalho (segurança + bem-estar) | NIOSH/CDC — estrutura de programa | Para o RH (nota no material da campanha) |
| **Paternidade ativa / pré-natal do parceiro** | Porta de entrada do homem jovem no sistema de saúde | Ministério da Saúde, Guia do Pré-Natal do Parceiro | Trilha "Check-up por idade" (20–40 anos) |

### A Roda da Saúde do Homem (proposta de 8 raios)

1. **Corpo em movimento** — atividade física, alimentação
2. **Sono e energia**
3. **Hábitos** — álcool, cigarro, telas
4. **Prevenção** — consultas e exames em dia, pressão medida, vacinas
5. **Cabeça e emoções** — estresse, ansiedade, humor
6. **Família e parceria**
7. **Amizades e lazer**
8. **Trabalho, dinheiro e propósito**

Leitura: não é a nota mais baixa que importa — é a roda **girar torta**. Escolher **uma** área
para novembro. Na trilha, o radar fica salvo no aparelho e o PDF compara com a roda de 30 dias depois.

## 6. Roteiro do palco (~40 min + 15)

| # | Bloco | min | O que a pessoa leva | Ciência por trás |
|---|---|---|---|---|
| 1 | **Abertura** — bio, combinados, "você faz a revisão do carro?" (chat), início da história | 5 | Cuidar é manutenção, não fraqueza | — |
| 2 | **Saúde por inteiro** — definição de saúde, os 6,6 anos, **Roda ao vivo** (nota mental em cada raio) | 5 | Próstata é uma parte; a roda mostra onde você está torto | OMS 1946; Engel 1977; IBGE 2024 (73,3 × 79,9 anos) |
| 3 | **Mito ou verdade** (4–5, resposta no chat) | 4 | "Se não sinto nada, tá tudo bem" · "PSA alto = câncer" · "Todo homem deve fazer PSA todo ano" · "Tratamento sempre deixa sequela" · "Sintoma urinário é sempre câncer" | INCA; SBU; ProtecT (NEJM 2023) |
| 4 | **Corpo: o que a ciência diz** — próstata (≈78 mil casos/ano; fatores de risco; **pictograma de 1.000 homens**; decisão compartilhada) + coração (Essential 8, pressão silenciosa, ereção como sentinela) | 8 | Saber o que perguntar ao médico; o coração também é Novembro Azul | INCA 2026–2028; ERSPC 23 anos (NEJM 2025); PRECISION (NEJM 2018); AHA 2022; Inman 2009 |
| 5 | **Cabeça e conexões** — saúde mental masculina, solidão, o Estudo de Harvard | 6 | Amigo pra conversa difícil também é saúde | OMS 2025; Holt-Lunstad 2010; MS (suicídio); Waldinger 2023 |
| 6 | **Por que a gente adia** — pensamentos automáticos e como responder; reatância | 6 | "Isso passa sozinho", "comigo não acontece", "homem aguenta" — e as respostas | Addis & Mahalik 2003; Wong 2017; Weinstein 1980; Sweeny 2010; Brehm/Rains 2013 |
| 7 | **"Você que sabe" × "Eu vou junto"** + **para quem cuida dele** (parceiras, filhas, mães, amigos) | 4 | Convidar, não cobrar; oferecer ir junto; você não é a agenda dele | Rains 2013; Umberson 1992 |
| 8 | **Eu vou** — plano se-então, onde ir (benefícios genéricos + SUS), fim da história | 3 | Uma frase: *"Se for ___, então eu ___."* | Gollwitzer & Sheeran 2006 (94 estudos) |
| 9 | **Perguntas e conexões** | 15 | — | — |

Slides novos a construir: **radar da roda**, **pictograma de 1.000 homens** (formato que melhora a
compreensão de risco — Galesic et al. 2009), **reescrita de pensamento**, **cartão se-então**.

## 7. Trilha

**Essenciais (liberam o certificado):**
1. **Minha Roda da Saúde** — radar interativo, PDF, lembrete para refazer em 30 dias.
2. **Revisão do coração** — os 8 itens; "não sei meu número" vira item da lista para a consulta.
3. **Decidir junto: o PSA** — os 1.000 homens, benefícios × riscos, o que perguntar.
4. **Por que eu adio** — pensamentos automáticos e exercício de reescrita.
5. **Meu plano "Eu vou"** — se-então + **lembrete de agenda (.ics)** gerado no aparelho.
6. **Quiz final** — 10 perguntas com explicação e fonte em cada resposta (sem ranking, sem servidor).

**Extras:** Check-up por idade (20+, 40+, 50+) · Sintomas urinários (IPSS) · Seu consumo de álcool
(AUDIT-C) · Mapa de conexões · **Para quem cuida dele** · Cartão de frases para convidar (PDF) ·
Simulador de conversa (com o pai, o amigo, o parceiro) · Cabeça também é saúde (+ CVV 188) ·
5 caminhos para o bem-estar · Reveja a palestra · Referências · Palestrante · Certificado.

## 8. Aportes para mulheres (parceiras, namoradas, filhas, mães, amigas)

- **No palco:** um slide "Para quem cuida dele" (bloco 7) e a Lia na história.
- **Na trilha:** módulo "Para quem cuida dele": convidar sem cobrar (reatância), perguntar em vez de
  diagnosticar, oferecer ir junto, frases prontas — e o limite: **cuidar não é carregar**; ninguém
  precisa virar a agenda de saúde do outro (carga mental do cuidado — Daminger, 2019).
- **Na campanha:** um trecho "Se você convive com um homem que adia" no e-mail 4.

## 9. Campanha

Rascunhos completos em [`01-campanha.md`](01-campanha.md): pré-lançamento, 4 e-mails semanais
(03, 10, 17 e 24/11), convite e pós-palestra, e-mail de 30 dias, mensagens curtas, cartaz e 8 cards
"você sabia?". Arco: **olhar por inteiro → corpo → cabeça e conexões → marcar**.

Implementação igual ao modelo anterior: conteúdo em `conteudo/campanhas.ts` alimenta a página e o
HTML de e-mail (tabelas, estilo inline, 600 px), banner PNG gerado de SVG, botões "copiar HTML /
copiar texto / baixar banner / copiar link".

## 10. Identidade

Marca própria da campanha: azul Novembro Azul + neutros quentes, contraste ≥ 4,5:1 nos dois temas.
Sem nome nem logo de cliente — a mesma versão serve a todas as empresas. Só a marca Mindheart.

## 11. Fases

| Fase | Entrega |
|---|---|
| 0 | Aprovação deste plano + respostas às pendências |
| 1 | Base técnica, identidade, `CLAUDE.md`, primeiro deploy em `trilhanovembroazul.vercel.app` |
| 2 | `referencias.ts` (DOIs no Crossref) + `blocos.ts` + `campanhas.ts` — **revisão de texto sua** |
| 3 | Palco (radar, pictograma, reescrita, se-então) |
| 4 | Ilustrações de Davi, Roberto e Lia |
| 5 | Trilha (ferramentas, escalas, quiz, certificado) |
| 6 | Campanha: páginas, HTML de e-mail, banners, cartaz |
| 7 | Revisão médica, ensaio, build/lint/acessibilidade, push |

Cronograma: o e-mail 1 sai **03/11** — a página da roda (`/campanha/semana-1` + `/trilha/roda`)
precisa estar no ar antes disso, então ela vem primeiro na fase 1–2.

## 12. Pendências

1. **Nome** — "Por inteiro" (+ "revisão do carro" + "Eu vou") ou outra opção?
2. ~~Empresa~~ — decidido: genérico, sem nome de cliente (15/10). O RH de cada empresa envia os e-mails.
3. **Palestra** — data, horário, duração, online ou presencial?
4. **Revisor médico** para o conteúdo clínico.
5. **Datas dos e-mails** — terças 03, 10, 17, 24/11 servem?

### Dados a conferir na fonte primária (fase 2)

- INCA, Estimativa 2026–2028: 77.920 casos/ano de próstata (conferir no PDF oficial).
- Data e texto da nota técnica MS/INCA sobre rastreamento; texto atual da SBU.
- Vigitel mais recente: hipertensão e consumo abusivo de álcool por sexo.
- Boletim de suicídio do MS mais recente (razão homens/mulheres).
- USPSTF: se houve atualização depois de 2018.
- Calendário de vacinação do adulto e rastreamento colorretal (para o "check-up por idade").
