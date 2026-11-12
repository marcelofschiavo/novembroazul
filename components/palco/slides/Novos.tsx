"use client";

import { motion } from "motion/react";
import {
  BedDouble,
  Briefcase,
  CloudRain,
  Droplet,
  HeartPulse,
  House,
  MoonStar,
  Shield,
  TriangleAlert,
  Users,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { degrau, escada } from "@/lib/motion";
import { Titulo, Destaque } from "./comum";
import { Ponto } from "./Revisao";
import { LUZES_NIVEIS } from "@/conteudo/saude";
import type { Slide } from "@/conteudo/blocos";

/* Slides novos de nov/2026: PSA + toque, luzes por cor, couraça, quem conta com você. */

/**
 * PSA e toque retal num slide só: a balança do PSA (números absolutos, em
 * 1.000 homens), o que o exame pode trazer e o toque retal. A divergência
 * entre SBU e Ministério da Saúde vai no destaque.
 */
export function PsaToque({ slide }: { slide: Slide }) {
  const grupos = [
    { rotulo: "Sem o exame", mortes: 12, evitadas: 0 },
    { rotulo: "Com o exame", mortes: 10, evitadas: 2 },
  ];
  const riscos = ["Alarme falso e biópsia à toa", "Tratar câncer que não faria mal", "Efeitos no xixi e na ereção"];
  return (
    <div className="flex w-full flex-col gap-[2.6vmin]">
      <Titulo sobre={slide.sobre} titulo={slide.titulo} />
      <div className="grid grid-cols-[1.45fr_1fr_1fr] gap-[2.4vmin]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="cartao-aceso flex flex-col gap-[1.2vmin] rounded-[2.4vmin] p-[2.2vmin]">
          <span className="titulo text-palco-corpo text-campanha">O que o PSA ajuda</span>
          <span className="text-palco-nota font-semibold leading-snug text-ink-2">Mortes por câncer de próstata, em 1.000 homens:</span>
          {grupos.map((g) => (
            <div key={g.rotulo} className="grid grid-cols-[auto_1fr_auto] items-center gap-[1.4vmin]">
              <span className="text-palco-nota font-bold text-ink">{g.rotulo}</span>
              <span className="flex gap-[0.4vmin]" role="img" aria-label={`${g.rotulo}: ${g.mortes} em 1.000`}>
                {Array.from({ length: g.mortes }, (_, i) => <Ponto key={i} pequeno />)}
                {Array.from({ length: g.evitadas }, (_, i) => <Ponto key={`e${i}`} evitada pequeno />)}
              </span>
              <span className="titulo text-palco-corpo leading-none text-ink">{g.mortes}</span>
            </div>
          ))}
          <p className="flex items-center gap-[1.2vmin] text-palco-nota font-bold leading-snug text-ink">
            <Ponto evitada pequeno /> 2 mortes a menos em 1.000
          </p>
          <p className="dados text-palco-rodape text-muted">Mortes por qualquer causa: sem diferença.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="cartao cartao-suave flex flex-col gap-[1.4vmin] rounded-[2.4vmin] p-[2.2vmin]">
          <span className="titulo text-palco-corpo text-ink-2">O outro lado</span>
          <ul className="flex flex-col gap-[1.4vmin]">
            {riscos.map((r) => (
              <li key={r} className="flex items-baseline gap-[1.2vmin] text-palco-nota font-semibold leading-snug text-ink">
                <span aria-hidden className="text-muted">▸</span>
                {r}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }} className="cartao flex flex-col gap-[1.4vmin] rounded-[2.4vmin] p-[2.2vmin]">
          <span className="titulo text-palco-corpo text-ink">E o toque retal?</span>
          <ul className="flex flex-col gap-[1.4vmin]">
            {slide.itens?.map((it) => (
              <li key={it} className="flex items-baseline gap-[1.2vmin] text-palco-nota font-semibold leading-snug text-ink">
                <span aria-hidden className="text-campanha">▸</span>
                {it}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
      <Destaque texto={slide.destaque} atraso={1.8} />
    </div>
  );
}

/* Cores das luzes: só preenchimento e borda — o texto fica sempre em --ink. */
const COR_LUZ: Record<string, string> = { vermelha: "#E5484D", laranja: "#F08A1C", amarela: "#F2C21B" };
const ICONE_SINAL: Record<string, LucideIcon> = { coracao: HeartPulse, vento: Wind, gota: Droplet, noite: MoonStar, lua: BedDouble, nuvem: CloudRain };

/** Barrinhas de intensidade (3, 2 ou 1 cheias): a cor nunca é o único sinal. */
function Intensidade({ n, cor }: { n: number; cor: string }) {
  return (
    <span role="img" aria-label={`intensidade ${n} de 3`} className="flex items-end gap-[0.4vmin]">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-[1vmin] rounded-[0.3vmin] border-[0.25vmin]"
          style={{ height: `${1 + i * 0.7}vmin`, borderColor: cor, background: i <= n ? cor : "transparent" }}
        />
      ))}
    </span>
  );
}

/**
 * Luzes de alerta por intensidade, como no painel do carro: vermelha (agora),
 * laranja (logo), amarela (marque). Cada faixa tem nome, ação, tempo,
 * barras de intensidade e os sinais com ícone.
 */
export function LuzesNivel({ slide }: { slide: Slide }) {
  return (
    <div className="flex w-full flex-col gap-[2.2vmin]">
      <Titulo sobre={slide.sobre} titulo={slide.titulo} />
      <motion.ul initial="entra" animate="ativo" variants={escada(0.45, 0.4)} className="flex flex-col gap-[1.2vmin]">
        {LUZES_NIVEIS.map((nivel) => {
          const cor = COR_LUZ[nivel.id];
          return (
            <motion.li
              key={nivel.id}
              variants={degrau}
              className="grid grid-cols-[33vw_1fr] items-center gap-[2vmin] rounded-[2vmin] border-[0.25vmin] border-l-[1.2vmin] px-[1.6vmin] py-[1vmin]"
              style={{ borderColor: cor, background: `color-mix(in srgb, ${cor} 13%, var(--surface))` }}
            >
              <div className="flex items-center gap-[1.8vmin]">
                <span
                  aria-hidden
                  className="flex h-[7vmin] w-[7vmin] shrink-0 items-center justify-center rounded-full"
                  style={{ background: cor, boxShadow: `0 0 2.8vmin ${cor}` }}
                >
                  <TriangleAlert className="h-[4vmin] w-[4vmin] text-[#0B1B33]" strokeWidth={2.6} />
                </span>
                <span className="flex min-w-0 flex-col gap-[0.2vmin]">
                  <span className="flex items-center gap-[1.2vmin]">
                    <span className="dados text-palco-rodape font-bold uppercase tracking-[0.12em] text-ink">{nivel.nome}</span>
                    <Intensidade n={nivel.intensidade} cor={cor} />
                  </span>
                  <span className="titulo text-palco-corpo leading-tight text-ink">{nivel.acao}</span>
                  <span className="text-palco-nota font-semibold leading-tight text-ink-2">{nivel.quando}</span>
                </span>
              </div>
              <ul className="grid grid-cols-3 gap-[1.2vmin]">
                {nivel.sinais.map((s) => {
                  const Icone = ICONE_SINAL[s.icone];
                  return (
                    <li key={s.texto} className={`flex items-center gap-[1vmin] rounded-[1.4vmin] border border-line bg-surface/80 px-[1.2vmin] py-[0.9vmin] ${nivel.sinais.length === 1 ? "col-span-2" : ""}`}>
                      <Icone aria-hidden className="h-[3.4vmin] w-[3.4vmin] shrink-0 text-ink" strokeWidth={2.2} />
                      <span className="text-palco-nota font-semibold leading-tight text-ink">{s.texto}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.li>
          );
        })}
      </motion.ul>
      <Destaque texto={slide.destaque} atraso={1.8} />
    </div>
  );
}

/**
 * O silêncio dos homens: à esquerda, a couraça (as frases que a gente
 * aprende cedo); à direita, o que fica do lado de dentro e um número.
 */
export function Couraca({ slide }: { slide: Slide }) {
  const dentro = slide.colunas?.[0];
  const num = slide.numeros?.[0];
  return (
    <div className="flex w-full flex-col gap-[2.8vmin]">
      <Titulo sobre={slide.sobre} titulo={slide.titulo} />
      <div className="grid grid-cols-2 gap-[3vmin]">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.55 }} className="flex flex-col gap-[1.4vmin] rounded-[2.4vmin] bg-ink p-[2.4vmin] text-bg">
          <span className="flex items-center gap-[1.4vmin]">
            <Shield aria-hidden className="h-[5vmin] w-[5vmin]" strokeWidth={2.2} />
            <span className="dados text-palco-rodape font-bold uppercase tracking-[0.14em]">O que a couraça diz</span>
          </span>
          <motion.ul initial="entra" animate="ativo" variants={escada(0.25, 0.6)} className="flex flex-col gap-[1vmin]">
            {slide.itens?.map((f) => (
              <motion.li key={f} variants={degrau} className="titulo rounded-[1.4vmin] border-[0.3vmin] border-bg/40 px-[1.8vmin] py-[0.9vmin] text-palco-texto leading-tight">
                “{f}”
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4, duration: 0.55 }} className="cartao flex flex-col gap-[1.6vmin] rounded-[2.4vmin] p-[2.4vmin]">
          {dentro && (
            <>
              <span className="titulo text-palco-corpo text-campanha">{dentro.titulo}</span>
              <ul className="flex flex-col gap-[1vmin]">
                {dentro.itens.map((it) => (
                  <li key={it} className="flex items-baseline gap-[1.2vmin] text-palco-nota font-semibold leading-snug text-ink">
                    <span aria-hidden className="text-campanha">▸</span>
                    {it}
                  </li>
                ))}
              </ul>
            </>
          )}
          {num && (
            <div className="mt-auto flex items-center gap-[2vmin] border-t-2 border-line pt-[1.6vmin]">
              <span className="titulo text-[length:calc(clamp(48px,4.8vw,112px)*var(--escala-texto,1))] leading-none texto-grad">{num.valor}</span>
              <span className="flex flex-col">
                <span className="text-palco-texto font-semibold leading-tight text-ink">{num.rotulo}</span>
                {num.detalhe && <span className="dados text-palco-nota text-muted">{num.detalhe}</span>}
              </span>
            </div>
          )}
        </motion.div>
      </div>
      <Destaque texto={slide.destaque} atraso={2.2} />
    </div>
  );
}

const ICONE_CIRCULO: LucideIcon[] = [House, Briefcase, Users];
const ROTULO_ANEL = ["Casa", "Trabalho", "Amigos"];

/**
 * Quem conta com você: círculos em volta do "você" (casa, trabalho, amigos)
 * — quando o homem para, a onda chega em todo mundo. Sem susto: o fecho é
 * "cuidar de você também é cuidar deles".
 */
export function QuemConta({ slide }: { slide: Slide }) {
  const circulos = slide.passos ?? [];
  // De fora para dentro: amigos, trabalho, casa — e o "você" no centro.
  const aneis = circulos.map((c, i) => ({ rotulo: ROTULO_ANEL[i] ?? c.titulo, Icone: ICONE_CIRCULO[i] ?? Users })).reverse();
  const tamanhos = [100, 76, 52];
  return (
    <div className="grid w-full grid-cols-[1fr_auto] items-center gap-[5vmin]">
      <div className="flex min-w-0 flex-col gap-[2.6vmin]">
        <Titulo sobre={slide.sobre} titulo={slide.titulo} />
        <motion.ul initial="entra" animate="ativo" variants={escada(0.35, 0.5)} className="flex flex-col gap-[1.6vmin]">
          {circulos.map((c, i) => {
            const Icone = ICONE_CIRCULO[i] ?? Users;
            return (
              <motion.li key={c.titulo} variants={degrau} className="flex items-start gap-[1.8vmin]">
                <span aria-hidden className="flex h-[6.4vmin] w-[6.4vmin] shrink-0 items-center justify-center rounded-full bg-campanha-wash text-campanha">
                  <Icone className="h-[3.6vmin] w-[3.6vmin]" strokeWidth={2.2} />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="titulo text-palco-corpo leading-tight text-ink">{c.titulo}</span>
                  {c.texto && <span className="text-palco-texto font-semibold leading-snug text-ink-2">{c.texto}</span>}
                </span>
              </motion.li>
            );
          })}
        </motion.ul>
        {slide.instrucao && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="text-palco-corpo font-bold leading-snug text-campanha">
            {slide.instrucao}
          </motion.p>
        )}
        <Destaque texto={slide.destaque} atraso={2.6} />
      </div>

      <div aria-hidden className="relative aspect-square" style={{ width: "min(34vw, 58vh)" }}>
        {aneis.map((a, i) => (
          <motion.div
            key={a.rotulo}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 - i * 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute flex justify-center rounded-full border-[0.4vmin] border-campanha-fill pt-[1.6%]"
            style={{
              inset: `${(100 - tamanhos[i]) / 2}%`,
              background: `color-mix(in srgb, var(--campanha-fill) ${10 + i * 7}%, var(--bg))`,
            }}
          >
            <span className="dados flex h-fit items-center gap-[0.8vmin] text-palco-rodape font-bold uppercase tracking-[0.1em] text-ink">
              <a.Icone className="h-[1.2em] w-[1.2em]" strokeWidth={2.4} />
              {a.rotulo}
            </span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="titulo absolute inset-[36%] flex items-center justify-center rounded-full bg-acento text-palco-corpo text-sobre-acento shadow-[0_0_4vmin_var(--campanha-fill)]"
        >
          Você
        </motion.div>
      </div>
    </div>
  );
}
