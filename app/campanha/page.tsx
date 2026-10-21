"use client";

import { useState } from "react";
import {
  Check, Copy, Download, FileText, Image as ImageIcon, Mail, MessageSquare, Printer, Presentation, Route,
  CalendarDays, HelpCircle, ArrowRight, Megaphone, Building2,
} from "lucide-react";
import { Marcas } from "@/components/trilha/Marcas";
import { PECAS, CARDS, type PecaEmail } from "@/conteudo/campanha";
import { fontesCurtas } from "@/conteudo/referencias";
import { EVENTO } from "@/conteudo/palestrante";
import { montarHtml, montarTexto } from "@/lib/email";
import { MODULOS_ESSENCIAIS, MODULOS_EXTRAS } from "@/conteudo/trilha";
import { SEQUENCIA_PALCO as SEQUENCIA } from "@/lib/palco";

/* ---------------- área de transferência ---------------- */

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
      {ok === "ok" ? "Copiado!" : ok === "erro" ? "Não deu — selecione e copie" : rotulo}
    </button>
  );
}

/* ---------------- conteúdo fixo da página ---------------- */

/** Linha do tempo da campanha: as fases e as peças de cada uma. */
const FASES = [
  { quando: "Fim de outubro", titulo: "Aquecimento", itens: ["E-mail 0: pré-lançamento", "Cartaz nos murais, com QR da trilha"] },
  { quando: "Novembro, toda semana", titulo: "Um tema por semana", itens: ["E-mails 1 a 4, um por semana", "Mensagem curta no WhatsApp ou Teams", "Cards “Você sabia?” na intranet e na TV"] },
  { quando: "Dia da palestra", titulo: "A conversa", itens: ["Convite 1 semana antes", "Palestra de 50 minutos", "Cartões de bolso entregues na saída"] },
  { quando: "Depois", titulo: "Virar ação", itens: ["E-mail no dia seguinte", "Quiz 7 dias depois", "Lembrete 30 dias depois"] },
];

const PASSOS_RH = [
  { icone: Megaphone, titulo: "Divulgar", texto: "Copiar cada e-mail desta página e colar no e-mail da empresa, na data sugerida. A versão curta vai para WhatsApp e Teams." },
  { icone: Printer, titulo: "Imprimir", texto: "Cartaz A4 para murais, copa e refeitório. Cartões de bolso para entregar na palestra." },
  { icone: Building2, titulo: "Organizar a palestra", texto: "Sala, projetor ou TV com HDMI, som e horários das turmas. O palestrante cuida do resto." },
];

const QUEM = [
  { rh: "Envia os e-mails e as mensagens, no calendário sugerido", palestrante: "Conduz a palestra (presencial ou on-line)" },
  { rh: "Imprime e espalha o cartaz e os cartões de bolso", palestrante: "Faz o alinhamento com o RH" },
  { rh: "Completa data, horário e local nos e-mails de convite", palestrante: "Ajusta a palestra ao público e aos benefícios reais da empresa" },
  { rh: "Indica os benefícios de saúde que a empresa oferece", palestrante: "Mantém a trilha e o material no ar, com as fontes" },
  { rh: "Reserva sala, equipamento e horários", palestrante: "Responde às dúvidas da equipe antes e depois" },
];

