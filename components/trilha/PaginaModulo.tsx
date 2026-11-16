"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, BookOpen, Lightbulb } from "lucide-react";
import { Marcas } from "./Marcas";
import { MarcarConcluido } from "./MarcarConcluido";
import { FontesModulo } from "./FontesModulo";
import { MODULOS_ESSENCIAIS } from "@/conteudo/trilha";

/**
 * Molde de toda página de módulo, sempre na mesma ordem, para a pessoa não
 * se perder: a ideia em uma frase → onde isso aparece na história do Davi →
 * o exercício → o que levar → por que funciona (com fonte) → o próximo passo.
 * Nos essenciais, o fim da página leva direto ao passo seguinte (e o último,
 * ao certificado): ninguém precisa voltar ao início para continuar.
 * `concluido` marca o módulo (só neste aparelho).
 */
export function PaginaModulo({
  id,
  sobre,
  titulo,
  ideia,
  historia,
  leve,
  porque,
  fontes,
  concluido = true,
  children,
}: {
  id: string;
  sobre?: string;
  titulo: string;
  ideia: string;
  /** Onde o assunto aparece na história do Davi, do Roberto e da Lia. */
  historia?: string;
  /** A frase para levar: o que fica, se a pessoa esquecer o resto. */
  leve?: string;
  porque?: string;
  fontes?: string[];
  concluido?: boolean;
  children: React.ReactNode;
}) {
  const i = MODULOS_ESSENCIAIS.findIndex((m) => m.id === id);
  const essencial = i >= 0;
  const proximo = essencial ? MODULOS_ESSENCIAIS[i + 1] : undefined;
  const seguinte = proximo
    ? { href: proximo.href, rotulo: `Próximo passo: ${proximo.rotulo}` }
    : essencial
      ? { href: "/trilha/certificado", rotulo: "Fim da trilha: gerar o certificado" }
      : { href: "/trilha", rotulo: "Voltar à trilha" };
  return (
    <main className="mx-auto max-w-2xl px-5 py-10 sm:px-6 sm:py-12">
      {concluido && <MarcarConcluido modulo={id} />}
      <Marcas />
      {essencial && (
        <ol className="mt-8 flex gap-1.5" aria-label={`Passo ${i + 1} de ${MODULOS_ESSENCIAIS.length}`}>
          {MODULOS_ESSENCIAIS.map((m, k) => (
            <li key={m.id} className="flex-1">
              <span aria-current={k === i ? "step" : undefined} className={`block h-1.5 rounded-full ${k < i ? "bg-acento/60" : k === i ? "bg-acento" : "bg-line-2"}`} />
            </li>
          ))}
        </ol>
      )}
      <p className={`pilula dados ${essencial ? "mt-5" : "mt-8"} text-[11px] uppercase tracking-[0.16em] text-campanha`}>
        {sobre ?? (essencial ? `Passo ${i + 1} de ${MODULOS_ESSENCIAIS.length}` : "Pra ir além")}
      </p>
      <h1 className="titulo mt-3 text-4xl tracking-[-0.02em] text-ink sm:text-5xl">{titulo}</h1>
      <p className="mt-3 text-lg leading-relaxed text-ink-2">{ideia}</p>
      {historia && (
        <div className="mt-5 flex gap-3 rounded-2xl bg-campanha-wash/70 px-4 py-3">
          <BookOpen aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-campanha" />
          <p className="text-[15px] leading-relaxed text-ink">
            <span className="font-bold">Na história. </span>
            {historia}
          </p>
        </div>
      )}
      <div className="mt-8">{children}</div>
      {leve && (
        <div className="mt-10 rounded-2xl border-l-4 border-campanha-fill bg-surface-2 px-5 py-4">
          <p className="dados text-[11px] font-bold uppercase tracking-[0.16em] text-campanha">Para levar</p>
          <p className="titulo mt-1 text-2xl leading-snug text-ink">{leve}</p>
        </div>
      )}
      {porque && <PorqueAjuda texto={porque} />}
      {fontes && fontes.length > 0 && <FontesModulo ids={fontes} />}
      <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6">
        <Link href={seguinte.href} className="inline-flex items-center justify-center gap-2 rounded-xl bg-acento px-5 py-3.5 text-center font-bold text-sobre-acento hover:brightness-110">
          {seguinte.rotulo} <ArrowRight aria-hidden className="h-4 w-4 shrink-0" />
        </Link>
        {seguinte.href !== "/trilha" && (
          <Link href="/trilha" className="self-center text-sm font-semibold text-ink-2 underline hover:text-ink">Ver a trilha inteira</Link>
        )}
      </div>
    </main>
  );
}

function PorqueAjuda({ texto }: { texto: string }) {
  const [aberto, setAberto] = useState(false);
  return (
    <div className="mt-8 cartao cartao-suave px-4 py-3">
      <button onClick={() => setAberto((a) => !a)} aria-expanded={aberto} className="flex w-full items-center justify-between gap-3 text-left text-sm font-semibold text-ink-2">
        <span className="inline-flex items-center gap-2"><Lightbulb aria-hidden className="h-4 w-4 text-campanha" /> Por que funciona</span>
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
    <div className={`rounded-2xl border-l-4 px-4 py-3 ${estilo}`}>
      <p className={`font-bold ${cor}`}>{titulo}</p>
      {children && <div className="mt-1 text-[15px] leading-relaxed text-ink">{children}</div>}
    </div>
  );
}
