"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Droplet, MoonStar, HeartPulse, BedDouble, Zap, CloudRain, type LucideIcon } from "lucide-react";
import { PaginaModulo, Resultado } from "@/components/trilha/PaginaModulo";
import { classificarPressao, classificarCintura, classificarGlicemia, LUZES } from "@/conteudo/saude";
import { lerNumeros, gravarNumeros, lerLuzes, gravarLuzes, hojeISO, type MeusNumeros } from "@/lib/local";

const ICONE: Record<string, LucideIcon> = { gota: Droplet, noite: MoonStar, coracao: HeartPulse, lua: BedDouble, raio: Zap, nuvem: CloudRain };

const REVISAO = [
  { faixa: "Desde os 18", itens: ["Pressão", "Peso e cintura", "Sono, cabeça e álcool", "Vacinas em dia"] },
  { faixa: "A partir dos 35", itens: ["Glicemia (açúcar no sangue)", "Colesterol"] },
  { faixa: "A partir dos 45–50", itens: ["Próstata: conversar com o médico", "Intestino: teste nas fezes"] },
];

function num(v: string): number | null {
  const n = Number(v.replace(",", "."));
  return v.trim() && Number.isFinite(n) && n > 0 ? n : null;
}

/**
 * O meu painel (passo 4): a revisão por idade, as luzes que não esperam e,
 * para quem quiser, os próprios números. Sem aula de medicina — o
 * detalhe do PSA fica no extra /trilha/psa. (/trilha/luzes redireciona
 * para cá: as luzes eram um passo à parte.)
 */
