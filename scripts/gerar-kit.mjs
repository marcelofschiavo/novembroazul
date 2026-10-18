/**
 * Gera os impressos do kit de campanha em public/kit/:
 *   cartaz-a4.pdf, cartaz-a4.png e cartao-de-bolso.pdf (A4, 4 cartões, frente e verso).
 * Genéricos (sem nome de empresa). Uso: node scripts/gerar-kit.mjs
 * Precisa do Google Chrome instalado (/usr/bin/google-chrome) e de internet para a fonte Outfit.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { QRCodeSVG } from "qrcode.react";

const SITE = "https://trilhanovembroazul.vercel.app";
const RAIZ = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SAIDA = path.join(RAIZ, "public", "kit");
const TMP = path.join(RAIZ, ".kit-tmp");
fs.mkdirSync(SAIDA, { recursive: true });
fs.mkdirSync(TMP, { recursive: true });

const qr = (href, px) =>
  renderToStaticMarkup(React.createElement(QRCodeSVG, { value: href, size: 256, level: "M", bgColor: "#FFFFFF", fgColor: "#0B1E3A" })).replace("<svg ", `<svg style="width:${px};height:${px};display:block" `);
const logo = `file://${path.join(RAIZ, "public", "logo", "mindheart.png")}`;

const RODA = `<svg viewBox="-50 -50 100 100" fill="none" aria-hidden="true" style="width:100%;height:auto">
  <polygon points="0,-40 28.3,-28.3 40,0 28.3,28.3 0,40 -28.3,28.3 -40,0 -28.3,-28.3" stroke="#9EC5FF" stroke-width=".6" opacity=".7"/>
  <polygon points="0,-20 14.1,-14.1 20,0 14.1,14.1 0,20 -14.1,14.1 -20,0 -14.1,-14.1" stroke="#9EC5FF" stroke-width=".4" opacity=".5"/>
  <g stroke="#9EC5FF" stroke-width=".4" opacity=".55"><line x1="0" y1="0" x2="0" y2="-40"/><line x1="0" y1="0" x2="28.3" y2="-28.3"/><line x1="0" y1="0" x2="40" y2="0"/><line x1="0" y1="0" x2="28.3" y2="28.3"/><line x1="0" y1="0" x2="0" y2="40"/><line x1="0" y1="0" x2="-28.3" y2="28.3"/><line x1="0" y1="0" x2="-40" y2="0"/><line x1="0" y1="0" x2="-28.3" y2="-28.3"/></g>
  <polygon points="0,-32 11.3,-11.3 24,0 8.5,8.5 0,28 -14.1,14.1 -24,0 -11.3,-11.3" fill="#3A7BD5" fill-opacity=".45" stroke="#FFFFFF" stroke-width="1" stroke-linejoin="round"/>
</svg>`;

const BASE = `<meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@500;600&display=swap" rel="stylesheet">
<style>*{box-sizing:border-box;margin:0;padding:0}html{-webkit-print-color-adjust:exact;print-color-adjust:exact}body{font-family:Outfit,system-ui,sans-serif;color:#1F2733}.mono{font-family:'IBM Plex Mono',monospace;letter-spacing:.14em;text-transform:uppercase}</style>`;

/* ---------------- cartaz A4 ---------------- */
const ITENS = [
  ["Pressão", "12 por 8 já é pré-hipertensão. Ela quase nunca avisa: só se descobre medindo."],
  ["Próstata", "A partir dos 50 — ou 45, se você é negro ou tem pai ou irmão com a doença —, converse com o médico sobre o PSA."],
  ["Intestino", "Dos 50 aos 75, teste de sangue oculto nas fezes a cada 2 anos. É no SUS."],
  ["Cabeça e sono", "Irritação que não passa e ronco com pausas também são luzes de alerta."],
];
const cartaz = `<!doctype html><html lang="pt-BR"><head>${BASE}<style>
@page{size:A4;margin:0}
.folha{width:210mm;height:297mm;position:relative;overflow:hidden;background:#F5F7FB}
.topo{height:118mm;background:radial-gradient(120mm 90mm at 95% 0%,#2C6FCB 0%,transparent 70%),radial-gradient(90mm 70mm at 0% 100%,#4B3D9E 0%,transparent 70%),#0B1E3A;color:#fff;padding:18mm 16mm 0;position:relative}
.pil{display:inline-flex;align-items:center;gap:2.5mm;border:1px solid rgba(158,197,255,.5);border-radius:99px;padding:1.6mm 4mm;font-size:8.5pt;color:#CFE2FF}
.pil:before{content:"";width:2mm;height:2mm;border-radius:99px;background:#7DB6FF}
h1{font-size:42pt;line-height:.98;font-weight:700;letter-spacing:-.02em;margin-top:8mm;max-width:118mm}
h1 span{color:#9EC5FF}
.roda{position:absolute;right:12mm;top:30mm;width:62mm}
.miolo{padding:9mm 16mm 0}
.sub{font-size:9pt;font-weight:600;color:#1F5BB0}
.item{display:grid;grid-template-columns:34mm 1fr;gap:4mm;padding:3.8mm 0;border-bottom:1px solid #DCE3EE}
.item b{font-size:15pt;color:#0B1E3A;font-weight:700}
.item p{font-size:12.5pt;line-height:1.35;color:#3A4A63}
.empresa{margin:7mm 16mm 0;border:1.5px dashed #3A7BD5;border-radius:4mm;background:#E5EEFA;padding:4mm 6mm;font-size:12pt;color:#0B1E3A}
.empresa .linha{display:inline-block;border-bottom:1px solid #0B1E3A;min-width:30mm;margin:0 1.5mm}
.rodape{position:absolute;left:16mm;right:16mm;bottom:12mm;display:grid;grid-template-columns:auto 1fr auto;gap:6mm;align-items:center}
.qr{background:#fff;padding:2mm;border-radius:3mm;border:1px solid #DCE3EE}
.chamada b{display:block;font-size:17pt;color:#0B1E3A;line-height:1.15}
.chamada span{font-size:10.5pt;color:#1F5BB0;font-weight:600}
.legal{position:absolute;left:16mm;right:16mm;bottom:4.5mm;font-size:7pt;color:#56637A}
</style></head><body><div class="folha">
<div class="topo"><span class="pil mono">Novembro Azul · saúde do homem</span>
<h1>Você faz a revisão do carro. <span>E a sua?</span></h1>
<div class="roda">${RODA}</div></div>
<div class="miolo"><p class="sub mono">O seu painel, em 4 itens</p>
${ITENS.map(([t, d]) => `<div class="item"><b>${t}</b><p>${d}</p></div>`).join("")}
</div>
<div class="empresa"><strong>Palestra na nossa empresa</strong><div style="margin-top:3mm">Dia<span class="linha" style="min-width:34mm"></span> às<span class="linha" style="min-width:22mm"></span></div><div style="margin-top:3mm">Local<span class="linha" style="min-width:132mm"></span></div></div>
<div class="rodape"><div class="qr">${qr(`${SITE}/trilha/roda`, "30mm")}</div>
<div class="chamada"><b>Faça sua Roda da Saúde em 2 minutos.</b><span>trilhanovembroazul.vercel.app · sem cadastro</span></div>
<img src="${logo}" style="height:14mm" alt="Mindheart"></div>
<p class="legal">Por inteiro · Novembro Azul · Conteúdo educativo, não substitui consulta · Precisa conversar? CVV 188, 24 h · Fontes: Diretriz Brasileira de Hipertensão 2025; Nota Técnica MS/INCA 9/2023; SBU/SBOC/SBRT 2023; INCA 2026.</p>
</div></body></html>`;

