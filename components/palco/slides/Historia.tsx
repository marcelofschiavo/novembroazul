"use client";

import { motion } from "motion/react";
import { degrau, escada } from "@/lib/motion";
import { PERSONAGENS, type IdPersonagem } from "@/conteudo/historia";
import type { Slide } from "@/conteudo/blocos";

const ETAPAS = [
  { id: "inicio", rotulo: "Início" },
  { id: "meio", rotulo: "Meio" },
  { id: "fim", rotulo: "Fim" },
] as const;

/** Avatar do personagem: inicial num círculo + nome escrito (a cor nunca é o único sinal). */
export function Avatar({ quem, tamanho = "10vmin" }: { quem: IdPersonagem; tamanho?: string }) {
  const p = PERSONAGENS[quem];
  const estilo: Record<IdPersonagem, string> = {
    davi: "bg-campanha-fill text-white",
    roberto: "bg-ink text-bg",
    lia: "bg-surface text-campanha border-[0.5vmin] border-campanha-fill",
  };
  return (
    <span
      aria-hidden
      className={`titulo flex shrink-0 items-center justify-center rounded-full ${estilo[quem]}`}
      style={{ width: tamanho, height: tamanho, fontSize: `calc(${tamanho} * 0.48)` }}
    >
      {p.inicial}
    </span>
  );
}

/**
 * Cena da história. Sem ilustração: a cena é texto curto, com hora e lugar,
 * e as falas aparecem como balões com o avatar de quem fala. Início, meio e
 * fim ficam marcados por texto e posição.
 */
export function Historia({ slide }: { slide: Slide }) {
  const h = slide.historia!;
  const atual = ETAPAS.findIndex((e) => e.id === h.capitulo);
  return (
    <div className="flex w-full flex-col gap-[3vmin]">
      <motion.div initial="entra" animate="ativo" variants={degrau} className="flex flex-wrap items-center gap-x-[2.4vmin] gap-y-[1vmin]">
        <span className="dados text-palco-rodape font-bold uppercase tracking-[0.14em] text-muted">A história do Davi</span>
        <ol className="flex items-center gap-[1.2vmin]" aria-label="Etapa da história">
          {ETAPAS.map((e, i) => (
            <li
              key={e.id}
              aria-current={i === atual ? "step" : undefined}
              className={`dados rounded-full border-[3px] px-[1.4vmin] py-[0.3vmin] text-palco-rodape font-bold uppercase tracking-wide ${
                i === atual ? "border-campanha-fill bg-campanha-fill text-white" : "border-line-2 text-muted"
              }`}
            >
              {e.rotulo}
            </li>
          ))}
        </ol>
        <span className="dados text-palco-nota font-bold text-campanha">{h.quando}</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[82vw] text-[length:calc(clamp(32px,3.3vw,62px)*var(--escala-texto,1))] font-semibold leading-[1.18] text-ink"
      >
        {h.cena}
      </motion.p>

      {h.falas && (
        <motion.ul initial="entra" animate="ativo" variants={escada(0.7, 0.9)} className="flex flex-col gap-[2vmin]">
          {h.falas.map((f, i) => (
            <motion.li key={i} variants={degrau} className="flex items-center gap-[2vmin]">
              <Avatar quem={f.quem} />
              <div className="flex flex-col">
                <span className="dados text-palco-rodape font-bold uppercase tracking-wide text-muted">
                  {PERSONAGENS[f.quem].nome} · {PERSONAGENS[f.quem].descricao}
                </span>
                <blockquote className="rounded-[2.4vmin] rounded-tl-none bg-surface-2 px-[2.4vmin] py-[1.4vmin] text-palco-corpo font-bold leading-tight text-ink shadow-sm">
                  “{f.texto}”
                </blockquote>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}

      {h.desfecho && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }} className="text-palco-texto font-semibold italic text-muted">
          {h.desfecho}
        </motion.p>
      )}

      {h.capitulo === "inicio" && slide.id === "1.5" && (
        <p className="dados text-palco-rodape text-muted">Personagens fictícios, compostos de situações comuns.</p>
      )}
    </div>
  );
}
