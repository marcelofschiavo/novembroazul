"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Hand } from "lucide-react";
import { escreve, degrau, escada } from "@/lib/motion";
import { PALESTRANTE } from "@/conteudo/palestrante";
import { RodaGrafico } from "@/components/ui/RodaGrafico";
import type { Slide } from "@/conteudo/blocos";

/** Capa: o título e a roda torta que vai voltar ao longo da palestra. */
export function Capa({ slide }: { slide: Slide }) {
  return (
    <div className="grid w-full grid-cols-[1fr_auto] items-center gap-[5vmin]">
      <div className="flex min-w-0 flex-col gap-[3vmin]">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="pilula dados text-palco-nota font-semibold uppercase tracking-[0.18em] text-campanha">
          Novembro Azul · saúde do homem
        </motion.p>
        <motion.h2 initial="entra" animate="ativo" variants={escreve} className="titulo text-[length:calc(clamp(80px,11vw,190px)*var(--escala-texto,1))] leading-[0.92] tracking-[-0.03em] text-ink">
          {slide.titulo}
        </motion.h2>
        {slide.destaque && (
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="max-w-[48vw] text-palco-corpo font-light leading-snug text-ink-2">
            {slide.destaque.split(" · ")[1] ?? slide.destaque}
          </motion.p>
        )}
      </div>
      <motion.div initial={{ opacity: 0, rotate: -12 }} animate={{ opacity: 1, rotate: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="relative" style={{ width: "min(40vw, 62vh)" }}>
        <div aria-hidden className="absolute inset-[6%] rounded-full bg-campanha-fill/25 blur-[6vmin]" />
        <div className="relative">
          <RodaGrafico rotulos={false} />
        </div>
      </motion.div>
    </div>
  );
}

export function Palestrante() {
  return (
    <div className="grid w-full grid-cols-[1fr_auto] items-center gap-[6vmin]">
      <div className="flex min-w-0 flex-col gap-[3vmin]">
        <motion.h2 initial="entra" animate="ativo" variants={escreve} className="titulo text-palco-titulo text-ink">
          {PALESTRANTE.nome}
        </motion.h2>
        <motion.ul initial="entra" animate="ativo" variants={escada(0.12, 0.3)} className="flex flex-col gap-[1.2vmin]">
          {PALESTRANTE.bioCurta.map((linha) => (
            <motion.li key={linha} variants={degrau} className="flex items-baseline gap-[1.6vmin] text-palco-nota font-semibold leading-snug text-ink">
              <span aria-hidden className="text-campanha">▸</span>
              {linha}
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="relative overflow-hidden rounded-full border-[0.8vmin] border-campanha-fill"
        style={{ width: "min(36vw, 52vh)", height: "min(36vw, 52vh)" }}
      >
        <Image src={PALESTRANTE.foto} alt={`Foto de ${PALESTRANTE.nome}`} fill className="object-cover" sizes="36vw" priority unoptimized />
      </motion.div>
    </div>
  );
}

/** Pergunta de mão levantada; a segunda pergunta entra depois de alguns segundos. */
export function Pergunta({ slide }: { slide: Slide }) {
  const [segunda, setSegunda] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSegunda(true), 4500);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="flex w-full flex-col gap-[5vmin]">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dados flex items-center gap-[1.4vmin] text-palco-nota font-semibold uppercase tracking-[0.16em] text-campanha">
        <Hand aria-hidden className="h-[1.2em] w-[1.2em]" strokeWidth={2.2} /> levante a mão
      </motion.p>
      <motion.h2 initial="entra" animate="ativo" variants={escreve} className="titulo max-w-[80vw] text-palco-titulo text-ink">
        {slide.titulo}
      </motion.h2>
      {slide.segunda && (
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={segunda ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="titulo max-w-[80vw] text-palco-titulo text-campanha"
        >
          {slide.segunda}
        </motion.h2>
      )}
    </div>
  );
}
