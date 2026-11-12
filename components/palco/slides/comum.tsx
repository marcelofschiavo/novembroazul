"use client";

import { motion } from "motion/react";
import {
  Brain,
  CalendarCheck,
  CloudRain,
  Eye,
  Gauge,
  LifeBuoy,
  Megaphone,
  MessageCircle,
  TriangleAlert,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { escreve, degrau } from "@/lib/motion";

/** Ícones que o roteiro (blocos.ts) pode pedir pelo nome. */
export const ICONES: Record<string, LucideIcon> = {
  painel: Gauge,
  cabeca: Brain,
  boia: LifeBuoy,
  chuva: CloudRain,
  raio: Zap,
  susto: TriangleAlert,
  megafone: Megaphone,
  conversa: MessageCircle,
  juntos: Users,
  olho: Eye,
  agenda: CalendarCheck,
};

/** Ícone grande num círculo, para slides de frase: dá imagem sem somar texto. */
export function IconeGrande({ nome }: { nome?: string }) {
  const Icone = nome ? ICONES[nome] : undefined;
  if (!Icone) return null;
  return (
    <motion.span
      aria-hidden
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex shrink-0 items-center justify-center rounded-full bg-campanha-wash text-campanha shadow-[0_0_6vmin_-1vmin_var(--campanha-fill)]"
      style={{ width: "min(26vw, 44vh)", height: "min(26vw, 44vh)" }}
    >
      <Icone className="h-[55%] w-[55%]" strokeWidth={1.6} />
    </motion.span>
  );
}

/** Rótulo em pílula + título do slide. Um padrão só para todos os tipos. */
export function Titulo({ sobre, titulo, tamanho = "titulo" }: { sobre?: string; titulo?: string; tamanho?: "titulo" | "corpo" | "mega" }) {
  const classe = tamanho === "mega" ? "text-palco-mega" : tamanho === "corpo" ? "text-palco-corpo" : "text-palco-titulo";
  return (
    <div className="flex flex-col gap-[1.6vmin]">
      {sobre && (
        <motion.p initial="entra" animate="ativo" variants={degrau} className="pilula dados text-palco-rodape font-semibold uppercase tracking-[0.14em] text-campanha">
          {sobre}
        </motion.p>
      )}
      {titulo && (
        <motion.h2 initial="entra" animate="ativo" variants={escreve} className={`titulo ${classe} max-w-[86vw] text-ink`}>
          {titulo}
        </motion.h2>
      )}
    </div>
  );
}

/** Frase de fechamento do slide — a mensagem que a pessoa leva — num painel discreto. */
export function Destaque({ texto, atraso = 0.9 }: { texto?: string; atraso?: number }) {
  if (!texto) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: atraso, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-[80vw] rounded-r-[2vmin] border-l-[0.7vmin] border-campanha-fill bg-campanha-wash/70 py-[1.2vmin] pl-[2.2vmin] pr-[2.6vmin] text-palco-texto font-semibold leading-snug text-ink"
    >
      {texto}
    </motion.p>
  );
}
