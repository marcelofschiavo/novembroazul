/**
 * Kit de campanha para o RH. Quem envia é o RH de cada empresa — o kit é
 * genérico, sem nome de cliente. Campos entre colchetes ([DATA], [HORÁRIO],
 * [LOCAL OU LINK]) o RH preenche antes de enviar.
 *
 * Uma fonte só: a página /campanha, o e-mail formatado (lib/email.ts) e o
 * texto puro saem daqui. Todo dado tem fonte em conteudo/referencias.ts.
 */
import { EVENTO } from "./palestrante";

const URL = EVENTO.url;

export type BlocoEmail =
  | { tipo: "p"; texto: string }
  | { tipo: "lista"; itens: string[] }
  | { tipo: "destaque"; texto: string }
  | { tipo: "subtitulo"; texto: string }
  | { tipo: "botao"; rotulo: string; href: string };

export type PecaEmail = {
  id: string;
  ordem: string;
  quando: string;
  tema: string;
  assunto: string;
  preheader: string;
  blocos: BlocoEmail[];
  fonteIds: string[];
  /** Mensagem curta para WhatsApp, Teams ou intranet. */
  curta: string;
  /** Peça só faz sentido se a empresa tiver palestra. */
  soComPalestra?: boolean;
};

/** Pequenas marcações no texto: **negrito**. */
export const RODAPE =
  "Conteúdo educativo — não substitui consulta. Benefícios de saúde variam de empresa para empresa: confira com o RH o que existe aí. Precisa conversar? CVV 188, 24 horas, gratuito e sigiloso.";

