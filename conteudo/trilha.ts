/**
 * Módulos da trilha. Os essenciais são um caminho só, em linha reta: cada
 * passo termina com o botão do próximo, sem precisar voltar ao início. Eles
 * liberam o certificado. Os extras são para quem quer ir além. Tudo liberado
 * desde o início (a trilha também serve de "antes" da palestra).
 *
 * Ordem pensada para a cabeça antes do corpo: primeiro olhar a própria vida
 * (Roda), depois os medos e o silêncio que fazem adiar, só então o painel —
 * e fechar com o compromisso.
 */

export type ModuloTrilha = { id: string; rotulo: string; desc: string; href: string; minutos: number };

export const MODULOS_ESSENCIAIS: ModuloTrilha[] = [
  { id: "roda", rotulo: "Minha Roda da Saúde", desc: "Uma nota para cada área da vida. Onde a sua roda está torta?", href: "/trilha/roda", minutos: 3 },
  { id: "adio", rotulo: "Os medos que fazem adiar", desc: "O que a cabeça diz para não ir — e o que dá para responder.", href: "/trilha/adio", minutos: 4 },
  { id: "cabeca", rotulo: "O silêncio dos homens", desc: "A couraça que a gente aprende cedo, e um jeito pequeno de abrir a porta.", href: "/trilha/cabeca", minutos: 4 },
  { id: "numeros", rotulo: "O meu painel", desc: "O que olhar em cada idade e os sinais que não esperam.", href: "/trilha/numeros", minutos: 4 },
  { id: "plano", rotulo: "Meu compromisso", desc: "Por quem você vai, uma frase, uma data e um lembrete no celular.", href: "/trilha/plano", minutos: 4 },
  { id: "quiz", rotulo: "Para fixar", desc: "10 perguntas rápidas, cada uma com a explicação.", href: "/trilha/quiz", minutos: 4 },
];

export const MODULOS_EXTRAS: ModuloTrilha[] = [
  { id: "cuida", rotulo: "Para quem cuida dele", desc: "Parceiras, filhas, mães, amigos: convidar sem cobrar.", href: "/trilha/cuida", minutos: 3 },
  { id: "sono", rotulo: "Sono e ronco", desc: "Para quem dorme mal, ronca ou trabalha em turnos.", href: "/trilha/sono", minutos: 3 },
  { id: "psa", rotulo: "Próstata e PSA, em detalhe", desc: "Para quem quer os números antes de conversar com o médico.", href: "/trilha/psa", minutos: 5 },
  { id: "reveja", rotulo: "Reveja a palestra", desc: "A história do Davi e tudo o que passou na tela.", href: "/trilha/reveja", minutos: 8 },
  { id: "ajuda", rotulo: "Onde buscar ajuda", desc: "Onde marcar, e CVV 188 para conversar.", href: "/ajuda", minutos: 1 },
  { id: "referencias", rotulo: "Referências", desc: "Cada dado, com a fonte — muitas brasileiras.", href: "/trilha/referencias", minutos: 5 },
  { id: "palestrante", rotulo: "Sobre o palestrante", desc: "Marcelo Schiavo — bio e contato.", href: "/palestrante", minutos: 1 },
];

/** Os que liberam o certificado. */
export const MODULOS_TRILHA = MODULOS_ESSENCIAIS.map((m) => m.id);
