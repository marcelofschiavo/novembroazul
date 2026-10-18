"use client";

import { useState } from "react";
import { Check, Copy, Download, FileText, Image as ImageIcon, Mail, MessageSquare, Printer } from "lucide-react";
import { Marcas } from "@/components/trilha/Marcas";
import { PECAS, CARDS, type PecaEmail } from "@/conteudo/campanha";
import { fontesCurtas } from "@/conteudo/referencias";
import { montarHtml, montarTexto } from "@/lib/email";

/** Copia para a área de transferência; em HTML quando possível, para colar formatado no Outlook ou Gmail. */
async function copiar(texto: string, html?: string): Promise<boolean> {
  try {
    if (html && typeof ClipboardItem !== "undefined") {
      await navigator.clipboard.write([
        new ClipboardItem({ "text/html": new Blob([html], { type: "text/html" }), "text/plain": new Blob([texto], { type: "text/plain" }) }),
      ]);
    } else {
      await navigator.clipboard.writeText(texto);
    }
    return true;
  } catch {
    return false;
  }
}

function BotaoCopiar({ rotulo, texto, html, principal = false }: { rotulo: string; texto: string; html?: string; principal?: boolean }) {
  const [ok, setOk] = useState<"" | "ok" | "erro">("");
  return (
    <button
      type="button"
      onClick={async () => {
        setOk((await copiar(texto, html)) ? "ok" : "erro");
        setTimeout(() => setOk(""), 2200);
      }}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${
        principal ? "bg-acento text-sobre-acento hover:brightness-110" : "border-2 border-line-2 text-ink-2 hover:border-acento"
      }`}
    >
      {ok === "ok" ? <Check aria-hidden className="h-4 w-4" /> : <Copy aria-hidden className="h-4 w-4" />}
      {ok === "ok" ? "Copiado" : ok === "erro" ? "Não deu — selecione e copie" : rotulo}
    </button>
  );
}

function Peca({ p }: { p: PecaEmail }) {
  const [aberto, setAberto] = useState(false);
  const html = montarHtml(p);
  const texto = montarTexto(p);
  return (
    <article className="cartao min-w-0 p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="dados flex h-9 min-w-9 items-center justify-center rounded-full bg-acento px-2 text-sm font-bold text-sobre-acento">{p.ordem}</span>
        <span className="pilula dados text-[11px] uppercase tracking-[0.14em] text-campanha">{p.quando}</span>
        {p.soComPalestra && <span className="dados rounded-full bg-atencao-wash px-2.5 py-0.5 text-[11px] font-bold uppercase text-atencao">só se houver palestra</span>}
      </div>
      <h3 className="titulo mt-3 text-2xl text-ink">{p.tema}</h3>
      <dl className="mt-3 grid gap-1 text-[15px]">
        <div><dt className="inline font-bold text-ink">Assunto: </dt><dd className="inline text-ink-2">{p.assunto}</dd></div>
        <div><dt className="inline font-bold text-ink">Pré-visualização: </dt><dd className="inline text-ink-2">{p.preheader}</dd></div>
      </dl>
      <div className="mt-4 flex flex-wrap gap-2">
        <BotaoCopiar rotulo="Copiar e-mail formatado" texto={texto} html={html} principal />
        <BotaoCopiar rotulo="Copiar texto puro" texto={texto} />
        <BotaoCopiar rotulo="Copiar assunto" texto={p.assunto} />
      </div>
      <button type="button" onClick={() => setAberto((a) => !a)} aria-expanded={aberto} className="mt-4 text-sm font-bold text-acento-2 underline">
        {aberto ? "Esconder a prévia" : "Ver como o e-mail fica"}
      </button>
      {aberto && (
        <iframe title={`Prévia: ${p.assunto}`} srcDoc={`<!doctype html><html><body style="margin:0">${html}</body></html>`} className="mt-3 h-[640px] w-full rounded-xl border border-line bg-white" />
      )}
      <div className="cartao-suave mt-4 rounded-2xl p-4">
        <p className="dados flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
          <MessageSquare aria-hidden className="h-4 w-4" /> Mensagem curta · WhatsApp, Teams ou intranet
        </p>
        <p className="mt-2 text-[15px] text-ink [overflow-wrap:anywhere]">{p.curta}</p>
        <div className="mt-3"><BotaoCopiar rotulo="Copiar mensagem" texto={p.curta} /></div>
      </div>
      {p.fonteIds.length > 0 && <p className="dados mt-3 text-xs text-muted">fontes: {fontesCurtas(p.fonteIds)}</p>}
    </article>
  );
}

const IMPRESSOS = [
  { href: "/kit/cartaz-a4.pdf", rotulo: "Cartaz A4", desc: "Para mural, copa e elevador. Tem um campo para escrever a data e o local da palestra.", formato: "PDF", icone: Printer },
  { href: "/kit/cartaz-a4.png", rotulo: "Cartaz em imagem", desc: "Para intranet, TV corporativa ou anexar no e-mail.", formato: "PNG", icone: ImageIcon },
  { href: "/kit/cartao-de-bolso.pdf", rotulo: "Cartões de bolso", desc: "4 por folha A4. Imprima frente e verso (virar na borda longa) e recorte nas linhas.", formato: "PDF", icone: FileText },
];

export default function PaginaCampanha() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10 sm:px-6 sm:py-12">
      <Marcas voltar={false} />

      <section className="cartao-aceso mt-8 p-6 sm:p-8">
        <p className="pilula dados text-[11px] uppercase tracking-[0.16em] text-campanha">Material para o RH</p>
        <h1 className="titulo mt-3 text-4xl tracking-[-0.02em] text-ink sm:text-5xl">Kit de campanha</h1>
        <p className="mt-1 text-xl font-semibold text-campanha">Novembro Azul · saúde do homem</p>
        <p className="mt-4 text-lg text-ink-2">
          Tudo pronto para o RH enviar e imprimir: e-mails para colar no Outlook ou no Gmail, mensagens curtas, cartaz e cartões
          de bolso. O material é genérico — serve a qualquer empresa — e cada dado tem fonte.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">Como usar</h2>
        <ol className="mt-4 grid gap-2.5 text-ink">
          {[
            "Escolha as peças. Os quatro e-mails semanais funcionam sozinhos; convite e pós-palestra só se houver palestra.",
            "Clique em “Copiar e-mail formatado” e cole no corpo de um e-mail novo (Ctrl+V). Copie também o assunto.",
            "Preencha os campos entre colchetes, como [DATA], [HORÁRIO] e [LOCAL OU LINK].",
            "Se o seu e-mail não aceitar formatação, use “Copiar texto puro”.",
            "Imprima o cartaz e os cartões de bolso. A mensagem curta de cada peça serve para WhatsApp, Teams ou intranet.",
          ].map((t, i) => (
            <li key={t} className="cartao cartao-suave flex gap-3 px-4 py-3">
              <span className="dados font-bold text-acento-2">{i + 1}.</span> {t}
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-muted">
          A trilha não tem cadastro: o que cada pessoa preenche fica só no celular dela. A empresa não recebe dados individuais.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">Calendário sugerido</h2>
        <div className="cartao mt-4 overflow-hidden">
          <table className="w-full text-left text-[15px]">
            <thead className="bg-surface-2 text-xs uppercase tracking-wide text-muted">
              <tr><th className="px-4 py-2.5">Peça</th><th className="px-4 py-2.5">Quando</th><th className="px-4 py-2.5">Tema</th></tr>
            </thead>
            <tbody>
              {PECAS.map((p) => (
                <tr key={p.id} className="border-t border-line">
                  <td className="dados px-4 py-2.5 font-bold text-acento-2">{p.ordem}</td>
                  <td className="px-4 py-2.5 text-ink-2">{p.quando}</td>
                  <td className="px-4 py-2.5 font-semibold text-ink">{p.tema}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">Para imprimir</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {IMPRESSOS.map(({ href, rotulo, desc, formato, icone: Icone }) => (
            <li key={href}>
              <a href={href} download className="cartao group flex h-full flex-col gap-2 p-4 hover:border-acento">
                <span className="flex items-center justify-between">
                  <Icone aria-hidden className="h-6 w-6 text-acento-2" />
                  <span className="dados rounded-full bg-acento-wash px-2 py-0.5 text-[11px] font-bold text-acento-2">{formato}</span>
                </span>
                <span className="font-bold text-ink">{rotulo}</span>
                <span className="text-sm text-ink-2">{desc}</span>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-acento-2"><Download aria-hidden className="h-4 w-4" /> Baixar</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-ink"><Mail aria-hidden className="h-6 w-6 text-acento-2" /> E-mails</h2>
        <div className="mt-4 grid gap-5">
          {PECAS.map((p) => <Peca key={p.id} p={p} />)}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-ink">Cards “Você sabia?”</h2>
        <p className="mt-1 text-ink-2">Para intranet, TV corporativa ou redes internas — um por semana, ou um por dia.</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {CARDS.map((c) => {
            const texto = `Você sabia? ${c.texto} (Fonte: ${fontesCurtas(c.fonteIds)}) · Novembro Azul: trilhanovembroazul.vercel.app`;
            return (
              <li key={c.titulo} className="cartao flex flex-col gap-2 p-4">
                <span className="dados text-[11px] font-bold uppercase tracking-[0.14em] text-campanha">{c.titulo}</span>
                <span className="font-semibold text-ink">{c.texto}</span>
                <span className="dados text-xs text-muted">fonte: {fontesCurtas(c.fonteIds)}</span>
                <span className="mt-1"><BotaoCopiar rotulo="Copiar" texto={texto} /></span>
              </li>
            );
          })}
        </ul>
      </section>

      <p className="mt-12 border-t border-line pt-6 text-sm text-muted">
        Conteúdo educativo — não substitui consulta. Benefícios variam de empresa para empresa. Todas as fontes, com link:{" "}
        <a href="/trilha/referencias" className="font-semibold text-acento-2 underline">referências</a>.
      </p>
    </main>
  );
}
