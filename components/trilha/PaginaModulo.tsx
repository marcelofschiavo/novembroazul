"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Lightbulb } from "lucide-react";
import { Marcas } from "./Marcas";
import { MarcarConcluido } from "./MarcarConcluido";
import { FontesModulo } from "./FontesModulo";
import { MODULOS_ESSENCIAIS } from "@/conteudo/trilha";

/**
 * Molde de toda página de módulo: cabeçalho, título, a ideia em uma frase,
 * o "por que isso ajuda" (com base em estudo), o conteúdo, as fontes e o
 * próximo passo. `concluido` marca o módulo (só neste aparelho).
 */
export function PaginaModulo({
  id,
  sobre,
  titulo,
  ideia,
  porque,
  fontes,
  concluido = true,
  children,
}: {
  id: string;
  sobre?: string;
  titulo: string;
  ideia: string;
  porque?: string;
  fontes?: string[];
  concluido?: boolean;
  children: React.ReactNode;
}) {
  const i = MODULOS_ESSENCIAIS.findIndex((m) => m.id === id);
  const proximo = i >= 0 ? MODULOS_ESSENCIAIS[i + 1] : undefined;
  return (
    <main className="mx-auto max-w-2xl px-5 py-10 sm:px-6 sm:py-12">
      {concluido && <MarcarConcluido modulo={id} />}
      <Marcas />
      <p className="dados mt-8 text-[11px] uppercase tracking-[0.18em] text-campanha">
        {sobre ?? (i >= 0 ? `Passo ${i + 1} de ${MODULOS_ESSENCIAIS.length}` : "Pra ir além")}
      </p>
      <h1 className="titulo mt-2 text-4xl text-ink sm:text-5xl">{titulo}</h1>
      <p className="mt-3 text-lg leading-relaxed text-ink-2">{ideia}</p>
      {porque && <PorqueAjuda texto={porque} />}
      <div className="mt-8">{children}</div>
      {fontes && fontes.length > 0 && <FontesModulo ids={fontes} />}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
        <Link href="/trilha" className="text-sm font-semibold text-ink-2 underline hover:text-ink">← Voltar à trilha</Link>
        {proximo && (
          <Link href={proximo.href} className="inline-flex items-center gap-2 rounded-full bg-acento px-5 py-2.5 text-sm font-bold text-sobre-acento hover:brightness-110">
            Próximo: {proximo.rotulo} <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        )}
      </div>
    </main>
  );
}

function PorqueAjuda({ texto }: { texto: string }) {
  const [aberto, setAberto] = useState(false);
  return (
    <div className="mt-4 rounded-xl border border-line bg-surface-2 px-4 py-3">
      <button onClick={() => setAberto((a) => !a)} aria-expanded={aberto} className="flex w-full items-center justify-between gap-3 text-left text-sm font-semibold text-ink-2">
        <span className="inline-flex items-center gap-2"><Lightbulb aria-hidden className="h-4 w-4 text-campanha" /> Por que isso ajuda</span>
        <span className="text-muted">{aberto ? "−" : "+"}</span>
      </button>
      {aberto && <p className="mt-2 text-sm leading-relaxed text-ink-2">{texto}</p>}
    </div>
  );
}

/** Caixa de resultado com tom (ok/atenção/alerta) — o tom vai também no texto, nunca só na cor. */
export function Resultado({ tom, titulo, children }: { tom: "ok" | "atencao" | "alerta" | "neutro"; titulo: string; children?: React.ReactNode }) {
  const estilo = {
    ok: "border-ok bg-ok-wash",
    atencao: "border-atencao bg-atencao-wash",
    alerta: "border-alerta bg-alerta-wash",
    neutro: "border-line-2 bg-surface-2",
  }[tom];
  const cor = { ok: "text-ok", atencao: "text-atencao", alerta: "text-alerta", neutro: "text-ink-2" }[tom];
  return (
    <div className={`rounded-xl border-l-4 px-4 py-3 ${estilo}`}>
      <p className={`font-bold ${cor}`}>{titulo}</p>
      {children && <div className="mt-1 text-[15px] leading-relaxed text-ink">{children}</div>}
    </div>
  );
}
