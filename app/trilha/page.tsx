"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight, BookOpen, Check, Gauge, Microscope, Siren, Brain, CalendarCheck, ListChecks, HeartHandshake, CloudRain, BedDouble,
  LifeBuoy, Library, User, Disc3, type LucideIcon,
} from "lucide-react";
import { levanta } from "@/lib/motion";
import { lerProgresso, apagarTudoLocal } from "@/lib/local";
import { MODULOS_ESSENCIAIS, MODULOS_EXTRAS, MODULOS_TRILHA, type ModuloTrilha } from "@/conteudo/trilha";
import { AnelProgresso } from "@/components/trilha/AnelProgresso";
import { Marcas } from "@/components/trilha/Marcas";
import { BlocoAjuda } from "@/components/ui/BlocoAjuda";

const ICONE: Record<string, LucideIcon> = {
  roda: Disc3,
  numeros: Gauge,
  psa: Microscope,
  luzes: Siren,
  adio: Brain,
  plano: CalendarCheck,
  quiz: ListChecks,
  cuida: HeartHandshake,
  cabeca: CloudRain,
  sono: BedDouble,
  reveja: BookOpen,
  ajuda: LifeBuoy,
  referencias: Library,
  palestrante: User,
};

function ListaModulos({ modulos, concluidos, grade = false, numerar = false }: { modulos: ModuloTrilha[]; concluidos: string[]; grade?: boolean; numerar?: boolean }) {
  return (
    <ul className={grade ? "grid gap-4 sm:grid-cols-2" : "grid gap-3"}>
      {modulos.map((m, i) => {
        const feito = concluidos.includes(m.id);
        const Icone = ICONE[m.id] ?? BookOpen;
        return (
          <motion.li key={m.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}>
            <motion.div {...levanta} className="h-full">
              <Link
                href={m.href}
                className={`group flex h-full items-center gap-4 rounded-2xl border-2 bg-surface p-4 shadow-sm transition-colors hover:border-acento ${feito ? "border-acento" : "border-line"}`}
              >
                <span aria-hidden className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${feito ? "bg-acento text-sobre-acento" : "bg-acento-wash text-acento-2"}`}>
                  {feito ? <Check className="h-6 w-6" strokeWidth={3} /> : <Icone className="h-6 w-6" strokeWidth={2} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-bold leading-snug text-ink">
                    {numerar && <span className="dados mr-2 text-sm text-muted">{i + 1}.</span>}
                    {m.rotulo}
                  </span>
                  <span className="mt-0.5 block text-[15px] leading-snug text-ink-2">{m.desc}</span>
                  <span className="dados mt-1 block text-xs font-semibold uppercase text-muted">
                    {feito ? <span className="text-acento-2">feito</span> : `${m.minutos} min`}
                  </span>
                </span>
                <ArrowRight aria-hidden className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-acento" />
              </Link>
            </motion.div>
          </motion.li>
        );
      })}
    </ul>
  );
}

export default function PaginaTrilha() {
  const [concluidos, setConcluidos] = useState<string[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConcluidos(lerProgresso().modulos);
  }, []);

  const feitos = MODULOS_TRILHA.filter((id) => concluidos.includes(id)).length;
  const fracao = feitos / MODULOS_TRILHA.length;

  return (
    <main className="mx-auto max-w-3xl px-5 py-10 sm:px-6 sm:py-12">
      <Marcas voltar={false} />
      <div className="mt-8 flex items-start justify-between gap-4">
        <div>
          <p className="dados text-[11px] uppercase tracking-[0.18em] text-campanha">Trilha · Novembro Azul</p>
          <h1 className="titulo mt-2 text-4xl text-ink sm:text-5xl">A sua revisão, por inteiro.</h1>
        </div>
        <AnelProgresso fracao={fracao} tamanho={72} />
      </div>

      <p className="mt-4 max-w-prose text-lg text-ink-2">
        Sete passos curtos para sair do “depois eu vejo” para a consulta marcada. Sem cadastro: o que você
        preenche fica só neste aparelho — nada vai para a empresa.
      </p>

      <section className="mt-10">
        <h2 className="mb-1 text-2xl font-bold text-ink">O essencial</h2>
        <p className="mb-5 text-base text-muted">Na ordem, cerca de 25 minutos no total. Os {MODULOS_TRILHA.length} liberam o certificado.</p>
        <ListaModulos modulos={MODULOS_ESSENCIAIS} concluidos={concluidos} numerar />
      </section>

      <div className="mt-6">
        <Link href="/trilha/certificado" className="block rounded-xl border-2 border-acento bg-acento-wash px-5 py-4 text-center font-bold text-ink transition hover:brightness-95">
          {fracao >= 1 ? "Gerar certificado de participação →" : `Complete o essencial para liberar o certificado (${feitos}/${MODULOS_TRILHA.length})`}
        </Link>
      </div>

      <section className="mt-12">
        <h2 className="mb-1 text-2xl font-bold text-ink">Pra ir além</h2>
        <p className="mb-5 text-base text-muted">Para quem cuida de um homem, para a cabeça, para o sono — e as fontes de tudo.</p>
        <ListaModulos modulos={MODULOS_EXTRAS} concluidos={concluidos} grade />
      </section>

      <div className="mt-10">
        <BlocoAjuda />
      </div>

      <button
        onClick={() => {
          if (confirm("Apagar tudo o que está guardado neste aparelho? Não tem como desfazer.")) {
            apagarTudoLocal();
            setConcluidos([]);
          }
        }}
        className="mt-10 text-xs text-muted underline hover:text-alerta"
      >
        Apagar tudo o que está neste aparelho
      </button>
    </main>
  );
}
