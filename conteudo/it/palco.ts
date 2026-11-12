/**
 * Versão italiana do palco (/palcoitaliano) — rascunho para adaptar a
 * palestra ao contexto italiano. Mesma estrutura, metáfora e história do
 * roteiro em português (conteudo/blocos.ts); muda a língua, os dados (ISTAT,
 * AIOM, ESC/EAU) e o sistema de saúde (SSN, medico di famiglia, screening
 * da ASL, Telefono Amico).
 *
 * Carro em italiano: "tagliando" é a revisão periódica (a "revisione" é a
 * inspeção obrigatória) — por isso a metáfora vira "il tagliando".
 *
 * Fontes conferidas em nov/2026 nos documentos oficiais (ver REFERENZE_IT).
 */

import type { Bloco } from "../blocos";
import type { Mito } from "../saude";
import type { IdPersonagem } from "../historia";
import type { KitPalco, LuzNivel, Pensamento, TextosPalco } from "../kit";
import { referencia, type Referencia } from "../referencias";
import { PALESTRANTE } from "../palestrante";

/* ---------------- fonti ---------------- */

export const REFERENZE_IT: Referencia[] = [
  {
    id: "istat2025",
    curta: "ISTAT, Indicatori demografici 2025",
    completa: "ISTAT (2026). Indicatori demografici — Anno 2025. Statistiche Report, 31 marzo 2026.",
    url: "https://www.istat.it/comunicato-stampa/indicatori-demografici-anno-2025/",
    achado: "Speranza di vita alla nascita nel 2025: 81,7 anni per gli uomini e 85,7 per le donne.",
  },
  {
    id: "bes2024",
    curta: "ISTAT, Rapporto BES 2024 · Salute",
    completa: "ISTAT (2025). Rapporto BES 2024: il benessere equo e sostenibile in Italia. Capitolo 1, Salute.",
    url: "https://www.istat.it/wp-content/uploads/2025/11/01-Salute.pdf",
    achado:
      "2024: speranza di vita a 65 anni 19,8 (uomini) e 22,6 (donne); eccesso di peso 54,3% contro 36,4%; obesità negli uomini 12,3%; fumatori 23,8% contro 17,4%; consumo di alcol a rischio 22,5% contro 9,7%; morti in incidenti stradali a 15–34 anni 1 contro 0,2 per 10 mila. 2022: decessi evitabili 23,2 contro 12,5 per 10 mila, soprattutto per la componente prevenibile.",
  },
  {
    id: "asi2025",
    curta: "ISTAT, Annuario statistico italiano 2025, cap. 4",
    completa: "ISTAT (2025). Annuario statistico italiano 2025. Capitolo 4, Sanità e salute.",
    url: "https://www.istat.it/storage/ASI/2025/capitoli/C04.pdf",
    achado: "Nel 2022, 3.906 suicidi: 3.066 uomini e 840 donne, pari a 10,6 e 2,8 ogni 100 mila abitanti.",
  },
  {
    id: "aiom2024",
    curta: "AIOM, I numeri del cancro in Italia 2024",
    completa: "AIOM, AIRTUM, Fondazione AIOM, ONS, PASSI, SIAPeC-IAP (2024). I numeri del cancro in Italia 2024. Brescia: Intermedia.",
    url: "https://www.aiom.it/i-numeri-del-cancro-in-italia/",
    achado: "Uomini, nuovi casi stimati nel 2024: prostata 40.190; polmone 31.900; colon-retto 27.500; vescica 25.230.",
  },
  {
    id: "esc2024",
    curta: "McEvoy et al., linee guida ESC 2024 (pressione)",
    completa: "McEvoy, J. W., et al. (2024). 2024 ESC Guidelines for the management of elevated blood pressure and hypertension. European Heart Journal, 45(38), 3912–4018.",
    doi: "10.1093/eurheartj/ehae178",
    achado: "Pressione non elevata: sotto 120/70 mmHg. Elevata: 120–139/70–89. Ipertensione: da 140/90.",
  },
  {
    id: "ada2025",
    curta: "ADA, Standards of Care in Diabetes 2025",
    completa: "American Diabetes Association (2025). 2. Diagnosis and Classification of Diabetes: Standards of Care in Diabetes—2025. Diabetes Care, 48(Suppl. 1), S27–S49.",
    doi: "10.2337/dc25-S002",
    achado: "Glicemia a digiuno normale: sotto 100 mg/dL.",
  },
  {
    id: "issCuore",
    curta: "ISS, Progetto Cuore · carta del rischio",
    completa: "Istituto Superiore di Sanità. Progetto Cuore: carte del rischio cardiovascolare (40–69 anni).",
    url: "https://www.cuore.iss.it/valutazione/carte",
    achado: "Il rischio cardiovascolare si stima dai 40 anni con pressione, colesterolo, glicemia, fumo ed età.",
  },
  {
    id: "eauPca",
    curta: "EAU, linee guida sul tumore della prostata",
    completa: "European Association of Urology. EAU Guidelines on Prostate Cancer.",
    url: "https://uroweb.org/guidelines/prostate-cancer",
    achado: "Offrire il PSA a uomini ben informati dai 50 anni; dai 45 con familiarità o origine africana; decisione condivisa, con risonanza magnetica prima della biopsia.",
  },
  {
    id: "ue2022",
    curta: "Raccomandazione del Consiglio UE sugli screening, 2022",
    completa: "Consiglio dell'Unione europea (2022). Raccomandazione del 9 dicembre 2022 sul rafforzamento della prevenzione attraverso l'individuazione precoce: un nuovo approccio dell'UE allo screening dei tumori (2022/C 473/01).",
    url: "https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32022H1213(01)",
    achado: "Invita a valutare programmi organizzati per il tumore della prostata, con PSA e risonanza magnetica, per uomini fino a 70 anni.",
  },
  {
    id: "lombardia2024",
    curta: "Regione Lombardia, DGR 2767/2024",
    completa: "Regione Lombardia (2024). DGR XII/2767: programma di screening per il tumore della prostata.",
    url: "https://www.regione.lombardia.it/content/dam/rl/canali-tematici-servizi/01-sanita/05-prevenzione-e-stili-di-vita/red-screening-tumore-alla-prostata-in-lombardia/DGR2767_2024_all.pdf",
    achado: "Primo programma regionale organizzato con PSA, avviato da novembre 2024 a partire dagli uomini di 50 anni.",
  },
  {
    id: "screeningColon",
    curta: "ISS EpiCentro, screening oncologici",
    completa: "Istituto Superiore di Sanità, EpiCentro. Screening oncologici: colon-retto.",
    url: "https://www.epicentro.iss.it/screening/",
    achado: "Il SSN offre gratis il test del sangue occulto nelle feci ogni 2 anni dai 50 ai 69 anni (fino a 74 in alcune Regioni).",
  },
  {
    id: "telefonoAmico",
    curta: "Telefono Amico Italia, telefonoamico.it",
    completa: "Telefono Amico Italia. Ascolto gratuito al 02 2327 2327, tutti i giorni dalle 9 alle 24.",
    url: "https://www.telefonoamico.it",
    achado: "Ascolto anonimo e gratuito per chi vuole o ha bisogno di parlare.",
  },
  /* forme brevi in italiano per fonti già usate nel palco in portoghese */
  { ...referencia("harding2020"), curta: "Harding Center, fact box sul PSA" },
  { ...referencia("oms2025"), curta: "OMS, Commissione sulla connessione sociale, 2025" },
  { ...referencia("omsCintura"), curta: "OMS, circonferenza vita, 2011" },
  { ...referencia("ruok"), curta: "R U OK? e Movember, modello ALEC" },
];

