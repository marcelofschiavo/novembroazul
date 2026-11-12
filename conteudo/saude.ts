/**
 * O conteúdo de saúde que palco e trilha compartilham: os mitos, as áreas da
 * Roda da Saúde, as faixas dos números do painel e as luzes de alerta.
 * Cada faixa e cada afirmação apontam para uma referência (referencias.ts).
 */

/* ---------------- mito ou verdade ---------------- */

export type Mito = { id: string; afirmacao: string; resposta: "mito" | "verdade"; comentario: string; fonteIds: string[] };

export const MITOS: Mito[] = [
  {
    id: "m1",
    afirmacao: "Se eu não sinto nada, está tudo bem.",
    resposta: "mito",
    comentario: "No começo, o câncer de próstata e a pressão alta costumam não dar sintoma nenhum. É por isso que existem os números do painel.",
    fonteIds: ["inca2026", "malta2018"],
  },
  {
    id: "m2",
    afirmacao: "PSA alto quer dizer câncer.",
    resposta: "mito",
    comentario: "Aumento benigno da próstata, inflamação e outras situações também elevam o PSA. Ele é ponto de partida para conversar com o médico — não é diagnóstico.",
    fonteIds: ["msInca", "sbu"],
  },
  {
    id: "m3",
    afirmacao: "Vitamina e suplemento protegem a próstata.",
    resposta: "mito",
    comentario: "No maior estudo sobre isso, com 35 mil homens, a vitamina E aumentou o câncer de próstata em 17%. Suplemento não é prevenção.",
    fonteIds: ["klein2011"],
  },
  {
    id: "m4",
    afirmacao: "Check-up completo, todo ano, é o que salva.",
    resposta: "mito",
    comentario: "Exame de tudo para todo mundo não reduziu mortes em 233 mil pessoas. O que funciona é o exame certo, na idade certa, para quem precisa.",
    fonteIds: ["krogsboll2019"],
  },
];

export function mitoPorId(id: string): Mito | undefined {
  return MITOS.find((m) => m.id === id);
}

/* ---------------- Roda da Saúde ---------------- */

/** Adaptação da Roda da Vida para a saúde do homem: ferramenta de reflexão, não teste. */
/**
 * niveis: o que a nota costuma querer dizer, por faixa — 0–3, 4–6, 7–8, 9–10.
 * Só para orientar a autoavaliação; não é escala validada nem diagnóstico.
 */
