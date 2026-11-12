"use client";

import { createContext, useContext } from "react";

/**
 * Estado do palco que os slides precisam saber. `reduzido` vale quando a
 * apresentadora apertou A OU o sistema pede menos movimento — os slides usam
 * isso para parar as animações em laço (que a biblioteca de movimento não
 * consegue desligar sozinha). `fontesAbertas` (tecla R) mostra a citação
 * completa em todos os slides, sem precisar clicar em cada uma.
 */
export const PalcoCtx = createContext<{ reduzido: boolean; fontesAbertas: boolean }>({ reduzido: false, fontesAbertas: false });

export function usePalco() {
  return useContext(PalcoCtx);
}
