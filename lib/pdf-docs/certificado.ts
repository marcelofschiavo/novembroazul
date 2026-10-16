import { jsPDF } from "jspdf";
import { carregarFontesPdf, baixarPdf, CORES_PDF } from "@/lib/pdf";
import { EVENTO, PALESTRANTE } from "@/conteudo/palestrante";

/** Certificado gerado inteiramente no navegador — o nome digitado NUNCA vira request. */
export async function gerarCertificado(nome: string): Promise<void> {
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "landscape" });
  await carregarFontesPdf(doc);
  const largura = doc.internal.pageSize.getWidth();
  const altura = doc.internal.pageSize.getHeight();

  doc.setFillColor(245, 247, 251);
  doc.rect(0, 0, largura, altura, "F");
  doc.setDrawColor(31, 91, 176);
  doc.setLineWidth(1.2);
  doc.rect(10, 10, largura - 20, altura - 20);
  doc.setFillColor(58, 123, 213);
  doc.rect(largura / 2 - 22, 24, 44, 5, "F");

  doc.setFont("SourceSans3", "bold");
  doc.setFontSize(10);
  doc.setTextColor(CORES_PDF.ACENTO);
  doc.text("POR INTEIRO  |  NOVEMBRO AZUL  |  SAÚDE DO HOMEM", largura / 2, 40, { align: "center" });

  doc.setFontSize(13);
  doc.setTextColor(CORES_PDF.CINZA);
  doc.text("Certificado de participação", largura / 2, 50, { align: "center" });

  doc.setFontSize(38);
  doc.setTextColor(CORES_PDF.MARINHO);
  doc.text(nome || "Participante", largura / 2, 78, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(CORES_PDF.CINZA);
  const texto = `completou a trilha "Por inteiro", do Novembro Azul: Roda da Saúde, números do painel, decisão compartilhada sobre o PSA, luzes de alerta, pensamentos que adiam o cuidado, plano "Eu vou" e quiz final, com ${PALESTRANTE.nome}.`;
  doc.text(doc.splitTextToSize(texto, largura - 80), largura / 2, 92, { align: "center" });

  doc.setFontSize(10);
  doc.text(EVENTO.ocasiao, largura / 2, altura - 26, { align: "center" });

  doc.setFont("SourceSans3", "bold");
  doc.setFontSize(12);
  doc.setTextColor(CORES_PDF.ACENTO);
  doc.text(PALESTRANTE.nome, largura / 2, altura - 18, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(CORES_PDF.CINZA);
  doc.text(`${PALESTRANTE.titulos.join("  |  ")}  |  ${PALESTRANTE.crp}  |  @marceloschiavopsi`, largura / 2, altura - 13, { align: "center" });

  baixarPdf(doc, `certificado-por-inteiro-${(nome || "participante").toLowerCase().replace(/\s+/g, "-")}.pdf`);
}
