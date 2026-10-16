import { MarcaRoda, MindheartPalco } from "@/components/ui/Logo";

/** Rodapé fixo de todos os slides: marca da campanha e Mindheart; aviso educativo; CVV. */
export function Rodape() {
  return (
    <div className="palco-rodape">
      <div className="flex items-center gap-4" role="group" aria-label="Por inteiro e Mindheart">
        <MarcaRoda tamanho={30} />
        <span>Por inteiro · Novembro Azul</span>
        <span aria-hidden className="h-6 w-px bg-line-2" />
        <MindheartPalco altura={36} />
      </div>
      <span>Conteúdo educativo · não substitui consulta</span>
      <span className="text-campanha">CVV 188 · 24h</span>
    </div>
  );
}
