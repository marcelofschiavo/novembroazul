/**
 * Dados da campanha e do palestrante — fonte única pra palco, trilha e
 * certificado. Campanha GENÉRICA: serve a várias empresas, então nada aqui
 * leva nome de cliente. Data e local de cada palestra ficam fora do site.
 */

export const EVENTO = {
  titulo: "Por inteiro",
  subtitulo: "Novembro Azul · saúde do homem, do check-up à conversa",
  ocasiao: "Novembro Azul 2026",
  dataExtenso: "novembro de 2026",
  /** Início da fala, para a contagem da tela de espera. null = sem cronômetro. */
  inicioFala: null as string | null,
  url: "https://trilhanovembroazul.vercel.app",
} as const;

export const PALESTRANTE = {
  nome: "Marcelo Schiavo",
  nomeCompleto: "Marcelo Ferreira Schiavo",
  foto: "/palestrante/marcelo.jpg",
  crp: "CRP 06/109462",
  drt: "DRT 40876/SP",
  titulos: ["Psicólogo clínico (TCC)", "Consultor de treinamento e desenvolvimento"],
  bioCurta: [
    "Psicólogo clínico · CRP 06/109462",
    "Especialista em Terapia Cognitivo-Comportamental",
    "Palestrante em campanhas de saúde nas empresas",
    "Ator · DRT 40876/SP",
    "Atende em português, inglês, italiano e espanhol",
  ],
  bio:
    "Marcelo Ferreira Schiavo é psicólogo clínico (CRP 06/109462), especialista em Terapia Cognitivo-Comportamental, MBA em Gestão de Pessoas e ator (DRT 40876/SP). Há 15 anos atua da clínica às empresas: atende em português, inglês, italiano e espanhol pela Mindheart Human Development e conduz palestras, treinamentos e programas de saúde e desenvolvimento para empresas — com campanhas e programas de saúde em empresas desde 2021. Foi professor universitário de Psicologia e voluntário do CVV. Também desenvolve as plataformas que usa nas palestras, como esta trilha.",
  contatos: [
    { rede: "Instagram", rotulo: "@marceloschiavopsi", href: "https://www.instagram.com/marceloschiavopsi/" },
    { rede: "LinkedIn", rotulo: "in/marcelofschiavo", href: "https://www.linkedin.com/in/marcelofschiavo" },
  ],
} as const;
