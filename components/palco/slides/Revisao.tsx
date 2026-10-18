"use client";

import { motion } from "motion/react";
import { Droplet, MoonStar, HeartPulse, BedDouble, Zap, CloudRain, type LucideIcon } from "lucide-react";
import { degrau, escada, viraCarta } from "@/lib/motion";
import { Titulo, Destaque } from "./comum";
import { RodaGrafico } from "@/components/ui/RodaGrafico";
import { AREAS_RODA, LUZES, type Mito } from "@/conteudo/saude";
import { fontesCurtas } from "@/conteudo/referencias";
import type { Slide } from "@/conteudo/blocos";

/** Roda ao vivo: as 8 áreas em volta e a roda torta de exemplo no meio. */
export function RodaSlide({ slide }: { slide: Slide }) {
  return (
    <div className="grid w-full grid-cols-[1fr_auto] items-center gap-[4vmin]">
      <div className="flex min-w-0 flex-col gap-[3vmin]">
        <Titulo sobre="Alinhamento e balanceamento" titulo={slide.titulo} />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-palco-corpo font-semibold leading-snug text-ink">
          {slide.instrucao}
        </motion.p>
        <motion.ol initial="entra" animate="ativo" variants={escada(0.08, 0.9)} className="grid grid-cols-2 gap-x-[3vmin] gap-y-[0.8vmin]">
          {AREAS_RODA.map((a, i) => (
            <motion.li key={a.id} variants={degrau} className="flex items-baseline gap-[1vmin] text-palco-nota font-semibold text-ink-2">
              <span className="dados text-campanha">{i + 1}</span> {a.nome}
            </motion.li>
          ))}
        </motion.ol>
        <p className="dados text-palco-rodape text-muted">Ferramenta de reflexão, não é teste. Na trilha, vira o seu gráfico.</p>
      </div>
      <div style={{ width: "min(38vw, 60vh)" }}>
        <RodaGrafico rotulos={false} />
      </div>
    </div>
  );
}

/** Carta que vira ao revelar: afirmação na frente, veredito e explicação atrás. */
export function CartaMito({ mito, revelado }: { mito: Mito; revelado: boolean }) {
  const ehMito = mito.resposta === "mito";
  return (
    <div className="flex w-full flex-col gap-[2.4vmin]">
      {!revelado && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dados text-palco-nota font-semibold uppercase tracking-[0.16em] text-campanha">
          mito ou verdade? · levante a mão
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
              {ehMito ? "Mito" : "Verdade"}
            </span>
            <p className="max-w-[70vw] text-palco-nota font-semibold italic text-ink-2">“{mito.afirmacao}”</p>
            <p className="max-w-[76vw] text-palco-texto font-medium leading-snug text-ink">{mito.comentario}</p>
            <p className="dados text-palco-rodape text-muted">fonte: {fontesCurtas(mito.fonteIds)}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/** A estrada da revisão: cada faixa de idade com os seus itens. */
export function Quilometragem({ slide }: { slide: Slide }) {
  const linhas = slide.linhas ?? [];
  return (
    <div className="flex w-full flex-col gap-[3.4vmin]">
      <Titulo sobre="O manual do proprietário" titulo={slide.titulo} />
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

/** Caixa de fatos: 1.000 homens com e sem rastreamento, com as mortes por câncer de próstata acesas. */
export function CaixaFatos({ slide }: { slide: Slide }) {
  const grupos = [
    { rotulo: "Com rastreamento", mortes: 10 },
    { rotulo: "Sem rastreamento", mortes: 12 },
  ];
  return (
    <div className="flex w-full flex-col gap-[2vmin]">
      <Titulo sobre="Caixa de fatos · 16 anos de acompanhamento" titulo={slide.titulo} />
      <div className="grid grid-cols-2 gap-[4vmin]">
        {grupos.map((g, gi) => (
          <motion.div key={g.rotulo} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + gi * 0.4 }} className="flex flex-col gap-[1.2vmin]">
            <div className="flex items-baseline justify-between gap-4">
              <span className="titulo text-palco-nota text-ink">{g.rotulo}</span>
              <span className="text-palco-nota font-bold text-campanha">
                <span className="titulo text-palco-corpo">{g.mortes}</span> em 1.000
              </span>
            </div>
            <svg viewBox="0 0 400 160" className="w-full" style={{ maxHeight: "22vh" }} role="img" aria-label={`${g.rotulo}: ${g.mortes} mortes por câncer de próstata em 1.000 homens`}>
              {Array.from({ length: 1000 }, (_, i) => {
                const col = i % 50;
                const lin = Math.floor(i / 50);
                const aceso = i < g.mortes;
                return <circle key={i} cx={4 + col * 8} cy={4 + lin * 8} r={aceso ? 3.6 : 2.6} fill={aceso ? "var(--alerta)" : "var(--line-2)"} />;
              })}
            </svg>
          </motion.div>
        ))}
      </div>
      <p className="dados text-palco-rodape text-muted">Cada ponto é um homem. Os pontos maiores, no canto, são as mortes por câncer de próstata.</p>
      <Destaque texto={slide.destaque} atraso={1.4} />
    </div>
  );
}

const ICONE_LUZ: Record<string, LucideIcon> = { gota: Droplet, noite: MoonStar, coracao: HeartPulse, lua: BedDouble, raio: Zap, nuvem: CloudRain };

/** Luzes do painel: sinais que pedem consulta antes da revisão. */
export function Luzes({ slide }: { slide: Slide }) {
  return (
    <div className="flex w-full flex-col gap-[3vmin]">
      <Titulo sobre="Luzes do painel" titulo={slide.titulo} />
      <motion.ul initial="entra" animate="ativo" variants={escada(0.12, 0.4)} className="grid grid-cols-3 gap-[2vmin]">
        {LUZES.map((l) => {
          const Icone = ICONE_LUZ[l.icone];
          return (
            <motion.li key={l.id} variants={degrau} className="flex items-center gap-[1.6vmin] rounded-[2vmin] border-2 border-atencao bg-atencao-wash p-[1.5vmin]">
              <span aria-hidden className="flex h-[6vmin] w-[6vmin] shrink-0 items-center justify-center rounded-full bg-atencao text-bg">
                <Icone className="h-[4vmin] w-[4vmin]" strokeWidth={2.4} />
              </span>
              <span className="text-palco-nota font-semibold leading-snug text-ink">{l.texto}</span>
            </motion.li>
          );
        })}
      </motion.ul>
      <Destaque texto={slide.destaque} atraso={1.4} />
    </div>
  );
}
