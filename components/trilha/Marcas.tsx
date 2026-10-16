import Link from "next/link";
import { MarcaRoda, Mindheart } from "@/components/ui/Logo";

/**
 * Cabeçalho das páginas da trilha: a roda da campanha, o nome e a Mindheart;
 * e "← Trilha" ao lado. Sem marca de cliente — a trilha é a mesma para todas
 * as empresas.
 */
export function Marcas({ voltar = true, altura = 34 }: { voltar?: boolean; altura?: number }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
      <div className="inline-flex w-fit items-center gap-3 rounded-2xl border border-line bg-white px-4 py-2 shadow-sm" role="group" aria-label="Por inteiro, Novembro Azul, e Mindheart">
        <MarcaRoda tamanho={altura} />
        <span className="leading-tight">
          <span className="block text-sm font-bold text-ink">Por inteiro</span>
          <span className="dados block text-[10px] uppercase tracking-[0.14em] text-campanha">Novembro Azul</span>
        </span>
        <span aria-hidden className="mx-1 h-7 w-px bg-line-2" />
        <Mindheart altura={altura - 4} />
      </div>
      {voltar && (
        <Link href="/trilha" className="rounded-full border border-line-2 px-4 py-1.5 text-sm font-semibold text-ink-2 hover:border-acento hover:text-ink">
          ← Trilha
        </Link>
      )}
    </div>
  );
}
