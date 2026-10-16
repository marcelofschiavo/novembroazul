"use client";

/**
 * Lembrete de agenda (.ics) gerado no navegador — nada vai a servidor.
 * Evento de dia inteiro com aviso às 9h; opcionalmente repete todo ano
 * (a "revisão no aniversário").
 */
export function baixarLembrete({ data, titulo, descricao, anual }: { data: string; titulo: string; descricao: string; anual: boolean }) {
  const d = data.replace(/-/g, "");
  const [a, m, dia] = data.split("-").map(Number);
  const fim = new Date(a, m - 1, dia + 1);
  const dFim = `${fim.getFullYear()}${String(fim.getMonth() + 1).padStart(2, "0")}${String(fim.getDate()).padStart(2, "0")}`;
  const agora = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const escapar = (t: string) => t.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
  const linhas = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Por inteiro//Novembro Azul//PT",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${agora}-${Math.random().toString(36).slice(2)}@porinteiro`,
    `DTSTAMP:${agora}`,
    `DTSTART;VALUE=DATE:${d}`,
    `DTEND;VALUE=DATE:${dFim}`,
    ...(anual ? ["RRULE:FREQ=YEARLY"] : []),
    `SUMMARY:${escapar(titulo)}`,
    `DESCRIPTION:${escapar(descricao)}`,
    "BEGIN:VALARM",
    "TRIGGER:PT9H",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapar(titulo)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  const blob = new Blob([linhas.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "eu-vou-lembrete.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
