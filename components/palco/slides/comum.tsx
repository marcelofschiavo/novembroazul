"use client";

import { motion } from "motion/react";
import { escreve, degrau } from "@/lib/motion";

/** Rótulo pequeno + título do slide. Um padrão só para todos os tipos. */
export function Titulo({ sobre, titulo, tamanho = "titulo" }: { sobre?: string; titulo?: string; tamanho?: "titulo" | "corpo" | "mega" }) {
  const classe = tamanho === "mega" ? "text-palco-mega" : tamanho === "corpo" ? "text-palco-corpo" : "text-palco-titulo";
  return (
    <div className="flex flex-col gap-[1.2vmin]">
      {sobre && (
        <motion.p initial="entra" animate="ativo" variants={degrau} className="dados text-palco-rodape font-semibold uppercase tracking-[0.16em] text-campanha">
          {sobre}
        </motion.p>
      )}
      {titulo && (
        <motion.h2 initial="entra" animate="ativo" variants={escreve} className={`titulo ${classe} text-ink`}>
          {titulo}
        </motion.h2>
      )}
    </div>
  );
}

/** Frase de fechamento do slide — a mensagem que a pessoa leva. */
export function Destaque({ texto, atraso = 0.9 }: { texto?: string; atraso?: number }) {
  if (!texto) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: atraso, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-[78vw] border-l-[0.8vmin] border-campanha-fill pl-[2vmin] text-palco-texto font-semibold leading-snug text-ink-2"
    >
      {texto}
    </motion.p>
  );
}
