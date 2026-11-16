"use client";

import { useEffect, useState } from "react";
import { TemaProvider } from "@/components/ui/TemaProvider";
import { MotorPalco } from "@/components/palco/MotorPalco";
import { SEQUENCIA_PROBEM, CHAVE_POSICAO_PROBEM } from "@/lib/palco";
import { KIT_PROBEM, KIT_PROBEM_ONLINE } from "@/conteudo/probem";

/**
 * Palestra da Probem: versão sintetizada, com o logo no rodapé.
 * /palcoprobem?online troca "levante a mão" por "responda no chat" (Teams).
 */
export default function PaginaPalcoProbem() {
  const [online, setOnline] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOnline(new URLSearchParams(window.location.search).has("online"));
  }, []);
  return (
    <TemaProvider tema="palco">
      <MotorPalco sequencia={SEQUENCIA_PROBEM} chavePosicao={CHAVE_POSICAO_PROBEM} kit={online ? KIT_PROBEM_ONLINE : KIT_PROBEM} />
    </TemaProvider>
  );
}
