import { PaginaModulo, Resultado } from "@/components/trilha/PaginaModulo";
import { BlocoAjuda } from "@/components/ui/BlocoAjuda";

export default function PaginaCabeca() {
  return (
    <PaginaModulo
      id="cabeca"
      titulo="Cabeça também é saúde"
      ideia="O motorista também precisa de revisão. No homem, a depressão muitas vezes não aparece como tristeza — aparece como irritação, álcool e risco."
      porque="Quando se contam os sinais mais comuns nos homens (raiva, álcool, risco), a diferença de depressão entre homens e mulheres desaparece: muito homem sofre sem diagnóstico. No Brasil, 10,2% dos adultos referiram depressão em 2019, e os homens morrem por suicídio cerca de quatro vezes mais que as mulheres. Pedir ajuda cedo é manutenção."
      fontes={["martin2013", "brito2022", "palma2021", "wong2017", "holtlunstad2010", "oms2025", "cvv"]}
    >
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="cartao cartao-suave p-5">
          <h2 className="text-lg font-bold text-ink-2">O que a gente espera ver</h2>
          <ul className="mt-2 flex flex-col gap-1 text-ink-2">
            <li>▸ Tristeza</li>
            <li>▸ Choro</li>
            <li>▸ Desânimo</li>
          </ul>
        </div>
        <div className="rounded-2xl border-2 border-campanha-fill bg-campanha-wash p-5">
          <h2 className="text-lg font-bold text-campanha">O que muitas vezes aparece</h2>
          <ul className="mt-2 flex flex-col gap-1 text-ink">
            <li>▸ Irritação e explosões por pouco</li>
            <li>▸ Álcool a mais</li>
            <li>▸ Risco e velocidade</li>
            <li>▸ Trabalho sem parar</li>
            <li>▸ Sumir dos amigos</li>
          </ul>
        </div>
      </section>

      <section className="mt-8 flex flex-col gap-3">
        <Resultado tom="atencao" titulo="Se isso dura mais de duas semanas">
          Vale conversar com alguém de confiança e com um profissional — clínico geral, psicólogo, o programa de apoio da empresa, se houver, ou a UBS.
        </Resultado>
        <Resultado tom="neutro" titulo="Amizade também é saúde">
          Quem tem relações fortes vive mais. Pergunta para esta semana: quem é o seu time para a conversa difícil? Manda uma mensagem pra ele, sem motivo.
        </Resultado>
      </section>

      <div className="mt-8">
        <BlocoAjuda />
      </div>
    </PaginaModulo>
  );
}
