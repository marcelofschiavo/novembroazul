/**
 * Estado local tipado. Prefixo na26:. Sem cadastro, sem servidor — tudo que
 * a pessoa preenche na trilha (roda, números, plano, quiz) fica só neste
 * aparelho e só sai como PDF ou lembrete de agenda gerados no próprio
 * navegador. Nada vai para a empresa.
 */
"use client";

const PREFIXO = "na26:";

function ok(): boolean {
  return typeof window !== "undefined" && !!window.localStorage;
}

function ler<T>(chave: string, padrao: T): T {
  if (!ok()) return padrao;
  try {
    const bruto = window.localStorage.getItem(PREFIXO + chave);
    if (!bruto) return padrao;
    return { ...padrao, ...JSON.parse(bruto) } as T;
  } catch {
    return padrao;
  }
}

function escrever<T>(chave: string, valor: T): void {
  if (!ok()) return;
  try {
    window.localStorage.setItem(PREFIXO + chave, JSON.stringify(valor));
  } catch {
    // Aparelho sem espaço ou modo privado — falha em silêncio, não é dado crítico.
  }
}

/** Data local (não UTC) no formato AAAA-MM-DD — "hoje" é o dia de quem usa. */
export function hojeISO(data: Date = new Date()): string {
  const a = data.getFullYear();
  const m = String(data.getMonth() + 1).padStart(2, "0");
  const d = String(data.getDate()).padStart(2, "0");
  return `${a}-${m}-${d}`;
}

/* ---------------- progresso da trilha ---------------- */

export type ProgressoTrilha = { modulos: string[] };

export function lerProgresso(): ProgressoTrilha {
  return ler<ProgressoTrilha>("trilha", { modulos: [] });
}
/** Retorna true se o módulo já estava marcado. */
export function marcarModuloConcluido(modulo: string): boolean {
  const atual = lerProgresso();
  if (atual.modulos.includes(modulo)) return true;
  escrever("trilha", { modulos: [...atual.modulos, modulo] });
  return false;
}

/* ---------------- Roda da Saúde ---------------- */

export type RegistroRoda = { data: string; notas: Record<string, number>; foco: string };
export type EstadoRoda = { atual: RegistroRoda | null; anterior: RegistroRoda | null };

export function lerRoda(): EstadoRoda {
  return ler<EstadoRoda>("roda", { atual: null, anterior: null });
}
/** Salva a roda de hoje. Se a anterior tem 7+ dias, ela vira a de comparação. */
export function gravarRoda(novo: RegistroRoda): EstadoRoda {
  const e = lerRoda();
  let anterior = e.anterior;
  if (e.atual && e.atual.data !== novo.data) {
    const dias = (Date.parse(novo.data) - Date.parse(e.atual.data)) / 86400000;
    if (dias >= 7) anterior = e.atual;
  }
  const estado = { atual: novo, anterior };
  escrever("roda", estado);
  return estado;
}

/* ---------------- meus números ---------------- */

export type MeusNumeros = { pas: string; pad: string; cintura: string; glicemia: string; colesterol: string; data: string };

export function lerNumeros(): MeusNumeros {
  return ler<MeusNumeros>("numeros", { pas: "", pad: "", cintura: "", glicemia: "", colesterol: "", data: "" });
}
export function gravarNumeros(n: MeusNumeros): void {
  escrever("numeros", n);
}

/* ---------------- luzes marcadas ---------------- */

export function lerLuzes(): { marcadas: string[] } {
  return ler("luzes", { marcadas: [] as string[] });
}
export function gravarLuzes(marcadas: string[]): void {
  escrever("luzes", { marcadas });
}

/* ---------------- por que eu adio ---------------- */

export type Adiamento = { escolhidos: string[]; minhaResposta: string };

export function lerAdiamento(): Adiamento {
  return ler<Adiamento>("adio", { escolhidos: [], minhaResposta: "" });
}
export function gravarAdiamento(a: Adiamento): void {
  escrever("adio", a);
}

/* ---------------- plano "Eu vou" ---------------- */

export type PlanoEuVou = { se: string; entao: string; data: string; marco: string; carta: string };

export function lerPlano(): PlanoEuVou {
  return ler<PlanoEuVou>("plano", { se: "", entao: "", data: "", marco: "", carta: "" });
}
export function gravarPlano(p: PlanoEuVou): void {
  escrever("plano", p);
}

/* ---------------- quiz ---------------- */

export type EstadoQuiz = { respostas: Record<string, number>; melhor: number };

export function lerQuiz(): EstadoQuiz {
  return ler<EstadoQuiz>("quiz", { respostas: {}, melhor: 0 });
}
export function gravarQuiz(q: EstadoQuiz): void {
  escrever("quiz", q);
}

/* ---------------- apagar tudo ---------------- */

export function apagarTudoLocal(): void {
  if (!ok()) return;
  Object.keys(window.localStorage)
    .filter((k) => k.startsWith(PREFIXO))
    .forEach((k) => window.localStorage.removeItem(k));
}