const DUVIDAS = [
  ["Precisa de cadastro? A empresa recebe dados de quem usa?", "Não. A trilha não tem cadastro e não envia nada para servidor: o que cada pessoa preenche fica só no celular dela. A empresa não recebe dado individual — é a forma mais simples de respeitar a LGPD."],
  ["E se a empresa não tiver palestra?", "Os quatro e-mails semanais (1 a 4), o pré-lançamento, o quiz e o de 30 dias funcionam sozinhos. Convite e pós-palestra só fazem sentido se houver palestra."],
  ["Dá para editar os textos ou pôr o logo da empresa?", "Dá. Depois de colar no e-mail, edite à vontade e use a assinatura da empresa. Só pedimos manter as fontes e o aviso “conteúdo educativo — não substitui consulta”."],
  ["O conteúdo é confiável?", "Cada dado tem fonte: diretrizes brasileiras (hipertensão 2025, diabetes 2025), Ministério da Saúde e INCA, IBGE e estudos revisados por pares. A lista completa, com links, está em Referências."],
  ["E se alguém pedir ajuda depois de ler?", "Os e-mails indicam os canais da empresa e o CVV 188, 24 horas, gratuito. Em emergência: SAMU 192."],
  ["Dá para saber quantas pessoas fizeram a trilha?", "Pela trilha, não — ela não coleta nada, de propósito. Para acompanhar a campanha, use indicadores da própria empresa: presença na palestra, cliques no link do e-mail (se a ferramenta de envio medir) ou uma pesquisa anônima no fim de novembro."],
  ["Quem não tem e-mail corporativo (produção, turnos) fica de fora?", "Não precisa ficar. O cartaz com QR code nos murais e no refeitório, as mensagens curtas no WhatsApp e os cartões de bolso entregues na palestra chegam a quem não lê e-mail."],
  ["Como imprimir os cartões de bolso?", "Frente e verso, virando na borda longa. São 4 cartões por folha A4: recorte nas linhas. Papel mais grosso (180 g) dura mais na carteira."],
  ["O botão “copiar o e-mail” não funcionou.", "Alguns navegadores bloqueiam. Use “Copiar em texto puro” ou abra “Ver como o e-mail fica”, selecione e copie."],
];

const IMPRESSOS = [
  { href: "/kit/cartaz-a4.pdf", rotulo: "Cartaz A4", desc: "Mural, copa e elevador. Tem campo para escrever dia, horário e local da palestra.", formato: "PDF", icone: Printer },
  { href: "/kit/cartaz-a4.png", rotulo: "Cartaz em imagem", desc: "Intranet, TV corporativa ou anexo de e-mail.", formato: "PNG", icone: ImageIcon },
  { href: "/kit/cartao-de-bolso.pdf", rotulo: "Cartões de bolso", desc: "4 por folha A4, frente e verso. Painel de números, luzes de alerta, plano e QR da trilha.", formato: "PDF", icone: FileText },
];

/* ---------------- peça de e-mail ---------------- */

function Peca({ p }: { p: PecaEmail }) {
  const [aberto, setAberto] = useState(false);
  const html = montarHtml(p);
  const texto = montarTexto(p);
  const temCampo = /\[(DATA|HORÁRIO|LOCAL OU LINK)\]/.test(p.assunto + p.curta + JSON.stringify(p.blocos));
  return (
    <article className="cartao min-w-0 p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="dados flex h-9 min-w-9 items-center justify-center rounded-full bg-acento px-2 text-sm font-bold text-sobre-acento">{p.ordem}</span>
        <span className="pilula dados text-[11px] uppercase tracking-[0.14em] text-campanha">{p.quando}</span>
        {p.soComPalestra && <span className="dados rounded-full bg-atencao-wash px-2.5 py-0.5 text-[11px] font-bold uppercase text-atencao">só se houver palestra</span>}
      </div>
      <h3 className="titulo mt-3 text-2xl text-ink">{p.tema}</h3>
      <p className="mt-2 text-[15px]"><strong className="text-ink">Assunto: </strong><span className="text-ink-2">{p.assunto}</span></p>
      {temCampo && (
        <p className="mt-2 text-sm text-ink-2">
          Os campos entre colchetes (data, horário, local) são completados pelo RH depois de colar.
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <BotaoCopiar rotulo="Copiar o assunto" texto={p.assunto} />
        <BotaoCopiar rotulo="Copiar o e-mail" texto={texto} html={html} principal />
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <button type="button" onClick={() => setAberto((a) => !a)} aria-expanded={aberto} className="font-bold text-acento-2 underline">
          {aberto ? "Esconder a prévia" : "Ver como o e-mail fica"}
        </button>
        <BotaoTexto texto={texto} />
      </div>
      {aberto && (
        <iframe title={`Prévia: ${p.assunto}`} srcDoc={`<!doctype html><html><body style="margin:0">${html}</body></html>`} className="mt-3 h-[640px] w-full rounded-xl border border-line bg-white" />
      )}
      <div className="cartao-suave mt-4 rounded-2xl p-4">
        <p className="dados flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
          <MessageSquare aria-hidden className="h-4 w-4" /> Versão curta · WhatsApp, Teams ou intranet
        </p>
        <p className="mt-2 text-[15px] text-ink [overflow-wrap:anywhere]">{p.curta}</p>
        <div className="mt-3"><BotaoCopiar rotulo="Copiar mensagem curta" texto={p.curta} /></div>
      </div>
    </article>
  );
}

function BotaoTexto({ texto }: { texto: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        if (await copiar(texto)) {
          setOk(true);
          setTimeout(() => setOk(false), 2000);
        }
      }}
      className="font-bold text-acento-2 underline"
    >
      {ok ? "Texto copiado!" : "Copiar em texto puro"}
    </button>
  );
}

