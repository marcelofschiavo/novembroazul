import type { Metadata, Viewport } from "next";
import { Outfit, IBM_Plex_Mono, Nunito, Lora, Playfair_Display, Atkinson_Hyperlegible } from "next/font/google";
import { Inicializacao } from "@/components/ui/Inicializacao";
import { EVENTO } from "@/conteudo/palestrante";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

// Fontes alternativas do palco (escolhidas nas configurações).
const nunito = Nunito({ variable: "--font-nunito", weight: ["400", "600", "700", "800", "900"], style: ["normal", "italic"], subsets: ["latin"], display: "swap", preload: false });
const lora = Lora({ variable: "--font-lora", weight: ["400", "600", "700"], style: ["normal", "italic"], subsets: ["latin"], display: "swap", preload: false });
const playfair = Playfair_Display({ variable: "--font-playfair", weight: ["700", "800", "900"], style: ["normal", "italic"], subsets: ["latin"], display: "swap", preload: false });
const atkinson = Atkinson_Hyperlegible({ variable: "--font-atkinson", weight: ["400", "700"], style: ["normal", "italic"], subsets: ["latin"], display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(EVENTO.url),
  title: "Por inteiro · Novembro Azul",
  description:
    "Saúde do homem, do check-up à conversa: palestra e trilha do Novembro Azul com Marcelo Schiavo, psicólogo. Conteúdo educativo, com fonte em cada dado.",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0B1B33",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      data-tema="leitura"
      className={`${outfit.variable} ${plexMono.variable} ${nunito.variable} ${lora.variable} ${playfair.variable} ${atkinson.variable}`}
    >
      <body>
        {children}
        <Inicializacao />
      </body>
    </html>
  );
}
