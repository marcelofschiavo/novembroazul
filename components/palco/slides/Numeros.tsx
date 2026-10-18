"use client";

import { motion } from "motion/react";
import { Titulo, Destaque } from "./comum";
import type { Slide } from "@/conteudo/blocos";

/** Dois ou três números grandes, cada um com o que significa em uma linha. */
export function Numeros({ slide }: { slide: Slide }) {
  const n = slide.numeros ?? [];
  return (
    <div className="flex w-full flex-col gap-[4vmin]">
      <Titulo sobre={slide.sobre} titulo={slide.titulo} />
      <div className="grid gap-[4vmin]" style={{ gridTemplateColumns: `repeat(${n.length}, minmax(0, 1fr))` }}>
        {n.map((x, i) => (
          <motion.div
            key={x.valor}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.35, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="cartao flex flex-col gap-[0.8vmin] p-[2.2vmin]"
          >
            <span className="titulo text-[length:calc(clamp(72px,9.5vw,170px)*var(--escala-texto,1))] leading-none texto-grad">{x.valor}</span>
            <span className="text-palco-corpo font-semibold leading-tight text-ink">{x.rotulo}</span>
            {x.detalhe && <span className="dados text-palco-nota text-muted">{x.detalhe}</span>}
          </motion.div>
        ))}
      </div>
      <Destaque texto={slide.destaque} atraso={1.3} />
    </div>
  );
}