/* ---------------- página ---------------- */

export default function PaginaCampanha() {
  const nav = [
    ["#como", "Como funciona"],
    ["#pecas", "Palestra e trilha"],
    ["#calendario", "Calendário"],
    ["#emails", "E-mails"],
    ["#impressos", "Impressos"],
    ["#duvidas", "Dúvidas"],
  ];

  return (
    <main className="mx-auto max-w-3xl px-5 pb-16 pt-10 sm:px-6 sm:pt-12">
      <Marcas voltar={false} />

      <section className="cartao-aceso mt-8 p-6 sm:p-8">
        <p className="pilula dados text-[11px] uppercase tracking-[0.16em] text-campanha">Material para o RH</p>
        <h1 className="titulo mt-3 text-4xl tracking-[-0.02em] text-ink sm:text-5xl">Kit de campanha</h1>
        <p className="mt-1 text-xl font-semibold text-campanha">Novembro Azul · saúde do homem, por inteiro</p>
        <p className="mt-4 text-lg text-ink-2">
          Uma campanha de um mês que vai além da próstata: pressão, intestino, sono, cabeça e o hábito de adiar. Tem uma palestra, uma
          trilha no celular e, aqui, <strong className="text-ink">tudo pronto para o RH divulgar</strong>: e-mails para colar, mensagens
          curtas, cartaz e cartões de bolso.
        </p>
        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          {[
            { href: "/palco", rotulo: "Ver a palestra", icone: Presentation },
            { href: "/trilha", rotulo: "Ver a trilha", icone: Route },
            { href: "#emails", rotulo: "Ver os e-mails", icone: Mail },
          ].map(({ href, rotulo, icone: Icone }) => (
            <a key={href} href={href} target={href.startsWith("/") ? "_blank" : undefined} rel="noreferrer" className="cartao flex items-center gap-2 px-4 py-3 font-bold text-ink hover:border-acento">
              <Icone aria-hidden className="h-5 w-5 text-acento-2" /> {rotulo} <ArrowRight aria-hidden className="ml-auto h-4 w-4 text-muted" />
            </a>
          ))}
        </div>
      </section>

      <nav aria-label="Seções" className="sticky top-0 z-20 -mx-5 mt-6 overflow-x-auto border-b border-line bg-bg/85 px-5 py-2 backdrop-blur sm:mx-0 sm:rounded-full sm:border sm:px-3">
        <ul className="flex gap-1 whitespace-nowrap text-sm font-semibold">
          {nav.map(([h, r]) => (
            <li key={h}><a href={h} className="block rounded-full px-3 py-1.5 text-ink-2 hover:bg-acento-wash hover:text-ink">{r}</a></li>
          ))}
        </ul>
      </nav>

      {/* 1. como funciona */}
      <section id="como" className="scroll-mt-20 pt-10">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-ink"><CalendarDays aria-hidden className="h-6 w-6 text-acento-2" /> Como a campanha funciona</h2>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2">
          {FASES.map((f, i) => (
            <li key={f.titulo} className="cartao relative p-4">
              <span className="dados flex h-8 w-8 items-center justify-center rounded-full bg-acento text-sm font-bold text-sobre-acento">{i + 1}</span>
              <p className="dados mt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-campanha">{f.quando}</p>
              <h3 className="mt-1 text-lg font-bold text-ink">{f.titulo}</h3>
              <ul className="mt-2 grid gap-1.5 text-sm text-ink-2">
                {f.itens.map((it) => <li key={it} className="flex gap-1.5"><span aria-hidden className="text-acento-2">•</span>{it}</li>)}
              </ul>
            </li>
          ))}
        </ol>

        <h3 className="mt-8 text-xl font-bold text-ink">O que fica com o RH</h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          {PASSOS_RH.map(({ icone: Icone, titulo, texto }) => (
            <li key={titulo} className="cartao-suave rounded-2xl p-4">
              <Icone aria-hidden className="h-6 w-6 text-acento-2" />
              <p className="mt-2 font-bold text-ink">{titulo}</p>
              <p className="mt-1 text-[15px] text-ink-2">{texto}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 2. palestra e trilha */}
      <section id="pecas" className="scroll-mt-20 pt-12">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-ink"><Route aria-hidden className="h-6 w-6 text-acento-2" /> Palestra e trilha: o que o RH precisa saber</h2>
        <p className="mt-1 text-ink-2">
          A campanha tem três peças que conversam entre si. Esta página é a terceira. As outras duas o RH não precisa operar, mas vale
          conhecer, para responder à equipe e preparar o espaço.
        </p>

        <div className="cartao mt-4 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="flex items-center gap-2 text-xl font-bold text-ink"><Presentation aria-hidden className="h-5 w-5 text-acento-2" /> A palestra</h3>
            <a href="/palco" target="_blank" rel="noreferrer" className="text-sm font-bold text-acento-2 underline">abrir a palestra</a>
          </div>
          <p className="mt-2 text-[15px] text-ink-2">
            {SEQUENCIA.length} telas em 9 blocos, cerca de 50 minutos com perguntas. Conta a história de Davi, que cuida do carro em dia e
            adia a própria revisão, do pai dele, Roberto, e da companheira, Lia. Vai além da próstata: pressão, intestino, sono, cabeça e
            o hábito de adiar.
          </p>
          <dl className="mt-4 grid gap-3 text-[15px] sm:grid-cols-2">
            <div className="cartao-suave rounded-2xl p-4"><dt className="font-bold text-ink">Quem opera</dt><dd className="mt-1 text-ink-2">O palestrante. O RH não precisa mexer em nada.</dd></div>
            <div className="cartao-suave rounded-2xl p-4"><dt className="font-bold text-ink">O que o RH garante</dt><dd className="mt-1 text-ink-2">Projetor ou TV com HDMI, som e microfone, e 15 minutos entre uma sessão e outra.</dd></div>
            <div className="cartao-suave rounded-2xl p-4"><dt className="font-bold text-ink">Internet</dt><dd className="mt-1 text-ink-2">Não é obrigatória: a palestra funciona sem rede depois de aberta uma vez no computador.</dd></div>
            <div className="cartao-suave rounded-2xl p-4"><dt className="font-bold text-ink">Para conhecer antes</dt><dd className="mt-1 text-ink-2">Abra e use as setas do teclado. A tecla <kbd className="dados rounded border border-line-2 px-1">?</kbd> mostra os atalhos.</dd></div>
          </dl>
          <p className="mt-4 text-[15px] text-ink-2">
            <strong className="text-ink">Tom:</strong> sem susto e sem piada com o exame. Sobre o PSA, a palestra apresenta a decisão
            compartilhada com o médico e mostra que o Ministério da Saúde e a Sociedade Brasileira de Urologia recomendam caminhos
            diferentes. Quando fala de saúde mental, segue as orientações de comunicação segura e indica o CVV 188.
          </p>
          <p className="mt-2 text-[15px] text-ink-2">
            <strong className="text-ink">Ajustes:</strong> no alinhamento, a palestra é adaptada ao público (turnos, produção ou escritório)
            e cita só os benefícios que a empresa oferece. O material está em versão de desenvolvimento e ainda pode receber ajustes até a data.
          </p>
        </div>

        <div className="cartao mt-4 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="flex items-center gap-2 text-xl font-bold text-ink"><Route aria-hidden className="h-5 w-5 text-acento-2" /> A trilha</h3>
            <a href="/trilha" target="_blank" rel="noreferrer" className="text-sm font-bold text-acento-2 underline">abrir a trilha</a>
          </div>
          <p className="mt-2 text-[15px] text-ink-2">
            Atividades curtas no celular, para cada pessoa fazer no próprio tempo, antes ou depois da palestra. É aqui que a conversa vira
            ação: a pessoa sai com os números anotados, uma data marcada e um lembrete no celular.
          </p>
          <dl className="mt-4 grid gap-3 text-[15px] sm:grid-cols-2">
            <div className="cartao-suave rounded-2xl p-4"><dt className="font-bold text-ink">Como chegam</dt><dd className="mt-1 text-ink-2">Pelo QR code do cartaz e dos cartões, pelo link dos e-mails ou pelo QR exibido no fim da palestra.</dd></div>
            <div className="cartao-suave rounded-2xl p-4"><dt className="font-bold text-ink">Privacidade</dt><dd className="mt-1 text-ink-2">Sem cadastro e sem login. As respostas ficam só no celular da pessoa e a empresa não recebe nada.</dd></div>
            <div className="cartao-suave rounded-2xl p-4"><dt className="font-bold text-ink">Certificado</dt><dd className="mt-1 text-ink-2">Quem conclui os {MODULOS_ESSENCIAIS.length} módulos essenciais baixa o próprio certificado em PDF, gerado no celular.</dd></div>
            <div className="cartao-suave rounded-2xl p-4"><dt className="font-bold text-ink">Para a família</dt><dd className="mt-1 text-ink-2">O módulo “Para quem cuida dele” é para parceiras, filhas e amigos. Pode ser compartilhado à vontade.</dd></div>
          </dl>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="dados text-[11px] font-bold uppercase tracking-[0.14em] text-campanha">
                Essenciais · cerca de {MODULOS_ESSENCIAIS.reduce((n, m) => n + m.minutos, 0)} min no total
              </p>
              <ol className="mt-2 grid gap-1.5 text-[15px]">
                {MODULOS_ESSENCIAIS.map((m, i) => (
                  <li key={m.id} className="flex gap-2"><span className="dados w-5 shrink-0 font-bold text-acento-2">{i + 1}</span>
                    <span><a href={m.href} target="_blank" rel="noreferrer" className="font-semibold text-ink hover:underline">{m.rotulo}</a> <span className="text-muted">· {m.minutos} min</span></span></li>
                ))}
              </ol>
            </div>
            <div>
              <p className="dados text-[11px] font-bold uppercase tracking-[0.14em] text-campanha">Extras · para quem quer ir além</p>
              <ul className="mt-2 grid gap-1.5 text-[15px]">
                {MODULOS_EXTRAS.filter((m) => m.id !== "palestrante").map((m) => (
                  <li key={m.id}><a href={m.href} target="_blank" rel="noreferrer" className="font-semibold text-ink hover:underline">{m.rotulo}</a> <span className="text-muted">· {m.desc}</span></li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 text-[15px] text-ink-2">
            <strong className="text-ink">Para o RH saber:</strong> a trilha é educativa e não faz diagnóstico. Ela orienta a pessoa a procurar
            consulta e lembra de conferir com o RH os benefícios disponíveis, então vale a equipe saber responder “o que a empresa oferece”.
          </p>
        </div>
      </section>

      {/* 3. calendário */}
      <section id="calendario" className="scroll-mt-20 pt-12">
        <h2 className="text-2xl font-bold text-ink">Calendário de envios</h2>
        <div className="cartao mt-4 overflow-hidden">
          <table className="w-full text-left text-[15px]">
            <thead className="bg-surface-2 text-xs uppercase tracking-wide text-muted">
              <tr><th className="px-4 py-2.5">E-mail</th><th className="px-4 py-2.5">Quando enviar</th></tr>
            </thead>
            <tbody>
              {PECAS.map((p) => (
                <tr key={p.id} className="border-t border-line">
                  <td className="px-4 py-2.5"><span className="dados mr-2 font-bold text-acento-2">{p.ordem}</span><span className="font-semibold text-ink">{p.tema}</span></td>
                  <td className="px-4 py-2.5 text-ink-2">{p.quando}{p.soComPalestra ? " · se houver palestra" : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-sm text-muted">Sugestão: os semanais às terças de manhã. As datas se ajustam à agenda da empresa.</p>
      </section>

      {/* 4. e-mails */}
      <section id="emails" className="scroll-mt-20 pt-12">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-ink"><Mail aria-hidden className="h-6 w-6 text-acento-2" /> E-mails prontos</h2>
        <div className="cartao-suave mt-3 rounded-2xl p-4 text-[15px] text-ink">
          <strong>Como usar:</strong> copie o assunto e cole no campo “Assunto”; depois copie o e-mail e cole no corpo (Ctrl+V). Ele chega
          formatado no Outlook e no Gmail. A versão curta de cada um serve para WhatsApp e Teams.
        </div>
        <div className="mt-4 grid gap-5">
          {PECAS.map((p) => <Peca key={p.id} p={p} />)}
        </div>
      </section>

      {/* 5. impressos */}
      <section id="impressos" className="scroll-mt-20 pt-12">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-ink"><Printer aria-hidden className="h-6 w-6 text-acento-2" /> Para imprimir</h2>
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
        <h3 className="mt-8 text-xl font-bold text-ink">Cards “Você sabia?” para intranet e TV</h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {CARDS.map((c) => {
            const texto = `Você sabia? ${c.texto} (Fonte: ${fontesCurtas(c.fonteIds)}) · Novembro Azul: ${EVENTO.url.replace(/^https?:\/\//, "")}`;
            return (
              <li key={c.titulo} className="cartao flex flex-col gap-2 p-4">
                <span className="dados text-[11px] font-bold uppercase tracking-[0.14em] text-campanha">{c.titulo}</span>
                <span className="font-semibold text-ink">{c.texto}</span>
                <span className="mt-1"><BotaoCopiar rotulo="Copiar" texto={texto} /></span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 6. quem faz o quê + dúvidas */}
      <section id="duvidas" className="scroll-mt-20 pt-12">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-ink"><HelpCircle aria-hidden className="h-6 w-6 text-acento-2" /> Quem faz o quê</h2>
        <div className="cartao mt-4 overflow-hidden">
          <table className="w-full text-left text-[15px]">
            <thead className="bg-surface-2 text-xs uppercase tracking-wide text-muted"><tr><th className="px-4 py-2.5">RH</th><th className="px-4 py-2.5">Palestrante</th></tr></thead>
            <tbody>{QUEM.map((q) => (
              <tr key={q.rh} className="border-t border-line align-top"><td className="px-4 py-2.5 text-ink">{q.rh}</td><td className="px-4 py-2.5 text-ink-2">{q.palestrante}</td></tr>
            ))}</tbody>
          </table>
        </div>

        <h2 className="mt-10 text-2xl font-bold text-ink">Dúvidas frequentes</h2>
        <div className="mt-4 grid gap-2">
          {DUVIDAS.map(([q, r]) => (
            <details key={q} className="cartao p-4">
              <summary className="cursor-pointer font-bold text-ink">{q}</summary>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{r}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="mt-12 border-t border-line pt-6 text-sm text-muted">
        Conteúdo educativo — não substitui consulta. Fontes de todos os dados:{" "}
        <a href="/trilha/referencias" className="font-semibold text-acento-2 underline">referências</a>. Palestrante: Marcelo Schiavo, psicólogo
        (CRP 06/109462).
      </p>
    </main>
  );
}
