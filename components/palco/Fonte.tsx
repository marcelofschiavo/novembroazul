"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { BookOpen } from "lucide-react";
import { degrau } from "@/lib/motion";
import { fontesCurtas } from "@/conteudo/referencias";
import { usePalco } from "./PalcoContext";

/**
 * Fonte do dado: um botão pequeno ("fonte") no pé do slide, para não roubar
 * a atenção. Clique (ou tecla R, para todos os slides) mostra a citação
 * completa. Na trilha, as referências aparecem por extenso.
 */
export function Fonte({ ids, atraso }: { ids?: string[]; atraso?: boolean }) {
  const { fontesAbertas } = usePalco();
  const [aberta, setAberta] = useState(false);
  if (!ids?.length) return null;
  const mostra = aberta || fontesAbertas;
  return (
    <motion.div initial="entra" animate="ativo" variants={atraso === false ? undefined : degrau} className="mt-[1vmin] flex items-start gap-[1vmin]">
      <button
        type="button"
        aria-expanded={mostra}
        onClick={() => setAberta((a) => !a)}
        className="dados flex shrink-0 items-center gap-[0.6vmin] rounded-full border border-line px-[1vmin] py-[0.2vmin] text-[length:calc(clamp(12px,0.85vw,17px)*var(--escala-texto,1))] text-muted hover:text-ink-2 focus-visible:text-ink-2"
      >
        <BookOpen aria-hidden className="h-[1.1em] w-[1.1em]" strokeWidth={2.2} />
        {ids.length > 1 ? `fontes (${ids.length})` : "fonte"}
      </button>
      {mostra ? (
        <p className="dados text-[length:calc(clamp(12px,0.85vw,17px)*var(--escala-texto,1))] leading-snug text-muted">{fontesCurtas(ids)}</p>
      ) : (
        <span className="sr-only">{fontesCurtas(ids)}</span>
      )}
    </motion.div>
  );
}
