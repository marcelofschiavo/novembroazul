"use client";

import Image from "next/image";
import { MarcaRoda, MindheartPalco } from "@/components/ui/Logo";
import { useKit } from "./PalcoContext";

/**
 * Rodapé fixo de todos os slides: logo de quem contratou (quando houver),
 * marca da campanha e Mindheart; aviso educativo; CVV.
 */
export function Rodape() {
  const { ui, parceiro } = useKit();
  // O logo do cliente vai sempre numa pílula branca: no fundo escuro do palco
  // um logo em azul-marinho e cinza sumiria.
  const altura = 26;
  return (
    <div className="palco-rodape">
      <div className="flex items-center gap-4" role="group" aria-label={`${parceiro ? `${parceiro.nome}, ` : ""}${ui.marca} e Mindheart`}>
        {parceiro && (
          <>
            <span className="flex items-center rounded-full bg-white px-3.5 py-[5px] shadow-sm ring-1 ring-black/10">
              <Image
                src={parceiro.src}
                alt={parceiro.nome}
                unoptimized
                width={Math.round((altura * parceiro.largura) / parceiro.altura)}
                height={altura}
                style={{ height: altura, width: "auto" }}
              />
            </span>
            <span aria-hidden className="h-6 w-px bg-line-2" />
          </>
        )}
        <MarcaRoda tamanho={30} />
        <span className="whitespace-nowrap">{ui.marca}</span>
        <span aria-hidden className="h-6 w-px bg-line-2" />
        <MindheartPalco altura={36} />
      </div>
      <span>{ui.aviso}</span>
      <span className="whitespace-nowrap text-campanha">{ui.ajudaRodape}</span>
    </div>
  );
}
