"use client";

import type { Slide as TipoSlide } from "@/conteudo/blocos";
import { mitoPorId } from "@/conteudo/saude";
import { Fonte } from "./Fonte";
import { Capa, Palestrante, Pergunta } from "./slides/Abertura";
import { Numeros } from "./slides/Numeros";
import { Historia } from "./slides/Historia";
import { Painel } from "./slides/Painel";
import { RodaSlide, CartaMito, Quilometragem } from "./slides/Revisao";
import { PsaToque, LuzesNivel, Couraca, QuemConta } from "./slides/Novos";
import { Frase, DuasColunas, Lista, Passos, Pensamentos, Reescrita, Caminhos, Exercicio, SeEntao, OndeIr, Fecho, Perguntas } from "./slides/Conversa";

function Miolo({ slide }: { slide: TipoSlide }) {
  switch (slide.tipo) {
    case "capa":
      return <Capa slide={slide} />;
    case "palestrante":
      return <Palestrante />;
    case "pergunta":
      return <Pergunta slide={slide} />;
    case "numeros":
      return <Numeros slide={slide} />;
    case "historia":
      return <Historia slide={slide} />;
    case "frase":
      return <Frase slide={slide} />;
    case "painel":
      return <Painel slide={slide} />;
    case "roda":
      return <RodaSlide slide={slide} />;
    case "mito":
    case "mitoRevelado": {
      const mito = slide.mitoId ? mitoPorId(slide.mitoId) : undefined;
      return mito ? <CartaMito mito={mito} revelado={slide.tipo === "mitoRevelado"} /> : null;
    }
    case "quilometragem":
      return <Quilometragem slide={slide} />;
    case "duasColunas":
      return <DuasColunas slide={slide} />;
    case "lista":
      return <Lista slide={slide} />;
    case "passos":
      return <Passos slide={slide} />;
    case "pensamentos":
      return <Pensamentos slide={slide} />;
    case "reescrita":
      return <Reescrita slide={slide} />;
    case "caminhos":
      return <Caminhos slide={slide} />;
    case "exercicio":
      return <Exercicio slide={slide} />;
    case "seEntao":
      return <SeEntao slide={slide} />;
    case "ondeIr":
      return <OndeIr slide={slide} />;
    case "fecho":
      return <Fecho slide={slide} />;
    case "perguntas":
      return <Perguntas slide={slide} />;
    case "psaToque":
      return <PsaToque slide={slide} />;
    case "luzesNivel":
      return <LuzesNivel slide={slide} />;
    case "couraca":
      return <Couraca slide={slide} />;
    case "quemConta":
      return <QuemConta slide={slide} />;
    default:
      return null;
  }
}

/** Um slide: o miolo do tipo + a fonte (quando o slide traz dado). Mitos mostram a fonte no verso da carta. */
export function Slide({ slide }: { slide: TipoSlide }) {
  return (
    <div className="palco-conteudo w-full">
      <Miolo slide={slide} />
      {slide.tipo !== "mito" && slide.tipo !== "mitoRevelado" && <Fonte ids={slide.fonteIds} />}
    </div>
  );
}
