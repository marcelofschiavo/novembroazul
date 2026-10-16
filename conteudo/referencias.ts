/**
 * Referências. Todo dado citado no palco ou na trilha aponta pra um id daqui:
 * a tela mostra a forma curta; a trilha, a completa com DOI ou link oficial.
 * DOIs conferidos no Crossref em out/2026. `br` marca ciência e dado brasileiro
 * — a trilha destaca, para não ficar só artigo de fora.
 *
 * Formato de `completa`: "Autores (ano). Título. Periódico, vol(n), páginas."
 * (a página /trilha/referencias separa as partes por esse padrão).
 */

export type Referencia = {
  id: string;
  curta: string;
  completa: string;
  doi?: string;
  url?: string;
  achado: string;
  br?: boolean;
};

export const REFERENCIAS: Referencia[] = [
  /* ---------- próstata, rastreamento e decisão ---------- */
  {
    id: "erspc2025",
    curta: "Roobol et al., NEJM 2025 (ERSPC, 23 anos)",
    completa: "Roobol, M. J., et al. (2025). European Study of Prostate Cancer Screening — 23-year follow-up. New England Journal of Medicine, 393(17), 1669–1680.",
    doi: "10.1056/NEJMoa2503223",
    achado: "162 mil homens de 55 a 69 anos, em oito países, acompanhados por 23 anos. O rastreamento com PSA reduziu a morte por câncer de próstata em 13% — em números absolutos, 1 morte evitada a cada 456 homens convidados — e aumentou os diagnósticos em 30%, parte deles de cânceres que não fariam mal.",
  },
  {
    id: "harding2020",
    curta: "Harding Center, caixa de fatos do PSA",
    completa: "Harding Center for Risk Literacy (2020). Early detection of prostate cancer with PSA testing: fact box. Universidade de Potsdam.",
    url: "https://hardingcenter.de/en/transfer-and-impact/fact-boxes/early-detection-of-cancer/early-detection-of-prostate-cancer-with-psa-testing",
    achado: "Em 16 anos, cerca de 10 em cada 1.000 homens que fizeram rastreamento e 12 em cada 1.000 que não fizeram morreram de câncer de próstata: 2 em 1.000. A mortalidade geral não mudou. Do outro lado da balança, há resultados falsos positivos, biópsias desnecessárias e tratamento de cânceres que não fariam mal.",
  },
  {
    id: "hamdy2023",
    curta: "Hamdy et al., NEJM 2023 (ProtecT)",
    completa: "Hamdy, F. C., et al. (2023). Fifteen-year outcomes after monitoring, surgery, or radiotherapy for prostate cancer. New England Journal of Medicine, 388(17), 1547–1558.",
    doi: "10.1056/NEJMoa2214122",
    achado: "1.643 homens com câncer de próstata localizado, acompanhados por 15 anos. A morte pela doença foi baixa (cerca de 3%) e parecida entre monitoramento ativo, cirurgia e radioterapia. Os tratamentos trouxeram mais efeitos na função urinária e sexual. Nem todo câncer de próstata precisa de tratamento imediato.",
  },
  {
    id: "hugosson2022",
    curta: "Hugosson et al., NEJM 2022 (Göteborg-2)",
    completa: "Hugosson, J., et al. (2022). Prostate cancer screening with PSA and MRI followed by targeted biopsy only. New England Journal of Medicine, 387(23), 2126–2137.",
    doi: "10.1056/NEJMoa2209454",
    achado: "Fazer ressonância depois do PSA alterado, e biópsia só quando a ressonância mostra algo, reduziu pela metade o diagnóstico de cânceres insignificantes, sem perder casos de alto risco no acompanhamento de cerca de 4 anos.",
  },
  {
    id: "naji2018",
    curta: "Naji et al., Ann Fam Med 2018",
    completa: "Naji, L., et al. (2018). Digital rectal examination for prostate cancer screening in primary care: a systematic review and meta-analysis. Annals of Family Medicine, 16(2), 149–154.",
    doi: "10.1370/afm.2205",
    achado: "Na atenção primária, o toque retal sozinho identificou cerca de metade dos cânceres de próstata (sensibilidade de 51%), com evidência de qualidade muito baixa. Os autores não recomendam o toque como exame isolado de rastreamento — quem decide os exames de cada caso é o médico.",
  },
  {
    id: "klein2011",
    curta: "Klein et al., JAMA 2011 (SELECT)",
    completa: "Klein, E. A., et al. (2011). Vitamin E and the risk of prostate cancer: the Selenium and Vitamin E Cancer Prevention Trial (SELECT). JAMA, 306(14), 1549–1556.",
    doi: "10.1001/jama.2011.1437",
    achado: "Ensaio com 35 mil homens saudáveis: quem tomou vitamina E sozinha teve 17% mais câncer de próstata do que quem tomou placebo. O selênio também não protegeu. Suplemento não é prevenção.",
  },
  {
    id: "shepherd2011",
    curta: "Shepherd et al., Patient Educ Couns 2011",
    completa: "Shepherd, H. L., et al. (2011). Three questions that patients can ask to improve the quality of information physicians give about treatment options: a cross-over trial. Patient Education and Counseling, 84(3), 379–385.",
    doi: "10.1016/j.pec.2011.07.022",
    achado: "Quando o paciente fazia três perguntas — quais são minhas opções, quais os benefícios e riscos de cada uma, e qual a chance de isso acontecer comigo —, os médicos davam informação de melhor qualidade e envolviam mais o paciente na decisão.",
  },
  {
    id: "hoffrage2000",
    curta: "Hoffrage et al., Science 2000",
    completa: "Hoffrage, U., Lindsey, S., Hertwig, R., & Gigerenzer, G. (2000). Communicating statistical information. Science, 290(5500), 2261–2262.",
    doi: "10.1126/science.290.5500.2261",
    achado: "Números em frequências naturais (\"10 em cada 1.000\") são entendidos por muito mais gente — inclusive médicos — do que porcentagens e probabilidades. Por isso a palestra mostra os 1.000 homens.",
  },
  {
    id: "stacey2017",
    curta: "Stacey et al., Cochrane 2017",
    completa: "Stacey, D., et al. (2017). Decision aids for people facing health treatment or screening decisions. Cochrane Database of Systematic Reviews, 4, CD001431.",
    doi: "10.1002/14651858.CD001431.pub5",
    achado: "Ferramentas de apoio à decisão aumentam o conhecimento, deixam a percepção de risco mais realista, reduzem o conflito na hora de decidir e aumentam a participação da pessoa na decisão.",
  },

  /* ---------- prevenção, coração e corpo ---------- */
  {
    id: "krogsboll2019",
    curta: "Krogsbøll et al., Cochrane 2019",
    completa: "Krogsbøll, L. T., Jørgensen, K. J., & Gøtzsche, P. C. (2019). General health checks in adults for reducing morbidity and mortality from disease. Cochrane Database of Systematic Reviews, 1, CD009009.",
    doi: "10.1002/14651858.CD009009.pub3",
    achado: "17 ensaios: o check-up geral — exame de tudo para todo mundo — teve pouco ou nenhum efeito na mortalidade total (233 mil pessoas, risco relativo 1,00), por câncer ou por doença cardiovascular. O que funciona é o exame certo, na idade certa, para quem precisa.",
  },
  {
    id: "lloydjones2022",
    curta: "Lloyd-Jones et al., Circulation 2022 (Life's Essential 8)",
    completa: "Lloyd-Jones, D. M., et al. (2022). Life's Essential 8: updating and enhancing the American Heart Association's construct of cardiovascular health. Circulation, 146(5), e18–e43.",
    doi: "10.1161/CIR.0000000000001078",
    achado: "A saúde do coração em 8 itens: alimentação, atividade física, cigarro, sono, peso, colesterol, glicose e pressão. Quatro são hábitos; quatro são números que só se conhece medindo.",
  },
  {
    id: "inman2009",
    curta: "Inman et al., Mayo Clin Proc 2009",
    completa: "Inman, B. A., et al. (2009). A population-based, longitudinal study of erectile dysfunction and future coronary artery disease. Mayo Clinic Proceedings, 84(2), 108–113.",
    doi: "10.4065/84.2.108",
    achado: "Em 1.402 homens acompanhados por 10 anos, a disfunção erétil esteve associada a mais doença coronariana depois, sobretudo nos mais jovens. Dificuldade de ereção pode ser um aviso precoce dos vasos — vale contar ao médico.",
  },
  {
    id: "watson2015",
    curta: "Watson et al., Sleep 2015 (AASM/SRS)",
    completa: "Watson, N. F., et al. (2015). Recommended amount of sleep for a healthy adult: a joint consensus statement of the American Academy of Sleep Medicine and Sleep Research Society. Sleep, 38(6), 843–844.",
    doi: "10.5665/sleep.4716",
    achado: "Adultos precisam de 7 horas ou mais de sono, com regularidade. Dormir menos de forma habitual está associado a ganho de peso, pressão alta, diabetes, doença cardíaca, depressão e mais acidentes.",
  },
  {
    id: "bull2020",
    curta: "Bull et al., BJSM 2020 (diretrizes da OMS)",
    completa: "Bull, F. C., et al. (2020). World Health Organization 2020 guidelines on physical activity and sedentary behaviour. British Journal of Sports Medicine, 54(24), 1451–1462.",
    doi: "10.1136/bjsports-2020-102955",
    achado: "Adultos: 150 a 300 minutos por semana de atividade moderada (ou 75 a 150 de vigorosa), mais fortalecimento muscular duas vezes por semana. Qualquer quantidade é melhor do que nada.",
  },

  {
    id: "omsCintura",
    curta: "OMS, circunferência da cintura, 2011",
    completa: "Organização Mundial da Saúde (2011). Waist circumference and waist–hip ratio: report of a WHO expert consultation. Genebra: OMS.",
    url: "https://www.who.int/publications/i/item/9789241501491",
    achado: "Para homens, cintura a partir de 94 cm indica risco aumentado de complicações metabólicas, e a partir de 102 cm, risco muito aumentado. A gordura da barriga diz mais do que o peso sozinho.",
  },

  /* ---------- mente, conexões e saúde integral ---------- */
  {
    id: "martin2013",
    curta: "Martin et al., JAMA Psychiatry 2013",
    completa: "Martin, L. A., Neighbors, H. W., & Griffith, D. M. (2013). The experience of symptoms of depression in men vs women. JAMA Psychiatry, 70(10), 1100–1106.",
    doi: "10.1001/jamapsychiatry.2013.1985",
    achado: "Homens relataram mais ataques de raiva, abuso de álcool e comportamento de risco. Quando esses sinais entram na conta, a diferença de depressão entre homens e mulheres desaparece — no homem, a depressão muitas vezes vem disfarçada e passa sem diagnóstico.",
  },
  {
    id: "holtlunstad2010",
    curta: "Holt-Lunstad et al., PLoS Med 2010",
    completa: "Holt-Lunstad, J., Smith, T. B., & Layton, J. B. (2010). Social relationships and mortality risk: a meta-analytic review. PLoS Medicine, 7(7), e1000316.",
    doi: "10.1371/journal.pmed.1000316",
    achado: "148 estudos, 308 mil pessoas: quem tem relações sociais mais fortes teve cerca de 50% mais chance de sobrevivência ao longo do tempo — efeito comparável ao de parar de fumar.",
  },
  {
    id: "oms2025",
    curta: "OMS, Comissão de Conexão Social, 2025",
    completa: "Organização Mundial da Saúde (2025). From loneliness to social connection: charting a path to healthier societies. Relatório da Comissão de Conexão Social.",
    url: "https://www.who.int/news/item/30-06-2025-social-connection-linked-to-improved-heath-and-reduced-risk-of-early-death",
    achado: "A solidão atinge cerca de 1 em cada 6 pessoas no mundo e está ligada a cerca de 871 mil mortes por ano — perto de 100 por hora.",
  },
  {
    id: "engel1977",
    curta: "Engel, Science 1977",
    completa: "Engel, G. L. (1977). The need for a new medical model: a challenge for biomedicine. Science, 196(4286), 129–136.",
    doi: "10.1126/science.847460",
    achado: "Propõe o modelo biopsicossocial: corpo, mente e contexto social adoecem e se recuperam juntos. É a base do \"por inteiro\".",
  },

  /* ---------- por que a gente adia, e como mudar ---------- */
  {
    id: "addis2003",
    curta: "Addis & Mahalik, Am Psychol 2003",
    completa: "Addis, M. E., & Mahalik, J. R. (2003). Men, masculinity, and the contexts of help seeking. American Psychologist, 58(1), 5–14.",
    doi: "10.1037/0003-066X.58.1.5",
    achado: "Normas de masculinidade — ser autossuficiente, controlar as emoções, não depender de ninguém — dificultam pedir ajuda. O contexto e o jeito do convite fazem diferença.",
  },
  {
    id: "wong2017",
    curta: "Wong et al., J Couns Psychol 2017",
    completa: "Wong, Y. J., Ho, M.-H. R., Wang, S.-Y., & Miller, I. S. K. (2017). Meta-analyses of the relationship between conformity to masculine norms and mental health-related outcomes. Journal of Counseling Psychology, 64(1), 80–93.",
    doi: "10.1037/cou0000176",
    achado: "Metanálise com cerca de 20 mil pessoas: seguir à risca normas masculinas, sobretudo a autossuficiência, se associou a pior saúde mental e a menos busca de ajuda psicológica.",
  },
  {
    id: "weinstein1980",
    curta: "Weinstein, J Pers Soc Psychol 1980",
    completa: "Weinstein, N. D. (1980). Unrealistic optimism about future life events. Journal of Personality and Social Psychology, 39(5), 806–820.",
    doi: "10.1037/0022-3514.39.5.806",
    achado: "A maioria das pessoas acha que coisas ruins têm menos chance de acontecer com ela do que com os outros. É o \"comigo não acontece\" — um viés, não um fato.",
  },
  {
    id: "sweeny2010",
    curta: "Sweeny et al., Rev Gen Psychol 2010",
    completa: "Sweeny, K., Melnyk, D., Miller, W., & Shepperd, J. A. (2010). Information avoidance: who, what, when, and why. Review of General Psychology, 14(4), 340–353.",
    doi: "10.1037/a0021288",
    achado: "Evitar uma informação é comum quando se teme o resultado e não se enxerga o que fazer com ele. Mostrar o caminho de ação reduz a evitação.",
  },
  {
    id: "tannenbaum2015",
    curta: "Tannenbaum et al., Psychol Bull 2015",
    completa: "Tannenbaum, M. B., et al. (2015). Appealing to fear: a meta-analysis of fear appeal effectiveness and theories. Psychological Bulletin, 141(6), 1178–1204.",
    doi: "10.1037/a0039729",
    achado: "Mensagens de medo funcionam melhor quando vêm junto com o que fazer e a sensação de que dá para fazer. Medo sozinho funciona menos — por isso esta campanha não usa susto.",
  },
  {
    id: "rains2013",
    curta: "Rains, Hum Commun Res 2013",
    completa: "Rains, S. A. (2013). The nature of psychological reactance revisited: a meta-analytic review. Human Communication Research, 39(1), 47–73.",
    doi: "10.1111/j.1468-2958.2012.01443.x",
    achado: "Quando uma mensagem soa como ameaça à liberdade (\"você PRECISA\"), surge a reatância: irritação e argumentos contra, e a pessoa resiste mais. Convite funciona melhor que cobrança.",
  },
  {
    id: "gollwitzer2006",
    curta: "Gollwitzer & Sheeran, 2006",
    completa: "Gollwitzer, P. M., & Sheeran, P. (2006). Implementation intentions and goal achievement: a meta-analysis of effects and processes. Advances in Experimental Social Psychology, 38, 69–119.",
    doi: "10.1016/S0065-2601(06)38002-1",
    achado: "94 estudos: planos do tipo \"se for tal situação, então eu faço tal coisa\" aumentam de forma média a grande a chance de cumprir o que se planejou.",
  },
  {
    id: "dai2014",
    curta: "Dai, Milkman & Riis, Manag Sci 2014",
    completa: "Dai, H., Milkman, K. L., & Riis, J. (2014). The fresh start effect: temporal landmarks motivate aspirational behavior. Management Science, 60(10), 2563–2582.",
    doi: "10.1287/mnsc.2014.1901",
    achado: "Datas-marco — começo da semana, do mês, aniversário — aumentam a busca por dieta, a ida à academia e os compromissos com metas. Ancorar a revisão no aniversário aproveita esse efeito \"recomeço\".",
  },
  {
    id: "rutchick2018",
    curta: "Rutchick et al., J Exp Psychol Appl 2018",
    completa: "Rutchick, A. M., Slepian, M. L., Reyes, M. O., Pleskus, L. N., & Hershfield, H. E. (2018). Future self-continuity is associated with improved health and increases exercise behavior. Journal of Experimental Psychology: Applied, 24(1), 72–80.",
    doi: "10.1037/xap0000153",
    achado: "Quem escreveu uma carta para o próprio \"eu\" de 20 anos depois se exercitou mais nos dias seguintes do que quem escreveu para daqui a 3 meses. O efeito é de curto prazo — por isso a carta vem colada a um plano.",
  },
  {
    id: "ruok",
    curta: "R U OK? e Movember, modelo ALEC",
    completa: "R U OK? (Austrália) e Movember. How to ask: Ask, Listen, Encourage action, Check in. Modelo de prática para conversas sobre saúde.",
    url: "https://www.ruok.org.au/how-to-ask",
    achado: "Quatro passos para uma conversa que abre espaço: perguntar, ouvir, incentivar um passo e voltar a perguntar depois. Na palestra: P.O.I.S. É um modelo de prática, ainda sem ensaio controlado próprio.",
  },

  {
    id: "roediger2006",
    curta: "Roediger & Karpicke, Psychol Sci 2006",
    completa: "Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning: taking memory tests improves long-term retention. Psychological Science, 17(3), 249–255.",
    doi: "10.1111/j.1467-9280.2006.01693.x",
    achado: "Quem tentou lembrar o conteúdo (fez um teste) guardou mais, uma semana depois, do que quem apenas releu. Por isso a trilha termina com um quiz.",
  },

  /* ---------- programas com homens ---------- */
  {
    id: "hunt2014",
    curta: "Hunt et al., Lancet 2014 (Football Fans in Training)",
    completa: "Hunt, K., et al. (2014). A gender-sensitised weight loss and healthy living programme for overweight and obese men delivered by Scottish Premier League football clubs (FFIT): a pragmatic randomised controlled trial. The Lancet, 383(9924), 1211–1221.",
    doi: "10.1016/S0140-6736(13)62420-4",
    achado: "747 torcedores de 35 a 65 anos, em encontros nos próprios clubes de futebol: em 12 meses, perderam quase 5 kg a mais que o grupo de comparação, e 39% (contra 11%) chegaram a 5% de perda de peso. Homem adere quando é coisa de time, com a linguagem dele.",
  },

  /* ---------- Brasil: dados oficiais e ciência brasileira ---------- */
  {
    id: "inca2026",
    curta: "INCA, Estimativa 2026–2028",
    completa: "Instituto Nacional de Câncer (2026). Estimativa 2026–2028: incidência de câncer no Brasil. Rio de Janeiro: INCA.",
    url: "https://www.gov.br/inca/pt-br",
    achado: "Cerca de 78 mil casos novos de câncer de próstata por ano (77.920), o mais frequente entre os homens depois do de pele não melanoma. O câncer de intestino (cólon e reto) vem em seguida nos homens: 26.270 casos por ano.",
    br: true,
  },
  {
    id: "msInca",
    curta: "Ministério da Saúde e INCA, rastreamento da próstata",
    completa: "Ministério da Saúde e Instituto Nacional de Câncer. Detecção precoce do câncer de próstata: posicionamento sobre o rastreamento populacional.",
    url: "https://www.gov.br/inca/pt-br",
    achado: "Não recomendam o rastreamento populacional — PSA em todos os homens sem sintomas. Orientam investigar quem tem sinais ou sintomas e decidir caso a caso, com informação sobre benefícios e riscos.",
    br: true,
  },
  {
    id: "sbu",
    curta: "Sociedade Brasileira de Urologia",
    completa: "Sociedade Brasileira de Urologia. Posicionamento sobre a detecção precoce do câncer de próstata.",
    url: "https://portaldaurologia.org.br",
    achado: "Recomenda que homens a partir dos 50 anos conversem com o urologista sobre o rastreamento — a partir dos 45 se forem negros ou tiverem pai ou irmão com a doença —, numa decisão individualizada.",
    br: true,
  },
  {
    id: "diretrizHA2025",
    curta: "Diretriz Brasileira de Hipertensão 2025 (SBC/SBH/SBN)",
    completa: "Sociedade Brasileira de Cardiologia, Sociedade Brasileira de Hipertensão e Sociedade Brasileira de Nefrologia (2025). Diretriz Brasileira de Hipertensão Arterial — 2025.",
    url: "https://www.portal.cardiol.br",
    achado: "Pressão normal passa a ser abaixo de 12 por 8 (120/80). De 120 a 139 e/ou 80 a 89 é pré-hipertensão, que já pede mudança de hábitos e acompanhamento. Hipertensão: 14 por 9 (140/90) ou mais, confirmada em mais de uma medida.",
    br: true,
  },
  {
    id: "sbd2024",
    curta: "Sociedade Brasileira de Diabetes, Diretriz",
    completa: "Sociedade Brasileira de Diabetes (2024). Diretriz da Sociedade Brasileira de Diabetes: rastreamento e diagnóstico do diabetes mellitus tipo 2.",
    url: "https://diretriz.diabetes.org.br",
    achado: "Glicemia de jejum abaixo de 100 mg/dL é normal; de 100 a 125, pré-diabetes; 126 ou mais, faixa de diabetes, a confirmar. Recomenda rastrear adultos a partir dos 35 anos, ou antes se houver fatores de risco.",
    br: true,
  },
  {
    id: "vigitel2024",
    curta: "Ministério da Saúde, Vigitel 2024",
    completa: "Ministério da Saúde (2025). Vigitel Brasil 2006–2024: vigilância de fatores de risco e proteção para doenças crônicas por inquérito telefônico.",
    url: "https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/vigitel/vigitel-brasil-2006-2024.pdf",
    achado: "Nas capitais, 29,7% dos adultos referiram diagnóstico médico de hipertensão em 2024 (eram 22,6% em 2006). Excesso de peso: 62,6%. Obesidade: 25,7%.",
    br: true,
  },
  {
    id: "malta2018",
    curta: "Malta et al., Rev Bras Epidemiol 2018",
    completa: "Malta, D. C., et al. (2018). Prevalência da hipertensão arterial segundo diferentes critérios diagnósticos, Pesquisa Nacional de Saúde. Revista Brasileira de Epidemiologia, 21(supl. 1), e180021.",
    doi: "10.1590/1980-549720180021.supl.1",
    achado: "Na Pesquisa Nacional de Saúde, a hipertensão foi mais frequente quando se somou a pressão medida ao que as pessoas relatavam: parte dos brasileiros tem pressão alta e não sabe. Pressão não avisa — se descobre medindo.",
    br: true,
  },
  {
    id: "pns2019",
    curta: "IBGE, Pesquisa Nacional de Saúde 2019",
    completa: "Instituto Brasileiro de Geografia e Estatística (2020). Pesquisa Nacional de Saúde 2019: informações sobre domicílios, acesso e utilização dos serviços de saúde. Rio de Janeiro: IBGE.",
    url: "https://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/28793-pns-2019-sete-em-cada-dez-pessoas-que-procuram-o-mesmo-servico-de-saude-vao-a-rede-publica.html",
    achado: "76,2% dos brasileiros consultaram um médico nos 12 meses anteriores: 82,3% das mulheres e 69,4% dos homens.",
    br: true,
  },
  {
    id: "ibge2024",
    curta: "IBGE, Tábuas de Mortalidade 2024",
    completa: "Instituto Brasileiro de Geografia e Estatística (2025). Tábuas Completas de Mortalidade para o Brasil — 2024. Rio de Janeiro: IBGE.",
    url: "https://agenciadenoticias.ibge.gov.br/pt/agencia-noticias/45275-expectativa-de-vida-chega-a-76-6-anos-em-2024.html",
    achado: "Expectativa de vida de 76,6 anos em 2024: 73,3 para os homens e 79,9 para as mulheres — 6,6 anos de diferença, puxada sobretudo por mortes masculinas por causas externas.",
    br: true,
  },
  {
    id: "brito2022",
    curta: "Brito et al., Epidemiol Serv Saúde 2022",
    completa: "Brito, V. C. A., Bello-Corassa, R., Stopa, S. R., et al. (2022). Prevalência de depressão autorreferida no Brasil: Pesquisa Nacional de Saúde 2019 e 2013. Epidemiologia e Serviços de Saúde, 31(spe1), e2021384.",
    doi: "10.1590/ss2237-9622202200006.especial",
    achado: "Em 2019, 10,2% dos adultos brasileiros referiram diagnóstico de depressão, contra 7,6% em 2013. A proporção é bem maior entre as mulheres — o que, à luz dos sinais \"disfarçados\" nos homens, também pode refletir subdiagnóstico masculino.",
    br: true,
  },
  {
    id: "palma2021",
    curta: "Palma, Oliveira & Ignotti, Cad Saúde Pública 2021",
    completa: "Palma, D. C. A., Oliveira, B. F. A., & Ignotti, E. (2021). Suicide rates between men and women in Brazil, 2000-2017. Cadernos de Saúde Pública, 37(12), e00281020.",
    doi: "10.1590/0102-311x00281020",
    achado: "De 2000 a 2017, a taxa de suicídio dos homens no Brasil ficou em torno de quatro vezes a das mulheres. Pedir ajuda cedo é manutenção, não fraqueza.",
    br: true,
  },
  {
    id: "tufik2010",
    curta: "Tufik et al., Sleep Med 2010 (EPISONO, São Paulo)",
    completa: "Tufik, S., Santos-Silva, R., Taddei, J. A., & Bittencourt, L. R. A. (2010). Obstructive sleep apnea syndrome in the São Paulo Epidemiologic Sleep Study. Sleep Medicine, 11(5), 441–446.",
    doi: "10.1016/j.sleep.2009.10.005",
    achado: "Mais de mil adultos de São Paulo avaliados com polissonografia: 32,8% tinham apneia obstrutiva do sono. Homens tiveram cerca de 4 vezes mais chance; obesidade e idade também pesam. Ronco com pausas é luz do painel.",
    br: true,
  },
  {
    id: "modesto2018",
    curta: "Modesto et al., Interface 2018",
    completa: "Modesto, A. A. D., Lima, R. L. B., D'Angelis, A. C., & Augusto, D. K. (2018). Um novembro não tão azul: debatendo rastreamento de câncer de próstata e saúde do homem. Interface — Comunicação, Saúde, Educação, 22(64), 251–262.",
    doi: "10.1590/1807-57622016.0288",
    achado: "Analisa o Novembro Azul brasileiro: campanhas centradas só no PSA podem levar a sobrediagnóstico e deixam de lado a saúde integral do homem. Propõe ampliar o foco do cuidado — exatamente o \"por inteiro\".",
    br: true,
  },
  {
    id: "gomes2008",
    curta: "Gomes et al., Ciênc Saúde Coletiva 2008",
    completa: "Gomes, R., Nascimento, E. F., Rebello, L. E. F. S., & Araújo, F. C. (2008). As arranhaduras da masculinidade: uma discussão sobre o toque retal como medida de prevenção do câncer prostático. Ciência & Saúde Coletiva, 13(6), 1975–1984.",
    doi: "10.1590/S1413-81232008000600033",
    achado: "Homens brasileiros entrevistados descrevem o toque retal como uma \"arranhadura\" na masculinidade — e esse sentimento afasta da prevenção. Piada com o exame reforça a barreira.",
    br: true,
  },
  {
    id: "gomes2007",
    curta: "Gomes, Nascimento & Araújo, Cad Saúde Pública 2007",
    completa: "Gomes, R., Nascimento, E. F., & Araújo, F. C. (2007). Por que os homens buscam menos os serviços de saúde do que as mulheres? As explicações de homens com baixa escolaridade e homens com ensino superior. Cadernos de Saúde Pública, 23(3), 565–574.",
    doi: "10.1590/S0102-311X2007000300015",
    achado: "Nas palavras dos próprios homens: o cuidado é visto como coisa de mulher, há medo de descobrir doença, vergonha de se expor e horários dos serviços que não combinam com o trabalho.",
    br: true,
  },
  {
    id: "schraiber2010",
    curta: "Schraiber et al., Cad Saúde Pública 2010",
    completa: "Schraiber, L. B., et al. (2010). Necessidades de saúde e masculinidades: atenção primária no cuidado aos homens. Cadernos de Saúde Pública, 26(5), 961–970.",
    doi: "10.1590/S0102-311X2010000500018",
    achado: "Em serviços de atenção primária, os homens chegam pouco e tarde, e suas necessidades nem sempre são reconhecidas. O afastamento vem tanto das normas de masculinidade quanto do jeito como os serviços se organizam.",
    br: true,
  },
  {
    id: "figueiredo2005",
    curta: "Figueiredo, Ciênc Saúde Coletiva 2005",
    completa: "Figueiredo, W. (2005). Assistência à saúde dos homens: um desafio para os serviços de atenção primária. Ciência & Saúde Coletiva, 10(1), 105–109.",
    doi: "10.1590/S1413-81232005000100017",
    achado: "Os homens procuram mais a farmácia e o pronto-socorro do que a atenção primária — chegam quando a doença já se instalou. O desafio é acolher antes.",
    br: true,
  },
  {
    id: "pnaish2009",
    curta: "Ministério da Saúde, PNAISH 2009",
    completa: "Ministério da Saúde (2009). Política Nacional de Atenção Integral à Saúde do Homem. Portaria GM/MS nº 1.944, de 27 de agosto de 2009.",
    url: "https://bvsms.saude.gov.br/bvs/saudelegis/gm/2009/prt1944_27_08_2009.html",
    achado: "Reconhece que os homens entram no sistema de saúde tarde, pela atenção especializada, e propõe ampliar o acesso pela atenção primária — a UBS é porta de entrada também para o homem.",
    br: true,
  },
  {
    id: "cvv",
    curta: "CVV, cvv.org.br",
    completa: "Centro de Valorização da Vida (2025). O CVV. Atendimento pelo 188, chat e e-mail.",
    url: "https://cvv.org.br/o-cvv/",
    achado: "Apoio emocional gratuito, 24 horas, pelo 188, chat e e-mail, sob sigilo — para qualquer pessoa que queira ou precise conversar.",
    br: true,
  },
];

export function referencia(id: string): Referencia {
  const r = REFERENCIAS.find((x) => x.id === id);
  if (!r) throw new Error(`Referência desconhecida: ${id}`);
  return r;
}

export function fontesCurtas(ids: string[]): string {
  return ids.map((id) => referencia(id).curta).join(" · ");
}
