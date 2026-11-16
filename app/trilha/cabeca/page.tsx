"use client";

import { useEffect, useState } from "react";
import { Shield } from "lucide-react";
import { PaginaModulo, Resultado } from "@/components/trilha/PaginaModulo";
import { BlocoAjuda } from "@/components/ui/BlocoAjuda";
import { lerSilencio, gravarSilencio } from "@/lib/local";

const COURACA = ["Homem não chora.", "Aguenta firme.", "Não é nada, já passa.", "Médico é pra quando não der mais."];

const JEITOS = [
  { id: "verdade", titulo: "Trocar o “tô bem” por uma frase verdadeira", exemplo: "“Tô cansado, pra falar a verdade.”" },
  { id: "duasvezes", titulo: "Perguntar duas vezes a um amigo", exemplo: "“E aí, tá tudo bem mesmo?” — a primeira resposta quase sempre é automática." },
  { id: "time", titulo: "Mandar mensagem para o seu time da conversa difícil", exemplo: "Sem motivo nenhum. Só para manter a porta aberta." },
];

/**
 * O silêncio dos homens (passo 3 da trilha). Comunicação segura: sem método,
 * sem caso; CVV 188 sempre à vista.
 */
export default function PaginaSilencio() {
  const [ouvidas, setOuvidas] = useState<string[]>([]);
  const [escolha, setEscolha] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEscolha(lerSilencio().escolha);
  }, []);

  function escolher(id: string) {
    setEscolha(id);
    gravarSilencio(id);
  }

  return (
    <PaginaModulo
      id="cabeca"
      titulo="O silêncio dos homens"
      ideia="Muitos homens aprenderam cedo a guardar tudo. Essa couraça protege do golpe — e do cuidado também. O que não é dito não some: muda de forma."
      historia="Davi andava exausto e explodia por pouco. Ninguém, nem ele, chamava aquilo de tristeza. Era o silêncio virando irritação."
      leve="Falar não é fraqueza. É deixar o cuidado entrar."
      porque="Pesquisas brasileiras com homens mostram a mesma couraça: o cuidado visto como “coisa de mulher”, medo e vergonha de se expor. Quando os estudos contam também os sinais mais comuns nos homens — irritação, álcool, risco —, há tantos homens com depressão quanto mulheres; o diagnóstico é que chega bem menos a eles. E relações fortes aumentam em cerca de 50% a chance de sobrevivência: a conversa difícil também é saúde."
      fontes={["gomes2007", "schraiber2010", "martin2013", "vigitel2024", "holtlunstad2010", "ruok", "cvv"]}
      concluido={!!escolha}
    >
      <section>
        <h2 className="text-2xl font-bold text-ink">1. O que a couraça diz</h2>
        <p className="mt-1 text-ink-2">Toque nas frases que você ouviu crescendo. Não é para culpar ninguém: é para ver o preço.</p>
        <ul className="mt-4 grid gap-2.5 rounded-2xl bg-ink p-4 sm:grid-cols-2">
          {COURACA.map((f) => {
            const on = ouvidas.includes(f);
            return (
              <li key={f}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setOuvidas(on ? ouvidas.filter((x) => x !== f) : [...ouvidas, f])}
                  className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-lg font-bold transition-colors ${on ? "border-bg bg-bg/15 text-bg" : "border-bg/30 text-bg/90 hover:border-bg/60"}`}
                >
                  <Shield aria-hidden className="h-5 w-5 shrink-0" />
                  “{f}”
                  {on && <span className="ml-auto text-sm font-semibold">ouvi</span>}
                </button>
              </li>
            );
          })}
        </ul>
        {ouvidas.length > 0 && (
          <p className="mt-3 text-ink-2" aria-live="polite">
            Essas frases foram aprendidas — e o que se aprende dá para rever. Muitas vezes, quem tem menos diagnóstico não sofre menos: fala menos.
          </p>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">2. O que fica do lado de dentro</h2>
        <p className="mt-1 text-ink-2">No homem, a tristeza guardada muitas vezes não aparece como tristeza.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="cartao cartao-suave p-5">
            <h3 className="text-lg font-bold text-ink-2">O que a gente espera ver</h3>
            <ul className="mt-2 flex flex-col gap-1 text-ink-2">
              <li>▸ Tristeza</li>
              <li>▸ Choro</li>
              <li>▸ Desânimo</li>
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-campanha-fill bg-campanha-wash p-5">
            <h3 className="text-lg font-bold text-campanha">O que muitas vezes aparece</h3>
            <ul className="mt-2 flex flex-col gap-1 text-ink">
              <li>▸ Irritação e explosões por pouco</li>
              <li>▸ Álcool a mais</li>
              <li>▸ Trabalho sem parar</li>
              <li>▸ Sumir dos amigos</li>
            </ul>
          </div>
        </div>
        <div className="mt-4">
          <Resultado tom="atencao" titulo="Se isso dura mais de duas semanas">
            Vale conversar com alguém de confiança e com um profissional — clínico, psicólogo, a UBS ou o programa de apoio da empresa, se houver.
          </Resultado>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">3. Quebrar o silêncio começa pequeno</h2>
        <p className="mt-1 text-ink-2">Escolha um jeito para esta semana. Só um já vale.</p>
        <ul className="mt-4 grid gap-3" role="radiogroup" aria-label="Um jeito de quebrar o silêncio esta semana">
          {JEITOS.map((j) => {
            const on = escolha === j.id;
            return (
              <li key={j.id}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => escolher(j.id)}
                  className={`w-full rounded-2xl border-2 p-4 text-left transition-colors ${on ? "border-acento bg-acento-wash" : "border-line bg-surface hover:border-line-2"}`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-lg font-bold text-ink">{j.titulo}</span>
                    {on && <span className="dados shrink-0 text-xs font-bold uppercase text-acento-2">✓ escolhido</span>}
                  </span>
                  <span className="mt-1 block text-ink-2">{j.exemplo}</span>
                </button>
              </li>
            );
          })}
        </ul>
        {escolha && (
          <p className="mt-3 text-sm text-ink-2" aria-live="polite">Guardado só neste aparelho. Ele entra de novo no seu compromisso, no passo 5.</p>
        )}
      </section>

      <div className="mt-10">
        <BlocoAjuda />
      </div>
    </PaginaModulo>
  );
}
