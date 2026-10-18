"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import { PaginaModulo, Resultado } from "@/components/trilha/PaginaModulo";
import { QUIZ } from "@/conteudo/quiz";
import { fontesCurtas } from "@/conteudo/referencias";
import { lerQuiz, gravarQuiz } from "@/lib/local";

export default function PaginaQuiz() {
  const [respostas, setRespostas] = useState<Record<string, number>>({});
  const [melhor, setMelhor] = useState(0);

  useEffect(() => {
    const q = lerQuiz();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRespostas(q.respostas);
    setMelhor(q.melhor);
  }, []);

  const respondidas = Object.keys(respostas).length;
  const acertos = QUIZ.filter((q) => respostas[q.id] === q.certa).length;
  const terminou = respondidas === QUIZ.length;

  function responder(id: string, i: number) {
    if (respostas[id] !== undefined) return;
    const novas = { ...respostas, [id]: i };
    const novosAcertos = QUIZ.filter((q) => novas[q.id] === q.certa).length;
    const novoMelhor = Object.keys(novas).length === QUIZ.length ? Math.max(melhor, novosAcertos) : melhor;
    setRespostas(novas);
    setMelhor(novoMelhor);
    gravarQuiz({ respostas: novas, melhor: novoMelhor });
  }

  return (
    <PaginaModulo
      id="quiz"
      titulo="Quiz final"
      ideia="Dez perguntas sobre o que passou na palestra e na trilha. Não é prova: cada resposta vem com a explicação e a fonte."
      porque="Tentar lembrar fixa mais do que reler — é o efeito do teste, um dos achados mais sólidos da psicologia da aprendizagem."
      fontes={["roediger2006"]}
      concluido={terminou}
    >
      <ol className="flex flex-col gap-6">
        {QUIZ.map((q, n) => {
          const r = respostas[q.id];
          const respondeu = r !== undefined;
          return (
            <li key={q.id} className="cartao p-5">
              <p className="dados text-xs font-bold uppercase text-muted">Pergunta {n + 1} de {QUIZ.length}</p>
              <p className="mt-1 text-lg font-bold text-ink">{q.pergunta}</p>
              <div className="mt-3 flex flex-col gap-2">
                {q.opcoes.map((o, i) => {
                  const certa = i === q.certa;
                  const escolhida = r === i;
                  const estilo = !respondeu
                    ? "border-line hover:border-acento"
                    : certa
                      ? "border-ok bg-ok-wash"
                      : escolhida
                        ? "border-alerta bg-alerta-wash"
                        : "border-line opacity-60";
                  return (
                    <button
                      key={o}
                      onClick={() => responder(q.id, i)}
                      disabled={respondeu}
                      className={`flex items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 text-left font-semibold text-ink transition-colors ${estilo}`}
                    >
                      {o}
                      {respondeu && certa && <span className="inline-flex items-center gap-1 text-sm font-bold text-ok"><Check aria-hidden className="h-4 w-4" /> certa</span>}
                      {respondeu && escolhida && !certa && <span className="inline-flex items-center gap-1 text-sm font-bold text-alerta"><X aria-hidden className="h-4 w-4" /> sua resposta</span>}
                    </button>
                  );
                })}
              </div>
              {respondeu && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-[15px] leading-relaxed text-ink-2">
                  {q.explicacao}
                  <span className="dados mt-1 block text-xs text-muted">fonte: {fontesCurtas(q.fonteIds)}</span>
                </motion.div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-6" aria-live="polite">
        {terminou ? (
          <Resultado tom={acertos >= 7 ? "ok" : "neutro"} titulo={`${acertos} de ${QUIZ.length} certas.`}>
            {acertos >= 7 ? "Painel em dia. " : "O que ficou para trás está na explicação de cada pergunta. "}
            Quiz concluído — conta para o certificado.
            <button
              onClick={() => {
                setRespostas({});
                gravarQuiz({ respostas: {}, melhor });
              }}
              className="mt-2 block text-sm font-semibold text-acento-2 underline"
            >
              Refazer o quiz
            </button>
          </Resultado>
        ) : (
          <p className="text-sm text-muted">{respondidas} de {QUIZ.length} respondidas.</p>
        )}
      </div>
    </PaginaModulo>
  );
}
