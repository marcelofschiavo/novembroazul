import { PaginaModulo } from "@/components/trilha/PaginaModulo";
import { BLOCOS, type Slide } from "@/conteudo/blocos";
import { PERSONAGENS } from "@/conteudo/historia";
import { mitoPorId, PENSAMENTOS, LUZES } from "@/conteudo/saude";
import { fontesCurtas } from "@/conteudo/referencias";

/** Texto de um slide, para ler com calma. Gerado do roteiro do palco — os dois nunca divergem. */
function Trecho({ s }: { s: Slide }) {
  if (s.tipo === "capa" || s.tipo === "palestrante" || s.tipo === "fecho" || s.tipo === "perguntas" || s.tipo === "mito") return null;
  const fonte = s.fonteIds?.length ? <p className="dados mt-1 text-xs text-muted">fonte: {fontesCurtas(s.fonteIds)}</p> : null;

  if (s.tipo === "historia" && s.historia) {
    const h = s.historia;
    return (
      <div className="rounded-xl border-l-4 border-campanha-fill bg-campanha-wash px-4 py-3">
        <p className="dados text-xs font-bold uppercase text-campanha">História · {h.quando}</p>
        <p className="mt-1 text-ink">{h.cena}</p>
        {h.falas?.map((f, i) => (
          <p key={i} className="mt-1 font-semibold text-ink">
            {PERSONAGENS[f.quem].nome}: “{f.texto}”
          </p>
        ))}
        {h.desfecho && <p className="mt-1 italic text-ink-2">{h.desfecho}</p>}
      </div>
    );
  }
  if (s.tipo === "mitoRevelado" && s.mitoId) {
    const m = mitoPorId(s.mitoId)!;
    return (
      <div>
        <p className="font-bold text-ink">“{m.afirmacao}” — <span className="text-alerta">{m.resposta}</span></p>
        <p className="text-ink-2">{m.comentario}</p>
        <p className="dados mt-1 text-xs text-muted">fonte: {fontesCurtas(m.fonteIds)}</p>
      </div>
    );
  }
  return (
    <div>
      {s.sobre && <p className="dados text-xs uppercase text-muted">{s.sobre}</p>}
      {s.titulo && <p className="text-lg font-bold text-ink">{s.titulo}</p>}
      {s.segunda && <p className="text-lg font-bold text-ink">{s.segunda}</p>}
      {s.numeros && <p className="text-ink-2">{s.numeros.map((n) => `${n.valor} ${n.rotulo}${n.detalhe ? ` (${n.detalhe})` : ""}`).join(" · ")}</p>}
      {s.instrucao && <p className="text-ink-2">{s.instrucao}</p>}
      {s.linhas?.map((l) => (
        <p key={l.faixa} className="text-ink-2"><strong>{l.faixa}:</strong> {l.itens.join("; ")}</p>
      ))}
      {s.colunas?.map((c) => (
        <p key={c.titulo} className="text-ink-2"><strong>{c.titulo}:</strong> {c.itens.join("; ")}</p>
      ))}
      {s.itens && <ul className="text-ink-2">{s.itens.map((i) => <li key={i}>▸ {i}</li>)}</ul>}
      {s.passos && <ul className="text-ink-2">{s.passos.map((p) => <li key={p.titulo}>▸ <strong>{p.titulo}</strong>{p.texto ? ` — ${p.texto}` : ""}</li>)}</ul>}
      {s.tipo === "pensamentos" && <ul className="text-ink-2">{PENSAMENTOS.slice(0, 4).map((p) => <li key={p.id}>▸ “{p.automatico}” → {p.resposta}</li>)}</ul>}
      {s.tipo === "luzes" && <ul className="text-ink-2">{LUZES.map((l) => <li key={l.id}>▸ {l.texto}</li>)}</ul>}
      {s.tipo === "painel" && <p className="text-ink-2">Pressão abaixo de 12 por 8 · cintura abaixo de 94 cm · glicemia de jejum abaixo de 100 · colesterol: a meta depende do seu risco.</p>}
      {s.tipo === "pressao" && <p className="text-ink-2">Normal: abaixo de 12 por 8 · pré-hipertensão: de 12 por 8 a 13,9 por 8,9 · hipertensão: 14 por 9 ou mais.</p>}
      {s.tipo === "caixaFatos" && <p className="text-ink-2">Em 16 anos, de cada 1.000 homens: 10 morrem de câncer de próstata com rastreamento, 12 sem.</p>}
      {s.ruim && <p className="text-ink-2"><span className="line-through">“{s.ruim}”</span> → <strong>“{s.boa}”</strong></p>}
      {s.caminhos?.map((c) => <p key={c.rotulo} className="text-ink-2"><strong>“{c.fala}”</strong> → {c.resultado}</p>)}
      {s.exemplos && <ul className="text-ink-2">{s.exemplos.map((e) => <li key={e}>▸ “{e}”</li>)}</ul>}
      {s.destaque && <p className="mt-1 font-semibold text-ink">{s.destaque}</p>}
      {fonte}
    </div>
  );
}

export default function PaginaReveja() {
  return (
    <PaginaModulo id="reveja" titulo="Reveja a palestra" ideia="Tudo o que passou na tela, em texto, na mesma ordem — com a história do Davi, do Roberto e da Lia. Cerca de 8 minutos de leitura.">
      <div className="flex flex-col gap-10">
        {BLOCOS.filter((b) => b.id !== "perguntas").map((b) => (
          <section key={b.id}>
            <h2 className="titulo text-2xl text-ink">
              <span className="dados mr-2 text-base text-campanha">{b.numero}</span>
              {b.titulo}
            </h2>
            <div className="mt-4 flex flex-col gap-5">
              {b.slides.map((s) => (
                <Trecho key={s.id} s={s} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </PaginaModulo>
  );
}
