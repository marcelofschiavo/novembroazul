"use client";

import { useEffect, useState } from "react";
import { PaginaModulo, Resultado } from "@/components/trilha/PaginaModulo";
import { RodaGrafico } from "@/components/ui/RodaGrafico";
import { AREAS_RODA } from "@/conteudo/saude";
import { lerRoda, gravarRoda, hojeISO, type EstadoRoda } from "@/lib/local";

const INICIAL = Object.fromEntries(AREAS_RODA.map((a) => [a.id, 5])) as Record<string, number>;

function dataBR(iso: string) {
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
}

export default function PaginaRoda() {
  const [notas, setNotas] = useState<Record<string, number>>(INICIAL);
  const [foco, setFoco] = useState("");
  const [estado, setEstado] = useState<EstadoRoda>({ atual: null, anterior: null });

  useEffect(() => {
    const e = lerRoda();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEstado(e);
    if (e.atual) {
      setNotas({ ...INICIAL, ...e.atual.notas });
      setFoco(e.atual.foco);
    }
  }, []);

  const menor = AREAS_RODA.reduce((m, a) => (notas[a.id] < notas[m.id] ? a : m), AREAS_RODA[0]);
  const maior = Math.max(...Object.values(notas));
  const torta = maior - notas[menor.id];

  function salvar() {
    setEstado(gravarRoda({ data: hojeISO(), notas, foco: foco || menor.id }));
  }

  return (
    <PaginaModulo
      id="roda"
      titulo="Minha Roda da Saúde"
      ideia="Dê uma nota de 0 a 10 para cada área da sua vida, do jeito que está hoje. Não é a nota mais baixa que importa: é a roda girar torta."
      porque="Saúde é corpo, cabeça e as pessoas em volta ao mesmo tempo (modelo biopsicossocial). A Roda é uma ferramenta de reflexão — não é teste, não dá diagnóstico: dá direção. Escolher uma área só deixa o próximo passo pequeno e possível."
      fontes={["engel1977", "modesto2018"]}
      concluido={!!estado.atual}
    >
      <div className="mx-auto max-w-md">
        <RodaGrafico notas={notas} comparar={estado.anterior?.notas} animar={false} />
      </div>
      {estado.anterior && (
        <p className="mt-2 text-center text-sm text-muted">Linha tracejada: a sua roda de {dataBR(estado.anterior.data)}.</p>
      )}

      <div className="mt-8 flex flex-col gap-5">
        {AREAS_RODA.map((a) => (
          <label key={a.id} className="block">
            <span className="flex items-baseline justify-between gap-3">
              <span className="font-bold text-ink">{a.nome}</span>
              <span className="dados text-lg font-bold text-campanha">{notas[a.id]}</span>
            </span>
            <span className="block text-sm text-muted">{a.dica}</span>
            <input
              type="range"
              min={0}
              max={10}
              step={1}
              value={notas[a.id]}
              onChange={(e) => setNotas({ ...notas, [a.id]: Number(e.target.value) })}
              className="mt-2 w-full accent-[var(--acento)]"
              aria-valuetext={`${notas[a.id]} de 10`}
            />
          </label>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <Resultado tom={torta >= 4 ? "atencao" : "neutro"} titulo={torta >= 4 ? `Sua roda está torta em “${menor.nome}”.` : "Sua roda está razoavelmente alinhada."}>
          {torta >= 4
            ? `Entre a área mais alta e a mais baixa há ${torta} pontos. É por aí que costuma começar o alinhamento.`
            : "Mesmo assim, vale escolher uma área para cuidar este mês."}
        </Resultado>

        <label className="block">
          <span className="font-bold text-ink">Qual área você escolhe para cuidar este mês?</span>
          <select value={foco || menor.id} onChange={(e) => setFoco(e.target.value)} className="campo mt-2">
            {AREAS_RODA.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nome} ({notas[a.id]})
              </option>
            ))}
          </select>
        </label>

        <button onClick={salvar} className="rounded-xl bg-acento px-6 py-3.5 font-bold text-sobre-acento hover:brightness-110">
          {estado.atual ? "Salvar de novo" : "Salvar a minha roda"}
        </button>
        {estado.atual && (
          <p className="text-sm text-ink-2" aria-live="polite">
            Salva em {dataBR(estado.atual.data)}, só neste aparelho. Volte daqui a 30 dias: a roda nova aparece por cima da antiga.
          </p>
        )}
      </div>
    </PaginaModulo>
  );
}
