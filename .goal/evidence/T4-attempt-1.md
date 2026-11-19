# Evidência T4 — Regressão + Playwright (attempt 1)

Data: 2026-11-19 · Builder: Strata Qwen3.8 Flash Next 256K · Goal 037 (b69dab192d266c66)

## 1. Diff desde a primeira revisão (arquivos desta tarefa)

Apenas `tests/smoke.spec.ts` (+1 teste ao final do arquivo — a auditoria T1 aprovada
confirmou que nenhum teste anterior assertava o conteúdo do timeline; a cobertura da página
era só shell/h1/firstId).

### Teste — `about: página da Library prova o contrato do AboutTimeline via consumer (ordem, copy, zero overflow)` (dual)
- h1 "About / Sobre" (role real da página).
- Ordem das 3 entries da página (labels da shell): "About simples" → "About em duas
  colunas" → "Timeline / trajetória" (visíveis + posição relativa via xpath `following::` —
  simple antes de timeline).
- Conteúdo do timeline escopado na `ancestor::section[1]` a partir do heading do componente
  (mesmo padrão dos testes de contact/036): h2 "Um pouco da nossa trajetória" + descrição do
  consumer.
- Os 3 passos na ordem editorial via `getByRole(heading, level 3).nth(0..2)`: Início das
  atividades → Crescimento e consolidação → Atuação atual, cada um com a descrição exata dos
  dados do consumer + supporting text (nota final) — prova consumer ownership indiretamente
  pelo conteúdo específico.
- Zero overflow horizontal (`scrollWidth === clientWidth`) — roda nos 2 viewports.
- Sem asserts de classes Tailwind/pixels/marcadores internos — roles/textos reais.

## 2. Gates (execuções reais, nesta ordem)

| Gate | Comando | Exit | Resultado |
|---|---|---|---|
| ESLint | `npm run lint` | 0 | 0 erros / 0 warnings |
| Build | `npm run build` | 0 | Compiled successfully; 24/24 rotas |
| git diff --check | `git diff --check` | 0 | limpo |
| Playwright (teste novo, isolado) | `npx playwright test -g "about: página da Library"` | 0 | 2 passed (desktop + mobile) |
| Playwright (suíte completa) | `npm run test:e2e` | 0 | **109 passed + 3 skipped** (56 testes × 2 projetos = 112 execuções) |

Porta 3000 verificada antes da suíte (armadilha conhecida da 036): sem servidor órfão —
Playwright subiu o dev server próprio do config.

## 3. Contagens (estado real pós-T4)

- Testes Playwright: **56** (55 baseline + 1 novo) · execuções: 112 · **109 passed + 3
  skipped** — exatamente a previsão da auditoria T1 (+1 dual-project).
- Rotas: 24 (inalterado).
- Catálogo: 12 UI / 8 site / 32 sections / 2 wrappers / **total 54** (inalterado — T5 atualiza docs).
- QLT-005: 21 (baseline T1; edição documental na T5).

## 4. Conformidade com os critérios

- Cobertura apenas de lacunas reais: ✔ (contrato do timeline sem teste anterior; nada
  duplicado — teste da shell existente intacto).
- Contrato observável via consumer: ✔ (copy específica dos data objects, ordem editorial,
  escopo semântico).
- NÃO testar: ✔ (sem classes Tailwind, sem pixels, sem internals do marcador/map, sem types).
- Desktop + mobile + zero overflow: ✔ (dual-project).
- Consumer Library intacto (entries/labels/preview boxes) e home sem regressão: ✔ (suíte
  completa verde, 109+3, zero retries).
- Zero redesign / zero dependência nova: ✔ (só o arquivo de teste mudou nesta tarefa).
