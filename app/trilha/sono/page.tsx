import { PaginaModulo, Resultado } from "@/components/trilha/PaginaModulo";

export default function PaginaSono() {
  return (
    <PaginaModulo
      id="sono"
      titulo="Sono, ronco e turno"
      ideia="Sono é combustível. Adulto precisa de 7 horas ou mais — e ronco com pausas não é “normal de homem”: é luz do painel."
      porque="Dormir menos que 7 horas de forma habitual está associado a pressão alta, diabetes, doença do coração, depressão e mais acidentes. Em São Paulo, um estudo com polissonografia encontrou apneia em quase 1 em cada 3 adultos, com homens tendo cerca de 4 vezes mais chance."
      fontes={["watson2015", "tufik2010", "lloydjones2022"]}
    >
      <section className="flex flex-col gap-3">
        <Resultado tom="atencao" titulo="Sinais de apneia — vale consulta">
          Ronco alto, alguém já viu você parar de respirar dormindo, acordar engasgado, sono que não descansa, cochilar dirigindo ou em reunião.
        </Resultado>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-ink">Para quem trabalha em turnos</h2>
        <p className="mt-1 text-sm text-muted">Orientações práticas gerais. Se o sono não melhora, converse com a medicina do trabalho ou com o seu médico.</p>
        <ul className="mt-3 flex flex-col gap-2 text-ink">
          <li>▸ <strong>Proteja um bloco de sono</strong> no mesmo horário, sempre que der — o corpo gosta de rotina.</li>
          <li>▸ <strong>Quarto escuro e silencioso</strong> de dia: cortina blackout, máscara, protetor de ouvido, celular longe.</li>
          <li>▸ <strong>Café com hora para acabar</strong>: evite nas últimas horas antes de dormir.</li>
          <li>▸ <strong>Álcool não é remédio para dormir</strong>: ele derruba, mas piora a qualidade do sono.</li>
          <li>▸ <strong>Volta para casa com cuidado</strong>: sonolência ao volante é risco real — se estiver no limite, não dirija.</li>
        </ul>
      </section>

      <section className="mt-8">
        <Resultado tom="neutro" titulo="Na história">
          O ronco do Davi era apneia — e a irritação dele piorava com o sono ruim. Tratar o sono ajudou a cabeça também.
        </Resultado>
      </section>
    </PaginaModulo>
  );
}
