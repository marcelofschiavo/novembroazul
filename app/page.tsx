import Link from "next/link";
import { MarcaRoda, Mindheart } from "@/components/ui/Logo";
import { BlocoAjuda } from "@/components/ui/BlocoAjuda";
import { PALESTRANTE } from "@/conteudo/palestrante";

export default function PaginaInicial() {
  return (
    <main className="min-h-screen bg-bg text-ink">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
        <div className="flex items-center justify-between gap-6">
          <MarcaRoda tamanho={72} />
          <Mindheart altura={40} />
        </div>

        <p className="dados mt-8 text-[11px] uppercase tracking-[0.18em] text-campanha">Novembro Azul · saúde do homem</p>
        <h1 className="titulo mt-3 text-5xl text-ink sm:text-6xl">Por inteiro.</h1>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-2">
          O homem faz a revisão do carro em dia. A dele, nem sempre. Uma conversa sobre saúde do homem — do check-up à
          conversa difícil — com {PALESTRANTE.nome}, psicólogo, e uma trilha para sair do “depois eu vejo” para a consulta marcada.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/trilha" className="rounded-xl bg-acento px-7 py-4 text-base font-bold text-sobre-acento transition hover:brightness-110">
            Abrir a trilha →
          </Link>
          <Link href="/trilha/roda" className="rounded-xl border-2 border-line-2 px-7 py-4 text-base font-bold text-ink transition hover:border-acento">
            Fazer a minha Roda da Saúde
          </Link>
        </div>

        <div className="mt-12">
          <BlocoAjuda compacto />
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <p className="text-sm text-muted">
            Sem cadastro: o que você preenche fica só no seu aparelho. ·{" "}
            <Link href="/palestrante" className="underline hover:text-ink">sobre o palestrante</Link> ·{" "}
            <Link href="/trilha/referencias" className="underline hover:text-ink">referências</Link> ·{" "}
            <Link href="/campanha" className="underline hover:text-ink">material para o RH</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
