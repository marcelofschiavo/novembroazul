"use client";

import { useState } from "react";
import { PaginaModulo, Resultado } from "@/components/trilha/PaginaModulo";

function Pontos({ acesos, cor }: { acesos: number; cor: string }) {
  return (
    <svg viewBox="0 0 400 160" className="w-full" role="img" aria-label={`${acesos} em 1.000`}>
      {Array.from({ length: 1000 }, (_, i) => (
        <circle key={i} cx={4 + (i % 50) * 8} cy={4 + Math.floor(i / 50) * 8} r={i < acesos ? 3.6 : 2.5} fill={i < acesos ? cor : "var(--line-2)"} />
      ))}
    </svg>
  );
}

export default function PaginaPsa() {
  const [idade, setIdade] = useState("");
  const [negro, setNegro] = useState(false);
  const [familia, setFamilia] = useState(false);
  const [sintomas, setSintomas] = useState(false);
  const [entendi, setEntendi] = useState(false);

  const n = Number(idade);
  const inicio = negro || familia ? 45 : 50;
  let orientacao: { tom: "ok" | "atencao" | "alerta" | "neutro"; titulo: string; texto: string } | null = null;
  if (sintomas) {
    orientacao = { tom: "atencao", titulo: "Com sintomas, não é rastreamento: é investigação.", texto: "Jato fraco, levantar à noite, sangue na urina: marque consulta, em qualquer idade. Na maioria das vezes é algo benigno e tratável." };
  } else if (n >= 18) {
    orientacao =
      n >= inicio
        ? { tom: "neutro", titulo: `A partir dos ${inicio}: hora de conversar sobre o PSA.`, texto: "Leve as 3 perguntas abaixo e decida com o médico, sabendo os benefícios e os riscos." }
        : { tom: "ok", titulo: `A conversa sobre o PSA começa aos ${inicio}.`, texto: "Até lá, o seu painel é outro: pressão, cintura, glicemia, sono e cabeça." };
  }

  return (
    <PaginaModulo
      id="psa"
      titulo="Decidir junto: o PSA"
      ideia="O exame de PSA pode ajudar e pode atrapalhar. Por isso a decisão é sua, com o médico — sabendo o que se ganha e o que se arrisca."
      porque="Ferramentas de apoio à decisão, como esta, aumentam o conhecimento, deixam a percepção de risco mais realista e reduzem o conflito na hora de decidir (revisão Cochrane). E números em “tantos em 1.000” são entendidos por muito mais gente do que porcentagens."
      fontes={["harding2020", "erspc2025", "hamdy2023", "hugosson2022", "naji2018", "sbu", "msInca", "shepherd2011", "stacey2017", "gomes2008"]}
      concluido={entendi}
    >
      <section>
        <h2 className="text-2xl font-bold text-ink">1. O que 1.000 homens mostram</h2>
        <p className="mt-1 text-ink-2">Homens de 50 a 75 anos acompanhados por 16 anos. Os pontos maiores são as mortes por câncer de próstata.</p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="font-bold text-ink">Com rastreamento: <span className="text-campanha">10 em 1.000</span></p>
            <Pontos acesos={10} cor="var(--alerta)" />
          </div>
          <div>
            <p className="font-bold text-ink">Sem rastreamento: <span className="text-campanha">12 em 1.000</span></p>
            <Pontos acesos={12} cor="var(--alerta)" />
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Resultado tom="ok" titulo="O que pode ganhar">2 mortes a menos por câncer de próstata em cada 1.000 homens, em 16 anos. No estudo europeu de 23 anos: 1 morte evitada a cada 456 homens convidados.</Resultado>
          <Resultado tom="atencao" titulo="O que pode perder">Resultados falsos positivos, biópsias de quem não tinha câncer e tratamento de cânceres que nunca fariam mal — com efeitos na função urinária e sexual.</Resultado>
        </div>
        <p className="mt-3 text-sm text-muted">A mortalidade geral foi igual nos dois grupos. E nem todo câncer de próstata precisa de tratamento imediato: em 15 anos, monitorar, operar ou irradiar tiveram mortalidade baixa e parecida (estudo ProtecT).</p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">2. E no meu caso?</h2>
        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4">
          <label className="block">
            <span className="font-bold text-ink">Sua idade</span>
            <input inputMode="numeric" value={idade} onChange={(e) => setIdade(e.target.value.replace(/\D/g, ""))} className="campo mt-1 max-w-[8rem]" />
          </label>
          <label className="flex items-center gap-3"><input type="checkbox" checked={negro} onChange={(e) => setNegro(e.target.checked)} className="h-5 w-5 accent-[var(--acento)]" /> Sou um homem negro</label>
          <label className="flex items-center gap-3"><input type="checkbox" checked={familia} onChange={(e) => setFamilia(e.target.checked)} className="h-5 w-5 accent-[var(--acento)]" /> Meu pai ou irmão teve câncer de próstata</label>
          <label className="flex items-center gap-3"><input type="checkbox" checked={sintomas} onChange={(e) => setSintomas(e.target.checked)} className="h-5 w-5 accent-[var(--acento)]" /> Tenho sintomas urinários (jato fraco, levantar à noite, sangue)</label>
        </div>
        {orientacao && (
          <div className="mt-3" aria-live="polite">
            <Resultado tom={orientacao.tom} titulo={orientacao.titulo}>{orientacao.texto}</Resultado>
          </div>
        )}
        <p className="mt-3 text-sm text-muted">
          A Sociedade Brasileira de Urologia recomenda conversar a partir dos 50 (45 para homens negros ou com pai ou irmão com a doença). O Ministério da Saúde e o INCA não recomendam o exame em massa em quem não tem sintomas. Os dois concordam: decisão individual, com o médico.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">3. E o toque retal?</h2>
        <ul className="mt-3 flex flex-col gap-2 text-ink">
          <li>▸ Sozinho, ele identifica cerca de metade dos casos.</li>
          <li>▸ Em vários países, o caminho hoje é: PSA, depois ressonância, e biópsia só se a ressonância mostrar algo — o que reduziu pela metade os diagnósticos desnecessários.</li>
          <li>▸ No Brasil, o urologista pode associar PSA e toque. Quem escolhe os exames do seu caso é ele, com você.</li>
          <li>▸ Pesquisa brasileira mostra o toque visto como “arranhadura na masculinidade”. A barreira é essa ideia — não o exame, que dura segundos.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">4. Leve 3 perguntas</h2>
        <ol className="mt-3 flex flex-col gap-2">
          {["Quais são as minhas opções?", "Quais os benefícios e os riscos de cada uma?", "Qual a chance de isso acontecer comigo?"].map((p, i) => (
            <li key={p} className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-lg font-bold text-ink">
              <span className="dados flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-acento text-sm text-sobre-acento">{i + 1}</span>
              {p}
            </li>
          ))}
        </ol>
        <p className="mt-2 text-sm text-muted">Testadas em estudo: com elas, o médico dá informação de melhor qualidade. Estão no seu cartão de bolso.</p>
      </section>

      <button onClick={() => setEntendi(true)} disabled={entendi} className="mt-8 w-full rounded-xl bg-acento px-6 py-3.5 font-bold text-sobre-acento hover:brightness-110 disabled:opacity-60">
        {entendi ? "✓ Pronto — marcado na sua trilha" : "Entendi: vou decidir junto com o médico"}
      </button>
    </PaginaModulo>
  );
}
