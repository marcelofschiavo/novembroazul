"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, Search } from "lucide-react";
import { REFERENCIAS, type Referencia } from "@/conteudo/referencias";
import { Marcas } from "@/components/trilha/Marcas";
import { escada, degrau } from "@/lib/motion";

/** Separa "Autores (ano). Título. Periódico, vol(n), pág." nas três partes que o leitor precisa distinguir. */
function partes(r: Referencia) {
  const m = r.completa.match(/^(.*?\(\d{4}[a-z]?\))\.\s*([\s\S]*)$/);
  if (!m) return { autores: "", titulo: r.completa, revista: "" };
  const [, autores, resto] = m;
  const i = resto.indexOf(". ");
  return i < 0
    ? { autores, titulo: resto, revista: "" }
    : { autores, titulo: resto.slice(0, i + 1), revista: resto.slice(i + 2) };
}

export default function PaginaReferencias() {
  const [busca, setBusca] = useState("");
  const [soBr, setSoBr] = useState(false);
  const lista = useMemo(() => {
    const q = busca.trim().toLowerCase();
    const base = soBr ? REFERENCIAS.filter((r) => r.br) : REFERENCIAS;
    return q ? base.filter((r) => `${r.completa} ${r.achado}`.toLowerCase().includes(q)) : base;
  }, [busca, soBr]);
  const totalBr = REFERENCIAS.filter((r) => r.br).length;

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Marcas />
      <h1 className="titulo mt-8 text-4xl text-ink sm:text-5xl">Referências científicas</h1>
      <p className="mt-3 max-w-prose text-lg text-ink-2">
        Todo dado citado na palestra e na trilha, com a referência completa e o link para o artigo ou a fonte oficial. Dados oficiais (IBGE, INCA, Ministério da Saúde, OMS) não têm DOI: o link leva à página de origem.
      </p>

      <label className="mt-8 flex items-center gap-3 rounded-xl border-2 border-line-2 bg-surface-2 px-4 py-3 focus-within:border-acento">
        <Search aria-hidden className="h-5 w-5 shrink-0 text-muted" />
        <span className="sr-only">Buscar por autor, tema ou revista</span>
        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por autor, tema ou revista…"
          className="w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
        />
      </label>
      <button
        type="button"
        aria-pressed={soBr}
        onClick={() => setSoBr((b) => !b)}
        className={`mt-3 rounded-full border-2 px-4 py-1.5 text-sm font-bold ${soBr ? "border-acento bg-acento text-sobre-acento" : "border-line-2 text-ink-2 hover:border-acento"}`}
      >
        {soBr ? "✓ " : ""}Só ciência e dados brasileiros ({totalBr})
      </button>
      <p className="mt-2 text-sm text-muted" aria-live="polite">
        {lista.length} de {REFERENCIAS.length} referências
      </p>

      <motion.ol initial="entra" animate="ativo" variants={escada(0.05, 0.1)} className="mt-6 flex flex-col gap-5">
        {lista.map((r, i) => {
          const p = partes(r);
          return (
            <motion.li key={r.id} variants={degrau} className="cartao cartao-suave p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <span aria-hidden className="dados flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-acento text-sm font-bold text-sobre-acento">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  {p.autores && <p className="text-sm font-semibold text-muted">{p.autores}</p>}
                  <h2 className="mt-1 text-lg font-bold leading-snug text-ink">{p.titulo}</h2>
                  {p.revista && <p className="mt-1 text-sm italic text-ink-2">{p.revista}</p>}
                  {r.br && <span className="dados mt-2 inline-block rounded-full bg-campanha-wash px-2.5 py-0.5 text-[11px] font-bold uppercase text-campanha">Brasil</span>}
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-acento-wash px-4 py-3">
                <p className="dados text-[11px] font-bold uppercase tracking-[0.14em] text-acento-2">O que o estudo mostra</p>
                <p className="mt-1 text-base leading-relaxed text-ink">{r.achado}</p>
              </div>

              {(r.doi || r.url) && (
                <a
                  href={r.doi ? `https://doi.org/${r.doi}` : r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-0.5 rounded-2xl border-2 border-acento px-4 py-1.5 text-sm font-bold text-acento-2 hover:bg-acento hover:text-sobre-acento"
                >
                  {r.doi ? "Abrir o artigo" : "Abrir a fonte oficial"} <ExternalLink aria-hidden className="h-4 w-4" />
                  {r.doi && <span className="dados text-xs font-medium opacity-70 [overflow-wrap:anywhere]">doi:{r.doi}</span>}
                </a>
              )}
            </motion.li>
          );
        })}
      </motion.ol>
      {lista.length === 0 && <p className="mt-8 text-ink-2">Nada encontrado para “{busca}”.</p>}
    </main>
  );
}
