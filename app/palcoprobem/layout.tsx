import type { Metadata } from "next";

/** Versão de cliente: fora dos buscadores e sem link na página inicial. */
export const metadata: Metadata = {
  title: "Por inteiro · Novembro Azul · Probem",
  robots: { index: false, follow: false },
};

export default function LayoutPalcoProbem({ children }: { children: React.ReactNode }) {
  return children;
}
