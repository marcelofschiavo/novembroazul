"use client";

import { BLOCOS } from "@/conteudo/blocos";

/**
 * Barra translúcida no topo: todos os blocos da palestra, com o atual
 * destacado. O estado aparece por forma e texto (atual preenchido; os já
 * vistos com ✓), nunca só cor.
 */
export function NavBlocos({ atual }: { atual: number }) {
  return (
    <nav aria-label="Blocos da palestra" className="pointer-events-none fixed left-0 right-16 top-[10px] z-10 flex justify-center px-[3vmin]">
      <ol className="flex max-w-full flex-wrap items-center justify-center gap-x-[0.4vmin] gap-y-1 rounded-full border border-line bg-surface/70 px-[0.8vmin] py-[0.5vmin] shadow-sm backdrop-blur-md">
        {BLOCOS.map((b) => {
          const ativo = b.numero === atual;
          const feito = b.numero < atual;
          return (
            <li
              key={b.id}
              aria-current={ativo ? "step" : undefined}
              aria-label={`${b.numero}, ${b.curto}`}
              className={`dados whitespace-nowrap rounded-full px-[1vmin] py-[0.35vmin] text-[length:calc(clamp(13px,0.98vw,19px)*var(--escala-texto,1))] font-bold ${
                ativo ? "bg-acento text-sobre-acento" : feito ? "text-ink-2" : "text-muted"
              }`}
            >
              {feito && <span aria-hidden>✓ </span>}
              {b.numero} · {b.curto}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
