/**
 * O roteiro do palco — fonte da verdade da sequência de slides.
 *
 * FORMATO: presencial, 50 min (40 de fala + até 10 de perguntas, podendo ir a
 * 1h). Interação pela mão levantada — ninguém precisa de celular. Também roda
 * on-line (Meet/Teams): troque "mão levantada" por "responda no chat".
 *
 * METÁFORA ÚNICA — o manual do proprietário: o painel (seus números), as luzes
 * de alerta, a revisão por quilometragem, o motorista (a cabeça), o
 * alinhamento (a Roda da Saúde) e a volta à oficina (o plano).
 *
 * HISTÓRIA: Davi (36), o pai Roberto (61) e Lia, companheira do Davi.
 * Fictícios. Início → meio → fim espalhados pelos blocos (ver historia.ts).
 *
 * REGRAS: sem susto (medo só com caminho de ação), sem piada com o exame,
 * números absolutos ("2 em 1.000"), fonte visível em todo dado, benefícios
 * genéricos ("confira com o RH"), CVV 188 no rodapé.
 */

import type { IdPersonagem } from "./historia";

export type TipoSlide =
  | "capa"
  | "palestrante"
  | "pergunta"
  | "numeros"
  | "historia"
  | "frase"
  | "painel"
  | "pressao"
  | "roda"
  | "mito"
  | "mitoRevelado"
  | "quilometragem"
  | "caixaFatos"
  | "duasColunas"
  | "lista"
  | "passos"
  | "luzes"
  | "pensamentos"
  | "reescrita"
  | "caminhos"
  | "exercicio"
  | "seEntao"
  | "ondeIr"
  | "fecho"
  | "perguntas";

export type Fala = { quem: IdPersonagem; texto: string };

export type Slide = {
  id: string;
  tipo: TipoSlide;
  /** Rótulo pequeno acima do título. */
  sobre?: string;
  titulo?: string;
  destaque?: string;
  itens?: string[];
  fonteIds?: string[];
  notaApresentador?: string;

  /** pergunta: a segunda pergunta aparece depois de um tempo. */
  segunda?: string;
  numeros?: { valor: string; rotulo: string; detalhe?: string }[];
  historia?: { capitulo: "inicio" | "meio" | "fim"; quando: string; cena: string; falas?: Fala[]; desfecho?: string };
  colunas?: { titulo: string; itens: string[]; tom?: "neutro" | "aceso" }[];
  passos?: { titulo: string; texto?: string }[];
  linhas?: { faixa: string; itens: string[] }[];
  mitoId?: string;
  ruim?: string;
  boa?: string;
  caminhos?: { rotulo: string; fala: string; resultado: string; tom: "apagado" | "aceso" }[];
  instrucao?: string;
  duracaoSeg?: number;
  exemplos?: string[];
  url?: string;
};

export type Bloco = {
  id: string;
  numero: number;
  titulo: string;
  /** Nome curto para a barra de blocos no topo do palco. */
  curto: string;
  duracaoMin: number;
  slides: Slide[];
};