export const PECAS: PecaEmail[] = [
  {
    id: "pre",
    ordem: "0",
    quando: "Última semana de outubro",
    tema: "Pré-lançamento",
    assunto: "Novembro está chegando. A revisão é sua.",
    preheader: "Quatro e-mails curtos, um por semana. Nenhum vai pedir para você ter medo.",
    blocos: [
      { tipo: "p", texto: "Em novembro, vamos falar de saúde do homem — **por inteiro**." },
      { tipo: "p", texto: "Não é só sobre próstata (ela entra, e com informação séria). É sobre pressão, sono, cabeça, amizades e trabalho: tudo o que a gente costuma deixar para depois." },
      { tipo: "p", texto: "Toda semana, um e-mail curto com uma coisa prática para fazer. Sem sermão e sem susto." },
      { tipo: "destaque", texto: "Para já ir pensando: quando foi sua última consulta de rotina?" },
    ],
    fonteIds: [],
    curta: "Novembro está chegando — e com ele, um mês para cuidar da saúde do homem por inteiro. Toda semana, uma dica curta. Para já ir pensando: quando foi sua última consulta de rotina?",
  },
  {
    id: "semana-1",
    ordem: "1",
    quando: "1ª semana de novembro",
    tema: "Olhar por inteiro",
    assunto: "Você faz a revisão do carro. E a sua?",
    preheader: "Dois minutos, oito perguntas, uma roda. Ninguém vê além de você.",
    blocos: [
      { tipo: "p", texto: "Todo mundo sabe quando vence a revisão do carro. Quase ninguém lembra quando foi a última consulta." },
      { tipo: "p", texto: "Não é impressão: **69% dos homens** foram a uma consulta médica no último ano, contra **82% das mulheres**. E o homem brasileiro vive, em média, **6,6 anos menos** (73,3 contra 79,9 anos)." },
      { tipo: "p", texto: "Mas a resposta não é “fazer exame de tudo, todo ano”: estudos com mais de 230 mil pessoas mostraram que o check-up geral não reduz mortes. O que funciona é **o item certo, na idade certa** — como uma revisão por quilometragem." },
      { tipo: "subtitulo", texto: "Esta semana: a Roda da Saúde" },
      { tipo: "p", texto: "Oito áreas da sua vida, uma nota de 0 a 10 em cada: corpo em movimento, sono, hábitos, prevenção, cabeça e emoções, família e parceria, amizades e lazer, trabalho e propósito." },
      { tipo: "botao", rotulo: "Fazer minha Roda da Saúde", href: `${URL}/trilha/roda` },
      { tipo: "destaque", texto: "Como ler: não é a nota mais baixa que importa. É a roda girar torta. Escolha uma área só para cuidar em novembro." },
    ],
    fonteIds: ["pns2019", "ibge2024", "krogsboll2019"],
    curta: "Você sabe quando vence a revisão do carro. E a sua? Faça a Roda da Saúde em 2 minutos (fica só no seu celular): " + `${URL}/trilha/roda`,
  },
  {
    id: "semana-2",
    ordem: "2",
    quando: "2ª semana de novembro",
    tema: "Corpo sem mito",
    assunto: "Próstata, pressão e intestino: o que é mito, o que é ciência",
    preheader: "PSA alto não quer dizer câncer. E 12 por 8 não é mais normal.",
    blocos: [
      { tipo: "p", texto: "O câncer de próstata é o mais frequente entre os homens no Brasil (sem contar o de pele): **cerca de 78 mil casos por ano**. Três ideias que circulam — e o que a ciência diz:" },
      { tipo: "lista", itens: [
        "**“Se eu não sinto nada, está tudo bem.”** Mito. No começo, o câncer de próstata e a pressão alta costumam não dar sintoma.",
        "**“PSA alto quer dizer câncer.”** Mito. Aumento benigno da próstata e inflamação também elevam o PSA. Ele é ponto de partida para conversar com o médico, não diagnóstico.",
        "**“Todo homem tem que fazer o PSA todo ano.”** Não há consenso. O Ministério da Saúde e o INCA não recomendam o exame em massa em quem não tem sintomas; as sociedades de urologia recomendam conversar com o médico a partir dos 50 anos — ou 45, para homens negros e para quem tem pai ou irmão com a doença.",
      ] },
      { tipo: "destaque", texto: "Em 16 anos, de cada 1.000 homens, o rastreamento evita cerca de 2 mortes por câncer de próstata — e traz biópsias e tratamentos que nem sempre eram necessários. Por isso a decisão é sua, com o médico." },
      { tipo: "p", texto: "Leve três perguntas à consulta: **Quais são as minhas opções? Quais os benefícios e os riscos de cada uma? Qual a chance de isso acontecer comigo?**" },
      { tipo: "subtitulo", texto: "E o resto do painel" },
      { tipo: "lista", itens: [
        "**Pressão:** pela nova diretriz brasileira, 12 por 8 já é pré-hipertensão. Ela quase nunca avisa — só se descobre medindo.",
        "**Intestino:** é o 2º câncer mais frequente no homem. Desde agosto de 2026, o SUS faz o teste de sangue oculto nas fezes a cada 2 anos, dos 50 aos 75.",
        "**Glicemia:** a diretriz brasileira de 2025 recomenda medir a partir dos 35 anos.",
      ] },
      { tipo: "botao", rotulo: "Decidir junto: o PSA em 5 minutos", href: `${URL}/trilha/psa` },
    ],
    fonteIds: ["inca2026", "msInca", "sbu", "harding2020", "shepherd2011", "diretrizHA2025", "fitSus2026", "sbd2024"],
    curta: "PSA alto não quer dizer câncer, e 12 por 8 já é pré-hipertensão. Entenda o exame da próstata sem mito e leve 3 perguntas para a consulta: " + `${URL}/trilha/psa`,
  },
  {
    id: "semana-3",
    ordem: "3",
    quando: "3ª semana de novembro",
    tema: "Cabeça, sono e conexões",
    assunto: "Com quem você conversa quando o bicho pega?",
    preheader: "No homem, a tristeza costuma vir disfarçada de irritação.",
    blocos: [
      { tipo: "p", texto: "Muito homem tem amigo para o futebol e para o churrasco. Para a conversa difícil, a lista encolhe." },
      { tipo: "p", texto: "E no homem a depressão muitas vezes não aparece como tristeza: aparece como **irritação, explosões, álcool a mais e comportamento de risco**. Quando esses sinais entram na conta, a diferença entre homens e mulheres desaparece — muito homem sofre sem diagnóstico." },
      { tipo: "p", texto: "Relações fortes também são saúde: quem tem com quem contar tem cerca de **50% mais chance de sobrevivência** ao longo do tempo." },
      { tipo: "subtitulo", texto: "E o sono?" },
      { tipo: "p", texto: "1 em cada 5 adultos das capitais dorme menos de 6 horas. Ronco alto com pausas pode ser apneia — e os homens têm cerca de 4 vezes mais chance. Oito perguntas de sim ou não ajudam a saber se vale conversar com o médico." },
      { tipo: "botao", rotulo: "Fazer a triagem do sono", href: `${URL}/trilha/sono` },
      { tipo: "lista", itens: [
        "Mande mensagem para um amigo, sem motivo.",
        "Durma 7 horas ou mais em pelo menos três noites.",
        "Pegue no flagra um “isso passa sozinho” — e pergunte: passa mesmo?",
      ] },
      { tipo: "destaque", texto: "Pedir ajuda cedo é manutenção, não fraqueza. Se estiver difícil agora: CVV 188, 24 horas, gratuito — também para quem só precisa conversar." },
    ],
    fonteIds: ["martin2013", "holtlunstad2010", "vigitel2025sono", "tufik2010", "chung2016", "cvv"],
    curta: "Com quem você conversa quando o bicho pega? No homem, a tristeza costuma vir como irritação. Amizade e sono também são saúde. Triagem do sono em 1 minuto: " + `${URL}/trilha/sono` + " · CVV 188",
  },
  {
    id: "semana-4",
    ordem: "4",
    quando: "4ª semana de novembro",
    tema: "Marcar",
    assunto: "Novembro está acabando. Marcou?",
    preheader: "Um plano de uma frase — escrito por você — funciona melhor que boa intenção.",
    blocos: [
      { tipo: "p", texto: "“Vou ver isso” quase nunca vira agenda. O que funciona é um **plano de uma frase**, com quando e o quê:" },
      { tipo: "destaque", texto: "“Se for segunda-feira, depois do almoço, então eu ligo e marco.”" },
      { tipo: "p", texto: "Planos assim aumentam bastante a chance de a gente cumprir o que pretende — desde que sejam **escritos pela própria pessoa**, com o seu horário e o seu lugar. Dica: amarre a revisão a uma data-marco, como o mês do seu aniversário." },
      { tipo: "botao", rotulo: "Montar meu plano e pôr na agenda", href: `${URL}/trilha/plano` },
      { tipo: "p", texto: "**Onde marcar:** plano de saúde ou convênio, Unidade Básica de Saúde (SUS), medicina do trabalho ou os programas de saúde da empresa, se houver." },
      { tipo: "subtitulo", texto: "Se você convive com um homem que adia" },
      { tipo: "lista", itens: [
        "**Convide, não cobre.** “Você PRECISA” gera resistência.",
        "**Ofereça ir junto.** “Marquei para nós dois” funciona melhor que “você tem que ir”.",
        "**Repare na irritação**, não só na tristeza.",
        "**Cuidar não é carregar:** você não precisa ser a agenda dele.",
      ] },
    ],
    fonteIds: ["gollwitzer2006", "lo2014", "dai2014", "rains2013", "pnaish2009"],
    curta: "“Vou ver isso” não marca consulta. Um plano de uma frase marca: “Se for ___, então eu ___”. Monte o seu e ponha na agenda do celular: " + `${URL}/trilha/plano`,
  },
  {
    id: "convite",
    ordem: "C",
    quando: "1 semana antes da palestra",
    tema: "Convite",
    assunto: "[DATA]: uma conversa sobre saúde do homem, por inteiro",
    preheader: "50 minutos. Sem exposição. Com ferramentas para levar.",
    blocos: [
      { tipo: "p", texto: "No dia **[DATA], às [HORÁRIO]**, em **[LOCAL OU LINK]**, o psicólogo **Marcelo Schiavo** conduz uma conversa sobre saúde do homem — do check-up à conversa difícil." },
      { tipo: "lista", itens: [
        "O que a ciência diz sobre próstata, pressão e intestino — sem mito e sem susto.",
        "Por que a gente adia o cuidado, e como destravar.",
        "Como convidar alguém sem cobrar.",
        "Um plano de uma frase para sair com a consulta marcada.",
      ] },
      { tipo: "p", texto: "Ninguém precisa falar nem se expor. Quem convive com um homem que adia também é bem-vindo." },
    ],
    fonteIds: [],
    curta: "[DATA], às [HORÁRIO]: palestra “Por inteiro”, sobre saúde do homem, com o psicólogo Marcelo Schiavo. Sem exposição, com ferramentas para levar. Local: [LOCAL OU LINK].",
    soComPalestra: true,
  },
  {
    id: "pos",
    ordem: "P",
    quando: "Dia seguinte à palestra",
    tema: "Pós-palestra",
    assunto: "O que ficou da palestra — e as ferramentas para continuar",
    preheader: "A roda, os seus números e o plano “Eu vou” estão na trilha.",
    blocos: [
      { tipo: "p", texto: "Obrigado a quem participou. Tudo o que passou na tela está na trilha, com as fontes, em sete passos curtos:" },
      { tipo: "lista", itens: [
        "A **Roda da Saúde** e os **seus números** (pressão, cintura, glicemia).",
        "O **PSA sem mito**, com as 3 perguntas para a consulta.",
        "O **plano “Eu vou”**, com lembrete na agenda do celular e cartão de bolso.",
        "Um **quiz** final, que libera o certificado.",
      ] },
      { tipo: "botao", rotulo: "Abrir a trilha", href: `${URL}/trilha` },
      { tipo: "destaque", texto: "Uma pergunta para hoje: qual área da sua roda você escolheu para cuidar?" },
      { tipo: "p", texto: "Sem cadastro: o que você preenche fica só no seu celular. Nada vai para a empresa." },
    ],
    fonteIds: [],
    curta: "Obrigado a quem participou da palestra “Por inteiro”! A roda, os seus números, o plano “Eu vou” e o quiz estão na trilha (sem cadastro): " + `${URL}/trilha`,
    soComPalestra: true,
  },
  {
    id: "quiz",
    ordem: "Q",
    quando: "7 dias depois da palestra (ou da semana 4)",
    tema: "Quiz de 1 minuto",
    assunto: "Três perguntas, um minuto. Quanto ficou?",
    preheader: "Lembrar uma semana depois fixa mais do que reler. As respostas estão no fim.",
    blocos: [
      { tipo: "p", texto: "Tentar lembrar fixa mais do que reler. Responda de cabeça — as respostas estão no fim do e-mail." },
      { tipo: "lista", itens: [
        "**1.** Pela diretriz brasileira de 2025, uma pressão de 12 por 8 é: (a) ótima, (b) pré-hipertensão ou (c) hipertensão?",
        "**2.** No homem, a depressão muitas vezes aparece como: (a) só tristeza, (b) irritação, álcool a mais e risco, ou (c) não aparece?",
        "**3.** O que mais ajuda alguém a ir ao médico: (a) dar um susto, (b) cobrar, ou (c) convidar e oferecer ir junto?",
      ] },
      { tipo: "botao", rotulo: "Fazer o quiz completo (10 perguntas)", href: `${URL}/trilha/quiz` },
      { tipo: "subtitulo", texto: "Respostas" },
      { tipo: "p", texto: "**1. (b)** — de 12 por 8 a 13,9 por 8,9 já é pré-hipertensão. **2. (b)** — por isso tanto homem sofre sem diagnóstico. **3. (c)** — cobrança gera resistência; convite com um passo claro funciona melhor." },
    ],
    fonteIds: ["roediger2006", "diretrizHA2025", "martin2013", "rains2013"],
    curta: "Quiz de 1 minuto: 12 por 8 é ótima, pré-hipertensão ou hipertensão? Teste o que ficou do Novembro Azul: " + `${URL}/trilha/quiz`,
  },
  {
    id: "30dias",
    ordem: "30",
    quando: "30 dias depois",
    tema: "Um mês depois",
    assunto: "Novembro acabou. O cuidado, não.",
    preheader: "Refaça sua roda e compare com a de um mês atrás.",
    blocos: [
      { tipo: "p", texto: "Há um mês, muita gente fez a Roda da Saúde. Refaça agora: a roda nova aparece por cima da antiga, e dá para ver o que mudou." },
      { tipo: "botao", rotulo: "Refazer minha roda", href: `${URL}/trilha/roda` },
      { tipo: "p", texto: "Se a consulta ainda não saiu do papel, tudo bem: **o plano de uma frase continua valendo em dezembro**. E a revisão pode virar anual — no mês do seu aniversário." },
    ],
    fonteIds: ["dai2014"],
    curta: "Novembro acabou, o cuidado não. Refaça sua Roda da Saúde e compare com a de um mês atrás: " + `${URL}/trilha/roda`,
  },
];

