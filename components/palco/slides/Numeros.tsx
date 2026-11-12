"use client";

import { motion } from "motion/react";
import { Titulo, Destaque } from "./comum";
import type { Slide } from "@/conteudo/blocos";

/**
 * Dois ou três números grandes, cada um com o que significa em uma linha.
 * Com quatro, vira uma grade 2×2 mais compacta: o número ao lado do rótulo.
 */
export function Numeros({ slide }: { slide: Slide }) {
  const n = slide.numeros ?? [];
  const compacto = n.length >= 4;
  return (
    <div className={`flex w-full flex-col ${compacto ? "gap-[3vmin]" : "gap-[4vmin]"}`}>
      <Titulo sobre={slide.sobre} titulo={slide.titulo} />
      <div
        className={`grid ${compacto ? "gap-[2.4vmin]" : "gap-[4vmin]"}`}
        style={{ gridTemplateColumns: `repeat(${compacto ? 2 : n.length}, minmax(0, 1fr))` }}
      >
        {n.map((x, i) => (
          <motion.div
            key={x.valor}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * (compacto ? 0.25 : 0.35), duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className={compacto ? "cartao grid grid-cols-[auto_1fr] items-center gap-x-[2.4vmin] p-[2vmin]" : "cartao flex flex-col gap-[0.8vmin] p-[2.2vmin]"}
          >
            {compacto ? (
              <>
                <span className="titulo whitespace-nowrap text-[length:calc(clamp(48px,4.8vw,112px)*var(--escala-texto,1))] leading-none texto-grad">{x.valor}</span>
                <span className="flex min-w-0 flex-col gap-[0.4vmin]">
                  <span className="text-palco-texto font-semibold leading-tight text-ink">{x.rotulo}</span>
                  {x.detalhe && <span className="dados text-palco-nota leading-snug text-muted">{x.detalhe}</span>}
                </span>
              </>
            ) : (
              <>
                <span className="titulo text-[length:calc(clamp(72px,9.5vw,170px)*var(--escala-texto,1))] leading-none texto-grad">{x.valor}</span>
                <span className="text-palco-corpo font-semibold leading-tight text-ink">{x.rotulo}</span>
                {x.detalhe && <span className="dados text-palco-nota text-muted">{x.detalhe}</span>}
              </>
            )}
          </motion.div>
        ))}
      </div>
      <Destaque texto={slide.destaque} atraso={compacto ? 1.5 : 1.3} />
    </div>
  );
}
