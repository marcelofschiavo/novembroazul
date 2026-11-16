"use client";

import { useEffect, useState } from "react";
import { PaginaModulo, Resultado } from "@/components/trilha/PaginaModulo";
import { lerAdiamento, gravarAdiamento, type Adiamento } from "@/lib/local";

/**
 * Os medos que fazem adiar. Os ids são os mesmos de PENSAMENTOS (saude.ts),
 * para quem já tinha marcado algum continuar com a marcação; o texto aqui é
 * o da trilha, com o nome do medo e uma resposta em linguagem do dia a dia.
 */
const MEDOS = [
  {
    id: "descobrir",
    medo: "Medo de descobrir",
    diz: "Se eu não for, não descubro nada ruim.",
    resposta: "Não saber não muda o que está lá. Só tira a chance de agir cedo, quando quase tudo é mais simples.",
  },
  {
    id: "vergonha",
    medo: "Vergonha do exame",
    diz: "Que vergonha esse exame.",
    resposta: "Para o médico é rotina, e dura minutos. Vergonha não protege ninguém.",
  },
  {
    id: "aguenta",
    medo: "Medo de parecer fraco",
    diz: "Homem aguenta.",
    resposta: "Aguentar não é cuidar. Fazer a revisão não é fraqueza: é manutenção.",
  },
  {
    id: "tempo",
    medo: "Medo de perder tempo e dinheiro",
    diz: "Não tenho tempo (nem dinheiro).",
    resposta: "Uma consulta leva uma manhã. Descobrir tarde custa mais: em tempo, em dinheiro e em escolha. E o remédio de pressão e diabetes é gratuito na Farmácia Popular.",
  },
  {
    id: "passa",
    medo: "Esperar passar",
    diz: "Isso passa sozinho.",
    resposta: "Se passar, ótimo. Se não passar, você já vai estar cuidando.",
  },
  {
    id: "comigo",
    medo: "Achar que é com os outros",
    diz: "Comigo não acontece.",
    resposta: "Quase todo mundo pensa isso de si mesmo. É justamente por isso que a revisão existe.",
  },
];

const PASSOS_MEDO = [
  ["Dê nome", "“Isso é medo de descobrir.” Nomear já tira um pouco da força."],
  ["Responda com um fato", "Não brigue com o medo: responda a ele, como nos cartões acima."],
  ["Dê um passo pequeno", "Não precisa resolver tudo hoje. Só marcar."],
] as const;

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

  const algum = MEDOS.some((m) => a.escolhidos.includes(m.id));

  return (
    <PaginaModulo
      id="adio"
      titulo="Os medos que fazem adiar"
      ideia="Quase todo homem sabe que deveria ir. O que segura não é falta de informação: é medo. Toque nos que você reconhece em você — a resposta aparece embaixo."
      historia="Davi sabia que precisava ir. Quando a Lia cobrou, ele disse “eu tô ótimo” e adiou mais um pouco. Não era descaso: era medo do que poderia ouvir."
      leve="O medo não precisa sumir para você ir. Ele só não pode dirigir."
      porque="Dar nome ao medo e responder com um fato — em vez de obedecer ou brigar com ele — diminui o peso que ele tem: é a base da terapia cognitivo-comportamental. Pesquisas com homens brasileiros mostram esses mesmos motivos para adiar: medo de descobrir doença, vergonha de se expor, o cuidado visto como “coisa de mulher” e o horário do trabalho. Evitar uma notícia ruim é muito humano: alivia na hora e custa caro depois."
      fontes={["gomes2007", "schraiber2010", "addis2003", "sweeny2010", "weinstein1980", "nilson2020", "farmaciaPopular"]}
      concluido={salvo}
    >
      <section>
        <h2 className="text-2xl font-bold text-ink">1. Qual destes fala mais alto em você?</h2>
        <ul className="mt-4 grid gap-3">
          {MEDOS.map((m) => {
            const on = a.escolhidos.includes(m.id);
            return (
              <li key={m.id}>
                <button
                  onClick={() => alternar(m.id)}
                  aria-pressed={on}
                  className={`w-full rounded-2xl border-2 p-4 text-left transition-colors ${on ? "border-acento bg-acento-wash" : "border-line bg-surface hover:border-line-2"}`}
                >
                  <span className="dados block text-xs font-bold uppercase tracking-[0.12em] text-campanha">{m.medo}</span>
                  <span className={`mt-1 block text-lg font-bold ${on ? "text-ink-2 line-through decoration-alerta decoration-2" : "text-ink"}`}>“{m.diz}”</span>
                  {on && <span className="mt-1 block text-lg font-bold text-campanha">{m.resposta}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">2. Como lidar com o medo, em 3 passos</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-3">
          {PASSOS_MEDO.map(([t, d], k) => (
            <li key={t} className="cartao p-4">
              <span className="dados flex h-8 w-8 items-center justify-center rounded-full bg-acento text-sm font-bold text-sobre-acento">{k + 1}</span>
              <span className="mt-2 block font-bold text-ink">{t}</span>
              <span className="mt-1 block text-[15px] leading-snug text-ink-2">{d}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">3. A sua resposta</h2>
        <p className="mt-1 text-ink-2">Escreva, com as suas palavras, o que você diria ao medo que mais te segura. Uma frase basta.</p>
        <textarea
          value={a.minhaResposta}
          onChange={(e) => setA({ ...a, minhaResposta: e.target.value })}
          maxLength={200}
          rows={3}
          className="campo mt-3"
          placeholder="Ex.: “Se for coisa à toa, eu fico tranquilo. Se não for, eu descubro cedo.”"
        />
        <button
          onClick={() => {
            gravarAdiamento(a);
            setSalvo(true);
          }}
          disabled={!algum}
          className="mt-3 w-full rounded-xl bg-acento px-6 py-3.5 font-bold text-sobre-acento hover:brightness-110 disabled:opacity-40"
        >
          {algum ? "Salvar" : "Toque em pelo menos um medo acima"}
        </button>
        {salvo && (
          <div className="mt-3" aria-live="polite">
            <Resultado tom="ok" titulo="Salvo só neste aparelho.">Releia quando o “depois eu vejo” aparecer.</Resultado>
          </div>
        )}
      </section>
    </PaginaModulo>
  );
}
