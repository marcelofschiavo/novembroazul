"use client";

import { useEffect, useState } from "react";
import { Droplet, MoonStar, HeartPulse, BedDouble, Zap, CloudRain, type LucideIcon } from "lucide-react";
import { PaginaModulo, Resultado } from "@/components/trilha/PaginaModulo";
import { LUZES } from "@/conteudo/saude";
import { lerLuzes, gravarLuzes } from "@/lib/local";

const ICONE: Record<string, LucideIcon> = { gota: Droplet, noite: MoonStar, coracao: HeartPulse, lua: BedDouble, raio: Zap, nuvem: CloudRain };

export default function PaginaLuzes() {
  const [marcadas, setMarcadas] = useState<string[]>([]);
  const [revisado, setRevisado] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMarcadas(lerLuzes().marcadas);
  }, []);

  function alternar(id: string) {
    const novas = marcadas.includes(id) ? marcadas.filter((x) => x !== id) : [...marcadas, id];
    setMarcadas(novas);
    gravarLuzes(novas);
  }

  return (
    <PaginaModulo
      id="luzes"
      titulo="Luzes do painel"
      ideia="Alguns sinais não esperam a revisão. Marque os que você tem notado — o resultado fica só aqui."
      porque="Dificuldade de ereção pode antecipar doença do coração (sinal dos vasos). Ronco com pausas é apneia em boa parte dos casos — e homens têm cerca de 4 vezes mais chance (estudo de São Paulo). No homem, depressão muitas vezes aparece como irritação e álcool, não como tristeza."
      fontes={["inman2009", "tufik2010", "martin2013", "inca2026", "fitSus2026"]}
      concluido={revisado}
    >
      <ul className="grid gap-3">
        {LUZES.map((l) => {
          const Icone = ICONE[l.icone];
          const on = marcadas.includes(l.id);
          return (
            <li key={l.id}>
              <button
                onClick={() => alternar(l.id)}
                aria-pressed={on}
                className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-colors ${on ? "border-atencao bg-atencao-wash" : "border-line bg-surface hover:border-line-2"}`}
              >
                <span aria-hidden className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${on ? "bg-atencao text-bg" : "bg-surface-2 text-muted"}`}>
                  <Icone className="h-6 w-6" strokeWidth={2.2} />
                </span>
                <span className="flex-1 font-semibold text-ink">{l.texto}</span>
                <span className="dados text-xs font-bold uppercase text-muted">{on ? "acesa" : "apagada"}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex flex-col gap-3" aria-live="polite">
        {marcadas.includes("peito") && (
          <Resultado tom="alerta" titulo="Dor no peito agora? Ligue 192 (SAMU).">
            Não espere: dor no peito, falta de ar súbita ou sinais de AVC são emergência.
          </Resultado>
        )}
        {marcadas.length > 0 ? (
          <Resultado tom="atencao" titulo={`${marcadas.length} luz${marcadas.length > 1 ? "es" : ""} acesa${marcadas.length > 1 ? "s" : ""}: vale marcar consulta.`}>
            Luz acesa não é sentença — na maioria das vezes é algo comum e tratável. Mas pede conversa com o médico, em qualquer idade. Leve esta lista.
          </Resultado>
        ) : (
          <Resultado tom="ok" titulo="Nenhuma luz acesa agora.">Ótimo. O painel continua valendo: pressão, cintura, glicemia e a revisão por idade.</Resultado>
        )}
        {marcadas.includes("humor") && (
          <Resultado tom="neutro" titulo="Cabeça também é saúde.">
            Conversar ajuda. CVV 188, 24 horas, gratuito — também para quem só precisa falar. Veja o módulo “Cabeça também é saúde”.
          </Resultado>
        )}
      </div>

      <button onClick={() => setRevisado(true)} disabled={revisado} className="mt-6 w-full rounded-xl bg-acento px-6 py-3.5 font-bold text-sobre-acento hover:brightness-110 disabled:opacity-60">
        {revisado ? "✓ Painel revisado" : "Revisei o meu painel"}
      </button>
    </PaginaModulo>
  );
}
