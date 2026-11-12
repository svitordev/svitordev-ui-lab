# T1 — Auditoria de tema e decisão arquitetural (Evolução 030 / QLT-009)

Data: 2026-11-10. Builder: Strata DAILY_USE — Qwen3.8 Flash Next 256K. T1 não altera produção — este documento é a evidência da investigação.

## Estado real verificado no código (fonte de verdade)

| Item | Light | Dark | Alcançável hoje? | Usado? | Problema |
|---|---|---|---|---|---|
| Paleta em `:root` (`app/globals.css` L60–147) | ✓ completa (brand, semânticos, charts, sidebar) | — | **NÃO** — `html` tem `className="dark"` fixo e `.dark` sobrescreve todas as variáveis | NÃO (dead code) | Núcleo do QLT-009: paleta oficial "light" nunca renderiza |
| Paleta em `.dark` (`app/globals.css` L150–214) | — | ✓ completa | SIM (sempre aplicada) | SIM | Mecanismo de troca implica suporte a 2 temas que não existe |
| `@custom-variant dark` (`globals.css` L6) | — | ativo | SIM (sempre ligado) | por 8 utilitários | Variante para um tema que nunca pode ser desligado |
| Utilitários `dark:` em `button.tsx` (4), `input.tsx` (2), `textarea.tsx` (2) | — | efetivos hoje (`.dark` sempre on) | SIM | SIM | Defaults light-first do shadcn; sem `.dark` viram dead code — precisam ser resolvidos inline na T2 |
| `className="dark"` em `app/layout.tsx` | — | fixo | — | — | Mecanismo hardcoded sem provider/toggle |
| `suppressHydrationWarning` em `app/layout.tsx` | — | presente | — | — | Resquício do padrão next-themes; nenhum script altera o `html` no cliente |
| `color-scheme` (CSS) | ausente | ausente | — | — | Controles nativos (scrollbars, inputs nativos) renderizam claros sobre página escura |
| `prefers-color-scheme` | ausente | — | — | — | Nenhuma preferência de sistema respeitada |
| ThemeProvider / next-themes / localStorage | — | — | — | — | Nenhum mecanismo de tema existe (grep confirmado em `app/**` e `components/**`) |
| DEC-004 (`memory-bank/DECISIONS.md`) | — | — | — | — | Diz "manter infra, toggle opcional" — a infra existe mas é inalcançável → ambiguidade exatamente apontada pelo QLT-009 |

Componentes com `dark:*`: somente os 3 bases do shadcn (`button`, `input`, `textarea`). Nenhum section/site component usa `dark:` — a UI inteira foi projetada e validada visualmente em dark (todas as 29 evoluções; visual regression automatizada ainda não existe).

## Matriz de decisão

| Critério | A — Dark-only oficial | B — Light/Dark suportados |
|---|---|---|
| Estado atual do código | **Espelha a realidade**: dark é o único tema que renderiza | Exige mecanismo inexistente (provider/script/persistência) |
| Tokens disponíveis | Paleta única no `:root` (valores dark atuais) | Ambos completos e coerentes ✓ |
| Risco | **Baixo** — realinhamento com visual preservado | Médio–alto — hydration/flash, persistência, QA visual de 50+ componentes em light nunca feito |
| Complexidade | **Baixa** — 5 arquivos + 1 teste | Alta — mecanismo + toggle acessível (componente novo sem consumer → viola anti-inflação da Skill/AGENTS) + testes nos 2 temas |
| Valor ao UI Lab | Clareza de política única; remove estado morto | Alto para projetos derivados (DEC-004 previa light/dark opcional) — mas só quando houver consumer real |
| Dívida removida | Remove QLT-009 por completo (código + docs alinhados) | Remove QLT-009 mas adiciona escopo novo (toggle, QA light) |
| Impacto em SSR/hydration | **Zero** — CSS estático, sem estado cliente | Exige script pré-hidratação + controle de flash + `suppressHydrationWarning` real |
| Testabilidade | Simples: paleta única aplicada, sem classe `.dark`, rotas representativas sem pageerror/overflow | Exige troca, ARIA do controle, persistência pós-reload, ambos os temas, desktop+mobile |
| Cabe na 030 sem refactor amplo | **SIM** | **NÃO** — falha o próprio gate da opção B |

## Gates da opção A (todos satisfeitos pela auditoria)

1. Produto efetivamente dark ✓ (único tema que renderiza desde a fundação).
2. UI projetada/testada nesse modo ✓ (29 evoluções validadas em dark; zero validações em light).
3. Light não possui consumer real ✓ (nenhum componente/página consome a paleta `:root`).
4. Manter infraestrutura light só gera estado morto/confuso ✓ (descrição literal do QLT-009).

## RECOMENDAÇÃO: OPÇÃO A — DARK-ONLY OFICIAL

Não por preferência: B falha seu próprio gate ("implementação cabe na 030 sem refactor amplo") e exigiria componente novo sem consumer. A satisfaz os 4 gates e alinha código à realidade sem mudar o render atual.

## Plano mínimo da T2 (arquivos exatos)

1. `app/globals.css` — paleta oficial única no `:root` com os valores dark atuais (todos os semantic tokens preservados); remover bloco `.dark`; remover `@custom-variant dark`; adicionar `color-scheme: dark` no `:root` (alinha controles nativos ao tema oficial).
2. `app/layout.tsx` — remover `className="dark"` e `suppressHydrationWarning` (resquício de mecanismo inexistente).
3. `components/ui/button.tsx`, `components/ui/input.tsx`, `components/ui/textarea.tsx` — resolver os 8 utilitários `dark:` inline com os valores hoje efetivos (render preservado, sem classes mortas).
4. `tests/smoke.spec.ts` — +1 teste dual-project: rotas representativas (`/`, `/blog`, `/library/landing`, `/library/alerts`, `/library/tabs`) — `html` sem classe `dark`, `--background` do `:root` igual ao valor oficial dark (paleta única aplicada, sem mecanismo), página renderiza (h1/main), zero overflow horizontal; sem regressão na suíte existente.

Comportamento final: uma única política visual oficial (dark); nenhum mecanismo light enganoso; sem toggle; sem dependência nova; visual preservado; responsividade preservada.

## Riscos

- Residual: utilitários `dark:` resolvidos inline mudam apenas a origem do valor, não o resultado — coberto pela suíte existente (73 testes) + teste novo.
- `color-scheme: dark` altera render de controles nativos (scrollbars/inputs nativos) — é o alinhamento correto da política; nenhum teste atual depende de scrollbar clara.

## Critérios para QLT-009 VERIFIED (T3)

- Código: paleta única oficial, sem bloco `.dark`, sem `className="dark"`, sem `@custom-variant dark`, sem utilitários `dark:` mortos.
- Testes: suíte verde (incl. teste novo da política) + build + lint + diff-check.
- Docs: DESIGN-SYSTEM com a política final real; ADR de theme policy em DECISIONS (supera a leitura da DEC-004 para o Lab); CURRENT-STATE/CHANGELOG/ROADMAP alinhados.
