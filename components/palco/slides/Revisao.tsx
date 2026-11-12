"use client";

import { motion } from "motion/react";
import { degrau, escada, viraCarta } from "@/lib/motion";
import { Titulo, Destaque } from "./comum";
import { RodaGrafico } from "@/components/ui/RodaGrafico";
import type { Mito } from "@/conteudo/saude";
import { useKit } from "../PalcoContext";
import { Fonte } from "../Fonte";
import type { Slide } from "@/conteudo/blocos";

/** Roda ao vivo: as 8 áreas em volta e a roda torta de exemplo no meio. */
export function RodaSlide({ slide }: { slide: Slide }) {
  const { ui, areasRoda } = useKit();
  return (
    <div className="grid w-full grid-cols-[1fr_auto] items-center gap-[4vmin]">
      <div className="flex min-w-0 flex-col gap-[3vmin]">
        <Titulo sobre={ui.rodaSobre} titulo={slide.titulo} />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-palco-corpo font-semibold leading-snug text-ink">
          {slide.instrucao}
        </motion.p>
        <motion.ol initial="entra" animate="ativo" variants={escada(0.08, 0.9)} className="grid grid-cols-2 gap-x-[3vmin] gap-y-[0.8vmin]">
          {areasRoda.map((a, i) => (
            <motion.li key={a.id} variants={degrau} className="flex items-baseline gap-[1vmin] text-palco-nota font-semibold text-ink-2">
              <span className="dados text-campanha">{i + 1}</span> {a.nome}
            </motion.li>
          ))}
        </motion.ol>
        <p className="dados text-palco-rodape text-muted">{ui.rodaNota}</p>
      </div>
      <div style={{ width: "min(38vw, 60vh)" }}>
        <RodaGrafico rotulos={false} titulo={ui.rodaAria} nomes={areasRoda.map((a) => a.nome)} />
      </div>
    </div>
  );
}

/** Carta que vira ao revelar: afirmação na frente, veredito e explicação atrás. */
export function CartaMito({ mito, revelado }: { mito: Mito; revelado: boolean }) {
  const { ui } = useKit();
  const ehMito = mito.resposta === "mito";
  return (
    <div className="flex w-full flex-col gap-[2.4vmin]">
      {!revelado && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dados text-palco-nota font-semibold uppercase tracking-[0.16em] text-campanha">
          {ui.mitoPergunta}
        </motion.p>
      )}
      <div className="w-full" style={{ perspective: 1400 }}>
        <motion.div className="grid w-full" style={{ transformStyle: "preserve-3d" }} initial="entra" animate={revelado ? "ativo" : "entra"} variants={viraCarta}>
          <div className="cartao flex items-center justify-center p-[4vmin]" style={{ gridArea: "1 / 1", backfaceVisibility: "hidden", minHeight: "44vh" }}>
            <p className="titulo text-center text-palco-titulo text-ink">“{mito.afirmacao}”</p>
          </div>
          <div
            className="flex flex-col items-center justify-center gap-[2vmin] rounded-[3vmin] cartao-aceso p-[3.4vmin] text-center"
            style={{ gridArea: "1 / 1", backfaceVisibility: "hidden", transform: "rotateY(180deg)", minHeight: "44vh" }}
          >
            <span className={`dados rounded-full px-[2.4vmin] py-[0.6vmin] text-palco-corpo font-black uppercase tracking-[0.14em] ${ehMito ? "bg-alerta text-bg" : "bg-ok text-bg"}`}>
              {ehMito ? ui.mito : ui.verdade}
            </span>
            <p className="max-w-[70vw] text-palco-nota font-semibold italic text-ink-2">“{mito.afirmacao}”</p>
            <p className="max-w-[76vw] text-palco-texto font-medium leading-snug text-ink">{mito.comentario}</p>
            <Fonte ids={mito.fonteIds} atraso={false} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/** A estrada da revisão: cada faixa de idade com os seus itens. */
export function Quilometragem({ slide }: { slide: Slide }) {
  const { ui } = useKit();
  const linhas = slide.linhas ?? [];
  return (
    <div className="flex w-full flex-col gap-[3.4vmin]">
      <Titulo sobre={ui.manual} titulo={slide.titulo} />
      <div className="relative grid gap-[2.4vmin]" style={{ gridTemplateColumns: `repeat(${linhas.length}, minmax(0, 1fr))` }}>
        <motion.div
          aria-hidden
          className="absolute left-0 right-0 top-[2.6vmin] h-[0.9vmin] rounded-full bg-campanha-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
          style={{ transformOrigin: "left" }}
        />
        {linhas.map((l, i) => (
          <motion.div key={l.faixa} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.35 }} className="relative flex flex-col gap-[1.6vmin]">
            <span className="relative z-10 flex h-[6vmin] w-[6vmin] items-center justify-center rounded-full border-[0.6vmin] border-campanha-fill bg-bg dados text-palco-nota font-bold text-campanha">
              {i + 1}
            </span>
            <span className="titulo text-palco-corpo text-ink">{l.faixa}</span>
            <ul className="flex flex-col gap-[0.8vmin]">
              {l.itens.map((it) => (
                <li key={it} className="text-palco-nota font-semibold leading-snug text-ink-2">
                  {it}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <Destaque texto={slide.destaque} atraso={1.8} />
    </div>
  );
}

/** Ponto de um homem: cheio = morreu de câncer de próstata; vazado e tracejado = morte evitada. */
export function Ponto({ evitada, pequeno }: { evitada?: boolean; pequeno?: boolean }) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 rounded-full ${pequeno ? "h-[2vmin] w-[2vmin]" : "h-[2.6vmin] w-[2.6vmin]"} ${evitada ? "border-[0.5vmin] border-dashed border-ok" : "bg-alerta"}`}
    />
  );
}
