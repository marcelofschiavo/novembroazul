"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TemaProvider } from "@/components/ui/TemaProvider";
import { RodaGrafico } from "@/components/ui/RodaGrafico";
import { escada, degrau } from "@/lib/motion";
import { EVENTO, PALESTRANTE } from "@/conteudo/palestrante";

/**
 * Tela de espera enquanto a turma chega. Sem interação. Com EVENTO.inicioFala
 * definido, mostra a contagem; sem, só acolhe. Fundo claro (projeção).
 */
export default function PaginaAguardando() {
  const [agora, setAgora] = useState<Date | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-claro", "on");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAgora(new Date());
    const t = setInterval(() => setAgora(new Date()), 1000);
    return () => {
      clearInterval(t);
      document.documentElement.removeAttribute("data-claro");
    };
  }, []);

  const inicio = EVENTO.inicioFala ? new Date(EVENTO.inicioFala) : null;
  const restante = agora && inicio ? Math.max(0, Math.round((inicio.getTime() - agora.getTime()) / 1000)) : null;

  return (
    <TemaProvider tema="palco">
      <div className="relative flex min-h-screen items-center justify-center gap-[6vmin] bg-bg px-[6vw]">
        <motion.div initial="entra" animate="ativo" variants={escada(0.18, 0.1)} className="flex max-w-[52vw] flex-col gap-[3vmin]">
          <motion.p variants={degrau} className="dados text-palco-nota uppercase tracking-[0.18em] text-campanha">
            Novembro Azul · {PALESTRANTE.nome}
          </motion.p>
          <motion.h1 variants={degrau} className="titulo text-palco-mega text-ink">
            Por inteiro.
          </motion.h1>
          <motion.p variants={degrau} className="text-palco-corpo font-semibold leading-snug text-ink-2">
            Enquanto a turma chega: você sabe quando vence a revisão do seu carro?
          </motion.p>
          {restante !== null && restante > 0 && (
            <motion.p variants={degrau} className="dados text-palco-titulo font-bold text-campanha">
              {Math.floor(restante / 60)}:{String(restante % 60).padStart(2, "0")}
            </motion.p>
          )}
        </motion.div>
        <motion.div animate={{ rotate: [0, 4, -3, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} style={{ width: "min(34vw, 56vh)" }}>
          <RodaGrafico rotulos={false} />
        </motion.div>
      </div>
    </TemaProvider>
  );
}