function fontesCurtasIt(ids: string[]): string {
  return ids.map((id) => (REFERENZE_IT.find((r) => r.id === id) ?? referencia(id)).curta).join(" · ");
}

/* ---------------- copione ---------------- */

export const BLOCCHI: Bloco[] = [
  {
    id: "abertura",
    numero: 1,
    titulo: "Apertura",
    curto: "Apertura",
    duracaoMin: 5,
    slides: [
      {
        id: "1.1",
        tipo: "capa",
        titulo: "Per intero.",
        destaque: "Novembre Azzurro · la salute dell'uomo, dal check-up alla conversazione",
        notaApresentador: "Lascia la copertina mentre il pubblico si siede. La ruota storta è il simbolo dell'incontro: tornerà. In Italia novembre è il mese di Movember e di LILT for Men: puoi citarli.",
      },
      {
        id: "1.2",
        tipo: "palestrante",
        notaApresentador: "30 secondi. Non sono medico — ed è proprio per questo: la domanda di oggi non riguarda l'esame, ma il perché rimandiamo.",
      },
      {
        id: "1.3",
        tipo: "pergunta",
        titulo: "Chi qui sa quando è il prossimo tagliando dell'auto, della moto, della bici?",
        segunda: "E chi si ricorda quando ha fatto l'ultima visita medica?",
        segundaJa: true,
        notaApresentador: "Mani alzate per tutte e due. Leggi la prima, aspetta le mani, poi la seconda. Fai notare la differenza ad alta voce, con un sorriso: 'l'auto è in regola'. È il gancio di tutto l'incontro.",
      },
      {
        id: "1.4",
        tipo: "numeros",
        titulo: "Non è un'impressione.",
        numeros: [
          { valor: "4 anni", rotulo: "di vita in meno per l'uomo italiano", detalhe: "81,7 contro 85,7" },
          { valor: "2,8 anni", rotulo: "in meno anche dopo i 65", detalhe: "19,8 contro 22,6" },
          { valor: "quasi 2×", rotulo: "morti evitabili tra gli uomini", detalhe: "23,2 contro 12,5 ogni 10 mila" },
          { valor: "5×", rotulo: "morti sulla strada tra i 15 e i 34 anni", detalhe: "1 contro 0,2 ogni 10 mila" },
        ],
        destaque: "Rimandare è uno schema — e gli schemi si cambiano.",
        fonteIds: ["istat2025", "bes2024"],
        notaApresentador: "Non per spaventare: per mostrare che rimandare è uno schema. Il dato chiave è il terzo: secondo l'ISTAT lo svantaggio degli uomini nelle morti evitabili viene soprattutto dalla parte prevenibile — stili di vita e comportamenti a rischio. Cioè: si può fare qualcosa.",
      },
      {
        id: "1.5",
        tipo: "historia",
        historia: {
          capitulo: "inicio",
          quando: "Lunedì, 7:40",
          cena: "Davide prenota il tagliando dell'auto. Sul telefono spunta un promemoria di due anni fa: “visita di controllo”. Lo scorre via.",
          falas: [{ quem: "davi", texto: "Ci penso dopo." }],
        },
        imagem: "/historia/davi-1.jpg",
        alt: "Illustrazione: Davide in ufficio guarda il telefono con un mezzo sorriso stanco e scorre via una notifica.",
        notaApresentador: "Personaggi immaginari. Chiedi: 'qualcuno qui conosce un Davide?' — di solito arriva qualche risata. Non serve una risposta.",
      },
      {
        id: "1.6",
        tipo: "historia",
        historia: {
          capitulo: "inicio",
          quando: "Domenica, pranzo dal padre",
          cena: "Roberto si alza due volte da tavola per andare in bagno. Da mesi si alza anche di notte.",
          falas: [{ quem: "roberto", texto: "È l'età. Un uomo non corre dal medico per niente." }],
        },
        imagem: "/historia/roberto-2.jpg",
        alt: "Illustrazione: Roberto si alza da tavola con la mano sulla schiena; Davide, seduto, lo guarda preoccupato.",
        notaApresentador: "Tieni a mente Roberto: torna nelle spie e alla fine.",
      },
    ],
  },
  {
    id: "painel",
    numero: 2,
    titulo: "Il cruscotto",
    curto: "Cruscotto",
    duracaoMin: 5,
    slides: [
      {
        id: "2.1",
        tipo: "frase",
        titulo: "Anche il corpo ha un cruscotto.",
        icone: "painel",
        destaque: "Quasi tutti guardano solo quando si accende la spia.",
        fonteIds: ["engel1977"],
        notaApresentador: "Salute per intero: corpo, testa e le persone intorno si ammalano e guariscono insieme.",
      },
      {
        id: "2.2",
        tipo: "painel",
        titulo: "Quattro numeri che ogni uomo dovrebbe conoscere",
        fonteIds: ["esc2024", "omsCintura", "ada2025"],
        notaApresentador: "Mani alzate: 'chi conosce la propria pressione?'. Poi: 'e il girovita?'. Nessuno deve saperli tutti. La pressione segue le linee guida europee 2024 (ESC): sotto 120/70 è 'non elevata'.",
      },
      {
        id: "2.3b",
        tipo: "numeros",
        sobre: "Uomini in Italia",
        titulo: "Cosa si porta dietro l'uomo, ogni giorno",
        numeros: [
          { valor: "54%", rotulo: "degli uomini è in eccesso di peso", detalhe: "donne: 36%" },
          { valor: "1 su 8", rotulo: "ha obesità", detalhe: "12,3% degli uomini" },
          { valor: "22,5%", rotulo: "beve in modo rischioso", detalhe: "donne: 9,7%" },
          { valor: "24%", rotulo: "fuma", detalhe: "donne: 17%" },
        ],
        destaque: "Non è una colpa: è da dove cominciare.",
        fonteIds: ["bes2024"],
        notaApresentador: "Dati ISTAT 2024 (BES): peso dai 18 anni, fumo e alcol dai 14. Collega con Davide: russa, dorme male, esplode per poco. Non è per colpevolizzare: è per scegliere da dove cominciare.",
      },
      {
        id: "2.4",
        tipo: "roda",
        titulo: "Com'è la tua ruota?",
        instrucao: "Un voto da 0 a 10 per ogni area. Dove è storta?",
        notaApresentador: "Un minuto di silenzio. Non conta il voto più basso: conta la ruota che gira storta. È uno strumento di riflessione, non un test.",
      },
    ],
  },
  {
    id: "mitos",
    numero: 3,
    titulo: "Mito o verità",
    curto: "Miti",
    duracaoMin: 4,
    slides: [
      { id: "3.1", tipo: "mito", mitoId: "m1" },
      { id: "3.1r", tipo: "mitoRevelado", mitoId: "m1" },
      { id: "3.2", tipo: "mito", mitoId: "m2" },
      { id: "3.2r", tipo: "mitoRevelado", mitoId: "m2" },
      { id: "3.3", tipo: "mito", mitoId: "m3", notaApresentador: "Questo di solito sorprende: lascia votare prima di girare la carta." },
      { id: "3.3r", tipo: "mitoRevelado", mitoId: "m3" },
      { id: "3.4", tipo: "mito", mitoId: "m4" },
      { id: "3.4r", tipo: "mitoRevelado", mitoId: "m4", notaApresentador: "Ponte al blocco successivo: se non è il check-up di tutto, allora cos'è?" },
    ],
  },
  {
    id: "revisao",
    numero: 4,
    titulo: "Il tagliando",
    curto: "Tagliando",
    duracaoMin: 8,
    slides: [
      {
        id: "4.1",
        tipo: "quilometragem",
        titulo: "Il tagliando, a ogni chilometraggio",
        destaque: "Non tutto, ogni anno: l'esame giusto, all'età giusta.",
        linhas: [
          { faixa: "Dai 18 anni", itens: ["Pressione", "Girovita e peso", "Sonno, umore e alcol", "Vaccini"] },
          { faixa: "Dai 40 anni", itens: ["Glicemia", "Colesterolo"] },
          { faixa: "Dai 50 anni", itens: ["Prostata: parlare del PSA", "Colon-retto: test gratuito ogni 2 anni"] },
        ],
        fonteIds: ["krogsboll2019", "esc2024", "issCuore", "eauPca", "screeningColon"],
        notaApresentador: "La casa costruttrice non cambia tutti i pezzi a ogni tagliando. Ogni chilometraggio ha i suoi controlli — e il medico li adatta a te. Pressione a ogni visita; dai 40 anni il medico di famiglia stima il rischio cardiovascolare (carta del rischio ISS). Colon-retto: l'ASL manda una lettera dai 50 ai 69 anni (fino a 74 in alcune Regioni) per il test gratuito del sangue occulto. Prostata: parlarne dai 50 — dai 45 con un padre o un fratello che ha avuto la malattia.",
      },
      {
        id: "4.2",
        tipo: "historia",
        historia: {
          capitulo: "meio",
          quando: "Tre settimane dopo",
          cena: "Davide è sfinito, russa, dorme male ed esplode per poco. Lia perde la pazienza.",
          falas: [
            { quem: "lia", texto: "DEVI andare dal medico!" },
            { quem: "davi", texto: "Sto benissimo." },
          ],
          desfecho: "E rimanda ancora un po'.",
        },
        imagem: "/historia/lia-3.jpg",
        alt: "Illustrazione: Lia a braccia conserte, preoccupata, e Davide accanto, stanco, a braccia conserte e sguardo altrove.",
        notaApresentador: "Non giudicare Lia: è preoccupata. Registra solo che la pressione ha fatto chiudere Davide. Capiremo perché nel blocco 6.",
      },
      {
        id: "4.3",
        tipo: "psaToque",
        titulo: "PSA ed esplorazione rettale: cosa mettere sulla bilancia",
        itens: ["Da sola, trova metà dei casi", "Lo decide l'urologo con te", "Dura pochi secondi"],
        destaque: "Niente screening nazionale col PSA: decidi tu, con il medico.",
        fonteIds: ["harding2020", "naji2018", "eauPca", "ue2022", "lombardia2024"],
        notaApresentador: "Numeri assoluti, sempre: 2 morti in meno ogni 1.000 uomini seguiti per 16 anni (studio europeo ERSPC, con centri anche in Italia), con rischi dall'altra parte. Né a favore né contro l'esame. Onestà: in Italia il PSA non è uno screening di popolazione; nel 2022 il Consiglio UE ha chiesto di valutare programmi organizzati con PSA e risonanza, e la Lombardia ne ha avviato uno dal 2024. Le linee guida europee (EAU) dicono: offrirlo a uomini informati dai 50 anni. Esplorazione rettale: togli il fantasma senza smentire nessuno — dura pochi secondi; la barriera è 'il colpo alla virilità', non l'esame.",
      },
      {
        id: "4.7",
        tipo: "numeros",
        titulo: "Non c'è solo la prostata.",
        numeros: [
          { valor: "40 mila", rotulo: "nuovi casi di prostata all'anno", detalhe: "il 1° tumore dell'uomo" },
          { valor: "27 mila", rotulo: "di colon-retto", detalhe: "il 3° — e c'è il test gratuito" },
        ],
        fonteIds: ["aiom2024"],
        notaApresentador: "Stime 2024. Il 2° è il polmone (32 mila: pesa il fumo). Del colon-retto a novembre non parla quasi nessuno, eppure è l'unico dei tre con uno screening gratuito per tutti: la lettera dell'ASL dai 50 anni. Il messaggio: quando arriva la lettera, rispondi. E la spia (prossima slide).",
      },
      {
        id: "4.8",
        tipo: "luzesNivel",
        titulo: "Le spie: ogni colore, un tempo",
        destaque: "Una spia accesa non è una condanna: quasi sempre si cura.",
        fonteIds: ["martin2013"],
        notaApresentador: "Come in auto: rossa, fermati subito; arancione, vai presto; gialla, prenota. Dolore al petto è anche peso, oppressione o bruciore. Ti ricordi Roberto che si alza di notte? Il più delle volte è un ingrossamento benigno della prostata — ma è una spia. Russare con pause e sonno che non riposa: l'apnea è comune negli uomini. Irritabilità, tristezza o alcol in più per 2 settimane o più: può essere la depressione travestita, che arriva nel prossimo blocco. Se qualcuno ha pensieri di farla finita, è spia rossa: 112 o Telefono Amico.",
      },
    ],
  },
  {
    id: "motorista",
    numero: 5,
    titulo: "Chi guida",
    curto: "Chi guida",
    duracaoMin: 5,
    slides: [
      {
        id: "5.1",
        tipo: "duasColunas",
        sobre: "Anche chi guida ha bisogno del tagliando",
        titulo: "Nell'uomo, la depressione arriva spesso travestita",
        colunas: [
          { titulo: "Quello che ci aspettiamo", itens: ["Tristezza", "Pianto", "Sconforto"], tom: "neutro", icone: "chuva" },
          { titulo: "Quello che si vede", itens: ["Irritabilità", "Alcol in più", "Rischio e velocità", "Sparire dagli amici"], tom: "aceso", icone: "raio" },
        ],
        destaque: "Contando questi segnali, gli uomini soffrono di depressione quanto le donne.",
        fonteIds: ["martin2013"],
        notaApresentador: "Questa slide è anche per le compagne: il segnale che si vede in casa di solito è l'irritabilità, non la tristezza. Ricorda Davide che esplode per poco.",
      },
      {
        id: "5.2",
        tipo: "numeros",
        titulo: "Anche l'amicizia è salute.",
        numeros: [
          { valor: "+50%", rotulo: "di probabilità di sopravvivenza con relazioni forti" },
          { valor: "1 su 6", rotulo: "persone nel mondo vive la solitudine" },
        ],
        destaque: "Chi è la tua squadra per le conversazioni difficili?",
        fonteIds: ["holtlunstad2010", "oms2025"],
        notaApresentador: "Tanti uomini hanno l'amico del calcetto e della grigliata. Per la conversazione difficile, la lista si accorcia. Non chiedere risposte: lascia la domanda nell'aria.",
      },
      {
        id: "5.3",
        tipo: "frase",
        titulo: "Chiedere aiuto presto è manutenzione.",
        icone: "boia",
        destaque: "In Italia gli uomini muoiono per suicidio quasi 4 volte più delle donne. Parlarne aiuta: Telefono Amico 02 2327 2327.",
        fonteIds: ["asi2025", "telefonoAmico"],
        notaApresentador: "Tono calmo, senza dettagli. Telefono Amico ascolta anche chi ha solo bisogno di parlare, tutti i giorni dalle 9 alle 24. Comunicazione sicura: mai metodi, mai casi. Di' che resti dopo per chi vuole parlare.",
      },
    ],
  },
  {
    id: "adiar",
    numero: 6,
    titulo: "Perché rimandiamo",
    curto: "Rimandare",
    duracaoMin: 7,
    slides: [
      {
        id: "6.1",
        tipo: "frase",
        titulo: "Non è mancanza di informazioni.",
        icone: "cabeca",
        destaque: "È la testa che prova a proteggerci — e intanto ci ostacola.",
        fonteIds: ["addis2003"],
        notaApresentador: "Qui entra la TCC: i pensieri automatici. Sembrano veri perché arrivano veloci.",
      },
      {
        id: "6.1b",
        tipo: "couraca",
        sobre: "Il silenzio degli uomini",
        titulo: "La corazza che tiene lontana la cura",
        itens: ["Gli uomini non piangono.", "Stringi i denti.", "Non è niente, passa.", "Dal medico solo quando non ce la fai più."],
        colunas: [
          {
            titulo: "Cosa resta dentro",
            itens: ["Il dolore diventa irritazione, alcol o silenzio", "Il problema arriva tardi dal medico", "Chi ti sta vicino non lo sa"],
          },
        ],
        destaque: "Sembrare forti non è stare bene: spesso è solo parlarne meno.",
        fonteIds: ["addis2003", "martin2013"],
        notaApresentador: "Chiedi chi ha sentito queste frasi in casa (mani alzate). La corazza si impara presto e ha protetto tante persone — non è da attaccare, è da vederne il prezzo. Protegge dai colpi — e anche dalla cura. Togliere la corazza non è debolezza: è lasciar entrare la cura.",
      },
      {
        id: "6.2",
        tipo: "pensamentos",
        titulo: "Cosa dice la testa — e cosa rispondere",
        fonteIds: ["weinstein1980", "sweeny2010", "addis2003"],
        notaApresentador: "Le coppie compaiono una alla volta. Chiedi quale sentono di più (mani alzate). Non si litiga col pensiero: gli si risponde.",
      },
      {
        id: "6.3",
        tipo: "duasColunas",
        titulo: "Perché lo spavento e le pressioni non funzionano",
        colunas: [
          { titulo: "Spavento", itens: ["Ci si blocca", "Si evita l'argomento", "Si rimanda ancora"], tom: "neutro", icone: "susto" },
          { titulo: "Pressione", itens: ["Suona come un ordine", "Accende la resistenza", "Diventa una lite"], tom: "neutro", icone: "megafone" },
        ],
        destaque: "Funziona: l'esempio di altri uomini, una strada chiara e la cura come forza.",
        fonteIds: ["tannenbaum2015", "rains2013", "sagar2019"],
        notaApresentador: "Lo spavento senza una strada blocca; il 'DEVI' diventa una lite, non una visita. Per questo qui non ci sono foto di malattie né 'fallo, altrimenti'. Reattanza: più pressione, più resistenza.",
      },
      {
        id: "6.4",
        tipo: "reescrita",
        sobre: "Lia, la settimana dopo",
        ruim: "DEVI andare dal medico!",
        boa: "Ti vedo stanco. Ti va se ce ne occupiamo insieme?",
        imagem: "/historia/lia-4.jpg",
        alt: "Illustrazione: Lia e Davide al tavolo della cucina con due tazze; lei parla con calma e lui, sollevato, ascolta.",
        notaApresentador: "Davide ha risposto: '...va bene.' Stessa preoccupazione, un'altra porta. Chiedi: quale delle due ascolteresti?",
      },
    ],
  },
  {
    id: "junto",
    numero: 7,
    titulo: "Vengo con te",
    curto: "Insieme",
    duracaoMin: 3,
    slides: [
      {
        id: "7.0",
        tipo: "historia",
        historia: {
          capitulo: "meio",
          quando: "La domenica dopo",
          cena: "Davide mostra al padre la schermata della prenotazione. Roberto storce il naso — ma guarda lo schermo.",
          falas: [{ quem: "davi", texto: "Papà, ti faccio vedere una cosa." }],
        },
        imagem: "/historia/davi-5.jpg",
        alt: "Illustrazione: Davide mostra lo schermo del telefono al padre, Roberto, che sorride un po' controvoglia.",
        notaApresentador: "Prepara la prossima slide: due modi di finire questo pranzo.",
      },
      {
        id: "7.1",
        tipo: "caminhos",
        sobre: "Davide e il padre, la domenica dopo",
        titulo: "Due modi di finire il pranzo",
        caminhos: [
          { rotulo: "Strada 1", fala: "Fai tu, papà.", resultado: "Roberto cambia discorso. La conversazione muore lì.", tom: "apagado" },
          { rotulo: "Strada 2", fala: "Papà, ho prenotato per tutti e due. Vengo con te.", resultado: "Roberto brontola… e accetta: “Solo se lo fai anche tu.”", tom: "aceso" },
        ],
        destaque: "Incoraggia un passo piccolo: “Che ne dici di prenotare? Vengo con te.”",
        fonteIds: ["ruok"],
        notaApresentador: "Il 'fai tu' sembra rispetto, ma chiude la porta. Il 'vengo con te' toglie il peso di andare da soli — e alla fine ci va anche Davide. L'incoraggiamento è un invito piccolo e concreto, non una pretesa: chiedi, ascolta senza prediche, proponi un passo, offriti di andare insieme e richiedi la settimana dopo (modello ALEC, R U OK? e Movember).",
      },
      {
        id: "7.3",
        tipo: "lista",
        sobre: "Per chi si prende cura di lui",
        titulo: "Prendersi cura non è farsi carico",
        icones: ["conversa", "juntos", "olho", "agenda"],
        itens: ["Invita — non pretendere", "Offriti di andare con lui", "Nota l'irritabilità, non solo la tristezza", "Il piano è suo — non sei la sua agenda"],
        fonteIds: ["rains2013", "martin2013"],
        notaApresentador: "Per compagne, figlie, madri, amici: parla direttamente alle donne in sala. E agli uomini: anche chi si prende cura ha bisogno di cura.",
      },
    ],
  },
  {
    id: "euvou",
    numero: 8,
    titulo: "Ci vado",
    curto: "Ci vado",
    duracaoMin: 6,
    slides: [
      {
        id: "8.0",
        tipo: "quemConta",
        sobre: "Non ti ammali da solo",
        titulo: "Chi conta su di te?",
        passos: [
          { titulo: "A casa", texto: "compagna, figli, genitori" },
          { titulo: "Al lavoro", texto: "la squadra, i colleghi" },
          { titulo: "Tra gli amici", texto: "per le conversazioni difficili" },
        ],
        instrucao: "Pensa a tre nomi.",
        destaque: "Curare te è curare anche loro.",
        notaApresentador: "Senza colpa e senza spavento: non è 'e se muori'. È ricordare che l'uomo è un ingranaggio di tante cose — e che il tagliando è anche un regalo per chi conta su di lui. Davide ci è andato per il padre e ha finito per andarci per sé. Chiedi: 'pensa a tre nomi' — e aggiungi: 'quando ti fermi tu, si fermano anche loro'. Lascia 10 secondi di silenzio.",
      },
      {
        id: "8.1",
        tipo: "exercicio",
        titulo: "Un minuto con te stesso a 70 anni",
        instrucao: "Dove vuoi essere a 70 anni? Con chi? Cosa ti chiederebbe di fare questa settimana quell'uomo?",
        duracaoSeg: 60,
        fonteIds: ["rutchick2018"],
        notaApresentador: "Clicca su Inizia. Occhi chiusi, se vogliono. Silenzio vero. L'effetto dura poco — per questo la prossima slide arriva subito.",
      },
      {
        id: "8.2",
        tipo: "seEntao",
        titulo: "E ora, un piano in una frase",
        exemplos: ["Se è lunedì, dopo pranzo, allora chiamo e prenoto.", "Se è il mese del mio compleanno, allora faccio il mio tagliando."],
        fonteIds: ["gollwitzer2006", "dai2014"],
        notaApresentador: "'Ci penso' non finisce in agenda. Quando, dove e cosa, sì. Dettaglio importante: in uno studio inglese i piani già pronti stampati su un volantino non hanno funzionato — il piano deve scriverlo la persona stessa. Una data-simbolo — il compleanno — aiuta a ricordare ogni anno.",
      },
      {
        id: "8.3",
        tipo: "ondeIr",
        titulo: "Dove prenotare",
        destaque: "Chiedi all'ufficio HR cosa offre la tua azienda.",
        notaApresentador: "Se l'azienda ha un welfare o un fondo sanitario integrativo, citalo qui — solo quello che esiste davvero. Il medico di famiglia è la porta d'ingresso gratuita del SSN.",
      },
      {
        id: "8.4",
        tipo: "historia",
        historia: {
          capitulo: "fim",
          quando: "Tre mesi dopo",
          cena: "Ci sono andati tutti e due. Nessuno ha trovato ciò che temeva.",
          falas: [
            { quem: "roberto", texto: "Prostata ingrossata, benigna. E pressione alta: non lo sapevo." },
            { quem: "davi", texto: "Era apnea. E la testa. Mi sto curando." },
          ],
          desfecho: "Ora il loro tagliando è annuale.",
        },
        imagem: "/historia/fim-6.jpg",
        alt: "Illustrazione: Davide e Roberto fianco a fianco in una sala d'attesa luminosa, ognuno con il numero in mano, con un leggero sorriso.",
        notaApresentador: "Entrambi hanno trovato qualcosa da curare. Un finale realistico: la visita trova delle cose — quasi mai quella che si temeva, e quasi sempre qualcosa che si cura.",
      },
      {
        id: "8.5",
        tipo: "fecho",
        titulo: "Ci vado.",
        destaque: "Il prossimo passo è tuo: una telefonata al medico di famiglia, questa settimana.",
        notaApresentador: "Chiudi con calma. Ripeti la frase del piano: 'se è…, allora…'.",
      },
    ],
  },
  {
    id: "perguntas",
    numero: 9,
    titulo: "Domande",
    curto: "Domande",
    duracaoMin: 10,
    slides: [
      {
        id: "9.1",
        tipo: "perguntas",
        titulo: "Domande",
        destaque: "Sull'esame, sulla conversazione o sul rimandare. Non serve presentarsi.",
        notaApresentador: "Dubbio clinico specifico: 'portalo al tuo medico'. Resta dopo per chi vuole parlare in privato.",
      },
    ],
  },
];

