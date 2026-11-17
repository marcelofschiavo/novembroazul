/**
 * Palestra para a Probem (/palcoprobem): versão sintetizada do palco, com o
 * logo do cliente no rodapé. Presencial em 17/11 e on-line no dia 27/11
 * (/palcoprobem?online troca "mão levantada" por "chat").
 *
 * FOCO: menos técnico e menos médico (o exame vira pincelada), mais tempo
 * nas resistências e nos medos, no silêncio dos homens e no "vale a pena,
 * e sai mais barato". Começa com o resultado esperado ("o que você leva
 * daqui") e fecha com o mesmo resultado virado compromisso.
 *
 * Os slides vêm do roteiro geral (blocos.ts) pelo id; aqui só se reescreve
 * o que muda. As regras são as mesmas: sem susto, PSA com decisão
 * compartilhada e divergência dita (na nota), fonte em todo dado, benefícios
 * genéricos, comunicação segura com CVV 188.
 */

import { BLOCOS, type Bloco, type Slide } from "./blocos";
import { KIT_PT, UI_PT, type KitPalco } from "./kit";
import { PENSAMENTOS } from "./saude";

const TODOS = BLOCOS.flatMap((b) => b.slides);

/** Um slide do roteiro geral, com o que for preciso trocar. */
function de(id: string, troca: Partial<Slide> = {}): Slide {
  const s = TODOS.find((x) => x.id === id);
  if (!s) throw new Error(`Slide ${id} não existe na palestra`);
  return { ...s, ...troca };
}

