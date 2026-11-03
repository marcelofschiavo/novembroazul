"use client";

import { TemaProvider } from "@/components/ui/TemaProvider";
import { MotorPalco } from "@/components/palco/MotorPalco";
import { SEQUENCIA_CURTA, CHAVE_POSICAO_CURTA } from "@/lib/palco";

/** Versão curta da palestra: os pontos centrais, em cerca de 25 minutos. */
export default function PaginaPalcoCurto() {
  return (
    <TemaProvider tema="palco">
      <MotorPalco sequencia={SEQUENCIA_CURTA} chavePosicao={CHAVE_POSICAO_CURTA} />
    </TemaProvider>
  );
}
