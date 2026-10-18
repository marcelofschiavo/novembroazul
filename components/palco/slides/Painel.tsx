"use client";

import { motion } from "motion/react";
import { Titulo, Destaque } from "./comum";
import type { Slide } from "@/conteudo/blocos";

const MOSTRADORES = [
  { nome: "Pressão", alvo: "abaixo de 12 por 8", unidade: "mmHg" },
  { nome: "Cintura", alvo: "abaixo de 94 cm", unidade: "na altura do umbigo" },
  { nome: "Glicemia", alvo: "abaixo de 100 em jejum", unidade: "mg/dL" },
  { nome: "Colesterol", alvo: "a meta depende do seu risco", unidade: "o médico define" },
];

/** Mostrador de painel de carro, com o ponteiro parado num "?" — você sabe o seu? */
function Mostrador({ atraso }: { atraso: number }) {
  return (
    <svg viewBox="-60 -60 120 75" className="w-full" aria-hidden>
      <path d="M -50 0 A 50 50 0 0 1 -17 -47" stroke="var(--ok)" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M -12 -48.5 A 50 50 0 0 1 22 -45" stroke="var(--atencao)" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M 27 -42 A 50 50 0 0 1 50 0" stroke="var(--alerta)" strokeWidth="9" fill="none" strokeLinecap="round" />
      <motion.line
        x1="0"
        y1="0"
        x2="0"
        y2="-40"
        stroke="var(--ink)"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ rotate: -80 }}
        animate={{ rotate: [-80, 60, -20, 10, 0] }}
        transition={{ delay: atraso, duration: 1.8, ease: "easeInOut" }}
        style={{ transformOrigin: "0px 0px" }}
      />
      <circle cx="0" cy="0" r="6" fill="var(--ink)" />
      <text x="0" y="-14" textAnchor="middle" fontSize="20" fontWeight="800" fill="var(--campanha)" fontFamily="var(--font-titulo)">?</text>
    </svg>
  );
}

export function Painel({ slide }: { slide: Slide }) {
  return (
    <div className="flex w-full flex-col gap-[2.8vmin]">
      <Titulo sobre="O painel" titulo={slide.titulo} />
      <div className="grid grid-cols-4 gap-[2.6vmin]">
        {MOSTRADORES.map((m, i) => (
          <motion.div
            key={m.nome}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.2 }}
            className="flex flex-col items-center gap-[1vmin] rounded-[2.4vmin] cartao p-[2vmin] text-center"
          >
            <div style={{ width: "min(13vw, 21vh)" }}>
              <Mostrador atraso={0.6 + i * 0.25} />
            </div>
            <span className="titulo text-palco-corpo text-ink">{m.nome}</span>
            <span className="text-palco-nota font-semibold leading-tight text-campanha">{m.alvo}</span>
            <span className="dados text-palco-rodape text-muted">{m.unidade}</span>
          </motion.div>
        ))}
      </div>
      <Destaque texto="Você sabe os seus? Se não, é o primeiro item da próxima consulta." atraso={1.6} />
    </div>
  );
}

const FAIXAS = [
  { rotulo: "Normal", valor: "abaixo de 12 por 8", cor: "var(--ok)", fundo: "var(--ok-wash)" },
  { rotulo: "Pré-hipertensão", valor: "de 12 por 8 a 13,9 por 8,9", cor: "var(--atencao)", fundo: "var(--atencao-wash)", novo: true },
  { rotulo: "Hipertensão", valor: "14 por 9 ou mais", cor: "var(--alerta)", fundo: "var(--alerta-wash)" },
];

/** As três faixas da Diretriz Brasileira de Hipertensão 2025. */
export function Pressao({ slide }: { slide: Slide }) {
  return (
    <div className="flex w-full flex-col gap-[4vmin]">
      <Titulo sobre="Diretriz brasileira de 2025" titulo={slide.titulo} />
      <div className="grid grid-cols-3 gap-[2vmin]">
        {FAIXAS.map((f, i) => (
          <motion.div
            key={f.rotulo}
            initial={{ opacity: 0, scaleX: 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4 + i * 0.3, duration: 0.5 }}
            style={{ background: f.fundo, borderColor: f.cor, transformOrigin: "left" }}
            className="relative flex flex-col gap-[1vmin] rounded-[2vmin] border-t-[1.2vmin] p-[2.4vmin]"
          >
            {f.novo && (
              <span className="dados absolute right-[1.6vmin] top-[1.4vmin] rounded-full px-[1.2vmin] py-[0.2vmin] text-palco-rodape font-bold uppercase" style={{ background: f.cor, color: "var(--bg)" }}>
                novo
              </span>
            )}
            <span className="titulo text-palco-corpo" style={{ color: f.cor }}>{f.rotulo}</span>
            <span className="text-palco-texto font-semibold leading-tight text-ink">{f.valor}</span>
          </motion.div>
        ))}
      </div>
      <Destaque texto={slide.destaque} atraso={1.5} />
    </div>
  );
}
