import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { referencia } from "@/conteudo/referencias";

/**
 * "Fontes deste módulo": as referências que sustentam o que a página afirma,
 * com o achado em uma linha e o link para o artigo. A lista completa, com
 * busca, está em /trilha/referencias.
 */
export function FontesModulo({ ids, nota }: { ids: string[]; nota?: string }) {
  const refs = ids.map(referencia);
  return (
    <section aria-labelledby="fontes-modulo" className="mt-12 cartao cartao-suave p-5">
      <h2 id="fontes-modulo" className="dados text-[11px] font-bold uppercase tracking-[0.16em] text-acento-2">
        Fontes deste módulo
      </h2>
      {nota && <p className="mt-2 text-sm leading-relaxed text-ink-2">{nota}</p>}
      <ul className="mt-3 flex flex-col gap-3">
        {refs.map((r) => {
          const href = r.doi ? `https://doi.org/${r.doi}` : r.url;
          return (
            <li key={r.id} className="text-sm leading-snug">
              <p className="font-semibold text-ink">{r.curta}</p>
              <p className="text-ink-2">{r.achado}</p>
              {href && (
                <a href={href} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 font-bold text-acento-2 underline">
                  {r.doi ? "Abrir o artigo" : "Fonte oficial"} <ExternalLink aria-hidden className="h-3.5 w-3.5" />
                </a>
              )}
            </li>
          );
        })}
      </ul>
      <Link href="/trilha/referencias" className="mt-4 inline-block text-sm font-bold text-acento-2 underline">
        Ver todas as referências →
      </Link>
    </section>
  );
}
