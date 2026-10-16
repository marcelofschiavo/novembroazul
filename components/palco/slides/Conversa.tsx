"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { HeartPulse, Building2, Stethoscope, HandHeart, Play } from "lucide-react";
import { degrau, escada, escreve, pulsa, ENTRADA, SUAVE } from "@/lib/motion";
import { Titulo, Destaque } from "./comum";
import { PENSAMENTOS } from "@/conteudo/saude";
import { EVENTO, PALESTRANTE } from "@/conteudo/palestrante";
import type { Slide } from "@/conteudo/blocos";

export function Frase({ slide }: { slide: Slide }) {
  return (
    <div className="flex w-full flex-col gap-[3.4vmin]">
      <motion.h2 initial="entra" animate="ativo" variants={escreve} className="titulo max-w-[82vw] text-palco-mega text-ink">
        {slide.titulo}
      </motion.h2>
      {slide.destaque && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: ENTRADA }}
          className="max-w-[78vw] text-palco-corpo font-semibold leading-snug text-campanha"
        >
          {slide.destaque}
        </motion.p>
      )}
    </div>
  );
}

export function DuasColunas({ slide }: { slide: Slide }) {
  const cols = slide.colunas ?? [];
  return (
    <div className="flex w-full flex-col gap-[3vmin]">
      <Titulo sobre={slide.sobre} titulo={slide.titulo} />
      <div className="grid gap-[3vmin]" style={{ gridTemplateColumns: `repeat(${cols.length}, minmax(0, 1fr))` }}>
        {cols.map((c, i) => {
          const aceso = c.tom === "aceso";
          return (
            <motion.div
              key={c.titulo}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.4 }}
              className={`flex flex-col gap-[1.2vmin] rounded-[2.4vmin] p-[2.2vmin] ${aceso ? "border-[3px] border-campanha-fill bg-campanha-wash" : "border-2 border-line bg-surface-2"}`}
            >
              <span className={`titulo text-palco-corpo ${aceso ? "text-campanha" : "text-ink-2"}`}>{c.titulo}</span>
              <ul className="flex flex-col gap-[0.6vmin]">
                {c.itens.map((it) => (
                  <li key={it} className="flex items-baseline gap-[1.2vmin] text-palco-nota font-semibold leading-snug text-ink">
                    <span aria-hidden className={aceso ? "text-campanha" : "text-muted"}>▸</span>
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
      <Destaque texto={slide.destaque} atraso={1.3} />
    </div>
  );
}

export function Lista({ slide }: { slide: Slide }) {
  return (
    <div className="flex w-full flex-col gap-[3.4vmin]">
      <Titulo sobre={slide.sobre} titulo={slide.titulo} />
      <motion.ul initial="entra" animate="ativo" variants={escada(0.35, 0.4)} className="flex flex-col gap-[2vmin]">
        {slide.itens?.map((it, i) => (
          <motion.li key={it} variants={degrau} className="flex items-baseline gap-[2vmin] text-palco-corpo font-semibold leading-tight text-ink">
            <span className="dados text-palco-nota font-bold text-campanha">{String(i + 1).padStart(2, "0")}</span>
            {it}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

export function Passos({ slide }: { slide: Slide }) {
  const p = slide.passos ?? [];
  const comTexto = p.some((x) => x.texto);
  return (
    <div className="flex w-full flex-col gap-[3.4vmin]">
      <Titulo sobre={slide.sobre} titulo={slide.titulo} />
      <motion.ol
        initial="entra"
        animate="ativo"
        variants={escada(0.4, 0.4)}
        className={comTexto ? "grid gap-[2vmin]" : "flex flex-col gap-[2.4vmin]"}
        style={comTexto ? { gridTemplateColumns: `repeat(${p.length}, minmax(0, 1fr))` } : undefined}
      >
        {p.map((x, i) => (
          <motion.li
            key={x.titulo}
            variants={degrau}
            className={comTexto ? "flex flex-col gap-[1.4vmin] rounded-[2.4vmin] border-2 border-line bg-surface p-[2.4vmin]" : "flex items-center gap-[2.4vmin]"}
          >
            <span className="titulo flex h-[8vmin] w-[8vmin] shrink-0 items-center justify-center rounded-full bg-acento text-palco-corpo text-sobre-acento">
              {comTexto ? x.titulo[0] : i + 1}
            </span>
            <span className={`titulo ${comTexto ? "text-palco-corpo" : "text-palco-titulo"} text-ink`}>{x.titulo}</span>
            {x.texto && <span className="text-palco-nota font-semibold leading-snug text-ink-2">{x.texto}</span>}
          </motion.li>
        ))}
      </motion.ol>
      <Destaque texto={slide.destaque} atraso={1.8} />
    </div>
  );
}

/** Pensamento automático riscado → resposta. Os quatro primeiros pares da lista. */
export function Pensamentos({ slide }: { slide: Slide }) {
  const pares = PENSAMENTOS.slice(0, 4);
  return (
    <div className="flex w-full flex-col gap-[3vmin]">
      <Titulo sobre="Pensamentos automáticos" titulo={slide.titulo} />
      <ul className="grid grid-cols-2 gap-[2.4vmin]">
        {pares.map((p, i) => {
          const base = 0.5 + i * 1.3;
          return (
            <motion.li key={p.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: base }} className="flex flex-col gap-[1vmin] rounded-[2.4vmin] border-2 border-line bg-surface p-[2.2vmin]">
              <span className="relative w-fit text-palco-nota font-bold text-ink-2">
                “{p.automatico}”
                <motion.span
                  aria-hidden
                  className="absolute left-0 right-0 top-1/2 h-[0.5vmin] rounded-full bg-alerta"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: base + 0.5, duration: 0.5, ease: SUAVE }}
                  style={{ transformOrigin: "left" }}
                />
              </span>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: base + 0.9 }} className="text-palco-texto font-bold leading-snug text-campanha">
                {p.resposta}
              </motion.span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

/** A frase que fecha a conversa é riscada; a que abre espaço toma o lugar. */
export function Reescrita({ slide }: { slide: Slide }) {
  return (
    <div className="flex w-full flex-col gap-[4vmin]">
      <Titulo sobre={slide.sobre} />
      <div className="relative w-fit max-w-full">
        <motion.p className="text-palco-corpo font-bold leading-tight text-ink-2" initial={{ opacity: 1 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.2, duration: 0.4 }}>
          “{slide.ruim}”
        </motion.p>
        <motion.span
          aria-hidden
          className="absolute left-0 right-0 top-1/2 h-[0.9vmin] -translate-y-1/2 rounded-full bg-alerta"
          style={{ transformOrigin: "left" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.7, ease: SUAVE }}
        />
      </div>
      <motion.p
        className="titulo max-w-[80vw] text-palco-titulo text-campanha"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6, ease: ENTRADA }}
      >
        “{slide.boa}”
      </motion.p>
    </div>
  );
}

export function Caminhos({ slide }: { slide: Slide }) {
  return (
    <div className="flex w-full flex-col gap-[3vmin]">
      <Titulo sobre={slide.sobre} titulo={slide.titulo} />
      <div className="grid grid-cols-2 gap-[3vmin]">
        {slide.caminhos?.map((c, i) => {
          const aceso = c.tom === "aceso";
          return (
            <motion.div
              key={c.rotulo}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 1.2 }}
              className={`flex flex-col gap-[1.8vmin] rounded-[2.4vmin] p-[2.8vmin] ${aceso ? "border-[3px] border-campanha-fill bg-campanha-wash" : "border-2 border-line bg-surface-2"}`}
            >
              <span className={`dados text-palco-rodape font-bold uppercase tracking-[0.14em] ${aceso ? "text-campanha" : "text-muted"}`}>{c.rotulo}</span>
              <span className={`titulo text-palco-corpo leading-tight ${aceso ? "text-ink" : "text-ink-2"}`}>“{c.fala}”</span>
              <span className="text-palco-nota font-semibold leading-snug text-ink-2">→ {c.resultado}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/** Exercício com tempo: só começa ao clicar, mostra a contagem. */
export function Exercicio({ slide }: { slide: Slide }) {
  const total = slide.duracaoSeg ?? 60;
  const [restante, setRestante] = useState<number | null>(null);
  useEffect(() => {
    if (restante === null || restante <= 0) return;
    const t = setTimeout(() => setRestante((r) => (r === null ? r : r - 1)), 1000);
    return () => clearTimeout(t);
  }, [restante]);
  return (
    <div className="grid w-full grid-cols-[1fr_auto] items-center gap-[5vmin]">
      <div className="flex min-w-0 flex-col gap-[3vmin]">
        <Titulo sobre="Exercício · 1 minuto" titulo={slide.titulo} />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-palco-corpo font-semibold leading-snug text-ink">
          {slide.instrucao}
        </motion.p>
      </div>
      <div className="flex flex-col items-center gap-[2vmin]">
        <motion.div
          aria-hidden
          className="flex h-[30vmin] w-[30vmin] items-center justify-center rounded-full bg-campanha-wash"
          animate={restante && restante > 0 ? { scale: [1, 1.08, 1] } : { scale: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="titulo text-palco-mega text-campanha">{restante === null ? total : restante}</span>
        </motion.div>
        {restante === null ? (
          <button type="button" onClick={() => setRestante(total)} className="flex items-center gap-2 rounded-full bg-acento px-[3vmin] py-[1.2vmin] text-palco-nota font-bold text-sobre-acento">
            <Play aria-hidden className="h-[1em] w-[1em]" /> Começar
          </button>
        ) : (
          <span className="dados text-palco-nota text-muted" aria-live="polite">
            {restante > 0 ? "segundos" : "pode abrir os olhos"}
          </span>
        )}
      </div>
    </div>
  );
}

export function SeEntao({ slide }: { slide: Slide }) {
  return (
    <div className="flex w-full flex-col gap-[3.6vmin]">
      <Titulo sobre="De volta à oficina" titulo={slide.titulo} />
      <motion.p
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="titulo w-fit rounded-[2.4vmin] border-[3px] border-dashed border-campanha-fill bg-campanha-wash px-[3vmin] py-[2vmin] text-palco-titulo text-ink"
      >
        Se for <span className="text-campanha">______</span>, então eu <span className="text-campanha">______</span>.
      </motion.p>
      <motion.ul initial="entra" animate="ativo" variants={escada(0.5, 1.1)} className="flex flex-col gap-[1.4vmin]">
        {slide.exemplos?.map((e) => (
          <motion.li key={e} variants={degrau} className="flex items-baseline gap-[1.6vmin] text-palco-texto font-semibold text-ink-2">
            <span aria-hidden className="text-campanha">▸</span>“{e}”
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

const LUGARES = [
  { icone: HeartPulse, titulo: "Plano de saúde ou convênio", texto: "clínico geral ou urologista" },
  { icone: Building2, titulo: "UBS, pelo SUS", texto: "a porta de entrada também do homem" },
  { icone: Stethoscope, titulo: "Medicina do trabalho", texto: "o exame periódico também é chance de conversar" },
  { icone: HandHeart, titulo: "Programas da empresa", texto: "saúde e apoio psicológico, se houver" },
];

export function OndeIr({ slide }: { slide: Slide }) {
  return (
    <div className="flex w-full flex-col gap-[3.4vmin]">
      <Titulo titulo={slide.titulo} />
      <motion.ul initial="entra" animate="ativo" variants={escada(0.15, 0.3)} className="grid grid-cols-4 gap-[2vmin]">
        {LUGARES.map(({ icone: Icone, titulo, texto }) => (
          <motion.li key={titulo} variants={degrau} className="flex flex-col gap-[1.4vmin] rounded-[2.4vmin] border-2 border-line bg-surface p-[2.4vmin]">
            <Icone aria-hidden className="h-[6vmin] w-[6vmin] text-campanha" strokeWidth={2} />
            <span className="titulo text-palco-nota leading-tight text-ink">{titulo}</span>
            <span className="text-palco-rodape font-semibold leading-snug text-ink-2">{texto}</span>
          </motion.li>
        ))}
      </motion.ul>
      <Destaque texto={slide.destaque} atraso={1.1} />
      <p className="text-palco-nota font-semibold text-ink-2">
        Para conversar agora: <strong className="text-campanha">CVV 188</strong>, 24 horas, gratuito.
      </p>
    </div>
  );
}

/** Fecho com QR da trilha. O QR é gerado localmente (funciona offline). */
export function Fecho({ slide }: { slide: Slide }) {
  const url = slide.url ?? `${EVENTO.url}/trilha`;
  return (
    <div className="grid w-full grid-cols-[1fr_auto] items-center gap-[5vmin]">
      <div className="flex min-w-0 flex-col gap-[2.6vmin]">
        <motion.h2 initial="entra" animate="ativo" variants={escreve} className="titulo text-palco-mega text-campanha">
          {slide.titulo}
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-palco-corpo font-semibold leading-snug text-ink">
          {slide.destaque}
        </motion.p>
      </div>
      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, duration: 0.6, ease: ENTRADA }} className="flex flex-col items-center gap-[1.6vmin]">
        <motion.div initial="ativo" animate="ativo" variants={pulsa} className="rounded-[2.4vmin] bg-white p-[1.6vmin]">
          <QRCodeSVG title="QR code para abrir a trilha" value={url} size={512} level="M" bgColor="#FFFFFF" fgColor="#0B1B33" style={{ width: "26vmin", height: "26vmin", display: "block" }} />
        </motion.div>
        <p className="dados text-palco-nota font-bold text-campanha [overflow-wrap:anywhere]">{url.replace(/^https?:\/\//, "")}</p>
      </motion.div>
    </div>
  );
}

export function Perguntas({ slide }: { slide: Slide }) {
  return (
    <div className="flex w-full flex-col gap-[3vmin]">
      <motion.h2 initial="entra" animate="ativo" variants={escreve} className="titulo text-palco-mega text-ink">
        {slide.titulo}
      </motion.h2>
      <p className="text-palco-corpo font-semibold text-ink-2">{slide.destaque}</p>
      <div className="mt-[2vmin] flex flex-col gap-[0.6vmin] border-t-2 border-line pt-[2.4vmin]">
        <p className="text-palco-texto font-bold text-ink">{PALESTRANTE.nome} · {PALESTRANTE.crp}</p>
        <p className="text-palco-nota font-semibold text-ink-2">
          {PALESTRANTE.contatos.map((c) => `${c.rede}: ${c.rotulo}`).join("   ·   ")}
        </p>
        <p className="dados text-palco-nota text-campanha">{EVENTO.url.replace(/^https?:\/\//, "")}/trilha</p>
      </div>
    </div>
  );
}