export default function PaginaPainel() {
  const [n, setN] = useState<MeusNumeros>({ pas: "", pad: "", cintura: "", glicemia: "", colesterol: "", data: "" });
  const [marcadas, setMarcadas] = useState<string[]>([]);
  const [revisado, setRevisado] = useState(false);

  useEffect(() => {
    const x = lerNumeros();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setN(x);
    setMarcadas(lerLuzes().marcadas);
    setRevisado(!!x.data);
  }, []);

  function alternar(id: string) {
    const novas = marcadas.includes(id) ? marcadas.filter((x) => x !== id) : [...marcadas, id];
    setMarcadas(novas);
    gravarLuzes(novas);
  }

  const pas = num(n.pas);
  const pad = num(n.pad);
  const cintura = num(n.cintura);
  const glic = num(n.glicemia);

  function campo(chave: keyof MeusNumeros, rotulo: string, unidade: string, dica?: string) {
    return (
      <label className="block">
        <span className="font-bold text-ink">{rotulo}</span>
        {dica && <span className="block text-sm text-muted">{dica}</span>}
        <span className="mt-1 flex items-center gap-2">
          <input inputMode="decimal" value={n[chave]} onChange={(e) => setN({ ...n, [chave]: e.target.value })} className="campo" placeholder="não sei" />
          <span className="dados shrink-0 text-sm text-muted">{unidade}</span>
        </span>
      </label>
    );
  }

  return (
    <PaginaModulo
      id="numeros"
      titulo="O meu painel"
      ideia="Sem aula de medicina: só o que olhar em cada fase da vida e os sinais que não esperam a revisão. O resto, o médico ajusta com você."
      historia="Roberto levantava várias vezes à noite e dizia “é da idade”. Era uma luz acesa — e, como quase sempre, tratável."
      leve="Não sentir nada não é o mesmo que estar tudo bem. O painel se olha antes de a luz acender."
      porque="Fazer exame de tudo, todo ano, para todo mundo não reduziu mortes num estudo com 233 mil pessoas. O que funciona é o item certo na idade certa. E várias coisas importantes não dão sintoma: na Pesquisa Nacional de Saúde, parte dos brasileiros tinha pressão alta sem saber — só se descobre medindo."
      fontes={["krogsboll2019", "malta2018", "diretrizHA2025", "sbd2024", "sbu", "msInca", "fitSus2026", "tufik2010", "inman2009", "martin2013"]}
      concluido={revisado}
    >
      <section>
        <h2 className="text-2xl font-bold text-ink">1. A revisão por idade</h2>
        <p className="mt-1 text-ink-2">Como no carro: cada quilometragem tem os seus itens.</p>
        <ol className="mt-4 grid gap-3 sm:grid-cols-3">
          {REVISAO.map((r, k) => (
            <li key={r.faixa} className="cartao p-4">
              <span className="dados flex h-8 w-8 items-center justify-center rounded-full bg-acento text-sm font-bold text-sobre-acento">{k + 1}</span>
              <span className="mt-2 block text-lg font-bold text-ink">{r.faixa}</span>
              <ul className="mt-1 flex flex-col gap-0.5 text-[15px] text-ink-2">
                {r.itens.map((it) => (
                  <li key={it}>▸ {it}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
          <strong className="text-ink">Sobre a próstata:</strong> o exame de PSA não é consenso. A Sociedade Brasileira de Urologia sugere conversar a
          partir dos 50 (45 para homens negros ou com pai ou irmão com a doença); o Ministério da Saúde não indica o exame para todo homem sem sintoma.
          A decisão é sua, com o médico.{" "}
          <Link href="/trilha/psa" className="font-bold text-acento-2 underline">Quer os números antes da consulta?</Link>
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">2. Luzes que não esperam a revisão</h2>
        <p className="mt-1 text-ink-2">Toque nos sinais que você tem notado. O resultado fica só aqui.</p>
        <ul className="mt-4 grid gap-3">
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
        <div className="mt-4 flex flex-col gap-3" aria-live="polite">
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
            <Resultado tom="ok" titulo="Nenhuma luz acesa agora.">Ótimo. A revisão por idade continua valendo.</Resultado>
          )}
          {marcadas.includes("humor") && (
            <Resultado tom="neutro" titulo="Cabeça também é saúde.">
              Conversar ajuda. CVV 188, 24 horas, gratuito — também para quem só precisa falar.
            </Resultado>
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">3. Já sabe os seus números? (opcional)</h2>
        <p className="mt-1 text-ink-2">Se souber, anote: eles vão para o seu cartão de bolso. Se não souber, tudo bem — é o primeiro pedido da próxima consulta.</p>
        <details className="mt-4 cartao p-4">
          <summary className="cursor-pointer font-bold text-ink">Anotar pressão, cintura, glicemia e colesterol</summary>
          <div className="mt-4 flex flex-col gap-5">
            <fieldset>
              <legend className="font-bold text-ink">Pressão</legend>
              <p className="text-sm text-muted">“12 por 8” = 120 por 80. Use a última medida que você lembra.</p>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {campo("pas", "Máxima", "mmHg")}
                {campo("pad", "Mínima", "mmHg")}
              </div>
              {pas && pad && (
                <div className="mt-3">
                  <Resultado tom={classificarPressao(pas, pad).tom} titulo={classificarPressao(pas, pad).rotulo}>{classificarPressao(pas, pad).texto}</Resultado>
                </div>
              )}
            </fieldset>
            <div>
              {campo("cintura", "Cintura", "cm", "Fita métrica na altura do umbigo, sem apertar.")}
              {cintura && (
                <div className="mt-3">
                  <Resultado tom={classificarCintura(cintura).tom} titulo={classificarCintura(cintura).rotulo}>{classificarCintura(cintura).texto}</Resultado>
                </div>
              )}
            </div>
            <div>
              {campo("glicemia", "Glicemia de jejum", "mg/dL", "Do último exame de sangue.")}
              {glic && (
                <div className="mt-3">
                  <Resultado tom={classificarGlicemia(glic).tom} titulo={classificarGlicemia(glic).rotulo}>{classificarGlicemia(glic).texto}</Resultado>
                </div>
              )}
            </div>
            <label className="block">
              <span className="font-bold text-ink">Colesterol</span>
              <span className="block text-sm text-muted">Anote como veio no exame (ex.: “LDL 130”). A meta depende do seu caso — quem define é o médico.</span>
              <input value={n.colesterol} onChange={(e) => setN({ ...n, colesterol: e.target.value })} className="campo mt-1" placeholder="não sei" />
            </label>
            <p className="text-sm text-muted">Orientação geral, não diagnóstico. Uma medida isolada não fecha diagnóstico de nada.</p>
          </div>
        </details>
      </section>

      <button
        onClick={() => {
          const x = { ...n, data: hojeISO() };
          gravarNumeros(x);
          setN(x);
          setRevisado(true);
        }}
        className="mt-8 w-full rounded-xl bg-acento px-6 py-3.5 font-bold text-sobre-acento hover:brightness-110"
      >
        {revisado ? "✓ Painel revisado — salvar de novo" : "Revisei o meu painel"}
      </button>
      {revisado && <p className="mt-2 text-sm text-ink-2" aria-live="polite">Salvo só neste aparelho. Os números entram no seu cartão de bolso, no próximo passo.</p>}
    </PaginaModulo>
  );
}
