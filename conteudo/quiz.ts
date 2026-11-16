/**
 * Quiz final da trilha. Cada pergunta traz a explicação e a fonte — o quiz é
 * para fixar (lembrar ativamente fixa mais do que reler), não para reprovar.
 * Sem ranking, sem servidor: o resultado fica no aparelho.
 */

export type PerguntaQuiz = { id: string; pergunta: string; opcoes: string[]; certa: number; explicacao: string; fonteIds: string[] };

export const QUIZ: PerguntaQuiz[] = [
  {
    id: "q11",
    pergunta: "Por que muitos homens adiam a consulta?",
    opcoes: ["Falta de informação", "Medo, vergonha e a ideia de que “homem aguenta”", "Preguiça"],
    certa: 1,
    explicacao: "Nas pesquisas com homens brasileiros, aparecem o medo de descobrir doença, a vergonha de se expor e o cuidado visto como “coisa de mulher”. Quase todo mundo sabe que deveria ir: o que segura é o medo.",
    fonteIds: ["gomes2007", "schraiber2010"],
  },
  {
    id: "q12",
    pergunta: "Não sentir nada quer dizer…",
    opcoes: ["Que está tudo bem", "Que pode haver algo que só se descobre medindo", "Que dá para esperar até os 60"],
    certa: 1,
    explicacao: "Pressão alta e açúcar alto quase nunca dão sintoma no começo. Parte dos brasileiros tem pressão alta e não sabe — só se descobre medindo.",
    fonteIds: ["malta2018"],
  },
  {
    id: "q4",
    pergunta: "No homem, a depressão muitas vezes aparece como…",
    opcoes: ["Só tristeza e choro", "Irritação, álcool a mais e comportamento de risco", "Ela quase não acontece em homens"],
    certa: 1,
    explicacao: "Quando a pesquisa conta também esses sinais \"disfarçados\", há tantos homens com depressão quanto mulheres. Ela existe — só passa despercebida.",
    fonteIds: ["martin2013"],
  },
  {
    id: "q14",
    pergunta: "O que a couraça do “homem não chora” costuma esconder?",
    opcoes: ["Nada: quem não fala é porque está bem", "Dor que vira irritação, álcool ou silêncio", "Só cansaço do trabalho"],
    certa: 1,
    explicacao: "O que não é dito não some: muda de forma. Muitas vezes, quem tem menos diagnóstico não sofre menos — fala menos. Falar não é fraqueza: é deixar o cuidado entrar.",
    fonteIds: ["gomes2007", "martin2013"],
  },
  {
    id: "q5",
    pergunta: "O que mais ajuda alguém a ir ao médico?",
    opcoes: ["Dar um susto", "Cobrar: “você precisa ir!”", "Convidar e oferecer ir junto"],
    certa: 2,
    explicacao: "Susto sem caminho trava, e cobrança gera resistência (reatância). Convite com um passo claro funciona melhor.",
    fonteIds: ["rains2013", "tannenbaum2015"],
  },
  {
    id: "q15",
    pergunta: "Cuidar cedo da pressão alta…",
    opcoes: ["Sai mais caro do que esperar", "Costuma ser simples, e o remédio é gratuito na Farmácia Popular", "Só vale a pena depois dos 60"],
    certa: 1,
    explicacao: "A revisão sai mais barata que o conserto. Hipertensão, diabetes e obesidade custaram R$ 3,45 bilhões ao SUS em 2018 — e o remédio da pressão é gratuito na Farmácia Popular desde 2025.",
    fonteIds: ["farmaciaPopular", "nilson2020"],
  },
  {
    id: "q7",
    pergunta: "Fazer exame de tudo, todo ano, para todo mundo…",
    opcoes: ["Reduz muito as mortes", "Não mostrou reduzir as mortes", "É obrigatório por lei"],
    certa: 1,
    explicacao: "Em 233 mil pessoas, o check-up geral não reduziu a mortalidade. O que funciona é o exame certo, na idade certa.",
    fonteIds: ["krogsboll2019"],
  },
  {
    id: "q13",
    pergunta: "Sobre o exame de PSA, da próstata, o mais honesto é dizer que…",
    opcoes: ["Todo homem deve fazer, todo ano", "Ninguém deve fazer", "É uma decisão sua, conversada com o médico"],
    certa: 2,
    explicacao: "A Sociedade Brasileira de Urologia sugere conversar a partir dos 50 (45 para homens negros ou com pai ou irmão com a doença); o Ministério da Saúde não indica o exame para todo homem sem sintoma. Os dois concordam que a decisão é individual, com o médico.",
    fonteIds: ["sbu", "msInca"],
  },
  {
    id: "q9",
    pergunta: "Ronco com pausas e sono que não descansa é…",
    opcoes: ["Normal depois dos 40", "Luz de alerta: vale consulta", "Sinal de que dormiu bem"],
    certa: 1,
    explicacao: "A apneia do sono atinge cerca de um terço dos adultos em São Paulo, e os homens têm cerca de 4 vezes mais chance.",
    fonteIds: ["tufik2010"],
  },
  {
    id: "q6",
    pergunta: "Qual plano tem mais chance de virar consulta marcada?",
    opcoes: ["“Vou ver isso.”", "“Se for segunda, depois do almoço, então eu ligo e marco.”", "Esperar dar vontade."],
    certa: 1,
    explicacao: "Planos se-então — com quando, onde e o quê — aumentam de forma consistente a chance de cumprir o que se planejou.",
    fonteIds: ["gollwitzer2006"],
  },
];