/* ---------------- cartão de bolso (A6, 4 por A4) ---------------- */
const LUZES = ["Sangue na urina ou nas fezes", "Levantar várias vezes à noite para urinar", "Dor no peito ou falta de ar no esforço", "Ronco com pausas, sono que não descansa", "Dificuldade de ereção", "Irritação, tristeza ou álcool a mais por mais de 2 semanas"];
const frente = `<div class="cartao"><div class="cab"><b>Por inteiro</b><span class="mono">Meu cartão de bolso</span></div>
<div class="corpo"><p class="t mono">Meu painel</p>
${[["Pressão", "alvo: abaixo de 12 por 8"], ["Cintura", "alvo: abaixo de 94 cm"], ["Glicemia de jejum", "alvo: abaixo de 100"], ["Colesterol", "meta: o médico define"]].map(([a, b]) => `<div class="campo"><span>${a}<small>${b}</small></span><i></i></div>`).join("")}
<p class="t mono" style="margin-top:4mm">Luzes de alerta: não espere</p>
<ul>${LUZES.map((l) => `<li>${l}</li>`).join("")}</ul>
<p class="pe">Emergência: SAMU 192 · Para conversar: CVV 188, 24 h</p></div></div>`;
const verso = `<div class="cartao"><div class="cab azul"><b>Eu vou.</b><span class="mono">Meu plano de uma frase</span></div>
<div class="corpo"><div class="frase"><span>Se for</span><i></i><span>então eu</span><i></i></div>
<p class="dt">Data: <i class="l" style="width:22mm"></i> · Revisão anual no mês: <i class="l" style="width:18mm"></i></p>
<p class="t mono" style="margin-top:4mm">3 perguntas para o médico</p>
<ol><li>Quais são as minhas opções?</li><li>Quais os benefícios e os riscos de cada uma?</li><li>Qual a chance de isso acontecer comigo?</li></ol>
<p class="t mono" style="margin-top:3.6mm">Revisão por quilometragem</p>
<ul><li>Desde os 18: pressão, cintura, sono, cabeça, vacinas</li><li>A partir dos 35: glicemia e colesterol</li><li>A partir dos 45–50: conversar sobre a próstata</li><li>De 50 a 75: sangue oculto nas fezes, a cada 2 anos (SUS)</li></ul>
<div class="qrl">${qr(`${SITE}/trilha`, "19mm")}<span>Trilha completa, sem cadastro:<br><b>trilhanovembroazul.vercel.app</b><br><small>Conteúdo educativo, não substitui consulta.</small></span></div></div></div>`;
const cartao = `<!doctype html><html lang="pt-BR"><head>${BASE}<style>
@page{size:A4;margin:0}
.folha{width:210mm;height:297mm;display:grid;grid-template-columns:105mm 105mm;grid-template-rows:148.5mm 148.5mm;page-break-after:always;position:relative}
.folha:last-child{page-break-after:auto}
.folha:after{content:"";position:absolute;inset:0;background:linear-gradient(#999,#999) 105mm 0/0.2mm 100% no-repeat,linear-gradient(#999,#999) 0 148.5mm/100% 0.2mm no-repeat;opacity:.35;pointer-events:none}
.cartao{padding:6mm 6.5mm;display:flex;flex-direction:column}
.cab{background:#0B1E3A;color:#fff;border-radius:3mm;padding:3.5mm 4.5mm;display:flex;flex-direction:column;gap:.6mm}
.cab.azul{background:linear-gradient(120deg,#1F5BB0,#3A7BD5)}
.cab b{font-size:21pt;line-height:1}.cab span{font-size:7.6pt;color:#CFE2FF}
.corpo{padding:4mm 1mm 0;font-size:10.4pt;color:#1F2733;display:flex;flex-direction:column;flex:1}
.t{font-size:8pt;color:#1F5BB0;font-weight:600;margin-bottom:1.8mm}
.campo{display:grid;grid-template-columns:1fr 28mm;gap:2mm;align-items:end;padding:2mm 0}
.campo span{font-weight:600;color:#0B1E3A;line-height:1.1}.campo small{display:block;font-weight:400;font-size:8pt;color:#56637A}
.campo i{border-bottom:1px solid #0B1E3A;height:4mm}
ul,ol{padding-left:4.5mm}li{margin:1.1mm 0;line-height:1.28}
.pe{margin-top:auto;font-size:8.4pt;font-weight:600;color:#56637A;border-top:1px solid #DCE3EE;padding-top:1.6mm}
.frase{font-size:13pt;font-weight:600;color:#0B1E3A;display:grid;grid-template-columns:auto 1fr;gap:3mm 2mm;align-items:end}.frase i{border-bottom:1px solid #0B1E3A;height:6mm}
.l{display:inline-block;border-bottom:1px solid #0B1E3A;width:42mm;height:1em;vertical-align:baseline}
.dt{font-size:9.4pt;color:#3A4A63;margin-top:3mm}
.qrl{margin-top:auto;display:flex;gap:3mm;align-items:center;font-size:8.4pt;color:#3A4A63;border-top:1px solid #DCE3EE;padding-top:2mm}
.qrl b{color:#1F5BB0;font-size:9pt}.qrl small{font-size:7.4pt;color:#56637A}
</style></head><body>
<div class="folha">${frente.repeat(4)}</div>
<div class="folha">${verso.repeat(4)}</div>
</body></html>`;

const chrome = "/usr/bin/google-chrome";
function pdf(html, nome) {
  const arq = path.join(TMP, `${nome}.html`);
  fs.writeFileSync(arq, html);
  execFileSync(chrome, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--allow-file-access-from-files", "--virtual-time-budget=8000", `--print-to-pdf=${path.join(SAIDA, `${nome}.pdf`)}`, `file://${arq}`], { stdio: "ignore" });
  return arq;
}
const arqCartaz = pdf(cartaz, "cartaz-a4");
pdf(cartao, "cartao-de-bolso");
// PNG do cartaz (1240 × 1754 = A4 a 150 dpi) para intranet, TV e e-mail.
execFileSync(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files", "--force-device-scale-factor=1.5", "--window-size=794,1200", "--virtual-time-budget=8000", `--screenshot=${path.join(SAIDA, "cartaz-a4.png")}`, `file://${arqCartaz}`], { stdio: "ignore" });
fs.rmSync(TMP, { recursive: true, force: true });
console.log("ok:", fs.readdirSync(SAIDA).join(", "));