/** Cards curtos para intranet, TV corporativa ou redes internas — um por área da roda. */
export const CARDS = [
  { titulo: "Corpo em movimento", texto: "150 minutos de atividade moderada por semana já contam — cerca de 22 minutos por dia.", fonteIds: ["bull2020"] },
  { titulo: "Sono", texto: "1 em cada 5 adultos das capitais dorme menos de 6 horas. Adulto precisa de 7 ou mais.", fonteIds: ["vigitel2025sono", "watson2015"] },
  { titulo: "Hábitos", texto: "27% dos homens bebem de forma abusiva — 5 doses ou mais numa mesma ocasião.", fonteIds: ["vigitel2023alcool"] },
  { titulo: "Prevenção", texto: "12 por 8 já é pré-hipertensão. Pressão alta quase nunca avisa: só se descobre medindo.", fonteIds: ["diretrizHA2025"] },
  { titulo: "Intestino", texto: "Dos 50 aos 75, o SUS faz o teste de sangue oculto nas fezes a cada 2 anos.", fonteIds: ["fitSus2026"] },
  { titulo: "Cabeça e emoções", texto: "No homem, a depressão costuma vir como irritação, álcool a mais e risco — não só tristeza.", fonteIds: ["martin2013"] },
  { titulo: "Família e parceria", texto: "Convite funciona melhor que cobrança: “marquei para nós dois”.", fonteIds: ["rains2013"] },
  { titulo: "Amizades", texto: "Relações fortes: cerca de 50% mais chance de sobrevivência ao longo do tempo.", fonteIds: ["holtlunstad2010"] },
];
