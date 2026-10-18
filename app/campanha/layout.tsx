import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kit de campanha para o RH · Por inteiro · Novembro Azul",
  description: "E-mails prontos para copiar, mensagens curtas, cartaz A4 e cartões de bolso para imprimir — Novembro Azul, saúde do homem.",
  robots: { index: false, follow: false },
};

export default function LayoutCampanha({ children }: { children: React.ReactNode }) {
  return children;
}