export const AREAS_RODA = [
  {
    id: "corpo",
    nome: "Corpo em movimento",
    dica: "atividade física e alimentação",
    niveis: [
      "Quase não me mexo; como o que dá.",
      "Me mexo de vez em quando; a alimentação oscila.",
      "Me mexo quase toda semana e como razoavelmente bem.",
      "Atividade física é rotina e a alimentação está em dia.",
    ],
  },
  {
    id: "sono",
    nome: "Sono e energia",
    dica: "dormir 7 horas ou mais e acordar descansado",
    niveis: [
      "Durmo pouco ou mal quase toda noite e acordo cansado.",
      "Umas noites boas, outras ruins; o cansaço aparece.",
      "Durmo bem na maioria das noites.",
      "Durmo 7 horas ou mais e acordo descansado.",
    ],
  },
  {
    id: "habitos",
    nome: "Hábitos",
    dica: "álcool, cigarro, telas",
    niveis: [
      "Álcool, cigarro ou telas estão passando do ponto.",
      "Exagero de vez em quando — e percebo.",
      "Uso com moderação, quase sempre sob controle.",
      "Esses hábitos não pesam na minha saúde hoje.",
    ],
  },
  {
    id: "prevencao",
    nome: "Prevenção",
    dica: "consultas e exames em dia, pressão medida",
    niveis: [
      "Não lembro da última consulta nem sei os meus números.",
      "Fui ao médico há um tempo; sei parte dos números.",
      "Consulta no último ano e pressão medida.",
      "Consultas e exames em dia, e sei os meus números.",
    ],
  },
  {
    id: "cabeca",
    nome: "Cabeça e emoções",
    dica: "estresse, humor, irritação",
    niveis: [
      "Estresse, irritação ou desânimo pesam quase todo dia — vale conversar com alguém.",
      "Dias bons e ruins; às vezes explodo ou travo.",
      "Dou conta da maior parte do estresse.",
      "Me sinto bem e sei pedir ajuda quando preciso.",
    ],
  },
  {
    id: "familia",
    nome: "Família e parceria",
    dica: "presença e conversa em casa",
    niveis: [
      "Pouca presença ou muito atrito em casa.",
      "Estou por perto, mas a conversa é pouca.",
      "Presença e conversa na maior parte do tempo.",
      "Estou presente e consigo conversar sobre o que importa.",
    ],
  },
  {
    id: "amizades",
    nome: "Amizades e lazer",
    dica: "um time para a conversa difícil",
    niveis: [
      "Quase não vejo amigos e não teria com quem desabafar.",
      "Tenho amigos para o lazer, não para a conversa difícil.",
      "Tenho com quem contar e encontro de vez em quando.",
      "Tenho um time para a conversa difícil e tempo de lazer.",
    ],
  },
  {
    id: "trabalho",
    nome: "Trabalho e propósito",
    dica: "sentido, ritmo e dinheiro",
    niveis: [
      "O trabalho pesa: falta sentido, o ritmo é puxado ou o dinheiro aperta.",
      "Dá para levar, mas falta sentido ou sobra cansaço.",
      "Gosto do que faço na maior parte dos dias.",
      "Trabalho com sentido, num ritmo que dá para sustentar.",
    ],
  },
] as const;

export type IdArea = (typeof AREAS_RODA)[number]["id"];

/** Faixa da nota da Roda: 0–3, 4–6, 7–8, 9–10. */
export function comentarioNota(area: (typeof AREAS_RODA)[number], nota: number): string {
  const i = nota <= 3 ? 0 : nota <= 6 ? 1 : nota <= 8 ? 2 : 3;
  return area.niveis[i];
}

/* ---------------- números do painel ---------------- */

export type Faixa = { ate: number | null; rotulo: string; tom: "ok" | "atencao" | "alerta"; texto: string };

/**
 * Pressão: Diretriz Brasileira de Hipertensão 2025. A classificação usa a
 * pior das duas (sistólica ou diastólica). Diagnóstico só com mais de uma medida.
 */
export function classificarPressao(pas: number, pad: number): Faixa {
  if (pas >= 140 || pad >= 90)
    return { ate: null, rotulo: "Faixa de hipertensão", tom: "alerta", texto: "14 por 9 ou mais. Uma medida isolada não fecha diagnóstico, mas pede consulta logo — e medir de novo em outro dia." };
  if (pas >= 120 || pad >= 80)
    return { ate: null, rotulo: "Pré-hipertensão", tom: "atencao", texto: "Pela diretriz de 2025, de 12 por 8 até 13,9 por 8,9 já é pré-hipertensão: hora de mexer nos hábitos e acompanhar com o médico." };
  return { ate: null, rotulo: "Normal", tom: "ok", texto: "Abaixo de 12 por 8. Continue medindo pelo menos uma vez por ano." };
}

/** Cintura (homens): OMS — risco aumentado a partir de 94 cm, muito aumentado a partir de 102 cm. */
export function classificarCintura(cm: number): Faixa {
  if (cm >= 102) return { ate: null, rotulo: "Risco muito aumentado", tom: "alerta", texto: "102 cm ou mais: a gordura da barriga pesa no coração e no açúcar do sangue. Vale conversar com o médico." };
  if (cm >= 94) return { ate: null, rotulo: "Risco aumentado", tom: "atencao", texto: "De 94 a 101 cm: sinal amarelo. Pequenas mudanças já fazem diferença." };
  return { ate: null, rotulo: "Faixa saudável", tom: "ok", texto: "Abaixo de 94 cm." };
}

