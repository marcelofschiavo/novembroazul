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
  | "roda"
  | "mito"
  | "mitoRevelado"
  | "quilometragem"
  | "duasColunas"
  | "lista"
  | "passos"
  | "pensamentos"
  | "reescrita"
  | "caminhos"
  | "exercicio"
  | "seEntao"
  | "ondeIr"
  | "fecho"
  | "perguntas"
  | "psaToque"
  | "luzesNivel"
  | "couraca"
  | "quemConta";

export type Fala = { quem: IdPersonagem; texto: string };

export type Slide = {
  id: string;
  tipo: TipoSlide;
  /** Ícone grande do slide (frase) — nome em ICONES, components/palco/slides/comum.tsx. */
  icone?: string;
  /** Lista: um ícone por item, na mesma ordem. */
  icones?: string[];
  /** Rótulo pequeno acima do título. */
  sobre?: string;
  titulo?: string;
  destaque?: string;
  itens?: string[];
  fonteIds?: string[];
  notaApresentador?: string;

  /** pergunta: a segunda pergunta aparece depois de um tempo. */
  segunda?: string;
  /** pergunta: mostra a segunda pergunta junto com a primeira, sem esperar. */
  segundaJa?: boolean;
  numeros?: { valor: string; rotulo: string; detalhe?: string }[];
  imagem?: string;
  alt?: string;
  historia?: { capitulo: "inicio" | "meio" | "fim"; quando: string; cena: string; falas?: Fala[]; desfecho?: string };
  colunas?: { titulo: string; itens: string[]; tom?: "neutro" | "aceso"; icone?: string }[];
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
        titulo: "Quem aqui sabe quando é a próxima revisão do carro, da moto, da bike?",
        segunda: "E quem lembra quando foi a sua última consulta médica?",
        segundaJa: true,
        notaApresentador: "Mão levantada nas duas. As duas perguntas já estão na tela: leia a primeira, espere as mãos, depois leia a segunda. Carro usado também conta: troca de óleo, pneu, correia; na moto e na bicicleta, pneu, corrente, freio. Leia a diferença em voz alta, com humor: 'o carro está em dia'. Esse é o gancho da palestra inteira.",
      },
      {
        id: "1.4",
        tipo: "numeros",
        titulo: "Não é impressão.",
        numeros: [
          { valor: "69%", rotulo: "dos homens foram ao médico em 12 meses", detalhe: "mulheres: 82%" },
          { valor: "6,6 anos", rotulo: "a menos de vida para o homem brasileiro", detalhe: "73,3 contra 79,9" },
          { valor: "4×", rotulo: "mais mortes de homens dos 20 aos 24 anos", detalhe: "acidentes e violência" },
          { valor: "3,4 anos", rotulo: "a menos, mesmo depois dos 60", detalhe: "20,8 contra 24,2" },
        ],
        destaque: "Adiar é padrão, não defeito — e padrão se muda.",
        fonteIds: ["pns2019", "ibge2024"],
        notaApresentador: "Não é para assustar: é para mostrar que adiar é um padrão. Os dois de baixo mostram que a diferença não é só a violência entre os jovens: ela continua depois dos 60, quando pesam as doenças que dá para cuidar cedo. Dados do IBGE para 2024.",
      },
      {
        id: "1.5",
        tipo: "historia",
        historia: {
          capitulo: "inicio",
          quando: "Segunda-feira, 7h40",
          cena: "Davi marca a revisão do carro. No celular, salta um lembrete de dois anos atrás: “consulta de rotina”. Ele arrasta pro lado.",
          falas: [{ quem: "davi", texto: "Depois eu vejo." }],
        },
        imagem: "/historia/davi-1.jpg",
        alt: "Ilustração: Davi no escritório, olhando o celular com um meio sorriso cansado, o polegar descartando uma notificação.",
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
        imagem: "/historia/roberto-2.jpg",
        alt: "Ilustração: Roberto levanta da mesa com a mão nas costas; Davi, sentado, olha para ele com preocupação.",
        notaApresentador: "Guarde o Roberto: ele volta nas luzes de alerta e no fim.",
      },
    ],
  },
  {
    id: "painel",
    numero: 2,
    titulo: "O painel",
    curto: "Painel",
    duracaoMin: 5,
    slides: [
      {
        id: "2.1",
        tipo: "frase",
        titulo: "O corpo também tem painel.",
        icone: "painel",
        destaque: "A maioria só olha quando a luz acende.",
        fonteIds: ["engel1977"],
        notaApresentador: "Saúde por inteiro: corpo, cabeça e as pessoas em volta adoecem e melhoram juntos.",
      },
      {
        id: "2.2",
        tipo: "painel",
        titulo: "Quatro números que todo homem deveria saber",
        fonteIds: ["diretrizHA2025", "omsCintura", "sbd2024"],
        notaApresentador: "Mão levantada: 'quem sabe a própria pressão?'. Depois: 'e a cintura?'. Ninguém precisa saber todos — a trilha ajuda a anotar.",
      },
      {
        id: "2.3b",
        tipo: "numeros",
        sobre: "Homens nas capitais brasileiras",
        titulo: "O que o homem carrega no dia a dia",
        numeros: [
          { valor: "65%", rotulo: "dos homens estão acima do peso", detalhe: "1 em 4 com obesidade" },
          { valor: "27%", rotulo: "bebem demais numa ocasião", detalhe: "mulheres: 15%" },
          { valor: "14%", rotulo: "fumam", detalhe: "mulheres: 9,5%" },
          { valor: "1 em 5", rotulo: "dorme menos de 6 horas", detalhe: "1 em 4 homens tem insônia" },
        ],
        destaque: "Não é culpa: é por onde começar.",
        fonteIds: ["vigitel2024", "vigitel2023alcool", "vigitel2025sono"],
        notaApresentador: "Dados do Vigitel, capitais: peso e cigarro de 2024, álcool de 2023 (5 doses ou mais numa ocasião), sono medido pela primeira vez (1 em 5 adultos dorme menos de 6 horas). Ligue com o Davi: ronca, dorme mal, explode por pouco. Não é para culpar: é para escolher por onde começar.",
      },
      {
        id: "2.4",
        tipo: "roda",
        titulo: "Como está a sua roda?",
        instrucao: "Nota de 0 a 10 para cada área. Onde ela está torta?",
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
    duracaoMin: 8,
    slides: [
      {
        id: "4.1",
        tipo: "quilometragem",
        titulo: "Revisão por quilometragem",
        destaque: "Nem tudo, todo ano: o item certo, na idade certa.",
        linhas: [
          { faixa: "Desde os 18", itens: ["Pressão", "Cintura e peso", "Sono, cabeça e álcool", "Vacinas"] },
          { faixa: "A partir dos 35", itens: ["Glicemia", "Colesterol"] },
          { faixa: "A partir dos 45–50", itens: ["Próstata: conversar sobre o PSA", "Intestino: teste nas fezes"] },
        ],
        fonteIds: ["krogsboll2019", "diretrizHA2025", "sbd2024", "sbu", "fitSus2026"],
        notaApresentador: "A montadora não troca todas as peças em toda revisão. Cada quilometragem tem seus itens — e o médico ajusta ao seu caso. Pressão em toda consulta; glicemia a cada 3 anos se normal; colesterol, o médico define a frequência. Duas novidades brasileiras: a Sociedade Brasileira de Diabetes antecipou a glicemia para os 35 anos (2025), e desde agosto de 2026 o SUS oferece o teste de sangue oculto nas fezes, dos 50 aos 75. Próstata: conversar a partir dos 50 — ou 45 se negro ou com pai ou irmão com a doença.",
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
        imagem: "/historia/lia-3.jpg",
        alt: "Ilustração: Lia de braços cruzados, aflita, e Davi ao lado, cansado, de braços cruzados e olhar desviado.",
        notaApresentador: "Não julgue a Lia: ela está preocupada. Só registre que a cobrança fez o Davi se fechar. Vamos entender por quê no bloco 6.",
      },
      {
        id: "4.3",
        tipo: "psaToque",
        titulo: "PSA e toque retal: o que pôr na balança",
        itens: [
          "Sozinho, acerta metade dos casos",
          "O urologista decide com você",
          "Dura segundos",
        ],
        destaque: "SBU e Ministério da Saúde divergem. Concordam: a decisão é sua, com o médico.",
        fonteIds: ["harding2020", "naji2018", "sbu", "msInca"],
        notaApresentador: "Números absolutos, sempre: 2 mortes a menos em cada 1.000 homens acompanhados por 16 anos, com riscos do outro lado. Não é a favor nem contra o exame. Honestidade: SBU e Ministério da Saúde/INCA divergem. A SBU sugere conversar a partir dos 50 — ou 45 se negro ou com pai ou irmão com a doença; o Ministério não indica o exame para todos os homens sem sintoma. Pesquisadores brasileiros falam de um 'novembro não tão azul' quando a campanha vira só PSA. Toque retal: tire o fantasma sem desautorizar ninguém — o exame dura segundos, vergonha é fazer piada; a barreira é a 'arranhadura na masculinidade', não o exame.",
      },
      {
        id: "4.7",
        tipo: "numeros",
        titulo: "O 2º câncer do homem não é o que você pensa.",
        numeros: [
          { valor: "78 mil", rotulo: "casos de próstata por ano", detalhe: "o 1º do homem" },
          { valor: "26 mil", rotulo: "casos de intestino por ano", detalhe: "o 2º do homem" },
        ],
        fonteIds: ["inca2026"],
        notaApresentador: "Quase nunca se fala do intestino no Novembro Azul. Sem detalhar exame: a mensagem é a luz de alerta (próximo slide). Se perguntarem: o SUS oferece o teste de sangue oculto nas fezes dos 50 aos 75, a cada 2 anos.",
      },
      {
        id: "4.8",
        tipo: "luzesNivel",
        titulo: "Luzes de alerta: cada cor, um tempo",
        destaque: "Luz acesa não é sentença: quase sempre é tratável.",
        fonteIds: ["tufik2010", "martin2013"],
        notaApresentador: "Como no carro: vermelha, pare agora; laranja, vá logo; amarela, marque. Dor no peito também é aperto, peso ou queimação; falta de ar fora do comum também conta. Lembra do Roberto levantando à noite? Na maioria das vezes é aumento benigno da próstata — mas é luz do painel. Jato fraco também conta. Ronco com pausas e sono que não descansa: apneia é comum em homens (estudo de São Paulo). Irritação, tristeza ou álcool a mais por 2 semanas ou mais: pode ser a depressão disfarçada, que vem no próximo bloco. Dificuldade de ereção também é luz amarela: sinal dos vasos, conte ao médico. Se alguém tiver pensamento de desistir da vida, é luz vermelha: CVV 188 ou atendimento já.",
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
          { titulo: "O que a gente espera", itens: ["Tristeza", "Choro", "Desânimo"], tom: "neutro", icone: "chuva" },
          { titulo: "O que aparece", itens: ["Irritação", "Álcool a mais", "Risco e velocidade", "Sumir dos amigos"], tom: "aceso", icone: "raio" },
        ],
        destaque: "Contando esses sinais, homens têm tanta depressão quanto mulheres.",
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
        icone: "boia",
        destaque: "No Brasil, homens morrem por suicídio 4 vezes mais que mulheres. Conversar ajuda: CVV 188, 24 horas.",
        fonteIds: ["palma2021", "cvv"],
        notaApresentador: "Tom calmo, sem detalhe. O CVV também atende quem só precisa falar. Comunicação segura: nunca método, nunca caso. Diga que você fica depois para quem quiser conversar.",
      },
    ],
  },
  {
    id: "adiar",
    numero: 6,
    titulo: "Por que a gente adia",
    curto: "Adiar",
    duracaoMin: 7,
    slides: [
      {
        id: "6.1",
        tipo: "frase",
        titulo: "Não é falta de informação.",
        icone: "cabeca",
        destaque: "É a cabeça tentando proteger a gente — e atrapalhando.",
        fonteIds: ["addis2003", "gomes2007"],
        notaApresentador: "Aqui entra a TCC: pensamentos automáticos. Eles parecem verdade porque chegam rápido.",
      },
      {
        id: "6.1b",
        tipo: "couraca",
        sobre: "O silêncio dos homens",
        titulo: "A couraça que afasta o cuidado",
        itens: ["Homem não chora.", "Aguenta firme.", "Não é nada, já passa.", "Médico é pra quando não der mais."],
        colunas: [
          {
            titulo: "O que fica do lado de dentro",
            itens: ["A dor vira irritação, álcool ou silêncio", "O problema chega tarde ao médico", "Quem está perto não fica sabendo"],
          },
        ],
        numeros: [{ valor: "8%", rotulo: "dos homens têm diagnóstico de depressão", detalhe: "mulheres: 20%" }],
        destaque: "Número baixo não é sofrer menos: muitas vezes, é falar menos.",
        fonteIds: ["gomes2007", "schraiber2010", "vigitel2024", "martin2013"],
        notaApresentador: "Pergunte quem já ouviu alguma dessas frases em casa (mão levantada). A couraça foi aprendida cedo e já protegeu muita gente — não é para atacar, é para ver o preço. Pesquisas brasileiras com homens mostram isso: cuidado visto como 'coisa de mulher', medo e vergonha. Ela protege do golpe — e do cuidado também. Tirar a couraça não é fraqueza: é deixar o cuidado entrar.",
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
          { titulo: "Susto", itens: ["A pessoa trava", "Evita o assunto", "Adia mais"], tom: "neutro", icone: "susto" },
          { titulo: "Cobrança", itens: ["Soa como ordem", "Ativa a resistência", "Vira briga"], tom: "neutro", icone: "megafone" },
        ],
        destaque: "Funciona: exemplo de outros homens, caminho claro e cuidado como força.",
        fonteIds: ["tannenbaum2015", "rains2013", "sagar2019"],
        notaApresentador: "Susto sem caminho trava; o 'você PRECISA' vira briga, não consulta. Por isso esta palestra não usa foto de doença nem 'faça senão'. Reatância: quanto mais pressão, mais resistência.",
      },
      {
        id: "6.4",
        tipo: "reescrita",
        sobre: "Lia, na semana seguinte",
        ruim: "Você PRECISA ir ao médico!",
        boa: "Tô te achando cansado. Quer que a gente veja isso junto?",
        imagem: "/historia/lia-4.jpg",
        alt: "Ilustração: Lia e Davi à mesa da cozinha com duas canecas; ela fala com calma e ele, aliviado, a escuta.",
        notaApresentador: "Davi respondeu: '...pode ser.' Mesma preocupação, outra porta. Pergunte: qual das duas você ouviria?",
      },
    ],
  },
  {
    id: "junto",
    numero: 7,
    titulo: "Eu vou junto",
    curto: "Junto",
    duracaoMin: 3,
    slides: [
      {
        id: "7.0",
        tipo: "historia",
        historia: {
          capitulo: "meio",
          quando: "Domingo seguinte",
          cena: "Davi mostra ao pai a tela de agendamento. Roberto torce o nariz — mas olha a tela.",
          falas: [{ quem: "davi", texto: "Pai, deixa eu te mostrar uma coisa." }],
        },
        imagem: "/historia/davi-5.jpg",
        alt: "Ilustração: Davi mostra a tela do celular ao pai, Roberto, que sorri meio a contragosto.",
        notaApresentador: "Prepare o próximo slide: duas formas de terminar esse almoço.",
      },
      {
        id: "7.1",
        tipo: "caminhos",
        sobre: "Davi e o pai, no domingo seguinte",
        titulo: "Dois jeitos de terminar o almoço",
        caminhos: [
          { rotulo: "Caminho 1", fala: "Você que sabe, pai.", resultado: "Roberto muda de assunto. A conversa morre ali.", tom: "apagado" },
          { rotulo: "Caminho 2", fala: "Pai, marquei pra nós dois. Eu vou junto.", resultado: "Roberto resmunga… e aceita: “Só se você for também.”", tom: "aceso" },
        ],
        destaque: "Incentive um passo pequeno: “Que tal marcar? Eu vou junto.”",
        fonteIds: ["ruok"],
        notaApresentador: "O 'você que sabe' parece respeito, mas fecha a porta. O 'eu vou junto' tira o peso de ir sozinho — e o Davi acaba indo também. Incentivo é convite pequeno e concreto, não cobrança: pergunte, ouça sem sermão, sugira um passo, ofereça ir junto e volte a perguntar na semana que vem (modelo ALEC, R U OK? e Movember; na trilha, o P.O.I.S.).",
      },
      {
        id: "7.3",
        tipo: "lista",
        sobre: "Para quem cuida dele",
        titulo: "Cuidar não é carregar",
        icones: ["conversa", "juntos", "olho", "agenda"],
        itens: [
          "Convide — não cobre",
          "Ofereça ir junto",
          "Repare na irritação, não só na tristeza",
          "O plano é dele — você não é a agenda",
        ],
        fonteIds: ["rains2013", "martin2013"],
        notaApresentador: "Para parceiras, filhas, mães, amigos: fale diretamente com as mulheres da sala. E com os homens: quem cuida também precisa de cuidado.",
      },
    ],
  },
  {
    id: "euvou",
    numero: 8,
    titulo: "Eu vou",
    curto: "Eu vou",
    duracaoMin: 6,
    slides: [
      {
        id: "8.0",
        tipo: "quemConta",
        sobre: "Você não adoece sozinho",
        titulo: "Quem conta com você?",
        passos: [
          { titulo: "Em casa", texto: "companheira, filhos, pais" },
          { titulo: "No trabalho", texto: "a equipe, os colegas" },
          { titulo: "Entre os amigos", texto: "o time da conversa difícil" },
        ],
        instrucao: "Pense em três nomes.",
        destaque: "Cuidar de você também é cuidar deles.",
        notaApresentador: "Sem culpa e sem susto: não é 'e se você morrer'. É lembrar que o homem é peça de muita engrenagem — e que a revisão também é um presente para quem conta com ele. O Davi foi pelo pai e acabou indo por ele mesmo. Peça: 'pense em três nomes' — e complete: 'quando você para, eles sentem junto'. Deixe 10 segundos de silêncio.",
      },
      {
        id: "8.1",
        tipo: "exercicio",
        titulo: "Um minuto com o seu “eu” de 70 anos",
        instrucao: "Onde você quer estar aos 70? Com quem? O que esse homem pediria pra você fazer esta semana?",
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
        notaApresentador: "'Vou ver isso' não vira agenda. Quando, onde e o quê, sim. Detalhe que importa: num ensaio inglês, planos prontos impressos num folheto não funcionaram — o plano precisa ser escrito pela própria pessoa. Data-marco — o aniversário — ajuda a lembrar todo ano. Quem quiser, monta na trilha e põe no celular.",
      },
      {
        id: "8.3",
        tipo: "ondeIr",
        titulo: "Onde marcar",
        destaque: "Confira com o RH o que a sua empresa oferece.",
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
            { quem: "roberto", texto: "Próstata aumentada, benigna. E a pressão alta, que eu nem sabia." },
            { quem: "davi", texto: "Era apneia. E a cabeça. Tô tratando." },
          ],
          desfecho: "A revisão deles agora também é anual.",
        },
        imagem: "/historia/fim-6.jpg",
        alt: "Ilustração: Davi e Roberto lado a lado numa sala de espera ensolarada, cada um com uma senha na mão, sorrindo de leve.",
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
        notaApresentador: "Dúvida clínica específica: 'leve para o seu médico'. Fique depois para quem quiser falar em particular.",
      },
    ],
  },
];

export type SlideNaSequencia = { bloco: Bloco; slide: Slide };

export function slidesEmSequencia(): SlideNaSequencia[] {
  return BLOCOS.flatMap((bloco) => bloco.slides.map((slide) => ({ bloco, slide })));
}
