# Por inteiro · Novembro Azul

Palestra e trilha sobre **saúde do homem, do check-up à conversa**, com Marcelo Schiavo (psicólogo,
CRP 06/109462). Genérica: a mesma versão serve a qualquer empresa.

Produção: `trilhanovembroazul.vercel.app` · repo `github.com/marcelofschiavo/novembroazul`

## O que tem

- **`/palco`** — a apresentação (44 slides, ~45 min + perguntas). Presencial ou on-line, teclado ou
  passador, funciona offline depois de aberta uma vez. `?s=4.3` abre direto num slide.
- **`/palco/aguardando`** — tela de espera enquanto a turma chega.
- **`/campanha`** — kit para o RH: 9 e-mails prontos para colar (formatado ou texto puro), mensagens
  curtas, cards para intranet, cartaz A4 (PDF e PNG) e cartões de bolso (A4, frente e verso). Genérico,
  com campos [DATA], [HORÁRIO] e [LOCAL OU LINK] para o RH preencher. Não aparece em buscadores.
- **`/trilha`** — 7 passos essenciais (Roda da Saúde, Meus números, Decidir junto: o PSA, Luzes do
  painel, Por que eu adio, Meu plano "Eu vou", Quiz) + extras (Para quem cuida dele, Cabeça, Sono e
  turno, Reveja a palestra, Referências). Certificado, cartão de bolso em PDF e lembrete `.ics`,
  tudo gerado no navegador.

## Fio da palestra

Metáfora única — **o manual do proprietário**: o painel (seus números) → luzes de alerta → revisão
por quilometragem → o motorista (a cabeça) → alinhamento (a Roda) → de volta à oficina (o plano).

História (fictícia): **Davi**, 36, tem a revisão do carro em dia e não vai ao médico há cinco anos;
o pai, **Roberto**, 61, levanta à noite e diz que "é da idade"; **Lia** cobra, depois convida. No fim,
os dois vão — e cada um acha algo para cuidar, nunca o que temia.

## Onde mora cada coisa

```
conteudo/blocos.ts       roteiro do palco + notas do apresentador (tecla N) — fonte da verdade
conteudo/saude.ts        mitos, áreas da Roda, faixas dos números, luzes, pensamentos automáticos
conteudo/historia.ts     personagens
conteudo/referencias.ts  todas as fontes (DOI ou link oficial); br: true = brasileira
conteudo/quiz.ts         quiz da trilha
conteudo/trilha.ts       módulos da trilha
components/palco/slides  um componente por tipo de slide
docs/                    plano, campanha de e-mails, revisão didática
proposta/                propostas comerciais (fora do git)
```

## Rodar

```bash
npm install
npm run dev        # localhost:3000
npm run build      # precisa passar antes de qualquer push
npx tsc --noEmit && npx eslint .
```

**Teclas do palco:** `→ Espaço Enter` avança · `←` volta · `1`–`9` pula para o bloco · `B` tela preta ·
`F` tela cheia · `L` claro/escuro · `C` contraste máximo · `A` sem animação · `N` notas · `?` ajustes.
Abra `/palco` uma vez com internet antes do evento (o service worker guarda tudo).

## Pendências

- Posicionamento SBU/SBOC/SBRT (2023): o conteúdo vem do Portal da Urologia e de imprensa; o texto
  integral é restrito a associados. A Nota Técnica MS/INCA nº 9/2023, a Diretriz de Hipertensão 2025 e a
  diretriz da SBD (2025) já estão conferidas, com DOI.
- Ilustrações da história: geradas por IA (Cloudflare Workers AI, FLUX.2 klein 9B, com os retratos de Davi, Roberto e Lia como referência). Os retratos-base e o script ficaram fora do repo; para refazer, usar a chave em ioparlo-web/.env.local.
- Impressos do kit: `node scripts/gerar-kit.mjs` regera `public/kit/` (precisa do Chrome e de internet
  para a fonte). Conteúdo dos e-mails: `conteudo/campanha.ts`.
