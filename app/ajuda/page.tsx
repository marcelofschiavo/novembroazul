import type { Metadata } from "next";
import { Marcas } from "@/components/trilha/Marcas";
import { BlocoAjuda } from "@/components/ui/BlocoAjuda";
import { MarcarConcluido } from "@/components/trilha/MarcarConcluido";

export const metadata: Metadata = {
  title: "Onde buscar ajuda · Por inteiro · Novembro Azul",
  description: "Onde marcar a consulta e onde conversar agora: plano de saúde, UBS, medicina do trabalho, CVV 188 e SAMU 192.",
};

export default function PaginaAjuda() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-10 sm:px-6 sm:py-12">
      <MarcarConcluido modulo="ajuda" />
      <Marcas />
      <h1 className="titulo mt-8 text-4xl text-ink sm:text-5xl">Onde buscar ajuda</h1>
      <p className="mt-3 text-lg text-ink-2">
        Para a revisão de rotina, para uma luz do painel que acendeu, ou para conversar agora.
      </p>

      <div className="mt-8">
        <BlocoAjuda />
      </div>

      <section className="mt-8 rounded-2xl border border-line bg-surface p-5">
        <h2 className="text-xl font-bold text-ink">Na empresa</h2>
        <p className="mt-2 text-ink-2">
          Cada empresa tem os seus benefícios — plano de saúde, programa de bem-estar, apoio psicológico, medicina do
          trabalho, CIPA. <strong>Pergunte ao RH o que existe aí e como usar.</strong> O exame periódico também é uma
          chance de conversar sobre o seu painel.
        </p>
      </section>

      <section className="mt-6 rounded-2xl border border-line bg-surface p-5">
        <h2 className="text-xl font-bold text-ink">No SUS</h2>
        <p className="mt-2 text-ink-2">
          A Unidade Básica de Saúde (UBS) do seu bairro é a porta de entrada — também para o homem. Lá dá para medir a
          pressão, pedir exames de rotina e ser encaminhado quando preciso.
        </p>
      </section>

      <p className="mt-8 text-sm text-muted">Conteúdo educativo: não substitui consulta.</p>
    </main>
  );
}