/* ---------------- contenuti condivisi ---------------- */

const MITI: Mito[] = [
  {
    id: "m1",
    afirmacao: "Se non sento niente, va tutto bene.",
    resposta: "mito",
    comentario: "All'inizio il tumore della prostata e la pressione alta di solito non danno nessun sintomo. Per questo esistono i numeri del cruscotto.",
    fonteIds: ["aiom2024", "esc2024"],
  },
  {
    id: "m2",
    afirmacao: "PSA alto vuol dire tumore.",
    resposta: "mito",
    comentario: "Anche l'ingrossamento benigno della prostata, un'infiammazione e altre condizioni alzano il PSA. È un punto di partenza per parlarne col medico — non una diagnosi.",
    fonteIds: ["eauPca"],
  },
  {
    id: "m3",
    afirmacao: "Vitamine e integratori proteggono la prostata.",
    resposta: "mito",
    comentario: "Nello studio più grande su questo, con 35 mila uomini, la vitamina E ha aumentato il tumore della prostata del 17%. Un integratore non è prevenzione.",
    fonteIds: ["klein2011"],
  },
  {
    id: "m4",
    afirmacao: "Il check-up completo, ogni anno, è quello che salva.",
    resposta: "mito",
    comentario: "Fare esami di tutto a tutti non ha ridotto le morti, in 233 mila persone. Funziona l'esame giusto, all'età giusta, per chi ne ha bisogno.",
    fonteIds: ["krogsboll2019"],
  },
];

