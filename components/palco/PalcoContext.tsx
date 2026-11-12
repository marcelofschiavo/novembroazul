"use client";

import { createContext, useContext } from "react";
import { KIT_PT, type KitPalco } from "@/conteudo/kit";

/**
 * Estado do palco que os slides precisam saber. `reduzido` vale quando a
 * apresentadora apertou A OU o sistema pede menos movimento — os slides usam
 * isso para parar as animações em laço (que a biblioteca de movimento não
 * consegue desligar sozinha). `fontesAbertas` (tecla R) mostra a citação
 * completa em todos os slides, sem precisar clicar em cada uma. `kit` traz o
 * conteúdo no idioma da palestra (português ou italiano).
 */
export const PalcoCtx = createContext<{ reduzido: boolean; fontesAbertas: boolean; kit: KitPalco }>({
  reduzido: false,
  fontesAbertas: false,
  kit: KIT_PT,
});

export function usePalco() {
  return useContext(PalcoCtx);
}

export function useKit() {
  return useContext(PalcoCtx).kit;
}