/** Glicemia de jejum (mg/dL): Sociedade Brasileira de Diabetes. */
export function classificarGlicemia(mg: number): Faixa {
  if (mg >= 126) return { ate: null, rotulo: "Faixa de diabetes", tom: "alerta", texto: "126 ou mais em jejum. Precisa ser confirmado com o médico — procure logo." };
  if (mg >= 100) return { ate: null, rotulo: "Pré-diabetes", tom: "atencao", texto: "De 100 a 125: sinal amarelo. Nessa fase, hábitos ainda mudam o rumo." };
  return { ate: null, rotulo: "Normal", tom: "ok", texto: "Abaixo de 100 em jejum." };
}

/* ---------------- luzes de alerta ---------------- */

export const LUZES = [
  { id: "sangue", texto: "Sangue na urina ou nas fezes", icone: "gota" },
  { id: "urina", texto: "Levantar várias vezes à noite para urinar, jato fraco", icone: "noite" },
  { id: "peito", texto: "Dor no peito ou falta de ar no esforço", icone: "coracao" },
  { id: "ronco", texto: "Ronco com pausas e sono que não descansa", icone: "lua" },
  { id: "erecao", texto: "Dificuldade de ereção — sinal dos vasos", icone: "raio" },
  { id: "humor", texto: "Irritação, tristeza ou álcool a mais por mais de 2 semanas", icone: "nuvem" },
] as const;

/**
 * Luzes por intensidade (palco curto): como no painel do carro, a cor diz
 * quanto tempo dá para esperar. Só os sinais principais. A cor nunca vem
 * sozinha: nome da luz, ação e barras de intensidade vão junto.
 */
export const LUZES_NIVEIS = [
  {
    id: "vermelha",
    nome: "Luz vermelha",
    acao: "Atendimento já",
    quando: "pronto-socorro · SAMU 192",
    intensidade: 3,
    sinais: [
      { texto: "Dor no peito", icone: "coracao" },
      { texto: "Falta de ar súbita", icone: "vento" },
    ],
  },
  {
    id: "laranja",
    nome: "Luz laranja",
    acao: "Consulta logo",
    quando: "nos próximos dias",
    intensidade: 2,
    sinais: [{ texto: "Sangue na urina ou nas fezes", icone: "gota" }],
  },
  {
    id: "amarela",
    nome: "Luz amarela",
    acao: "Marque consulta",
    quando: "nas próximas semanas",
    intensidade: 1,
    sinais: [
      { texto: "Urinar à noite", icone: "noite" },
      { texto: "Ronco com pausas", icone: "lua" },
      { texto: "Tristeza ou irritação por 2 semanas", icone: "nuvem" },
    ],
  },
] as const;

/* ---------------- pensamentos automáticos ---------------- */

export const PENSAMENTOS = [
  { id: "passa", automatico: "Isso passa sozinho.", resposta: "Se passar, ótimo. Se não passar, eu já vou estar cuidando." },
  { id: "comigo", automatico: "Comigo não acontece.", resposta: "Todo mundo acha isso. Tem até nome: viés do otimismo." },
  { id: "aguenta", automatico: "Homem aguenta.", resposta: "Aguentar não é cuidar. Manutenção não é fraqueza." },
  { id: "descobrir", automatico: "Se eu não for, não descubro nada ruim.", resposta: "Não saber não muda o que está lá. Só tira a chance de agir cedo." },
  { id: "tempo", automatico: "Não tenho tempo.", resposta: "Uma consulta leva uma manhã. Um problema descoberto tarde leva muito mais." },
  { id: "vergonha", automatico: "Que vergonha esse exame.", resposta: "O exame dura minutos e é rotina para o médico. Vergonha não protege ninguém." },
] as const;
