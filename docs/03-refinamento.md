# 03 · Refinamento de design e conteúdo (18/10/2026)

## Conteúdo — o que mudou e por quê

| Onde | Mudança | Fonte |
|---|---|---|
| Revisão por quilometragem | Glicemia a partir dos 35 anos (a cada 3 se normal) | SBD 2025 — Rodacki et al., doi:10.1186/s13098-024-01572-w |
| Revisão por quilometragem, intestino, quiz, cartão | Teste de sangue oculto nas fezes (FIT) no SUS desde ago/2026, 50–75 anos, a cada 2 anos | INCA, notícia de ago/2026 |
| "Faço ou não faço o PSA?" | Nota Técnica MS/INCA nº 9/2023 (decisão compartilhada) e posicionamento SBU/SBOC/SBRT 2023 | INCA; Portal da Urologia |
| PSA (palco e trilha) | Ferramenta brasileira de apoio à decisão do INCA, com link | Santos et al., Rev Saúde Pública 2022, doi:10.11606/s1518-8787.2022056003467 |
| Caixa de fatos | Metanálise de 5 ensaios (721 mil homens) para equilíbrio | Ilic et al., BMJ 2018, doi:10.1136/bmj.k3519 |
| Slide novo 2.3b | Álcool abusivo: 27% dos homens (mulheres 15%); 1 em 5 adultos dorme < 6 h | Vigitel 2023 (álcool); Vigitel 2025 (sono, dados de 2024) |
| Bloco 6 | O que funciona com homens: modelos de outros homens, informação clara, caminho indicado, cuidado como força | Sagar-Ouriaghli et al., Am J Mens Health 2019, doi:10.1177/1557988319857009 |
| Plano se-então | Nuance: planos prontos em folheto não aumentaram a adesão; o plano precisa ser da pessoa | Lo et al., Health Psychol 2014, doi:10.1037/a0033507 |
| Meus números | Passo a passo para medir a pressão | Muntner et al., Hypertension 2019 (AHA), doi:10.1161/HYP.0000000000000087; Diretriz 2025 |
| Sono | Questionário STOP-Bang interativo (triagem de apneia) | Chung et al., Chest 2016; Nagappa et al., PLoS One 2015 |
| Depressão disfarçada | Saiu "trabalho sem parar" (não sustentado pelo estudo citado) | Martin et al., JAMA Psychiatry 2013 |
| Diretriz de hipertensão | DOI oficial | Brandão et al., Arq Bras Cardiol 2025, doi:10.36660/abc.20250624 |

Referências: 60 no total, 23 brasileiras.

## Design

- Fundo do palco com dois brilhos suaves (azul e violeta) e grade quase invisível; trilha com brilho no topo.
- Cartão único (`.cartao`, `.cartao-suave`, `.cartao-aceso`) no palco e na trilha, com sombra leve.
- Números grandes em degradê (`.texto-grad`); rótulos em pílula (`.pilula`).
- Barra de blocos translúcida; capa com halo na roda; ilustrações com moldura e sombra.
- Trilha: bloco de abertura com "Começar/Continuar", barra de passos em cada módulo.
- Contraste máximo desliga brilhos e degradês. Conferido em 1920×1080 e 1366×768 e no celular (390 px).