const AREE_RUOTA = [
  { id: "corpo", nome: "Corpo in movimento" },
  { id: "sono", nome: "Sonno ed energia" },
  { id: "habitos", nome: "Abitudini" },
  { id: "prevencao", nome: "Prevenzione" },
  { id: "cabeca", nome: "Testa ed emozioni" },
  { id: "familia", nome: "Famiglia e coppia" },
  { id: "amizades", nome: "Amicizie e tempo libero" },
  { id: "trabalho", nome: "Lavoro e senso" },
];

const SPIE: LuzNivel[] = [
  {
    id: "vermelha",
    nome: "Spia rossa",
    acao: "Soccorso subito",
    quando: "pronto soccorso · 112",
    intensidade: 3,
    sinais: [
      { texto: "Dolore al petto", icone: "coracao" },
      { texto: "Fiato corto improvviso", icone: "vento" },
    ],
  },
  {
    id: "laranja",
    nome: "Spia arancione",
    acao: "Visita a breve",
    quando: "nei prossimi giorni",
    intensidade: 2,
    sinais: [{ texto: "Sangue nelle urine o nelle feci", icone: "gota" }],
  },
  {
    id: "amarela",
    nome: "Spia gialla",
    acao: "Prenota una visita",
    quando: "nelle prossime settimane",
    intensidade: 1,
    sinais: [
      { texto: "Urinare di notte", icone: "noite" },
      { texto: "Russare con pause", icone: "lua" },
      { texto: "Tristezza o irritabilità da 2 settimane", icone: "nuvem" },
    ],
  },
];

