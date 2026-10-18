"use client";

import { useEffect, useState } from "react";
import { PaginaModulo, Resultado } from "@/components/trilha/PaginaModulo";
import { PENSAMENTOS } from "@/conteudo/saude";
import { lerAdiamento, gravarAdiamento, type Adiamento } from "@/lib/local";

export default function PaginaAdio() {
  const [a, setA] = useState<Adiamento>({ escolhidos: [], minhaResposta: "" });
  const [salvo, setSalvo] = useState(false);

  useEffect(() => {
    const x = lerAdiamento();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setA(x);
    setSalvo(x.escolhidos.length > 0);
  }, []);

  function alternar(id: string) {
    setA({ ...a, escolhidos: a.escolhidos.includes(id) ? a.escolhidos.filter((x) => x !== id) : [...a.escolhidos, id] });
  }

  const escolhidos = PENSAMENTOS.filter((p) => a.escolhidos.includes(p.id));

  return (
    <PaginaModulo
      id="adio"
      titulo="Por que eu adio"
      ideia="Não é falta de informação. São pensamentos automáticos — rápidos, convincentes e quase nunca verificados. Marque os que você mais escuta na sua cabeça."
      porque="Na Terapia Cognitivo-Comportamental, responder a um pensamento automático (em vez de obedecer ou brigar com ele) diminui o peso dele. Pesquisas com homens brasileiros mostram por que eles adiam: o cuidado visto como coisa de mulher, o medo de descobrir doença, a vergonha e o horário do trabalho. E uma revisão de intervenções mostra o que ajuda: exemplos de outros homens, informação clara, reconhecer os sintomas e enxergar o cuidado como força."
      fontes={["gomes2007", "schraiber2010", "addis2003", "wong2017", "weinstein1980", "sweeny2010", "sagar2019"]}
      concluido={salvo}
    >
      <ul className="grid gap-3">
        {PENSAMENTOS.map((p) => {
          const on = a.escolhidos.includes(p.id);
          return (
            <li key={p.id}>
              <button
                onClick={() => alternar(p.id)}
                aria-pressed={on}
                className={`w-full rounded-2xl border-2 p-4 text-left transition-colors ${on ? "border-acento bg-acento-wash" : "border-line bg-surface hover:border-line-2"}`}
              >
                <span className={`block text-lg font-bold ${on ? "text-ink-2 line-through decoration-alerta decoration-2" : "text-ink"}`}>“{p.automatico}”</span>
                {on && <span className="mt-1 block text-lg font-bold text-campanha">{p.resposta}</span>}
              </button>
            </li>
          );
        })}
      </ul>

      {escolhidos.length > 0 && (
        <div className="mt-6 flex flex-col gap-3">
          <Resultado tom="neutro" titulo="Agora, a sua resposta">
            Escreva com as suas palavras o que você responderia ao pensamento que mais te segura. Uma frase basta.
          </Resultado>
          <textarea
            value={a.minhaResposta}
            onChange={(e) => setA({ ...a, minhaResposta: e.target.value })}
            maxLength={200}
            rows={3}
            className="campo"
            placeholder="Ex.: “Se for coisa à toa, eu fico tranquilo. Se não for, eu descubro cedo.”"
          />
          <button
            onClick={() => {
              gravarAdiamento(a);
              setSalvo(true);
            }}
            className="rounded-xl bg-acento px-6 py-3.5 font-bold text-sobre-acento hover:brightness-110"
          >
            Salvar
          </button>
          {salvo && <p className="text-sm text-ink-2" aria-live="polite">Salvo só neste aparelho. Releia quando o “depois eu vejo” aparecer.</p>}
        </div>
      )}
    </PaginaModulo>
  );
}
