"use client";

import { MarcaRoda, MindheartPalco } from "@/components/ui/Logo";
import { useKit } from "./PalcoContext";

/** Rodapé fixo de todos os slides: marca da campanha e Mindheart; aviso educativo; CVV. */
export function Rodape() {
  const { ui } = useKit();
  return (
    <div className="palco-rodape">
      <div className="flex items-center gap-4" role="group" aria-label={`${ui.marca} e Mindheart`}>
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
