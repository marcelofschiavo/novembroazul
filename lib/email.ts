/**
 * Monta cada peça do kit (conteudo/campanha.ts) em dois formatos que o RH
 * cola no próprio e-mail: HTML (tabela de 600 px, estilos inline, sem imagem
 * nem fonte da web — funciona no Outlook e no Gmail) e texto puro.
 */
import { RODAPE, type PecaEmail } from "@/conteudo/campanha";
import { fontesCurtas } from "@/conteudo/referencias";
import { EVENTO } from "@/conteudo/palestrante";

const COR = { marinho: "#0B1E3A", azul: "#1F5BB0", azulClaro: "#E5EEFA", texto: "#1F2733", cinza: "#56637A", fundo: "#F5F7FB", linha: "#DCE3EE" };
const FONTE = "-apple-system, 'Segoe UI', Arial, sans-serif";

function esc(t: string): string {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
/** **negrito** → <strong>, com o resto escapado. */
function inline(t: string): string {
  return esc(t).replace(/\*\*(.+?)\*\*/g, `<strong style="color:${COR.marinho}">$1</strong>`);
}
function plano(t: string): string {
  return t.replace(/\*\*(.+?)\*\*/g, "$1");
}

export function montarHtml(p: PecaEmail): string {
  const corpo = p.blocos
    .map((b) => {
      switch (b.tipo) {
        case "p":
          return `<p style="margin:0 0 16px;font:16px/1.55 ${FONTE};color:${COR.texto}">${inline(b.texto)}</p>`;
        case "subtitulo":
          return `<p style="margin:24px 0 8px;font:700 18px/1.3 ${FONTE};color:${COR.marinho}">${inline(b.texto)}</p>`;
        case "destaque":
          return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 18px"><tr><td style="border-left:4px solid ${COR.azul};background:${COR.azulClaro};padding:12px 16px;font:600 16px/1.5 ${FONTE};color:${COR.marinho}">${inline(b.texto)}</td></tr></table>`;
        case "lista":
          return `<ul style="margin:0 0 16px;padding-left:20px">${b.itens.map((i) => `<li style="margin:0 0 8px;font:16px/1.5 ${FONTE};color:${COR.texto}">${inline(i)}</li>`).join("")}</ul>`;
        case "botao":
          return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 20px"><tr><td style="background:${COR.azul};border-radius:999px"><a href="${b.href}" style="display:inline-block;padding:12px 24px;font:700 16px ${FONTE};color:#FFFFFF;text-decoration:none">${esc(b.rotulo)} &rarr;</a></td></tr></table>`;
      }
    })
    .join("\n");

  const fontes = p.fonteIds.length
    ? `<p style="margin:16px 0 0;font:12px/1.5 ${FONTE};color:${COR.cinza}">Fontes: ${esc(fontesCurtas(p.fonteIds))}. Lista completa: ${EVENTO.url}/trilha/referencias</p>`
    : "";

  return `<span style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(p.preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COR.fundo}"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border:1px solid ${COR.linha};border-radius:16px">
<tr><td style="background:${COR.marinho};border-radius:16px 16px 0 0;padding:20px 28px">
<p style="margin:0;font:700 12px ${FONTE};letter-spacing:2px;text-transform:uppercase;color:#9EC5FF">Novembro Azul · saúde do homem</p>
<p style="margin:6px 0 0;font:700 24px/1.2 ${FONTE};color:#FFFFFF">Por inteiro</p>
</td></tr>
<tr><td style="padding:28px">
<p style="margin:0 0 18px;font:700 22px/1.3 ${FONTE};color:${COR.marinho}">${esc(p.assunto)}</p>
${corpo}
${fontes}
</td></tr>
<tr><td style="border-top:1px solid ${COR.linha};padding:16px 28px;font:12px/1.5 ${FONTE};color:${COR.cinza}">${esc(RODAPE)}</td></tr>
</table></td></tr></table>`;
}

export function montarTexto(p: PecaEmail): string {
  const linhas: string[] = [p.assunto.toUpperCase(), ""];
  for (const b of p.blocos) {
    if (b.tipo === "p") linhas.push(plano(b.texto), "");
    else if (b.tipo === "subtitulo") linhas.push(plano(b.texto).toUpperCase(), "");
    else if (b.tipo === "destaque") linhas.push(`> ${plano(b.texto)}`, "");
    else if (b.tipo === "lista") linhas.push(...b.itens.map((i) => `- ${plano(i)}`), "");
    else if (b.tipo === "botao") linhas.push(`${b.rotulo}: ${b.href}`, "");
  }
  if (p.fonteIds.length) linhas.push(`Fontes: ${fontesCurtas(p.fonteIds)}.`, "");
  linhas.push("—", RODAPE);
  return linhas.join("\n");
}
