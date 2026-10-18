"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check, Copy, Download, FileText, Image as ImageIcon, Mail, MessageSquare, Printer, Presentation, Route, ClipboardList,
  CalendarDays, Users, HelpCircle, ArrowRight, CircleCheck, Circle,
} from "lucide-react";
import { Marcas } from "@/components/trilha/Marcas";
import { PECAS, CARDS, type PecaEmail, type BlocoEmail } from "@/conteudo/campanha";
import { fontesCurtas } from "@/conteudo/referencias";
import { EVENTO } from "@/conteudo/palestrante";
import { montarHtml, montarTexto } from "@/lib/email";
import { MODULOS_ESSENCIAIS, MODULOS_EXTRAS } from "@/conteudo/trilha";
import { SEQUENCIA_PALCO as SEQUENCIA } from "@/lib/palco";

/* ---------------- estado local (só neste navegador) ---------------- */

type Config = { data: string; horario: string; local: string };
type Reuniao = {
  responsavel: string;
  publico: string;
  formato: string;
  horarios: string;
  beneficios: string[];
  beneficiosOutros: string;
  espaco: string[];
  canais: string[];
  duvidas: string;
};
type Estado = { config: Config; feitos: string[]; enviados: string[]; reuniao: Reuniao };

const CHAVE = "na26:rh";
const VAZIO: Estado = {
  config: { data: "", horario: "", local: "" },
  feitos: [],
  enviados: [],
  reuniao: { responsavel: "", publico: "", formato: "", horarios: "", beneficios: [], beneficiosOutros: "", espaco: [], canais: [], duvidas: "" },
};

function lerEstado(): Estado {
  try {
    const bruto = JSON.parse(window.localStorage.getItem(CHAVE) ?? "null");
    return bruto ? { ...VAZIO, ...bruto, config: { ...VAZIO.config, ...bruto.config }, reuniao: { ...VAZIO.reuniao, ...bruto.reuniao } } : VAZIO;
  } catch {
    return VAZIO;
  }
}

/* ---------------- datas e preenchimento ---------------- */

const DIAS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
function deISO(iso: string) {
  const [a, m, d] = iso.split("-").map(Number);
  return new Date(a, m - 1, d);
}
function somar(iso: string, dias: number) {
  const d = deISO(iso);
  d.setDate(d.getDate() + dias);
  return d;
}
function fmt(d: Date) {
  return `${DIAS[d.getDay()]}, ${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
}

/** "18/11 (quarta-feira)": serve no começo do assunto e no meio da frase. */
function dataPorExtenso(d: Date) {
  const dia = DIAS[d.getDay()];
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")} (${d.getDay() % 6 ? `${dia}-feira` : dia})`;
}

/** Datas sugeridas: as semanais seguem novembro de 2026; as ligadas à palestra são calculadas a partir da data informada. */
const FIXAS: Record<string, string> = { pre: "2026-10-27", "semana-1": "2026-11-03", "semana-2": "2026-11-10", "semana-3": "2026-11-17", "semana-4": "2026-11-24" };
const RELATIVAS: Record<string, number> = { convite: -7, pos: 1, quiz: 7, "30dias": 30 };

