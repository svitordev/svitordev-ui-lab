# Evidência T4 — Regressão + Playwright (attempt 1)

Data: 2026-11-16 · Builder: Strata Qwen3.8 Flash Next 256K · Goal 036

## 1. Diff desde a primeira revisão (arquivos desta tarefa)

Apenas `tests/smoke.spec.ts` (+38 linhas, ao final do arquivo — os 2 testes novos cobrem
exatamente as lacunas reais: nenhum teste anterior exercitava os dois contratos migrados).

### Teste 1 — `services: página da Library prova os dois contratos via consumer` (dual)
- h1 "Services" (role real da página).
- h2s na ordem exata dos dados do consumer: "O que podemos fazer por você" (grid-simple) →
  "Serviços que geram resultado para o seu negócio" (with-icons) → "Nossos serviços" (split).
- 6 h3 na ordem dos dois contratos (3 grid + 3 icons) via `getByRole(heading, level 3).nth()`.
- Ícones do contrato A provados via consumer: escopo `ancestor::section[1]` a partir do heading
  do with-icons (a Library Shell injeta 1 svg próprio fora dos previews — escopo necessário,
  documentado no teste; mesmo padrão xpath dos testes de contact).
- Split intacto: h2 "Nossos serviços" + h3 "Consultoria estratégica" (sem props).
- Zero overflow horizontal (`scrollWidth - clientWidth <= 1`) — roda nos 2 viewports.

### Teste 2 — `services: home mantém a copy real do contrato migrado` (dual)
- h2 "Serviços que geram resultado para o seu negócio" + description completa do consumer.
- 3 h3 (Desenvolvimento web, Automação de processos, Presença digital) — escopo do card via
  xpath ancestor::section.
- 3 ícones (svg) dentro da section — dados do consumer renderizados.
- Zero overflow horizontal — roda nos 2 viewports.

Contratos provados **via consumers reais** (página da Library + home), sem classes Tailwind nos
asserts (roles/heading/text reais). Sem asserts de computados.

## 2. Gates (execuções reais, nesta ordem)

| Gate | Comando | Exit | Resultado |
|---|---|---|---|
| ESLint | `npm run lint` | 0 | 0 erros / 0 warnings |
| Build | `npm run build` | 0 | PASS, 24 rotas geradas |
| git diff --check | `git diff --check` | 0 | limpo |
| Playwright (suíte completa) | `npm run test:e2e` | 0 | **107 passed + 3 skipped** (55 testes × 2 projetos = 110 execuções) |
| Playwright (só os novos) | `npx playwright test -g "services:"` | 0 | 4 passed (2 testes × 2 viewports) |

Baseline T1 era 53 testes / 106 execuções (103+3). Agora 55 testes / 110 execuções (107+3).
+2 testes novos, ambos dual-viewport, ambos passando nos 2 projetos.

## 3. Incidente durante T4 (corrigido, documentado)

Na 1ª execução dos testes novos, a página da Library deu **404** nos 2 projetos (snapshot
arquivado em test-results). Causa: dev server órfão da sessão anterior (PID 8816,
`reuseExistingServer:true`) com cache de build corrompido. O servidor órfão foi encerrado
(taskkill /PID 8816 /T /F) e a suíte re-executada com servidor limpo — verde.
Não foi defeito de código (páginas não alteradas também 404avam; teste da home provou os dados
corretos quando o servidor era novo).

## 4. Contagens (estado real pós-T4)

- Testes Playwright: **55** (53 baseline + 2 novos) · execuções: 110 · 107 passed + 3 skipped.
- Rotas: 24 (inalterado).
- Catálogo: 12 UI / 8 site / 32 sections / 2 wrappers / **54** (inalterado — T5 atualiza docs).
- Components: 54 production / 0 preview (inalterado — migração é de contrato, não de contagem).

## 5. Conformidade com os critérios

- Cobertura apenas de lacunas reais: ✔ (contratos migrados sem teste anterior; nada duplicado).
- Conteúdo específico dos consumers: ✔ (copy exata dos data objects nos asserts).
- Sem classes Tailwind em asserts: ✔ (roles reais + xpath estrutural + contagem de svg).
- Sem computados: ✔.
- Dual viewport: ✔ (ambos os testes nos 2 projetos).
- Zero redesign / zero dependência nova: ✔ (só o arquivo de teste mudou nesta tarefa).
