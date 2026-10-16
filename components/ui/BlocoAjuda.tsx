import Link from "next/link";

/**
 * Onde buscar ajuda. Benefícios de empresa ficam GENÉRICOS (variam de uma
 * empresa para outra): a regra é "confira com o RH". O CVV está aqui porque a
 * campanha fala de saúde mental masculina.
 */
export function BlocoAjuda({ compacto = false }: { compacto?: boolean }) {
  if (compacto) {
    return (
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border border-line bg-campanha-wash px-4 py-3 text-sm">
        <strong className="text-ink">Conteúdo educativo — não substitui consulta.</strong>
        <span className="text-ink-2">Precisa conversar? CVV 188, 24h, gratuito.</span>
        <Link href="/ajuda" className="font-semibold text-acento-2 underline">
          Onde buscar ajuda
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-campanha-wash p-6">
      <p className="dados text-[11px] uppercase tracking-[0.14em] text-acento-2">Onde buscar ajuda</p>
      <div className="mt-3 grid gap-5 sm:grid-cols-2">
        <div>
          <p className="text-lg font-bold text-ink">Para marcar a consulta</p>
          <p className="text-sm leading-relaxed text-ink-2">
            Plano de saúde ou convênio · Unidade Básica de Saúde (UBS), pelo SUS · medicina do trabalho da empresa ·
            programas de saúde ou apoio psicológico, se houver. <strong>Confira com o RH o que a sua empresa oferece.</strong>
          </p>
        </div>
        <div>
          <p className="text-lg font-bold text-ink">Para conversar agora</p>
          <p className="text-sm leading-relaxed text-ink-2">
            <strong>CVV 188</strong> — 24 horas, ligação, chat e e-mail, gratuito e sigiloso. Também é para quem só precisa conversar.{" "}
            <a href="https://www.cvv.org.br" target="_blank" rel="noopener" className="font-semibold text-acento-2 underline">cvv.org.br</a>
            <br />
            <strong>SAMU 192</strong> — emergência (dor no peito, falta de ar, sinais de AVC).
          </p>
        </div>
      </div>
    </div>
  );
}
