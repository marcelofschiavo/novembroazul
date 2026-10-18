/**
 * Quiz final da trilha. Cada pergunta traz a explicação e a fonte — o quiz é
 * para fixar (lembrar ativamente fixa mais do que reler), não para reprovar.
 * Sem ranking, sem servidor: o resultado fica no aparelho.
 */

export type PerguntaQuiz = { id: string; pergunta: string; opcoes: string[]; certa: number; explicacao: string; fonteIds: string[] };

export const QUIZ: PerguntaQuiz[] = [
  {
    id: "q1",
    pergunta: "Pela diretriz brasileira de 2025, uma pressão de 12 por 8 é…",
    opcoes: ["Ótima", "Pré-hipertensão", "Hipertensão"],
    certa: 1,
    explicacao: "De 120/80 a 139/89 agora é pré-hipertensão: hora de mexer nos hábitos e acompanhar. Normal é abaixo de 12 por 8.",
    fonteIds: ["diretrizHA2025"],
  },
  {
    id: "q2",
    pergunta: "Em 16 anos, de cada 1.000 homens, quantos morrem a menos de câncer de próstata com o rastreamento por PSA?",
    opcoes: ["Cerca de 2", "Cerca de 50", "Cerca de 200"],
    certa: 0,
    explicacao: "Cerca de 10 com rastreamento e 12 sem: 2 em 1.000. Por isso a decisão é feita com o médico, pesando benefícios e riscos.",
    fonteIds: ["harding2020", "erspc2025"],
  },
  {
    id: "q3",
    pergunta: "Depois da próstata (e da pele), qual é o câncer mais frequente no homem brasileiro?",
    opcoes: ["Pulmão", "Intestino (cólon e reto)", "Estômago"],
    certa: 1,
    explicacao: "São cerca de 26 mil casos por ano. Desde 2026, o SUS oferece o teste de sangue oculto nas fezes a cada 2 anos, dos 50 aos 75. E com sintoma — sangue nas fezes, intestino que mudou — é consulta em qualquer idade.",
    fonteIds: ["inca2026", "fitSus2026"],
  },
  {
    id: "q4",
    pergunta: "No homem, a depressão muitas vezes aparece como…",
    opcoes: ["Só tristeza e choro", "Irritação, álcool a mais e comportamento de risco", "Ela quase não acontece em homens"],
    certa: 1,
    explicacao: "Contando esses sinais \"disfarçados\", a diferença de depressão entre homens e mulheres desaparece.",
    fonteIds: ["martin2013"],
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
    id: "q6",
    pergunta: "Qual plano tem mais chance de virar consulta marcada?",
    opcoes: ["“Vou ver isso.”", "“Se for segunda, depois do almoço, então eu ligo e marco.”", "Esperar dar vontade."],
    certa: 1,
    explicacao: "Planos se-então — com quando, onde e o quê — aumentam de forma consistente a chance de cumprir o que se planejou.",
    fonteIds: ["gollwitzer2006"],
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
    id: "q8",
    pergunta: "Tomar vitamina E para proteger a próstata…",
    opcoes: ["Protege", "Aumentou o risco num grande estudo", "É indicado para todo homem acima de 50"],
    certa: 1,
    explicacao: "No ensaio SELECT, com 35 mil homens, a vitamina E sozinha aumentou o câncer de próstata em 17%.",
    fonteIds: ["klein2011"],
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
    id: "q10",
    pergunta: "Qual destas é uma das 3 perguntas para levar à consulta?",
    opcoes: ["“Qual a chance de isso acontecer comigo?”", "“Posso tomar um remédio por conta?”", "“Precisa mesmo voltar?”"],
    certa: 0,
    explicacao: "As 3: quais são minhas opções; quais os benefícios e riscos de cada uma; qual a chance de isso acontecer comigo.",
    fonteIds: ["shepherd2011"],
  },
];