export const BLOCOS: Bloco[] = [
  {
    id: "abertura",
    numero: 1,
    titulo: "Abertura",
    curto: "Abertura",
    duracaoMin: 5,
    slides: [
      {
        id: "1.1",
        tipo: "capa",
        titulo: "Por inteiro.",
        destaque: "Novembro Azul · saúde do homem, do check-up à conversa",
        notaApresentador: "Deixe a capa no ar enquanto a turma senta. A roda torta é o símbolo da palestra: vai voltar.",
      },
      {
        id: "1.2",
        tipo: "palestrante",
        notaApresentador: "30 s. Psicólogo, não médico — e é justamente por isso: a pergunta de hoje não é sobre o exame, é sobre por que a gente adia.",
      },
      {
        id: "1.3",
        tipo: "pergunta",
        titulo: "Quem aqui sabe quando vence a revisão do carro?",
        segunda: "E quem lembra quando foi a última consulta?",
        notaApresentador: "Mão levantada nas duas. Leia a diferença em voz alta, com humor: 'o carro está em dia'. Esse é o gancho da palestra inteira.",
      },
      {
        id: "1.4",
        tipo: "numeros",
        titulo: "Não é impressão.",
        numeros: [
          { valor: "69%", rotulo: "dos homens foram ao médico em 12 meses", detalhe: "mulheres: 82%" },
          { valor: "6,6 anos", rotulo: "a menos de vida para o homem brasileiro", detalhe: "73,3 contra 79,9 anos" },
        ],
        fonteIds: ["pns2019", "ibge2024"],
        notaApresentador: "Não é para assustar: é para mostrar que adiar é um padrão, não um defeito pessoal. E que padrão se muda.",
      },
      {
        id: "1.5",
        tipo: "historia",
        historia: {
          capitulo: "inicio",
          quando: "Segunda-feira, 7h40",
          cena: "Davi agenda a revisão de 40 mil km do carro pelo celular. Na mesma tela, aparece um lembrete de dois anos atrás: “consulta de rotina — remarcar?”. Ele arrasta pro lado.",
          falas: [{ quem: "davi", texto: "Depois eu vejo." }],
        },
        notaApresentador: "Personagens fictícios. Pergunte: 'alguém aqui conhece um Davi?' — risos costumam vir. Não precisa de resposta.",
      },
      {
        id: "1.6",
        tipo: "historia",
        historia: {
          capitulo: "inicio",
          quando: "Domingo, almoço na casa do pai",
          cena: "Roberto levanta duas vezes da mesa para ir ao banheiro. Faz meses que levanta também à noite.",
          falas: [{ quem: "roberto", texto: "Isso é da idade. Homem não fica correndo pra médico." }],
        },
        notaApresentador: "Guarde o Roberto: ele volta nas luzes de alerta e no fim.",
      },
    ],
  },
  {
    id: "painel",
    numero: 2,
    titulo: "O painel",
    curto: "Painel",
    duracaoMin: 6,
    slides: [
      {
        id: "2.1",
        tipo: "frase",
        titulo: "O corpo também tem painel.",
        destaque: "A maioria só olha quando a luz acende.",
        fonteIds: ["engel1977"],
        notaApresentador: "Saúde por inteiro: corpo, cabeça e as pessoas em volta adoecem e melhoram juntos.",
      },
      {
        id: "2.2",
        tipo: "painel",
        titulo: "Quatro números que todo homem deveria saber",
        fonteIds: ["diretrizHA2025", "omsCintura", "sbd2024", "lloydjones2022"],
        notaApresentador: "Mão levantada: 'quem sabe a própria pressão?'. Depois: 'e a cintura?'. Ninguém precisa saber todos — a trilha ajuda a anotar.",
      },
      {
        id: "2.3",
        tipo: "pressao",
        titulo: "12 por 8 não é mais normal.",
        destaque: "Pressão alta quase nunca avisa. Parte dos brasileiros tem e não sabe — só se descobre medindo.",
        fonteIds: ["diretrizHA2025", "malta2018", "vigitel2024"],
        notaApresentador: "Novidade da diretriz brasileira de 2025. Quase 3 em cada 10 adultos das capitais referem pressão alta (Vigitel). Diagnóstico só com mais de uma medida.",
      },
      {
        id: "2.4",
        tipo: "roda",
        titulo: "Alinhamento: como está a sua roda?",
        instrucao: "Dê uma nota de 0 a 10, de cabeça, para cada área. Onde a sua roda está torta?",
        notaApresentador: "1 minuto em silêncio. Não é a nota mais baixa que importa: é a roda girar torta. Diga que a Roda é ferramenta de reflexão, não teste — e que na trilha ela vira um gráfico.",
      },
    ],
  },
  {
    id: "mitos",
    numero: 3,
    titulo: "Mito ou verdade",
    curto: "Mitos",
    duracaoMin: 4,
    slides: [
      { id: "3.1", tipo: "mito", mitoId: "m1" },
      { id: "3.1r", tipo: "mitoRevelado", mitoId: "m1" },
      { id: "3.2", tipo: "mito", mitoId: "m2" },
      { id: "3.2r", tipo: "mitoRevelado", mitoId: "m2" },
      { id: "3.3", tipo: "mito", mitoId: "m3", notaApresentador: "Esse costuma surpreender: deixe a turma votar antes de virar." },
      { id: "3.3r", tipo: "mitoRevelado", mitoId: "m3" },
      { id: "3.4", tipo: "mito", mitoId: "m4" },
      { id: "3.4r", tipo: "mitoRevelado", mitoId: "m4", notaApresentador: "Ponte para o próximo bloco: se não é check-up de tudo, então o que é?" },
    ],
  },
  {
    id: "revisao",
    numero: 4,
    titulo: "Revisão por quilometragem",
    curto: "Revisão",
    duracaoMin: 10,
    slides: [
      {
        id: "4.1",
        tipo: "quilometragem",
        titulo: "Revisão por quilometragem",
        destaque: "Nem tudo, todo ano. O item certo, na idade certa — e o médico ajusta ao seu caso.",
        linhas: [
          { faixa: "Desde os 18", itens: ["Pressão em toda consulta", "Cintura e peso", "Sono, cabeça e álcool", "Vacinas em dia"] },
          { faixa: "A partir dos 35", itens: ["Glicemia e colesterol", "O médico define de quanto em quanto tempo"] },
          { faixa: "A partir dos 45–50", itens: ["Próstata: conversar sobre o PSA", "Intestino: conversar sobre o rastreamento"] },
        ],
        fonteIds: ["krogsboll2019", "diretrizHA2025", "sbd2024", "sbu"],
        notaApresentador: "A montadora não troca todas as peças em toda revisão. Cada quilometragem tem seus itens. Próstata a partir dos 50 — ou 45 se negro ou com pai ou irmão com a doença.",
      },
      {
        id: "4.2",
        tipo: "historia",
        historia: {
          capitulo: "meio",
          quando: "Três semanas depois",
          cena: "Davi anda exausto, ronca, dorme mal e explode por pouco. Lia perde a paciência.",
          falas: [
            { quem: "lia", texto: "Você PRECISA ir ao médico!" },
            { quem: "davi", texto: "Eu tô ótimo." },
          ],
          desfecho: "E adia mais um pouco.",
        },
        notaApresentador: "Não julgue a Lia: ela está preocupada. Só registre que a cobrança fez o Davi se fechar. Vamos entender por quê no bloco 6.",
      },
      {
        id: "4.3",
        tipo: "caixaFatos",
        titulo: "Próstata: o que 1.000 homens mostram",
        destaque: "Em 16 anos: 2 mortes a menos em cada 1.000. Do outro lado, biópsias de quem não tinha câncer e tratamento de câncer que não faria mal.",
        fonteIds: ["harding2020", "erspc2025", "hoffrage2000"],
        notaApresentador: "Números absolutos, sempre. Não é argumento contra nem a favor do exame: é o que se coloca na balança para decidir com o médico. O ensaio europeu, com 23 anos, mostra 1 morte evitada a cada 456 homens convidados.",
      },
      {
        id: "4.4",
        tipo: "duasColunas",
        titulo: "Então: faço ou não faço o PSA?",
        colunas: [
          { titulo: "Sociedade Brasileira de Urologia", itens: ["Converse com o urologista a partir dos 50", "A partir dos 45 se você é negro ou tem pai ou irmão com a doença"], tom: "aceso" },
          { titulo: "Ministério da Saúde e INCA", itens: ["Não fazer em massa em quem não tem sintomas", "Investigar sempre quem tem sinais"], tom: "aceso" },
        ],
        destaque: "Os dois concordam no essencial: a decisão é sua, com o médico, sabendo os prós e os contras.",
        fonteIds: ["sbu", "msInca", "modesto2018"],
        notaApresentador: "Honestidade: as instituições divergem. Pesquisadores brasileiros falam de um 'novembro não tão azul' quando a campanha vira só PSA. Por isso hoje a conversa é por inteiro.",
      },
      {
        id: "4.5",
        tipo: "lista",
        titulo: "E o toque retal?",
        itens: [
          "Sozinho, ele acerta cerca de metade dos casos",
          "Em vários países, o caminho hoje é PSA, depois ressonância, e biópsia só se precisar",
          "No Brasil, o urologista pode associar PSA e toque — quem decide os exames é ele, com você",
          "O exame dura segundos. Quem deveria sentir vergonha é quem faz piada",
        ],
        fonteIds: ["naji2018", "hugosson2022", "gomes2008"],
        notaApresentador: "Tire o fantasma sem desautorizar ninguém. Pesquisa brasileira mostra o toque visto como 'arranhadura na masculinidade' — e essa é a barreira, não o exame.",
      },
      {
        id: "4.6",
        tipo: "passos",
        titulo: "Leve 3 perguntas para a consulta",
        passos: [
          { titulo: "Quais são as minhas opções?" },
          { titulo: "Quais os benefícios e os riscos de cada uma?" },
          { titulo: "Qual a chance de isso acontecer comigo?" },
        ],
        destaque: "Testadas em estudo: com elas, o médico explica melhor.",
        fonteIds: ["shepherd2011"],
        notaApresentador: "Peça para a turma repetir a terceira em voz alta. Ela está no cartão de bolso e na trilha.",
      },
      {
        id: "4.7",
        tipo: "numeros",
        titulo: "O 2º câncer do homem não é o que você pensa.",
        numeros: [
          { valor: "78 mil", rotulo: "casos de próstata por ano", detalhe: "o 1º do homem" },
          { valor: "26 mil", rotulo: "casos de intestino por ano", detalhe: "o 2º do homem" },
        ],
        destaque: "Sangue nas fezes ou intestino que mudou e não volta ao normal: consulta, em qualquer idade.",
        fonteIds: ["inca2026"],
        notaApresentador: "Quase nunca se fala do intestino no Novembro Azul. Sem detalhar exame: a mensagem é a luz de alerta.",
      },
      {
        id: "4.8",
        tipo: "luzes",
        titulo: "Luzes de alerta: não espere a revisão",
        destaque: "Luz acesa não é sentença — quase sempre é algo tratável. Mas pede consulta.",
        fonteIds: ["inman2009", "tufik2010", "martin2013"],
        notaApresentador: "Lembra do Roberto levantando à noite? Na maioria das vezes é aumento benigno da próstata — mas é luz do painel. Ronco com pausas: apneia é comum em homens (estudo de São Paulo). Ereção: sinal dos vasos, conte ao médico.",
      },
    ],
  },
  {
    id: "motorista",
    numero: 5,
    titulo: "O motorista",
    curto: "Motorista",
    duracaoMin: 5,
    slides: [
      {
        id: "5.1",
        tipo: "duasColunas",
        sobre: "O motorista também precisa de revisão",
        titulo: "No homem, a depressão costuma vir disfarçada",
        colunas: [
          { titulo: "O que a gente espera ver", itens: ["Tristeza", "Choro", "Desânimo"], tom: "neutro" },
          { titulo: "O que muitas vezes aparece", itens: ["Irritação e explosões", "Álcool a mais", "Risco e velocidade", "Trabalho sem parar", "Sumir dos amigos"], tom: "aceso" },
        ],
        destaque: "Contando esses sinais, a diferença de depressão entre homens e mulheres desaparece.",
        fonteIds: ["martin2013", "brito2022"],
        notaApresentador: "Esse é o slide para as parceiras também: o sinal que se vê em casa costuma ser irritação, não tristeza. Lembre do Davi explodindo por pouco.",
      },
      {
        id: "5.2",
        tipo: "numeros",
        titulo: "Amizade também é saúde.",
        numeros: [
          { valor: "+50%", rotulo: "de chance de sobrevivência com relações fortes" },
          { valor: "1 em 6", rotulo: "pessoas no mundo vive com solidão" },
        ],
        destaque: "Quem é o seu time para a conversa difícil?",
        fonteIds: ["holtlunstad2010", "oms2025"],
        notaApresentador: "Muito homem tem amigo pro futebol e pro churrasco. Para a conversa difícil, a lista encolhe. Não peça resposta: deixe a pergunta no ar.",
      },
      {
        id: "5.3",
        tipo: "frase",
        titulo: "Pedir ajuda cedo é manutenção.",
        destaque: "No Brasil, homens morrem por suicídio cerca de quatro vezes mais que mulheres. Conversar ajuda — CVV 188, 24 horas, também para quem só precisa falar.",
        fonteIds: ["palma2021", "cvv"],
        notaApresentador: "Tom calmo, sem detalhe. Comunicação segura: nunca método, nunca caso. Diga que você fica depois para quem quiser conversar.",
      },
    ],
  },
  {
    id: "adiar",
    numero: 6,
    titulo: "Por que a gente adia",
    curto: "Adiar",
    duracaoMin: 6,
    slides: [
      {
        id: "6.1",
        tipo: "frase",
        titulo: "Não é falta de informação.",
        destaque: "É a cabeça tentando proteger a gente — e atrapalhando.",
        fonteIds: ["addis2003", "gomes2007"],
        notaApresentador: "Aqui entra a TCC: pensamentos automáticos. Eles parecem verdade porque chegam rápido.",
      },
      {
        id: "6.2",
        tipo: "pensamentos",
        titulo: "O que a cabeça diz — e o que dá pra responder",
        fonteIds: ["weinstein1980", "sweeny2010", "addis2003", "schraiber2010"],
        notaApresentador: "Os pares aparecem um a um. Pergunte qual deles a turma mais ouve (mão levantada). Não é para brigar com o pensamento: é para responder a ele.",
      },
      {
        id: "6.3",
        tipo: "duasColunas",
        titulo: "Por que o susto e a cobrança não funcionam",
        colunas: [
          { titulo: "Susto sem caminho", itens: ["A pessoa trava", "Evita o assunto", "Adia mais"], tom: "neutro" },
          { titulo: "Cobrança: “você PRECISA”", itens: ["Soa como ordem", "Ativa a resistência", "Vira briga, não consulta"], tom: "neutro" },
        ],
        destaque: "O que funciona: um caminho claro e um convite.",
        fonteIds: ["tannenbaum2015", "rains2013"],
        notaApresentador: "Por isso esta palestra não usa foto de doença nem 'faça senão'. Reatância: quanto mais pressão, mais resistência.",
      },
      {
        id: "6.4",
        tipo: "reescrita",
        sobre: "Lia, na semana seguinte",
        ruim: "Você PRECISA ir ao médico!",
        boa: "Tô te achando cansado. Quer que a gente veja isso junto?",
        notaApresentador: "Davi respondeu: '...pode ser.' Mesma preocupação, outra porta. Pergunte: qual das duas você ouviria?",
      },
    ],
  },
  {
    id: "junto",
    numero: 7,
    titulo: "Eu vou junto",
    curto: "Junto",
    duracaoMin: 4,
    slides: [
      {
        id: "7.1",
        tipo: "caminhos",
        sobre: "Davi e o pai, no domingo seguinte",
        titulo: "Dois jeitos de terminar o almoço",
        caminhos: [
          { rotulo: "Caminho 1", fala: "Você que sabe, pai.", resultado: "Roberto muda de assunto. A conversa morre ali.", tom: "apagado" },
          { rotulo: "Caminho 2", fala: "Pai, marquei pra nós dois. Eu vou junto.", resultado: "Roberto resmunga… e aceita: “Só se você for também.”", tom: "aceso" },
        ],
        notaApresentador: "O 'você que sabe' parece respeito, mas fecha a porta. O 'eu vou junto' tira o peso de ir sozinho — e o Davi acaba indo também.",
      },
      {
        id: "7.2",
        tipo: "passos",
        titulo: "P.O.I.S. — para convidar sem cobrar",
        passos: [
          { titulo: "Pergunte", texto: "“Tô te achando cansado. Como você tá?”" },
          { titulo: "Ouça", texto: "Sem consertar, sem sermão." },
          { titulo: "Incentive", texto: "Um passo pequeno: “que tal marcar?”" },
          { titulo: "Siga junto", texto: "Ofereça ir. Volte a perguntar na semana que vem." },
        ],
        fonteIds: ["ruok"],
        notaApresentador: "Adaptado do modelo ALEC (R U OK? e Movember). É modelo de prática, não fórmula mágica. Vale para pai, amigo, colega de turno.",
      },
      {
        id: "7.3",
        tipo: "lista",
        sobre: "Para quem cuida dele — parceiras, filhas, mães, amigos",
        titulo: "Cuidar não é carregar",
        itens: [
          "Convide — não cobre",
          "Ofereça ir junto",
          "Repare na irritação, não só na tristeza",
          "Você não precisa ser a agenda dele: o plano é dele",
        ],
        fonteIds: ["rains2013", "martin2013"],
        notaApresentador: "Fale diretamente com as mulheres da sala. E com os homens: quem cuida também precisa de cuidado.",
      },
    ],
  },
  {
    id: "euvou",
    numero: 8,
    titulo: "Eu vou",
    curto: "Eu vou",
    duracaoMin: 5,
    slides: [
      {
        id: "8.1",
        tipo: "exercicio",
        titulo: "Um minuto com o seu “eu” de 70 anos",
        instrucao: "Onde você quer estar aos 70? Com quem? Fazendo o quê? O que esse homem pediria pra você fazer esta semana?",
        duracaoSeg: 60,
        fonteIds: ["rutchick2018"],
        notaApresentador: "Clique em Começar. Olhos fechados se quiserem. Silêncio de verdade. O efeito é de curto prazo — por isso o próximo slide vem colado.",
      },
      {
        id: "8.2",
        tipo: "seEntao",
        titulo: "Agora, um plano de uma frase",
        exemplos: ["Se for segunda, depois do almoço, então eu ligo e marco.", "Se for o mês do meu aniversário, então eu faço a minha revisão."],
        fonteIds: ["gollwitzer2006", "dai2014"],
        notaApresentador: "'Vou ver isso' não vira agenda. Quando, onde e o quê, sim. Data-marco — o aniversário — ajuda a lembrar todo ano. Quem quiser, monta na trilha e põe no celular.",
      },
      {
        id: "8.3",
        tipo: "ondeIr",
        titulo: "Onde marcar",
        destaque: "Benefícios variam de empresa para empresa: confira com o RH o que existe aí.",
        fonteIds: ["pnaish2009"],
        notaApresentador: "Se a empresa tiver benefícios específicos, cite aqui — só o que existe de fato. A UBS também é porta de entrada do homem.",
      },
      {
        id: "8.4",
        tipo: "historia",
        historia: {
          capitulo: "fim",
          quando: "Três meses depois",
          cena: "Os dois foram. Nenhum achou o que temia — e os dois acharam algo para cuidar.",
          falas: [
            { quem: "roberto", texto: "Era a próstata aumentada, coisa benigna. E a pressão alta, que eu nem sabia." },
            { quem: "davi", texto: "O ronco era apneia. A irritação, a cabeça. Tô tratando — e voltei pro futebol." },
          ],
          desfecho: "A revisão do carro continua em dia. A deles também: no mês do aniversário.",
        },
        notaApresentador: "Final realista: a consulta encontra coisas — quase nunca a que se temia, e quase sempre algo tratável.",
      },
      {
        id: "8.5",
        tipo: "fecho",
        titulo: "Eu vou.",
        destaque: "A trilha continua: a sua roda, os seus números, o seu plano na agenda.",
        notaApresentador: "Dê tempo para o QR. Quem não usa celular no trabalho pode abrir em casa: o endereço está no cartaz e no cartão.",
      },
    ],
  },
  {
    id: "perguntas",
    numero: 9,
    titulo: "Perguntas",
    curto: "Perguntas",
    duracaoMin: 10,
    slides: [
      {
        id: "9.1",
        tipo: "perguntas",
        titulo: "Perguntas",
        destaque: "Sobre o exame, a conversa ou o adiamento. Não precisa se identificar.",
        notaApresentador: "Dúvida clínica específica: 'leve para o seu médico, com as 3 perguntas'. Fique depois para quem quiser falar em particular.",
      },
    ],
  },
];

export type SlideNaSequencia = { bloco: Bloco; slide: Slide };

export function slidesEmSequencia(): SlideNaSequencia[] {
  return BLOCOS.flatMap((bloco) => bloco.slides.map((slide) => ({ bloco, slide })));
}