const PENSIERI: Pensamento[] = [
  { id: "passa", automatico: "Passerà da solo.", resposta: "Se passa, bene. Se no, me ne sto già occupando." },
  { id: "comigo", automatico: "A me non succede.", resposta: "Lo pensano tutti: si chiama ottimismo irrealistico." },
  { id: "aguenta", automatico: "Un uomo tiene duro.", resposta: "Tenere duro non è curarsi. Manutenzione non è debolezza." },
  { id: "descobrir", automatico: "Se non ci vado, non scopro niente.", resposta: "Non sapere non cambia ciò che c'è: toglie solo tempo." },
];

const PERSONAGGI: Record<IdPersonagem, { nome: string; descricao: string; inicial: string }> = {
  davi: { nome: "Davide", descricao: "36 anni, coordinatore logistico", inicial: "D" },
  roberto: { nome: "Roberto", descricao: "61 anni, padre di Davide", inicial: "R" },
  lia: { nome: "Lia", descricao: "compagna di Davide", inicial: "L" },
};

export const UI_IT: TextosPalco = {
  marca: "Per intero · Novembre Azzurro",
  campanhaPilula: "Novembre Azzurro · salute dell'uomo",
  aviso: "Non sostituisce il medico",
  ajudaRodape: "Telefono Amico 02 2327 2327",
  ajudaAgora: { antes: "Per parlarne adesso: ", forte: "Telefono Amico 02 2327 2327", depois: ", tutti i giorni dalle 9 alle 24." },
  h1: "Per intero — Novembre Azzurro, incontro con Marcelo Schiavo. Contenuto educativo. Telefono Amico 02 2327 2327.",
  slide: "Slide",
  de: "di",
  gireTitulo: "Ruota il telefono per vedere la presentazione",
  gireTexto: "È pensata per lo schermo in orizzontale, come una TV o un proiettore.",
  gireBotao: "Vedi così",
  fonte: "fonte",
  fontes: "fonti",
  levanteMao: "alza la mano",
  fotoDe: "Foto di",
  historiaDe: "La storia di Davide",
  etapaHistoria: "Fase della storia",
  etapas: ["Inizio", "Metà", "Fine"],
  aviso15: "Personaggi immaginari, costruiti da situazioni comuni. Illustrazioni generate con IA.",
  painelSobre: "Il cruscotto",
  mostradores: [
    { nome: "Pressione", alvo: "sotto 120/70", unidade: "mmHg" },
    { nome: "Girovita", alvo: "sotto 94 cm", unidade: "all'altezza dell'ombelico" },
    { nome: "Glicemia", alvo: "sotto 100 a digiuno", unidade: "mg/dL" },
    { nome: "Colesterolo", alvo: "l'obiettivo dipende dal tuo rischio", unidade: "lo decide il medico" },
  ],
  painelDestaque: "Non conosci i tuoi? È il primo punto della prossima visita.",
  rodaSobre: "Assetto ed equilibratura",
  rodaNota: "Strumento di riflessione, non un test.",
  rodaAria: "Ruota della salute",
  mitoPergunta: "mito o verità? · alza la mano",
  mito: "Mito",
  verdade: "Verità",
  manual: "Il libretto di manutenzione",
  pensamentosSobre: "Pensieri automatici",
  exercicioSobre: "Esercizio · 1 minuto",
  comecar: "Inizia",
  segundos: "secondi",
  abraOsOlhos: "puoi riaprire gli occhi",
  seEntaoSobre: "Ritorno in officina",
  seEntao: ["Se è ", ", allora ", "."],
  lugares: [
    { icone: "plano", titulo: "Medico di famiglia", texto: "la porta d'ingresso, gratuita" },
    { icone: "ubs", titulo: "Screening dell'ASL", texto: "arriva la lettera: rispondi" },
    { icone: "trabalho", titulo: "Medico competente", texto: "la visita periodica al lavoro" },
    { icone: "empresa", titulo: "Welfare aziendale", texto: "se previsto" },
  ],
  qrTitulo: "Codice QR",
  psa: {
    sem: "Senza il test",
    com: "Con il test",
    titulo: "A cosa serve il PSA",
    legenda: "Morti per tumore della prostata, su 1.000 uomini:",
    emMil: "su 1.000",
    menos: "2 morti in meno su 1.000",
    geral: "Morti per qualsiasi causa: nessuna differenza.",
    outroLado: "L'altro lato",
    riscos: ["Falsi allarmi e biopsie inutili", "Curare tumori che non avrebbero fatto danni", "Effetti su urina ed erezione"],
    toque: "E l'esplorazione rettale?",
  },
  intensidade: "intensità",
  couracaDiz: "Cosa dice la corazza",
  aneis: ["Casa", "Lavoro", "Amici"],
  voce: "Tu",
};

export const KIT_IT: KitPalco = {
  lingua: "it",
  blocos: BLOCCHI,
  mitos: MITI,
  areasRoda: AREE_RUOTA,
  luzes: SPIE,
  pensamentos: PENSIERI,
  personagens: PERSONAGGI,
  bioCurta: [
    "Psicologo clinico in Brasile · CRP 06/109462",
    "Specialista in Terapia Cognitivo-Comportamentale",
    "Relatore in campagne di salute nelle aziende",
    "Attore · DRT 40876/SP",
    "Lavora in portoghese, inglese e italiano",
  ],
  registro: `${PALESTRANTE.crp} (Brasile)`,
  trilhaUrl: null,
  fontesCurtas: fontesCurtasIt,
  ui: UI_IT,
};
