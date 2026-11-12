/**
 * Kit de conteúdo do palco por idioma. Os slides não importam o roteiro
 * direto: leem o kit do contexto do palco (PalcoCtx). Assim o mesmo motor
 * serve a palestra em português (/palco, /palcocurto) e a versão italiana
 * (/palcoitaliano), cada uma com os seus dados e as suas fontes.
 *
 * O painel de configurações do apresentador fica sempre em português.
 */

import { BLOCOS, type Bloco } from "./blocos";
import { MITOS, AREAS_RODA, LUZES_NIVEIS, PENSAMENTOS, type Mito } from "./saude";
import { PERSONAGENS, type IdPersonagem } from "./historia";
import { PALESTRANTE, EVENTO } from "./palestrante";
import { fontesCurtas } from "./referencias";

export type Lingua = "pt" | "it";

export type LuzNivel = {
  id: "vermelha" | "laranja" | "amarela";
  nome: string;
  acao: string;
  quando: string;
  intensidade: number;
  sinais: readonly { texto: string; icone: string }[];
};

export type Pensamento = { id: string; automatico: string; resposta: string };
export type Lugar = { icone: "plano" | "ubs" | "trabalho" | "empresa"; titulo: string; texto: string };

/** Textos fixos dos componentes do palco (o que não vem do roteiro). */
export type TextosPalco = {
  marca: string;
  campanhaPilula: string;
  aviso: string;
  ajudaRodape: string;
  ajudaAgora: { antes: string; forte: string; depois: string };
  h1: string;
  slide: string;
  de: string;
  gireTitulo: string;
  gireTexto: string;
  gireBotao: string;
  fonte: string;
  fontes: string;
  levanteMao: string;
  fotoDe: string;
  historiaDe: string;
  etapaHistoria: string;
  etapas: [string, string, string];
  aviso15: string;
  painelSobre: string;
  mostradores: { nome: string; alvo: string; unidade: string }[];
  painelDestaque: string;
  rodaSobre: string;
  rodaNota: string;
  rodaAria: string;
  mitoPergunta: string;
  mito: string;
  verdade: string;
  manual: string;
  pensamentosSobre: string;
  exercicioSobre: string;
  comecar: string;
  segundos: string;
  abraOsOlhos: string;
  seEntaoSobre: string;
  seEntao: [string, string, string];
  lugares: Lugar[];
  qrTitulo: string;
  psa: {
    sem: string;
    com: string;
    titulo: string;
    legenda: string;
    emMil: string;
    menos: string;
    geral: string;
    outroLado: string;
    riscos: string[];
    toque: string;
  };
  intensidade: string;
  couracaDiz: string;
  aneis: [string, string, string];
  voce: string;
};

export type KitPalco = {
  lingua: Lingua;
  blocos: Bloco[];
  mitos: readonly Mito[];
  areasRoda: readonly { id: string; nome: string }[];
  luzes: readonly LuzNivel[];
  pensamentos: readonly Pensamento[];
  personagens: Record<IdPersonagem, { nome: string; descricao: string; inicial: string }>;
  bioCurta: readonly string[];
  registro: string;
  /** Endereço da trilha para o QR do fecho. null = sem trilha nesse idioma. */
  trilhaUrl: string | null;
  fontesCurtas: (ids: string[]) => string;
  ui: TextosPalco;
};

export const UI_PT: TextosPalco = {
  marca: "Por inteiro · Novembro Azul",
  campanhaPilula: "Novembro Azul · saúde do homem",
  aviso: "Conteúdo educativo · não substitui consulta",
  ajudaRodape: "CVV 188 · 24h",
  ajudaAgora: { antes: "Para conversar agora: ", forte: "CVV 188", depois: ", 24 horas, gratuito." },
  h1: "Por inteiro — Novembro Azul, palestra com Marcelo Schiavo. Conteúdo educativo. CVV 188, 24 horas.",
  slide: "Slide",
  de: "de",
  gireTitulo: "Gire o celular para ver a palestra",
  gireTexto: "Ela foi feita para tela deitada, como a de uma TV ou projetor.",
  gireBotao: "Ver assim mesmo",
  fonte: "fonte",
  fontes: "fontes",
  levanteMao: "levante a mão",
  fotoDe: "Foto de",
  historiaDe: "A história do Davi",
  etapaHistoria: "Etapa da história",
  etapas: ["Início", "Meio", "Fim"],
  aviso15: "Personagens fictícios, compostos de situações comuns. Ilustrações geradas por IA.",
  painelSobre: "O painel",
  mostradores: [
    { nome: "Pressão", alvo: "abaixo de 12 por 8", unidade: "mmHg" },
    { nome: "Cintura", alvo: "abaixo de 94 cm", unidade: "na altura do umbigo" },
    { nome: "Glicemia", alvo: "abaixo de 100 em jejum", unidade: "mg/dL" },
    { nome: "Colesterol", alvo: "a meta depende do seu risco", unidade: "o médico define" },
  ],
  painelDestaque: "Não sabe os seus? É o primeiro item da próxima consulta.",
  rodaSobre: "Alinhamento e balanceamento",
  rodaNota: "Ferramenta de reflexão, não é teste. Na trilha, vira o seu gráfico.",
  rodaAria: "Roda da Saúde",
  mitoPergunta: "mito ou verdade? · levante a mão",
  mito: "Mito",
  verdade: "Verdade",
  manual: "O manual do proprietário",
  pensamentosSobre: "Pensamentos automáticos",
  exercicioSobre: "Exercício · 1 minuto",
  comecar: "Começar",
  segundos: "segundos",
  abraOsOlhos: "pode abrir os olhos",
  seEntaoSobre: "De volta à oficina",
  seEntao: ["Se for ", ", então eu ", "."],
  lugares: [
    { icone: "plano", titulo: "Plano de saúde", texto: "clínico ou urologista" },
    { icone: "ubs", titulo: "UBS, pelo SUS", texto: "porta de entrada do homem" },
    { icone: "trabalho", titulo: "Medicina do trabalho", texto: "o exame periódico" },
    { icone: "empresa", titulo: "Programas da empresa", texto: "se houver" },
  ],
  qrTitulo: "QR code para abrir a trilha",
  psa: {
    sem: "Sem o exame",
    com: "Com o exame",
    titulo: "O que o PSA ajuda",
    legenda: "Mortes por câncer de próstata, em 1.000 homens:",
    emMil: "em 1.000",
    menos: "2 mortes a menos em 1.000",
    geral: "Mortes por qualquer causa: sem diferença.",
    outroLado: "O outro lado",
    riscos: ["Alarme falso e biópsia à toa", "Tratar câncer que não faria mal", "Efeitos no xixi e na ereção"],
    toque: "E o toque retal?",
  },
  intensidade: "intensidade",
  couracaDiz: "O que a couraça diz",
  aneis: ["Casa", "Trabalho", "Amigos"],
  voce: "Você",
};

export const KIT_PT: KitPalco = {
  lingua: "pt",
  blocos: BLOCOS,
  mitos: MITOS,
  areasRoda: AREAS_RODA,
  luzes: LUZES_NIVEIS,
  pensamentos: PENSAMENTOS,
  personagens: PERSONAGENS,
  bioCurta: PALESTRANTE.bioCurta,
  registro: PALESTRANTE.crp,
  trilhaUrl: `${EVENTO.url}/trilha`,
  fontesCurtas,
  ui: UI_PT,
};