function dataISO(p: PecaEmail, cfg: Config): string | null {
  if (FIXAS[p.id]) return FIXAS[p.id];
  if (p.id in RELATIVAS && cfg.data) {
    const d = somar(cfg.data, RELATIVAS[p.id]);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  return null;
}

function dataSugerida(p: PecaEmail, cfg: Config): string | null {
  if (FIXAS[p.id]) return fmt(deISO(FIXAS[p.id]));
  if (p.id in RELATIVAS && cfg.data) return fmt(somar(cfg.data, RELATIVAS[p.id]));
  return null;
}

function preencherTexto(t: string, cfg: Config): string {
  return t
    .replaceAll("[DATA]", cfg.data ? dataPorExtenso(deISO(cfg.data)) : "[DATA]")
    .replaceAll("[HORÁRIO]", cfg.horario || "[HORÁRIO]")
    .replaceAll("[LOCAL OU LINK]", cfg.local || "[LOCAL OU LINK]");
}
function preencher(p: PecaEmail, cfg: Config): PecaEmail {
  const f = (t: string) => preencherTexto(t, cfg);
  const bloco = (b: BlocoEmail): BlocoEmail =>
    b.tipo === "lista" ? { ...b, itens: b.itens.map(f) } : b.tipo === "botao" ? { ...b, rotulo: f(b.rotulo) } : { ...b, texto: f(b.texto) };
  return { ...p, assunto: f(p.assunto), preheader: f(p.preheader), curta: f(p.curta), blocos: p.blocos.map(bloco) };
}

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

function Marcar({ feito, onClick, children }: { feito: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={feito} className="flex w-full items-start gap-3 text-left">
      {feito ? <CircleCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-ok" /> : <Circle aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-muted" />}
      <span className={feito ? "text-ink-2 line-through decoration-ok/60" : "text-ink"}>{children}</span>
    </button>
  );
}

/* ---------------- conteúdo fixo da página ---------------- */

const PASSOS = [
  {
    id: "hoje",
    quando: "Hoje · 20 minutos",
    titulo: "Conheça o material",
    itens: [
      { id: "ver-pecas", texto: "Ler “Palestra e trilha: o que o RH precisa saber”, mais abaixo", href: "#pecas" },
      { id: "ver-palco", texto: "Abrir a palestra e passar os slides com a seta do teclado", href: "/palco" },
      { id: "ver-trilha", texto: "Abrir a trilha no celular e fazer a Roda da Saúde (2 minutos)", href: "/trilha/roda" },
      { id: "ver-email", texto: "Copiar um e-mail desta página e colar num rascunho para ver a formatação", href: "#emails" },
      { id: "ver-cartaz", texto: "Baixar o cartaz e escanear o QR code com o celular", href: "#impressos" },
    ],
  },
  {
    id: "antes",
    quando: "Antes da reunião de alinhamento",
    titulo: "Levante as respostas",
    itens: [
      { id: "preencher-reuniao", texto: "Preencher a lista “Para a reunião” (público, horários, benefícios, sala, canais)", href: "#reuniao" },
      { id: "enviar-respostas", texto: "Copiar as respostas e enviar ao palestrante (e-mail ou WhatsApp)", href: "#reuniao" },
      { id: "enviar-pre", texto: "Se quiser começar já: enviar o e-mail 0, de pré-lançamento", href: "#emails" },
    ],
  },
  {
    id: "depois",
    quando: "Depois da reunião",
    titulo: "Coloque a campanha na rua",
    itens: [
      { id: "preencher-data", texto: "Preencher data, horário e local da palestra no topo desta página", href: "#preencha" },
      { id: "imprimir", texto: "Imprimir o cartaz para os murais e os cartões de bolso", href: "#impressos" },
      { id: "seguir-calendario", texto: "Seguir o calendário de envios (as datas aparecem ao lado de cada e-mail)", href: "#calendario" },
    ],
  },
];

const BENEFICIOS = [
  "Plano de saúde ou convênio médico",
  "Apoio psicológico (programa de apoio, terapia, canal de escuta)",
  "Programa de bem-estar ou academia (ex.: Gympass, TotalPass)",
  "Medicina do trabalho ou ambulatório na empresa",
  "Campanha de vacinação ou exames na empresa",
];
const ESPACO = ["Projetor ou TV com entrada HDMI", "Som e microfone", "Cadeiras para todos", "Intervalo de 15 min entre sessões"];
const CANAIS = ["E-mail", "WhatsApp", "Teams ou Slack", "Intranet", "Mural impresso", "TV corporativa"];

const QUEM = [
  { rh: "Envia os e-mails e as mensagens, no calendário sugerido", palestrante: "Conduz a palestra (presencial ou on-line)" },
  { rh: "Imprime e espalha o cartaz e os cartões de bolso", palestrante: "Faz o alinhamento de 30 minutos" },
  { rh: "Preenche data, horário e local da palestra", palestrante: "Ajusta a palestra ao público e aos benefícios reais da empresa" },
  { rh: "Conta quais benefícios de saúde a empresa oferece", palestrante: "Mantém a trilha e o material no ar, com as fontes" },
  { rh: "Reserva sala, equipamento e horários", palestrante: "Responde às dúvidas da equipe antes e depois" },
];

const DUVIDAS = [
  ["Precisa de cadastro? A empresa recebe dados de quem usa?", "Não. A trilha não tem cadastro e não envia nada para servidor: o que cada pessoa preenche fica só no celular dela. A empresa não recebe dado individual — é a forma mais simples de respeitar a LGPD."],
  ["E se a nossa empresa não tiver palestra?", "Os quatro e-mails semanais (1 a 4), o pré-lançamento, o quiz e o de 30 dias funcionam sozinhos. Convite e pós-palestra só fazem sentido se houver palestra."],
  ["Posso editar os textos ou pôr o logo da empresa?", "Pode. Depois de colar no seu e-mail, edite à vontade e use a assinatura da empresa. Só pedimos manter as fontes e o aviso “conteúdo educativo — não substitui consulta”."],
  ["O conteúdo é confiável?", "Cada dado tem fonte: diretrizes brasileiras (hipertensão 2025, diabetes 2025), Ministério da Saúde e INCA, IBGE e estudos revisados por pares. A lista completa, com links, está em Referências."],
  ["E se alguém pedir ajuda depois de ler?", "Os e-mails indicam os canais da empresa (por isso é importante contar quais benefícios existem) e o CVV 188, 24 horas, gratuito. Em emergência: SAMU 192."],
  ["Como imprimir os cartões de bolso?", "Frente e verso, virando na borda longa. São 4 cartões por folha A4: recorte nas linhas. Papel mais grosso (180 g) dura mais na carteira."],
  ["Dá para saber quantas pessoas fizeram a trilha?", "Pela trilha, não — ela não coleta nada, de propósito. Para acompanhar a campanha, use indicadores da própria empresa: presença na palestra, cliques no link do e-mail (se a ferramenta de envio medir) ou uma pesquisa anônima no fim de novembro."],
  ["Quem não tem e-mail corporativo (produção, turnos) fica de fora?", "Não precisa ficar. Use o cartaz com QR code nos murais e no refeitório, as mensagens curtas no WhatsApp e os cartões de bolso entregues na palestra."],
  ["O botão “copiar formatado” não funcionou.", "Alguns navegadores bloqueiam. Use “Copiar texto puro” ou abra “Ver como o e-mail fica”, selecione e copie."],
];

const IMPRESSOS = [
  { href: "/kit/cartaz-a4.pdf", rotulo: "Cartaz A4", desc: "Mural, copa e elevador. Tem campo para escrever dia, horário e local da palestra.", formato: "PDF", icone: Printer },
  { href: "/kit/cartaz-a4.png", rotulo: "Cartaz em imagem", desc: "Intranet, TV corporativa ou anexo de e-mail.", formato: "PNG", icone: ImageIcon },
  { href: "/kit/cartao-de-bolso.pdf", rotulo: "Cartões de bolso", desc: "4 por folha A4, frente e verso. Painel de números, luzes de alerta, plano e QR da trilha.", formato: "PDF", icone: FileText },
];

/* ---------------- peça de e-mail ---------------- */

function Peca({ p, cfg, enviado, alternar }: { p: PecaEmail; cfg: Config; enviado: boolean; alternar: () => void }) {
  const [aberto, setAberto] = useState(false);
  const cheia = preencher(p, cfg);
  const html = montarHtml(cheia);
  const texto = montarTexto(cheia);
  const data = dataSugerida(p, cfg);
  const faltaCampo = /\[(DATA|HORÁRIO|LOCAL OU LINK)\]/.test(cheia.assunto + cheia.curta + JSON.stringify(cheia.blocos));
  return (
    <article className={`cartao min-w-0 p-5 sm:p-6 ${enviado ? "opacity-70" : ""}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="dados flex h-9 min-w-9 items-center justify-center rounded-full bg-acento px-2 text-sm font-bold text-sobre-acento">{p.ordem}</span>
        <span className="pilula dados text-[11px] uppercase tracking-[0.14em] text-campanha">{data ? `Enviar ${data}` : p.quando}</span>
        {p.soComPalestra && <span className="dados rounded-full bg-atencao-wash px-2.5 py-0.5 text-[11px] font-bold uppercase text-atencao">só se houver palestra</span>}
        {enviado && <span className="dados rounded-full bg-ok-wash px-2.5 py-0.5 text-[11px] font-bold uppercase text-ok">enviado</span>}
      </div>
      <h3 className="titulo mt-3 text-2xl text-ink">{p.tema}</h3>
      <dl className="mt-2 grid gap-1 text-[15px]">
        <div><dt className="inline font-bold text-ink">Assunto: </dt><dd className="inline text-ink-2">{cheia.assunto}</dd></div>
      </dl>
      {faltaCampo && (
        <p className="mt-2 rounded-xl bg-atencao-wash px-3 py-2 text-sm font-semibold text-atencao">
          Este e-mail tem campos entre colchetes. Preencha data, horário e local <a href="#preencha" className="underline">no topo da página</a> ou edite depois de colar.
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <BotaoCopiar rotulo="1. Copiar o assunto" texto={cheia.assunto} />
        <BotaoCopiar rotulo="2. Copiar o e-mail" texto={texto} html={html} principal />
        <button type="button" onClick={alternar} className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-bold ${enviado ? "border-ok text-ok" : "border-line-2 text-ink-2 hover:border-acento"}`}>
          {enviado ? <CircleCheck aria-hidden className="h-4 w-4" /> : <Circle aria-hidden className="h-4 w-4" />} 3. {enviado ? "Enviado" : "Marcar como enviado"}
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <button type="button" onClick={() => setAberto((a) => !a)} aria-expanded={aberto} className="font-bold text-acento-2 underline">
          {aberto ? "Esconder a prévia" : "Ver como o e-mail fica"}
        </button>
        <BotaoTexto texto={texto} />
      </div>
      {aberto && (
        <iframe title={`Prévia: ${cheia.assunto}`} srcDoc={`<!doctype html><html><body style="margin:0">${html}</body></html>`} className="mt-3 h-[640px] w-full rounded-xl border border-line bg-white" />
      )}
      <div className="cartao-suave mt-4 rounded-2xl p-4">
        <p className="dados flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
          <MessageSquare aria-hidden className="h-4 w-4" /> Versão curta · WhatsApp, Teams ou intranet
        </p>
        <p className="mt-2 text-[15px] text-ink [overflow-wrap:anywhere]">{cheia.curta}</p>
        <div className="mt-3"><BotaoCopiar rotulo="Copiar mensagem curta" texto={cheia.curta} /></div>
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
  const [e, setE] = useState<Estado>(VAZIO);
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setE(lerEstado());
    setMontado(true);
  }, []);
  useEffect(() => {
    if (!montado) return;
    try {
      window.localStorage.setItem(CHAVE, JSON.stringify(e));
    } catch {
      // modo privado: vale só nesta sessão
    }
  }, [e, montado]);

  const alternarFeito = (id: string) => setE((x) => ({ ...x, feitos: x.feitos.includes(id) ? x.feitos.filter((f) => f !== id) : [...x.feitos, id] }));
  const alternarEnviado = (id: string) => setE((x) => ({ ...x, enviados: x.enviados.includes(id) ? x.enviados.filter((f) => f !== id) : [...x.enviados, id] }));
  const setReuniao = (r: Partial<Reuniao>) => setE((x) => ({ ...x, reuniao: { ...x.reuniao, ...r } }));
  const alternarLista = (campo: "beneficios" | "espaco" | "canais", v: string) =>
    setE((x) => ({ ...x, reuniao: { ...x.reuniao, [campo]: x.reuniao[campo].includes(v) ? x.reuniao[campo].filter((i) => i !== v) : [...x.reuniao[campo], v] } }));

  const totalPassos = PASSOS.reduce((n, p) => n + p.itens.length, 0);
  const feitosPassos = PASSOS.reduce((n, p) => n + p.itens.filter((i) => e.feitos.includes(i.id)).length, 0);

  // Com a data da palestra, o calendário entra em ordem cronológica; sem ela, segue a ordem do kit.
  const calendario = useMemo(
    () => (e.config.data ? [...PECAS].sort((a, b) => (dataISO(a, e.config) ?? "9").localeCompare(dataISO(b, e.config) ?? "9")) : PECAS),
    [e.config],
  );

  const resumoReuniao = useMemo(() => {
    const r = e.reuniao;
    const lista = (v: string[]) => (v.length ? v.join("; ") : "—");
    return [
      "NOVEMBRO AZUL · respostas para o alinhamento",
      `Responsável no RH: ${r.responsavel || "—"}`,
      `Público (pessoas, setores, turnos): ${r.publico || "—"}`,
      `Formato: ${r.formato || "—"}`,
      `Datas e horários possíveis: ${r.horarios || "—"}`,
      `Benefícios de saúde: ${lista(r.beneficios)}${r.beneficiosOutros ? `; ${r.beneficiosOutros}` : ""}`,
      `Sala e equipamento: ${lista(r.espaco)}`,
      `Canais de divulgação: ${lista(r.canais)}`,
      `Dúvidas: ${r.duvidas || "—"}`,
    ].join("\n");
  }, [e.reuniao]);

  const nav = [
    ["#comece", "Comece aqui"],
    ["#pecas", "Palestra e trilha"],
    ["#reuniao", "Para a reunião"],
    ["#preencha", "Data e local"],
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
          Tudo o que a equipe precisa para divulgar a campanha: e-mails prontos para colar, mensagens curtas, cartaz e cartões de
          bolso. <strong className="text-ink">Comece pelos três passos abaixo</strong> — dá para fazer o primeiro hoje, em 20 minutos.
        </p>
        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          {[
            { href: "/palco", rotulo: "Ver a palestra", icone: Presentation },
            { href: "/trilha", rotulo: "Ver a trilha", icone: Route },
            { href: "#emails", rotulo: "Ir aos e-mails", icone: Mail },
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

      {/* 1. comece aqui */}
      <section id="comece" className="scroll-mt-20 pt-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-ink"><ClipboardList aria-hidden className="h-6 w-6 text-acento-2" /> Comece aqui</h2>
          <span className="dados text-sm font-bold text-acento-2">{feitosPassos}/{totalPassos} feitos</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-acento transition-all" style={{ width: `${(feitosPassos / totalPassos) * 100}%` }} /></div>
        <div className="mt-5 grid gap-4">
          {PASSOS.map((p, i) => (
            <div key={p.id} className="cartao p-5">
              <p className="dados text-[11px] font-bold uppercase tracking-[0.14em] text-campanha">Passo {i + 1} · {p.quando}</p>
              <h3 className="mt-1 text-xl font-bold text-ink">{p.titulo}</h3>
              <ul className="mt-3 grid gap-2.5">
                {p.itens.map((it) => (
                  <li key={it.id} className="flex items-start justify-between gap-3">
                    <Marcar feito={e.feitos.includes(it.id)} onClick={() => alternarFeito(it.id)}>{it.texto}</Marcar>
                    <a href={it.href} target={it.href.startsWith("/") ? "_blank" : undefined} rel="noreferrer" className="shrink-0 text-sm font-bold text-acento-2 underline">abrir</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted">As marcações ficam salvas só neste navegador.</p>
      </section>


      {/* 2. palestra e trilha */}
      <section id="pecas" className="scroll-mt-20 pt-12">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-ink"><Route aria-hidden className="h-6 w-6 text-acento-2" /> Palestra e trilha: o que o RH precisa saber</h2>
        <p className="mt-1 text-ink-2">
          A campanha tem três peças que conversam entre si. Esta página é a terceira. As outras duas você não precisa operar, mas vale
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
                {MODULOS_EXTRAS.filter((m) => !["palestrante"].includes(m.id)).map((m) => (
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

      {/* 2. para a reunião */}
      <section id="reuniao" className="scroll-mt-20 pt-12">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-ink"><Users aria-hidden className="h-6 w-6 text-acento-2" /> Para a reunião de alinhamento</h2>
        <p className="mt-1 text-ink-2">
          Com estas respostas, a palestra é ajustada ao público e cita só os benefícios que a empresa oferece de verdade. Preencha o que
          souber — o que faltar a gente resolve na reunião.
        </p>
        <div className="cartao mt-4 grid gap-5 p-5">
          <label className="block"><span className="font-bold text-ink">Responsável no RH</span>
            <input className="campo mt-1" value={e.reuniao.responsavel} onChange={(x) => setReuniao({ responsavel: x.target.value })} placeholder="Nome e contato" /></label>
          <label className="block"><span className="font-bold text-ink">Público</span><span className="block text-sm text-muted">Quantas pessoas, quais setores, turnos, maioria na produção ou no escritório?</span>
            <textarea className="campo mt-1" rows={3} value={e.reuniao.publico} onChange={(x) => setReuniao({ publico: x.target.value })} /></label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block"><span className="font-bold text-ink">Formato</span>
              <select className="campo mt-1" value={e.reuniao.formato} onChange={(x) => setReuniao({ formato: x.target.value })}>
                <option value="">— escolha</option><option>Presencial</option><option>On-line</option><option>Presencial e on-line</option>
              </select></label>
            <label className="block"><span className="font-bold text-ink">Datas e horários possíveis</span>
              <input className="campo mt-1" value={e.reuniao.horarios} onChange={(x) => setReuniao({ horarios: x.target.value })} placeholder="Ex.: 18/11, 3 sessões de 50 min" /></label>
          </div>
          <fieldset><legend className="font-bold text-ink">Benefícios de saúde que a empresa oferece</legend>
            <div className="mt-2 grid gap-2">{BENEFICIOS.map((b) => (
              <Marcar key={b} feito={e.reuniao.beneficios.includes(b)} onClick={() => alternarLista("beneficios", b)}>{b}</Marcar>
            ))}</div>
            <input className="campo mt-2" value={e.reuniao.beneficiosOutros} onChange={(x) => setReuniao({ beneficiosOutros: x.target.value })} placeholder="Outros (ex.: odontológico, nutricionista)" />
          </fieldset>
          <fieldset><legend className="font-bold text-ink">Sala e equipamento</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">{ESPACO.map((b) => (
              <Marcar key={b} feito={e.reuniao.espaco.includes(b)} onClick={() => alternarLista("espaco", b)}>{b}</Marcar>
            ))}</div>
          </fieldset>
          <fieldset><legend className="font-bold text-ink">Canais de divulgação que a empresa usa</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">{CANAIS.map((b) => (
              <Marcar key={b} feito={e.reuniao.canais.includes(b)} onClick={() => alternarLista("canais", b)}>{b}</Marcar>
            ))}</div>
          </fieldset>
          <label className="block"><span className="font-bold text-ink">Dúvidas para o palestrante</span>
            <textarea className="campo mt-1" rows={3} value={e.reuniao.duvidas} onChange={(x) => setReuniao({ duvidas: x.target.value })} /></label>
          <div className="flex flex-wrap items-center gap-3 border-t border-line pt-4">
            <BotaoCopiar rotulo="Copiar respostas para enviar" texto={resumoReuniao} principal />
            <span className="text-sm text-muted">Nada é enviado sozinho: copie e mande por e-mail ou WhatsApp.</span>
          </div>
        </div>
      </section>

      {/* 3. preencha */}
      <section id="preencha" className="scroll-mt-20 pt-12">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-ink"><CalendarDays aria-hidden className="h-6 w-6 text-acento-2" /> Data, horário e local da palestra</h2>
        <p className="mt-1 text-ink-2">Preencha uma vez: os e-mails e as mensagens já saem com esses dados, e o calendário calcula quando enviar cada um.</p>
        <div className="cartao mt-4 grid gap-4 p-5 sm:grid-cols-3">
          <label className="block"><span className="font-bold text-ink">Data</span>
            <input type="date" className="campo mt-1" value={e.config.data} onChange={(x) => setE({ ...e, config: { ...e.config, data: x.target.value } })} /></label>
          <label className="block"><span className="font-bold text-ink">Horário</span>
            <input className="campo mt-1" value={e.config.horario} onChange={(x) => setE({ ...e, config: { ...e.config, horario: x.target.value } })} placeholder="Ex.: 9h, 10h30 e 14h" /></label>
          <label className="block"><span className="font-bold text-ink">Local ou link</span>
            <input className="campo mt-1" value={e.config.local} onChange={(x) => setE({ ...e, config: { ...e.config, local: x.target.value } })} placeholder="Ex.: auditório do bloco B" /></label>
        </div>
        <p className="mt-2 text-sm text-muted">Ainda não sabe? Tudo bem: os e-mails semanais não dependem disso.</p>
      </section>

      {/* 4. calendário */}
      <section id="calendario" className="scroll-mt-20 pt-12">
        <h2 className="text-2xl font-bold text-ink">Calendário de envios</h2>
        <div className="cartao mt-4 overflow-hidden">
          <table className="w-full text-left text-[15px]">
            <thead className="bg-surface-2 text-xs uppercase tracking-wide text-muted">
              <tr><th className="px-4 py-2.5">E-mail</th><th className="px-4 py-2.5">Quando</th><th className="px-4 py-2.5">Situação</th></tr>
            </thead>
            <tbody>
              {calendario.map((p) => {
                const d = dataSugerida(p, e.config);
                const env = e.enviados.includes(p.id);
                return (
                  <tr key={p.id} className="border-t border-line">
                    <td className="px-4 py-2.5"><span className="dados mr-2 font-bold text-acento-2">{p.ordem}</span><span className="font-semibold text-ink">{p.tema}</span></td>
                    <td className="px-4 py-2.5 text-ink-2">{d ?? p.quando}</td>
                    <td className="px-4 py-2.5">{env ? <span className="font-bold text-ok">✓ enviado</span> : <span className="text-muted">a enviar</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-sm text-muted">Semanais: terças de novembro de 2026. Convite, pós-palestra, quiz e 30 dias: calculados a partir da data da palestra.</p>
      </section>

      {/* 5. e-mails */}
      <section id="emails" className="scroll-mt-20 pt-12">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-ink"><Mail aria-hidden className="h-6 w-6 text-acento-2" /> E-mails</h2>
        <div className="cartao-suave mt-3 rounded-2xl p-4 text-[15px] text-ink">
          <strong>Para cada e-mail:</strong> 1) copie o assunto e cole no campo “Assunto”; 2) copie o e-mail e cole no corpo (Ctrl+V) —
          ele chega formatado no Outlook e no Gmail; 3) marque como enviado. A versão curta serve para WhatsApp e Teams.
        </div>
        <div className="mt-4 grid gap-5">
          {PECAS.map((p) => (
            <Peca key={p.id} p={p} cfg={e.config} enviado={e.enviados.includes(p.id)} alternar={() => alternarEnviado(p.id)} />
          ))}
        </div>
      </section>

      {/* 6. impressos */}
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

      {/* 7. quem faz o quê + dúvidas */}
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
