"use client";

import { jsPDF } from "jspdf";

const ACENTO = "#1F5BB0";
const MARINHO = "#0B1E3A";
const CINZA = "#4E5F7A";
const AZUL_CLARO = "#3A7BD5";

let fonteBase64: string | null = null;

async function arquivoParaBase64(url: string): Promise<string> {
  const resposta = await fetch(url);
  const buffer = await resposta.arrayBuffer();
  let binario = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i++) binario += String.fromCharCode(bytes[i]);
  return btoa(binario);
}

/** Registra Source Sans 3 Bold no doc para os títulos; o corpo usa Helvetica (acentos do português ok). */
export async function carregarFontesPdf(doc: jsPDF): Promise<void> {
  if (!fonteBase64) fonteBase64 = await arquivoParaBase64("/fontes/SourceSans3-Bold.ttf");
  doc.addFileToVFS("SourceSans3.ttf", fonteBase64);
  doc.addFont("SourceSans3.ttf", "SourceSans3", "bold");
}

export function baixarPdf(doc: jsPDF, nomeArquivo: string): void {
  doc.save(nomeArquivo);
}

export const CORES_PDF = { ACENTO, MARINHO, CINZA, AZUL_CLARO };
