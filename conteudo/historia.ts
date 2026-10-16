/**
 * Os personagens da história — fictícios, compostos de situações comuns.
 * A história é standalone: não continua nenhuma outra campanha.
 *
 * Arco: Davi adia a própria revisão (início) → Lia cobra e ele resiste;
 * Lia muda o jeito e convida (meio) → Davi escolhe entre "você que sabe" e
 * "eu vou junto" com o pai (meio) → três meses depois, os dois foram (fim).
 * Final realista: a consulta encontra coisas — quase nunca a que se temia.
 */

export type IdPersonagem = "davi" | "roberto" | "lia";

export const PERSONAGENS: Record<IdPersonagem, { nome: string; descricao: string; inicial: string }> = {
  davi: { nome: "Davi", descricao: "36 anos, coordenador de logística", inicial: "D" },
  roberto: { nome: "Roberto", descricao: "61 anos, pai do Davi", inicial: "R" },
  lia: { nome: "Lia", descricao: "companheira do Davi", inicial: "L" },
};