export const BLOCOS_PROBEM: Bloco[] = [
  {
    id: "abertura",
    numero: 1,
    titulo: "Abertura",
    curto: "Abertura",
    duracaoMin: 7,
    slides: [
      de("1.1"),
      de("1.2"),
      de("1.3", {
        notaApresentador:
          "Mão levantada (on-line: chat) nas duas. Leia a primeira, espere, depois a segunda. Leia a diferença com humor: 'o carro está em dia'. É o gancho da palestra inteira.",
      }),
      {
        id: "p.leva",
        tipo: "lista",
        sobre: "Em 50 minutos",
        titulo: "O que você leva daqui",
        icones: ["painel", "susto", "conversa", "agenda"],
        itens: [
          "Saber quais números do seu corpo importam",
          "Reconhecer as luzes de alerta — do corpo e da cabeça",
          "Um jeito de quebrar o silêncio, sem cobrança",
          "Sair com a sua revisão decidida",
        ],
        destaque: "No fim, a gente volta aqui — e cada um sai com um compromisso.",
        notaApresentador:
          "Este é o contrato da palestra: diga que não é aula de medicina, é sobre por que a gente adia e como destravar. Prometa voltar a este slide no fim, quando cada um vai escrever o seu compromisso.",
      },
      de("1.4", {
        numeros: [
          { valor: "6,6 anos", rotulo: "a menos de vida para o homem brasileiro", detalhe: "73,3 contra 79,9" },
          { valor: "69%", rotulo: "dos homens foram ao médico em 12 meses", detalhe: "mulheres: 82%" },
        ],
        notaApresentador:
          "Não é para assustar: é para mostrar que adiar é um padrão — e padrão se muda. Boa parte dessa diferença vem de coisas que dá para cuidar cedo.",
      }),
      de("1.5"),
      de("1.6"),
    ],
  },
  {
    id: "revisao",
    numero: 2,
    titulo: "A revisão",
    curto: "Revisão",
    duracaoMin: 8,
    slides: [
      de("2.4"),
      de("3.1"),
      de("3.1r", {
        notaApresentador: "Ponte: se não dá para esperar sentir, o que olhar? Não é check-up de tudo, todo ano — é o item certo na idade certa.",
      }),
      de("4.1", {
        destaque: "Nem tudo, todo ano: o item certo, na idade certa — e o médico ajusta ao seu caso.",
        linhas: [
          { faixa: "Desde os 18", itens: ["Pressão", "Peso e cintura", "Sono, cabeça e álcool"] },
          { faixa: "A partir dos 35", itens: ["Glicemia", "Colesterol"] },
          { faixa: "A partir dos 45–50", itens: ["Próstata: conversar com o médico", "Intestino"] },
        ],
        fonteIds: ["krogsboll2019", "diretrizHA2025", "sbd2024", "sbu", "msInca", "harding2020", "fitSus2026"],
        notaApresentador:
          "Pincelada, sem aula: cada quilometragem tem seus itens. Próstata em uma frase honesta: o exame de PSA não é consenso — a Sociedade Brasileira de Urologia recomenda conversar a partir dos 50 (45 se negro ou com pai ou irmão com a doença), e o Ministério da Saúde não indica para todo homem sem sintoma. Em 1.000 homens acompanhados por 16 anos, o exame evita cerca de 2 mortes, com riscos do outro lado (alarme falso, biópsia à toa). Por isso a decisão é sua, com o médico. Intestino: o SUS oferece o teste nas fezes dos 50 aos 75.",
      }),
      de("4.8", {
        notaApresentador:
          "Como no carro: vermelha, pare agora; laranja, vá logo; amarela, marque. Lembra do Roberto levantando à noite? É luz amarela — na maioria das vezes, coisa benigna. Irritação ou tristeza por 2 semanas também é luz do painel: é o próximo assunto. Pensamento de desistir da vida é luz vermelha: CVV 188 ou atendimento já.",
      }),
      de("4.8b"),
    ],
  },
  {
    id: "medos",
    numero: 3,
    titulo: "Os medos",
    curto: "Medos",
    duracaoMin: 9,
    slides: [
      de("4.2", {
        notaApresentador: "Não julgue a Lia: ela está preocupada. Davi sabe que deveria ir. Então por que não vai? É isso que vamos olhar agora.",
      }),
      {
        id: "p.medo",
        tipo: "frase",
        titulo: "Não é falta de informação. É medo.",
        icone: "cabeca",
        destaque: "Medo de descobrir, de ser examinado, de parecer fraco, de perder tempo. É humano — e tem resposta.",
        fonteIds: ["gomes2007", "addis2003"],
        notaApresentador:
          "Pesquisas brasileiras com os próprios homens mostram isso: medo de descobrir doença, vergonha de se expor, cuidado visto como coisa de mulher, horário que não bate com o trabalho. Pergunte: 'qual desses pesa mais pra você?' (mão levantada; on-line: chat). Ninguém precisa responder em voz alta.",
      },
      de("6.2", {
        titulo: "O que o medo diz — e a resposta",
        fonteIds: ["sweeny2010", "gomes2007", "gomes2008", "addis2003"],
        notaApresentador:
          "Os pares aparecem um a um. Não é para brigar com o medo: é para responder a ele. No da vergonha: o exame dura segundos; vergonha é fazer piada com ele. Pergunte qual a turma mais ouve.",
      }),
      {
        id: "p.conserto",
        tipo: "duasColunas",
        sobre: "Vale a pena",
        titulo: "A revisão sai mais barata que o conserto",
        colunas: [
          {
            titulo: "Revisão",
            icone: "revisao",
            tom: "aceso",
            itens: ["Uma manhã", "Consulta e exames de rotina", "Remédio de pressão e diabetes de graça na Farmácia Popular"],
          },
          {
            titulo: "Conserto",
            icone: "ampulheta",
            tom: "neutro",
            itens: ["Tratamento mais longo e mais caro", "Dias longe do trabalho e de casa", "O problema decide por você"],
          },
        ],
        destaque: "Pressão alta, diabetes e obesidade custaram R$ 3,45 bilhões ao SUS em um ano. Descobrir cedo custa pouco.",
        fonteIds: ["nilson2020", "farmaciaPopular"],
        notaApresentador:
          "É a resposta ao 'não tenho tempo' e ao 'não tenho dinheiro'. Sem susto: o ponto é que cuidar cedo é o caminho mais barato, em dinheiro, em tempo e em escolha. Pressão alta descoberta cedo se trata com remédio gratuito; descoberta tarde vira internação. O valor é de 2018 (dado do SUS), 72% dele com gente de 30 a 69 anos — a idade de quem está nesta sala.",
      },
    ],
  },
  {
    id: "silencio",
    numero: 4,
    titulo: "O silêncio dos homens",
    curto: "Silêncio",
    duracaoMin: 8,
    slides: [
      de("6.1b", {
        notaApresentador:
          "Pergunte quem já ouviu alguma dessas frases em casa (mão levantada; on-line: chat). A couraça foi aprendida cedo e já protegeu muita gente — não é para atacar, é para ver o preço. Ela protege do golpe e do cuidado também. O silêncio não é ausência de problema: é o problema sem nome.",
      }),
      de("5.1", {
        notaApresentador:
          "É o silêncio que vira outra coisa: o sinal que se vê em casa costuma ser irritação, não tristeza. Lembre do Davi explodindo por pouco. Slide também para as parceiras.",
      }),
      {
        id: "p.silencio",
        tipo: "lista",
        sobre: "Quebrar o silêncio começa pequeno",
        titulo: "Três jeitos de começar esta semana",
        icones: ["conversa", "olho", "juntos"],
        itens: [
          "Trocar o “tô bem” por uma frase verdadeira",
          "Perguntar duas vezes: “Mas e aí, tá tudo bem mesmo?”",
          "Escolher uma pessoa para a conversa difícil",
        ],
        destaque: "Relações fortes aumentam em 50% a chance de sobrevivência.",
        fonteIds: ["holtlunstad2010", "ruok"],
        notaApresentador:
          "Muito homem tem amigo pro futebol e pro churrasco; para a conversa difícil, a lista encolhe. O 'tá tudo bem mesmo?' da segunda vez é o que abre a porta: a primeira resposta quase sempre é automática. Não peça nomes: deixe a pergunta no ar.",
      },
      de("5.3"),
    ],
  },
  {
    id: "junto",
    numero: 5,
    titulo: "Eu vou junto",
    curto: "Junto",
    duracaoMin: 4,
    slides: [
      de("6.4", {
        notaApresentador:
          "Volta a Lia. A cobrança fez o Davi se fechar: quanto mais pressão, mais resistência. Davi respondeu: '...pode ser.' Mesma preocupação, outra porta. Pergunte: qual das duas você ouviria?",
      }),
      de("7.1"),
    ],
  },
  {
    id: "compromisso",
    numero: 6,
    titulo: "O compromisso",
    curto: "Compromisso",
    duracaoMin: 6,
    slides: [
      de("8.0"),
      {
        id: "p.compromisso",
        tipo: "lista",
        sobre: "O que você leva daqui",
        titulo: "Meu compromisso",
        icones: ["agenda", "painel", "conversa", "juntos"],
        itens: [
          "Esta semana: marcar a minha revisão",
          "Na consulta: sair sabendo os meus números",
          "Contar a alguém como estou de verdade",
          "Convidar uma pessoa: “Eu vou junto.”",
        ],
        destaque: "Escreva o seu: “Se for ___, então eu ___.” — no celular, agora.",
        fonteIds: ["gollwitzer2006", "pnaish2009"],
        notaApresentador:
          "Volte ao slide do começo: o que eu prometi, agora vira compromisso de cada um. Escolha um item — só um já vale. 'Vou ver isso' não vira agenda; quando, onde e o quê, sim. Exemplo: 'Se for segunda, depois do almoço, então eu ligo e marco.' Peça que escrevam no lembrete do celular agora, 30 segundos. Onde marcar: plano de saúde, UBS pelo SUS ou medicina do trabalho — confira com o RH o que a sua empresa oferece.",
      },
      de("8.4"),
      de("8.5"),
    ],
  },
  {
    id: "perguntas",
    numero: 7,
    titulo: "Perguntas",
    curto: "Perguntas",
    duracaoMin: 10,
    slides: [de("9.1")],
  },
];

