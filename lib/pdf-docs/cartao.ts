import { jsPDF } from "jspdf";
import { carregarFontesPdf, baixarPdf, CORES_PDF } from "@/lib/pdf";
import { EVENTO } from "@/conteudo/palestrante";
import { LUZES } from "@/conteudo/saude";
import type { MeusNumeros, PlanoEuVou } from "@/lib/local";

/**
 * Cartão de bolso (A6, frente e verso numa página A4 para recortar): os
 * números, as luzes de alerta, as 3 perguntas e o plano. Gerado no navegador;
 * nada sai do aparelho. Sem caracteres fora do Latin-1 (setas, ≥) — a fonte
 * padrão do PDF não tem.
 */
export async function gerarCartao(n: MeusNumeros, p: PlanoEuVou): Promise<void> {
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  await carregarFontesPdf(doc);
  const L = 105;
  const A = 148;
  const m = 8;

  // Linha de corte
  doc.setDrawColor(190, 200, 215);
  doc.setLineDashPattern([1.5, 1.5], 0);
  doc.line(L, 0, L, A);
  doc.line(0, A, 2 * L, A);
  doc.setLineDashPattern([], 0);

  /* ---------- frente ---------- */
  doc.setFillColor(CORES_PDF.MARINHO);
  doc.rect(0, 0, L, 26, "F");
  doc.setFont("SourceSans3", "bold");
  doc.setTextColor("#FFFFFF");
  doc.setFontSize(18);
  doc.text("Por inteiro", m, 13);
  doc.setFontSize(8.5);
  doc.text("NOVEMBRO AZUL  |  MEU CARTÃO DE BOLSO", m, 20);

  let y = 35;
  const titulo = (t: string) => {
    doc.setFont("SourceSans3", "bold");
    doc.setFontSize(10);
    doc.setTextColor(CORES_PDF.ACENTO);
    doc.text(t.toUpperCase(), m, y);
    y += 5.5;
  };
  const linha = (rotulo: string, valor: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(CORES_PDF.MARINHO);
    doc.text(rotulo, m, y);
    doc.setFont("helvetica", "bold");
    doc.text(valor || "__________", L - m, y, { align: "right" });
    y += 5.6;
  };

  titulo("Meu painel");
  linha("Pressão (alvo: abaixo de 12 por 8)", n.pas && n.pad ? `${n.pas} / ${n.pad}` : "");
  linha("Cintura (alvo: abaixo de 94 cm)", n.cintura ? `${n.cintura} cm` : "");
  linha("Glicemia de jejum (abaixo de 100)", n.glicemia ? `${n.glicemia} mg/dL` : "");
  linha("Colesterol (meta: o médico define)", n.colesterol);
  y += 3;

  titulo("Luzes de alerta: não espere");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(CORES_PDF.MARINHO);
  for (const l of LUZES) {
    const t = doc.splitTextToSize(`-  ${l.texto}`, L - 2 * m);
    doc.text(t, m, y);
    y += 4.6 * t.length;
  }
  y += 2;
  doc.setFont("helvetica", "bold");
  doc.setTextColor(CORES_PDF.CINZA);
  doc.setFontSize(8.5);
  doc.text("Emergência: SAMU 192   |   Para conversar: CVV 188, 24h", m, y);

  /* ---------- verso ---------- */
  const x0 = L + m;
  doc.setFillColor(CORES_PDF.AZUL_CLARO);
  doc.rect(L, 0, L, 26, "F");
  doc.setFont("SourceSans3", "bold");
  doc.setTextColor("#FFFFFF");
  doc.setFontSize(18);
  doc.text("Eu vou.", x0, 13);
  doc.setFontSize(8.5);
  doc.text("MEU PLANO DE UMA FRASE", x0, 20);

  let y2 = 36;
  doc.setTextColor(CORES_PDF.MARINHO);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  const frase = doc.splitTextToSize(`Se for ${p.se || "__________"}, então eu ${p.entao || "__________"}.`, L - 2 * m);
  doc.text(frase, x0, y2);
  y2 += 6 * frase.length + 2;
  if (p.data) {
    const [a, mm, d] = p.data.split("-");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.text(`Data: ${d}/${mm}/${a}${p.marco ? `   |   Revisão anual: ${p.marco}` : ""}`, x0, y2);
    y2 += 8;
  } else {
    y2 += 2;
  }

  doc.setFont("SourceSans3", "bold");
  doc.setFontSize(10);
  doc.setTextColor(CORES_PDF.ACENTO);
  doc.text("3 PERGUNTAS PARA O MÉDICO", x0, y2);
  y2 += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(CORES_PDF.MARINHO);
  ["1. Quais são as minhas opções?", "2. Quais os benefícios e os riscos de cada uma?", "3. Qual a chance de isso acontecer comigo?"].forEach((q) => {
    doc.text(q, x0, y2);
    y2 += 5.6;
  });
  y2 += 3;

  doc.setFont("SourceSans3", "bold");
  doc.setFontSize(10);
  doc.setTextColor(CORES_PDF.ACENTO);
  doc.text("REVISÃO POR QUILOMETRAGEM", x0, y2);
  y2 += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(CORES_PDF.MARINHO);
  [
    "Desde os 18: pressão, cintura, sono, cabeça, vacinas",
    "A partir dos 35: glicemia e colesterol",
    "A partir dos 45-50: conversar sobre próstata e intestino",
  ].forEach((t) => {
    const s = doc.splitTextToSize(`-  ${t}`, L - 2 * m);
    doc.text(s, x0, y2);
    y2 += 4.8 * s.length;
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(CORES_PDF.CINZA);
  doc.text(`${EVENTO.url.replace(/^https?:\/\//, "")}/trilha  |  Conteúdo educativo, não substitui consulta.`, x0, A - 8);

  baixarPdf(doc, "cartao-de-bolso-eu-vou.pdf");
}
