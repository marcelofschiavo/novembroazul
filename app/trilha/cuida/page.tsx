import { PaginaModulo, Resultado } from "@/components/trilha/PaginaModulo";

const POIS = [
  { letra: "P", titulo: "Pergunte", texto: "Fale do que você notou, sem diagnóstico: “Tô te achando cansado. Como você tá?”" },
  { letra: "O", titulo: "Ouça", texto: "Sem consertar, sem sermão, sem “eu te avisei”. Só ouvir já abre a porta." },
  { letra: "I", titulo: "Incentive", texto: "Um passo pequeno e concreto: “Que tal marcar uma consulta?”" },
  { letra: "S", titulo: "Siga junto", texto: "Ofereça ir. E volte a perguntar na semana seguinte — uma conversa raramente basta." },
];

export default function PaginaCuida() {
  return (
    <PaginaModulo
      id="cuida"
      titulo="Para quem cuida dele"
      ideia="Parceira, filha, mãe, amigo, colega: muitas vezes é por alguém próximo que o homem chega ao médico. O jeito de convidar faz toda a diferença."
      porque="Quando a mensagem soa como ordem (“você PRECISA”), surge a reatância: irritação e mais resistência. Convite com um passo claro funciona melhor. E no homem, o sinal que aparece em casa costuma ser irritação, não tristeza."
      fontes={["rains2013", "ruok", "martin2013", "gomes2007"]}
    >
      <section>
        <h2 className="text-2xl font-bold text-ink">Na história</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Resultado tom="alerta" titulo="Primeira tentativa da Lia">
            “Você PRECISA ir ao médico!” — Davi respondeu “eu tô ótimo” e adiou mais.
          </Resultado>
          <Resultado tom="ok" titulo="Na semana seguinte">
            “Tô te achando cansado. Quer que a gente veja isso junto?” — Davi respondeu: “…pode ser.”
          </Resultado>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">P.O.I.S. — para convidar sem cobrar</h2>
        <ol className="mt-4 grid gap-3">
          {POIS.map((p) => (
            <li key={p.letra} className="flex gap-4 rounded-2xl border border-line bg-surface p-4">
              <span className="titulo flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-acento text-2xl text-sobre-acento">{p.letra}</span>
              <span>
                <span className="block text-lg font-bold text-ink">{p.titulo}</span>
                <span className="block text-ink-2">{p.texto}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-2 text-sm text-muted">Adaptado do modelo ALEC (R U OK? e Movember). É um modelo de prática, ainda sem ensaio controlado próprio.</p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">Repare também</h2>
        <ul className="mt-3 flex flex-col gap-2 text-ink">
          <li>▸ Irritação, explosões, álcool a mais e trabalho sem parar podem ser a cabeça pedindo cuidado.</li>
          <li>▸ Levantar várias vezes à noite, ronco com pausas, cansaço que não passa: são luzes do painel.</li>
          <li>▸ Piada com o exame afasta. Respeito aproxima.</li>
        </ul>
      </section>

      <section className="mt-10">
        <Resultado tom="neutro" titulo="Cuidar não é carregar.">
          Você não precisa ser a agenda dele: o plano é dele. Convide, ofereça ir junto, e cuide de você também. Se a preocupação pesar, CVV 188 — 24 horas, para qualquer pessoa.
        </Resultado>
      </section>
    </PaginaModulo>
  );
}
