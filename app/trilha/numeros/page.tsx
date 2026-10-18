"use client";

import { useEffect, useState } from "react";
import { PaginaModulo, Resultado } from "@/components/trilha/PaginaModulo";
import { classificarPressao, classificarCintura, classificarGlicemia } from "@/conteudo/saude";
import { lerNumeros, gravarNumeros, hojeISO, type MeusNumeros } from "@/lib/local";

function num(v: string): number | null {
  const n = Number(v.replace(",", "."));
  return v.trim() && Number.isFinite(n) && n > 0 ? n : null;
}

export default function PaginaNumeros() {
  const [n, setN] = useState<MeusNumeros>({ pas: "", pad: "", cintura: "", glicemia: "", colesterol: "", data: "" });
  const [salvo, setSalvo] = useState(false);

  useEffect(() => {
    const x = lerNumeros();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setN(x);
    setSalvo(!!x.data);
  }, []);

  const pas = num(n.pas);
  const pad = num(n.pad);
  const cintura = num(n.cintura);
  const glic = num(n.glicemia);
  const naoSei = [
    !(pas && pad) && "pressão",
    !cintura && "cintura",
    !glic && "glicemia de jejum",
    !n.colesterol.trim() && "colesterol",
  ].filter(Boolean) as string[];

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
      titulo="Meus números"
      ideia="Quatro números que mostram o que o corpo não avisa. Anote o que você sabe; o que não souber vira item da próxima consulta."
      porque="Pressão alta, açúcar alto e gordura na barriga quase nunca dão sintoma. Na Pesquisa Nacional de Saúde, parte dos brasileiros tinha pressão alta sem saber — só se descobre medindo. Saber o próprio número transforma um risco invisível em algo que dá para acompanhar."
      fontes={["diretrizHA2025", "muntner2019", "malta2018", "omsCintura", "sbd2024", "lloydjones2022"]}
      concluido={salvo}
    >
      <div className="flex flex-col gap-6">
        <details className="cartao p-4">
          <summary className="cursor-pointer font-bold text-ink">Como medir a pressão do jeito certo (abra antes de medir)</summary>
          <ol className="mt-3 grid gap-1.5 text-[15px] text-ink">
            <li>1. Sem café, cigarro ou exercício nos 30 minutos antes. Bexiga vazia.</li>
            <li>2. Sentado, em silêncio, por 5 minutos. Costas apoiadas, pés no chão, pernas descruzadas.</li>
            <li>3. Manguito no braço nu, braço apoiado na altura do coração.</li>
            <li>4. Não converse durante a medida.</li>
            <li>5. Meça duas vezes, com 1 minuto de intervalo, e anote a média.</li>
          </ol>
          <p className="mt-2 text-sm text-muted">Use aparelho automático de braço, validado. Para confirmar pressão alta, a diretriz de 2025 recomenda medidas fora do consultório (MRPA ou MAPA), com orientação do médico.</p>
        </details>
        <fieldset className="cartao p-4">
          <legend className="px-1 font-bold text-ink">Pressão</legend>
          <p className="text-sm text-muted">“12 por 8” = 120 por 80. Use a última medida que você lembra.</p>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {campo("pas", "Máxima", "mmHg")}
            {campo("pad", "Mínima", "mmHg")}
          </div>
          {pas && pad && (
            <div className="mt-3">
              <Resultado tom={classificarPressao(pas, pad).tom} titulo={classificarPressao(pas, pad).rotulo}>
                {classificarPressao(pas, pad).texto}
              </Resultado>
            </div>
          )}
        </fieldset>

        <div className="cartao p-4">
          {campo("cintura", "Cintura", "cm", "Fita métrica na altura do umbigo, sem apertar.")}
          {cintura && (
            <div className="mt-3">
              <Resultado tom={classificarCintura(cintura).tom} titulo={classificarCintura(cintura).rotulo}>{classificarCintura(cintura).texto}</Resultado>
            </div>
          )}
        </div>

        <div className="cartao p-4">
          {campo("glicemia", "Glicemia de jejum", "mg/dL", "Do último exame de sangue. A diretriz brasileira de 2025 recomenda medir a partir dos 35 anos.")}
          {glic && (
            <div className="mt-3">
              <Resultado tom={classificarGlicemia(glic).tom} titulo={classificarGlicemia(glic).rotulo}>{classificarGlicemia(glic).texto}</Resultado>
            </div>
          )}
        </div>

        <div className="cartao p-4">
          <label className="block">
            <span className="font-bold text-ink">Colesterol</span>
            <span className="block text-sm text-muted">Anote como veio no exame (ex.: “LDL 130”). A meta depende do seu risco — quem define é o médico.</span>
            <input value={n.colesterol} onChange={(e) => setN({ ...n, colesterol: e.target.value })} className="campo mt-1" placeholder="não sei" />
          </label>
        </div>

        {naoSei.length > 0 && (
          <Resultado tom="neutro" titulo="Para levar à próxima consulta">
            Medir ou pedir: {naoSei.join(", ")}.
          </Resultado>
        )}

        <button
          onClick={() => {
            const x = { ...n, data: hojeISO() };
            gravarNumeros(x);
            setN(x);
            setSalvo(true);
          }}
          className="rounded-xl bg-acento px-6 py-3.5 font-bold text-sobre-acento hover:brightness-110"
        >
          Salvar meus números
        </button>
        {salvo && <p className="text-sm text-ink-2" aria-live="polite">Salvos só neste aparelho. Eles entram no seu cartão de bolso, no passo “Meu plano”.</p>}
        <p className="text-sm text-muted">Isto é orientação geral, não diagnóstico. Uma medida isolada não fecha diagnóstico de nada.</p>
      </div>
    </PaginaModulo>
  );
}