/** Os quatro medos que a palestra responde (o slide mostra os quatro primeiros). */
const MEDOS_PROBEM = ["descobrir", "vergonha", "aguenta", "tempo"].map((id) => {
  const p = PENSAMENTOS.find((x) => x.id === id);
  if (!p) throw new Error(`Pensamento ${id} não existe`);
  if (id === "tempo") return { ...p, automatico: "Não tenho tempo (nem dinheiro).", resposta: "Uma consulta leva uma manhã. Descobrir tarde custa muito mais." };
  if (id === "vergonha") return { ...p, resposta: "Dura minutos e é rotina para o médico. Vergonha não protege ninguém." };
  return p;
});

const PARCEIRO = { nome: "Probem", src: "/parceiros/probem.png", largura: 737, altura: 193 };

export const KIT_PROBEM: KitPalco = {
  ...KIT_PT,
  blocos: BLOCOS_PROBEM,
  pensamentos: MEDOS_PROBEM,
  parceiro: PARCEIRO,
  ui: { ...UI_PT, pensamentosSobre: "Os medos por trás do adiamento" },
};

/** On-line (Teams): a interação é pelo chat, não pela mão levantada. */
export const KIT_PROBEM_ONLINE: KitPalco = {
  ...KIT_PROBEM,
  ui: { ...KIT_PROBEM.ui, levanteMao: "responda no chat", mitoPergunta: "mito ou verdade? · responda no chat" },
};
