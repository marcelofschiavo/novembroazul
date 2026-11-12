"use client";

import { TemaProvider } from "@/components/ui/TemaProvider";
import { MotorPalco } from "@/components/palco/MotorPalco";
import { SEQUENCIA_ITALIANO, CHAVE_POSICAO_ITALIANO } from "@/lib/palco";
import { KIT_IT } from "@/conteudo/it/palco";

/** Versão italiana da palestra (rascunho): mesma estrutura, dados e serviços da Itália. */
export default function PaginaPalcoItaliano() {
  return (
    <TemaProvider tema="palco">
      <MotorPalco sequencia={SEQUENCIA_ITALIANO} chavePosicao={CHAVE_POSICAO_ITALIANO} kit={KIT_IT} />
    </TemaProvider>
  );
}
