"use client";

import { motion } from "motion/react";
import { AREAS_RODA } from "@/conteudo/saude";

/**
 * Radar de 8 raios (Roda da Saúde). `notas` de 0 a 10 por área; sem notas,
 * desenha uma roda "torta" de exemplo. `comparar` desenha uma segunda roda
 * tracejada (a de 30 dias atrás). Rótulos opcionais em volta.
 */
export function RodaGrafico({
  notas,
  comparar,
  rotulos = true,
  tamanho = "100%",
  animar = true,
  exemplo = [8, 4, 6, 3, 7, 5, 6, 4],
}: {
  notas?: Record<string, number>;
  comparar?: Record<string, number>;
  rotulos?: boolean;
  tamanho?: string;
  animar?: boolean;
  exemplo?: number[];
}) {
  const R = 100;
  const ponto = (i: number, v: number) => {
    const a = ((-90 + 45 * i) * Math.PI) / 180;
    return [(R * v * Math.cos(a)) / 10, (R * v * Math.sin(a)) / 10] as const;
  };
  const valores = AREAS_RODA.map((a, i) => (notas ? (notas[a.id] ?? 0) : exemplo[i]));
  const poligono = (vals: number[]) => vals.map((v, i) => ponto(i, v).join(",")).join(" ");
  const anel = (v: number) => poligono(Array(8).fill(v));
  const vb = rotulos ? "-235 -135 470 270" : "-110 -110 220 220";

  return (
    <svg viewBox={vb} style={{ width: tamanho, height: "auto", overflow: "visible" }} role="img" aria-label={`Roda da Saúde: ${AREAS_RODA.map((a, i) => `${a.nome} ${valores[i]}`).join(", ")}`}>
      {[2.5, 5, 7.5, 10].map((v) => (
        <polygon key={v} points={anel(v)} fill="none" stroke="var(--line-2)" strokeWidth={v === 10 ? 1.6 : 0.9} />
      ))}
      {AREAS_RODA.map((_, i) => {
        const [x, y] = ponto(i, 10);
        return <line key={i} x1="0" y1="0" x2={x} y2={y} stroke="var(--line-2)" strokeWidth="0.9" />;
      })}
      {comparar && (
        <polygon
          points={poligono(AREAS_RODA.map((a) => comparar[a.id] ?? 0))}
          fill="none"
          stroke="var(--muted)"
          strokeWidth="2"
          strokeDasharray="5 4"
        />
      )}
      <motion.polygon
        points={poligono(valores)}
        fill="var(--campanha-fill)"
        fillOpacity="0.24"
        stroke="var(--campanha)"
        strokeWidth="3"
        strokeLinejoin="round"
        initial={animar ? { scale: 0.2, opacity: 0 } : false}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "0px 0px" }}
      />
      {valores.map((v, i) => {
        const [x, y] = ponto(i, v);
        return <circle key={i} cx={x} cy={y} r="4" fill="var(--campanha)" />;
      })}
      {rotulos &&
        AREAS_RODA.map((a, i) => {
          const [x, y] = ponto(i, 11.6);
          const anchor = Math.abs(x) < 5 ? "middle" : x > 0 ? "start" : "end";
          return (
            <text key={a.id} x={x} y={y} textAnchor={anchor} dominantBaseline="middle" fontSize="12.5" fontWeight="600" fill="var(--ink)" fontFamily="var(--font-corpo)">
              {a.nome}
              {notas && <tspan fill="var(--campanha)" fontWeight="700"> {valores[i]}</tspan>}
            </text>
          );
        })}
    </svg>
  );
}
