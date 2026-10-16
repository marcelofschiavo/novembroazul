import Image from "next/image";

/**
 * A marca da campanha: a Roda da Saúde — oito raios e uma roda "torta"
 * (desalinhada), que é o ponto de partida da palestra. Desenhada em SVG,
 * funciona em qualquer tema e offline.
 */
export function MarcaRoda({ tamanho = 40, animar = false }: { tamanho?: number; animar?: boolean }) {
  const raios = Array.from({ length: 8 }, (_, i) => {
    const a = ((-90 + 45 * i) * Math.PI) / 180;
    return { x: 40 * Math.cos(a), y: 40 * Math.sin(a) };
  });
  return (
    <svg width={tamanho} height={tamanho} viewBox="-50 -50 100 100" aria-hidden fill="none">
      <polygon points={raios.map((p) => `${p.x},${p.y}`).join(" ")} stroke="var(--campanha-fill)" strokeWidth="3" strokeLinejoin="round" opacity=".55" />
      {raios.map((p, i) => (
        <line key={i} x1="0" y1="0" x2={p.x} y2={p.y} stroke="var(--campanha-fill)" strokeWidth="2" opacity=".45" />
      ))}
      <polygon
        points="0,-32 11.3,-11.3 24,0 8.5,8.5 0,28 -14.1,14.1 -24,0 -11.3,-11.3"
        fill="var(--campanha-fill)"
        fillOpacity=".28"
        stroke="var(--campanha)"
        strokeWidth="4"
        strokeLinejoin="round"
        style={animar ? { transformOrigin: "center", animation: "none" } : undefined}
      />
    </svg>
  );
}

/**
 * Marca da Mindheart para o palco: troca sozinha entre a versão com o nome
 * em cinza-escuro (fundo claro) e a com o nome claro (fundo escuro), pelo
 * atributo `data-claro` no <html> (ver .logo-* em globals.css).
 */
export function MindheartPalco({ altura = 28 }: { altura?: number }) {
  const largura = Math.round((altura * 727) / 550);
  return (
    <span className="relative inline-block" style={{ height: altura, width: largura }}>
      <span className="logo-escura absolute inset-0">
        <Image src="/logo/mindheart-claro.png" alt="Mindheart" unoptimized width={largura} height={altura} style={{ height: altura, width: "auto" }} />
      </span>
      <span className="logo-clara absolute inset-0">
        <Image src="/logo/mindheart.png" alt="Mindheart" unoptimized width={largura} height={altura} style={{ height: altura, width: "auto" }} />
      </span>
    </span>
  );
}

/** Mindheart na leitura (trilha): sempre a versão de fundo claro. */
export function Mindheart({ altura = 34 }: { altura?: number }) {
  return <Image src="/logo/mindheart.png" alt="Mindheart" unoptimized width={Math.round((altura * 727) / 550)} height={altura} style={{ height: altura, width: "auto" }} />;
}
