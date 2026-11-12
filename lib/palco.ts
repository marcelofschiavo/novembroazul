"use client";

import { slidesEmSequencia, type SlideNaSequencia } from "@/conteudo/blocos";

/**
 * Navegação do palco. Puramente local — sem Supabase, sem sessão, sem
 * celular de plateia. O apresentador conduz ao vivo; isto só guarda a
 * posição atual (para sobreviver a um F5 sem perder o lugar).
 */
export const SEQUENCIA_PALCO = slidesEmSequencia();

/**
 * Versão curta (/palcocurto, cerca de 35 min): os pontos centrais de cada
 * bloco, com a história de Davi, Roberto e Lia do começo ao fim. Mesmos
 * slides da versão completa — só a seleção muda.
 */
const IDS_CURTA = [
  "1.1", "1.2", "1.3", "1.4", "1.5", "1.6",
  "2.2", "2.3b", "2.4",
  "3.1", "3.1r", "3.3", "3.3r",
  "4.1", "4.2", "4.3", "4.7", "4.8",
  "5.1", "5.2", "5.3",
  "6.1b", "6.2", "6.4",
  "7.1",
  "8.0", "8.2", "8.4", "8.5",
  "9.1",
];
export const SEQUENCIA_CURTA: SlideNaSequencia[] = IDS_CURTA.map((id) => {
  const s = SEQUENCIA_PALCO.find((x) => x.slide.id === id);
  if (!s) throw new Error(`Slide ${id} não existe na palestra`);
  return s;
});

export const CHAVE_POSICAO = "na26:palco:posicao";
export const CHAVE_POSICAO_CURTA = "na26:palcocurto:posicao";

export function indiceDoSlide(seq: SlideNaSequencia[], slideId: string | null): number {
  if (!slideId) return 0;
  const i = seq.findIndex((s) => s.slide.id === slideId);
  return i === -1 ? 0 : i;
}

export function lerPosicaoSalva(seq: SlideNaSequencia[], chave: string): number {
  if (typeof window === "undefined") return 0;
  return indiceDoSlide(seq, window.localStorage.getItem(chave));
}

export function salvarPosicao(seq: SlideNaSequencia[], chave: string, indice: number): void {
  if (typeof window === "undefined") return;
  const slide = seq[indice];
  if (slide) window.localStorage.setItem(chave, slide.slide.id);
}
