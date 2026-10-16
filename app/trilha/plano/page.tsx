"use client";

import { useEffect, useState } from "react";
import { CalendarPlus, FileDown } from "lucide-react";
import { PaginaModulo, Resultado } from "@/components/trilha/PaginaModulo";
import { lerPlano, gravarPlano, lerNumeros, hojeISO, type PlanoEuVou } from "@/lib/local";
import { baixarLembrete } from "@/lib/ics";
import { gerarCartao } from "@/lib/pdf-docs/cartao";

const SUGESTOES_SE = ["segunda, depois do almoço", "o dia do meu pagamento", "a semana do meu aniversário", "sexta, antes de sair do trabalho"];
const SUGESTOES_ENTAO = ["ligo e marco a consulta", "marco pelo aplicativo do plano", "vou à UBS perto de casa", "chamo meu pai para ir junto"];
const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

export default function PaginaPlano() {
  const [p, setP] = useState<PlanoEuVou>({ se: "", entao: "", data: "", marco: "", carta: "" });
  const [salvo, setSalvo] = useState(false);
  const [gerando, setGerando] = useState(false);

  useEffect(() => {
    const x = lerPlano();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setP(x);
    setSalvo(!!(x.se && x.entao));
  }, []);

  const pronto = p.se.trim() && p.entao.trim();

  function salvar(novo = p) {
    gravarPlano(novo);
    setSalvo(!!(novo.se.trim() && novo.entao.trim()));
  }

  return (
    <PaginaModulo
      id="plano"
      titulo="Meu plano “Eu vou”"
      ideia="“Vou ver isso” não vira agenda. Uma frase com quando e o quê, sim. Monte a sua, ponha no celular e leve o cartão de bolso."
      porque="Em 94 estudos, planos do tipo “se for tal momento, então eu faço tal coisa” aumentaram de forma média a grande a chance de cumprir o que se planejou. Datas-marco, como o aniversário, dão um empurrão extra (efeito “recomeço”). E pensar no seu “eu” do futuro ajuda — mas o efeito dura pouco: por isso a carta vem colada ao plano."
      fontes={["gollwitzer2006", "dai2014", "rutchick2018", "pnaish2009"]}
      concluido={salvo}
    >
      <section className="rounded-2xl border border-line bg-surface p-5">
        <h2 className="text-xl font-bold text-ink">1. Um minuto com o seu “eu” de 70 anos (opcional)</h2>
        <p className="mt-1 text-ink-2">Onde você quer estar aos 70? Com quem? Fazendo o quê? O que esse homem pediria pra você fazer esta semana?</p>
        <textarea value={p.carta} onChange={(e) => setP({ ...p, carta: e.target.value })} onBlur={() => salvar()} rows={3} maxLength={400} className="campo mt-3" placeholder="Escreva pra ele — ou dele pra você." />
      </section>

      <section className="mt-6 rounded-2xl border border-line bg-surface p-5">
        <h2 className="text-xl font-bold text-ink">2. A frase</h2>
        <label className="mt-3 block">
          <span className="font-bold text-ink">Se for…</span>
          <input value={p.se} onChange={(e) => setP({ ...p, se: e.target.value })} className="campo mt-1" maxLength={80} placeholder="quando, onde" />
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {SUGESTOES_SE.map((s) => (
            <button key={s} onClick={() => setP({ ...p, se: s })} className="rounded-full border border-line-2 px-3 py-1 text-sm text-ink-2 hover:border-acento">{s}</button>
          ))}
        </div>
        <label className="mt-4 block">
          <span className="font-bold text-ink">…então eu</span>
          <input value={p.entao} onChange={(e) => setP({ ...p, entao: e.target.value })} className="campo mt-1" maxLength={80} placeholder="o quê, exatamente" />
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {SUGESTOES_ENTAO.map((s) => (
            <button key={s} onClick={() => setP({ ...p, entao: s })} className="rounded-full border border-line-2 px-3 py-1 text-sm text-ink-2 hover:border-acento">{s}</button>
          ))}
        </div>
        {pronto && (
          <p className="titulo mt-5 rounded-xl bg-campanha-wash px-4 py-3 text-2xl text-ink">
            Se for {p.se}, então eu {p.entao}.
          </p>
        )}
      </section>

      <section className="mt-6 rounded-2xl border border-line bg-surface p-5">
        <h2 className="text-xl font-bold text-ink">3. A data e a revisão anual</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="font-bold text-ink">Quando você vai fazer isso?</span>
            <input type="date" min={hojeISO()} value={p.data} onChange={(e) => setP({ ...p, data: e.target.value })} className="campo mt-1" />
          </label>
          <label className="block">
            <span className="font-bold text-ink">Mês da revisão anual</span>
            <select value={p.marco} onChange={(e) => setP({ ...p, marco: e.target.value })} className="campo mt-1">
              <option value="">— escolha (ex.: o do seu aniversário)</option>
              {MESES.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={() => salvar()}
          disabled={!pronto}
          className="rounded-xl bg-acento px-6 py-3.5 font-bold text-sobre-acento hover:brightness-110 disabled:opacity-40"
        >
          Salvar meu plano
        </button>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => {
              salvar();
              baixarLembrete({
                data: p.data || hojeISO(),
                titulo: "Eu vou: minha revisão",
                descricao: `Se for ${p.se}, então eu ${p.entao}. Leve as 3 perguntas: quais são minhas opções? Quais os benefícios e riscos? Qual a chance de isso acontecer comigo?`,
                anual: !!p.marco,
              });
            }}
            disabled={!pronto}
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-acento px-5 py-3 font-bold text-acento-2 hover:bg-acento-wash disabled:opacity-40"
          >
            <CalendarPlus aria-hidden className="h-5 w-5" /> Pôr na agenda do celular
          </button>
          <button
            onClick={async () => {
              salvar();
              setGerando(true);
              await gerarCartao(lerNumeros(), p);
              setGerando(false);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-acento px-5 py-3 font-bold text-acento-2 hover:bg-acento-wash"
          >
            <FileDown aria-hidden className="h-5 w-5" /> {gerando ? "Gerando…" : "Baixar cartão de bolso"}
          </button>
        </div>
        {salvo && (
          <Resultado tom="ok" titulo="Plano salvo, só neste aparelho.">
            O lembrete abre no calendário do celular; com o mês da revisão escolhido, ele repete todo ano. O cartão traz os seus números, as luzes de alerta e as 3 perguntas.
          </Resultado>
        )}
        <p className="text-sm text-muted">Onde marcar: plano de saúde ou convênio, UBS (SUS), medicina do trabalho, programas da empresa. Benefícios variam — confira com o RH.</p>
      </div>
    </PaginaModulo>
  );
}
