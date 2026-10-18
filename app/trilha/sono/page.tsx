"use client";

import { useState } from "react";
import { PaginaModulo, Resultado } from "@/components/trilha/PaginaModulo";

/**
 * STOP-Bang: 8 perguntas de sim ou não para triagem de apneia obstrutiva do
 * sono (Chung et al., 2016; Nagappa et al., 2015). É triagem, não diagnóstico.
 * Nada sai do aparelho — as respostas nem são salvas.
 */
const PERGUNTAS = [
  { id: "s", letra: "S", texto: "Você ronca alto — a ponto de ouvirem com a porta fechada ou alguém reclamar?" },
  { id: "t", letra: "T", texto: "Você se sente cansado ou sonolento durante o dia com frequência?" },
  { id: "o", letra: "O", texto: "Alguém já viu você parar de respirar ou engasgar enquanto dormia?" },
  { id: "p", letra: "P", texto: "Você tem pressão alta ou trata a pressão?" },
  { id: "b", letra: "B", texto: "Seu índice de massa corporal (IMC) é maior que 35?" },
  { id: "a", letra: "A", texto: "Você tem mais de 50 anos?" },
  { id: "n", letra: "N", texto: "Seu pescoço mede mais de 40 cm (colarinho apertado)?" },
  { id: "g", letra: "G", texto: "Você é homem?" },
] as const;

export default function PaginaSono() {
  const [resp, setResp] = useState<Record<string, boolean | undefined>>({});
  const respondidas = PERGUNTAS.filter((p) => resp[p.id] !== undefined).length;
  const pontos = PERGUNTAS.filter((p) => resp[p.id]).length;
  const completo = respondidas === PERGUNTAS.length;
  const faixa =
    pontos >= 5
      ? { tom: "alerta" as const, titulo: `${pontos} de 8: risco alto de apneia.`, texto: "Vale conversar com o médico e pedir a avaliação do sono. Apneia tem tratamento — e tratar melhora a pressão, a energia e o humor." }
      : pontos >= 3
        ? { tom: "atencao" as const, titulo: `${pontos} de 8: risco intermediário.`, texto: "Leve isso à próxima consulta, principalmente se o cansaço atrapalha o trabalho ou a direção." }
        : { tom: "ok" as const, titulo: `${pontos} de 8: risco baixo.`, texto: "Ótimo. Continue cuidando das 7 horas de sono." };

  return (
    <PaginaModulo
      id="sono"
      titulo="Sono, ronco e turno"
      ideia="Sono é combustível. Adulto precisa de 7 horas ou mais — e ronco com pausas não é “normal de homem”: é luz do painel."
      porque="Dormir menos de 7 horas de forma habitual está associado a pressão alta, diabetes, doença do coração, depressão e mais acidentes. No Brasil, 1 em cada 5 adultos das capitais dorme menos de 6 horas (Vigitel 2025). Em São Paulo, um estudo com polissonografia encontrou apneia em quase 1 em cada 3 adultos, e os homens têm cerca de 4 vezes mais chance."
      fontes={["watson2015", "vigitel2025sono", "tufik2010", "chung2016", "nagappa2015", "lloydjones2022"]}
    >
      <section>
        <h2 className="text-2xl font-bold text-ink">Triagem de apneia: STOP-Bang</h2>
        <p className="mt-1 text-ink-2">
          Oito perguntas de sim ou não, usadas em clínicas do sono no mundo todo. Em estudos, identificou mais de 90% dos casos de apneia
          moderada a grave. É triagem, não diagnóstico — e as respostas não são guardadas.
        </p>
        <ol className="mt-4 grid gap-2.5">
          {PERGUNTAS.map((p) => (
            <li key={p.id} className="cartao flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
              <span className="flex flex-1 items-start gap-3">
                <span aria-hidden className="titulo flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-acento-wash text-acento-2">{p.letra}</span>
                <span className="font-semibold text-ink">{p.texto}</span>
              </span>
              <span className="flex shrink-0 gap-2" role="group" aria-label={p.texto}>
                {[true, false].map((v) => (
                  <button
                    key={String(v)}
                    type="button"
                    aria-pressed={resp[p.id] === v}
                    onClick={() => setResp({ ...resp, [p.id]: v })}
                    className={`rounded-full border-2 px-4 py-1.5 text-sm font-bold ${resp[p.id] === v ? "border-acento bg-acento text-sobre-acento" : "border-line-2 text-ink-2 hover:border-acento"}`}
                  >
                    {v ? "Sim" : "Não"}
                  </button>
                ))}
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-4" aria-live="polite">
          {completo ? (
            <Resultado tom={faixa.tom} titulo={faixa.titulo}>{faixa.texto}</Resultado>
          ) : (
            <p className="text-sm text-muted">{respondidas} de 8 respondidas.</p>
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">Para quem trabalha em turnos</h2>
        <p className="mt-1 text-sm text-muted">Orientações práticas gerais. Se o sono não melhora, converse com a medicina do trabalho ou com o seu médico.</p>
        <ul className="mt-3 grid gap-2">
          {[
            ["Proteja um bloco de sono", "no mesmo horário, sempre que der — o corpo gosta de rotina."],
            ["Quarto escuro e silencioso", "de dia: cortina blackout, máscara, protetor de ouvido, celular longe."],
            ["Café com hora para acabar", "evite nas últimas horas antes de dormir."],
            ["Álcool não é remédio para dormir", "ele derruba, mas piora a qualidade do sono."],
            ["Volta para casa com cuidado", "sonolência ao volante é risco real — se estiver no limite, não dirija."],
          ].map(([t, d]) => (
            <li key={t} className="cartao cartao-suave px-4 py-3 text-ink">
              <strong>{t}</strong> — {d}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <Resultado tom="neutro" titulo="Na história">
          O ronco do Davi era apneia — e a irritação dele piorava com o sono ruim. Tratar o sono ajudou a cabeça também.
        </Resultado>
      </section>
    </PaginaModulo>
  );
}
