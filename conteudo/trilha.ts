/**
 * Módulos da trilha. Os essenciais liberam o certificado; os extras são pra
 * quem quer ir além. Tudo liberado desde o início (a trilha também serve de
 * "antes" da palestra).
 */

export type ModuloTrilha = { id: string; rotulo: string; desc: string; href: string; minutos: number };

export const MODULOS_ESSENCIAIS: ModuloTrilha[] = [
  { id: "roda", rotulo: "Minha Roda da Saúde", desc: "8 áreas, uma nota cada. Veja onde a sua roda está torta.", href: "/trilha/roda", minutos: 3 },
  { id: "numeros", rotulo: "Meus números", desc: "Pressão, cintura, glicemia: anote e entenda a sua faixa.", href: "/trilha/numeros", minutos: 3 },
  { id: "psa", rotulo: "Decidir junto: o PSA", desc: "Os 1.000 homens, o toque retal sem mito e as 3 perguntas.", href: "/trilha/psa", minutos: 5 },
  { id: "luzes", rotulo: "Luzes do painel", desc: "Os sinais que pedem consulta antes da revisão.", href: "/trilha/luzes", minutos: 2 },
  { id: "adio", rotulo: "Por que eu adio", desc: "Os pensamentos que seguram a consulta — e como responder.", href: "/trilha/adio", minutos: 4 },
  { id: "plano", rotulo: "Meu plano “Eu vou”", desc: "Uma frase, uma data e um lembrete no seu celular.", href: "/trilha/plano", minutos: 4 },
  { id: "quiz", rotulo: "Quiz final", desc: "10 perguntas, com a resposta e a fonte de cada uma.", href: "/trilha/quiz", minutos: 5 },
];

export const MODULOS_EXTRAS: ModuloTrilha[] = [
  { id: "cuida", rotulo: "Para quem cuida dele", desc: "Parceiras, filhas, mães, amigos: convidar sem cobrar.", href: "/trilha/cuida", minutos: 3 },
  { id: "cabeca", rotulo: "Cabeça também é saúde", desc: "Quando a depressão vem disfarçada de irritação.", href: "/trilha/cabeca", minutos: 3 },
  { id: "sono", rotulo: "Sono, ronco e turno", desc: "Para quem dorme mal ou trabalha em turnos.", href: "/trilha/sono", minutos: 3 },
  { id: "reveja", rotulo: "Reveja a palestra", desc: "A história do Davi e tudo o que passou na tela.", href: "/trilha/reveja", minutos: 8 },
  { id: "ajuda", rotulo: "Onde buscar ajuda", desc: "Onde marcar, e CVV 188 para conversar.", href: "/ajuda", minutos: 1 },
  { id: "referencias", rotulo: "Referências", desc: "Cada dado, com a fonte — muitas brasileiras.", href: "/trilha/referencias", minutos: 5 },
  { id: "palestrante", rotulo: "Sobre o palestrante", desc: "Marcelo Schiavo — bio e contato.", href: "/palestrante", minutos: 1 },
];

/** Os que liberam o certificado. */
export const MODULOS_TRILHA = MODULOS_ESSENCIAIS.map((m) => m.id);
