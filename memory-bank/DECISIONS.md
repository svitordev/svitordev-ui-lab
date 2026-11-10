# DECISIONS — Svitordev UI Lab

Decisões arquiteturais aprovadas. Uma decisão por entrada: o que foi decidido, por quê, quando e o impacto.

---

## DEC-001 — Showcase

- **Decisão:** Manter `/library` como showcase oficial do Svitordev UI Lab. Não criar `/showcase`.
- **Motivo:** `/library` já possui estrutura de rotas e navegação de showcase. Criar `/showcase` duplicaria finalidade e fragmentaria a navegação.
- **Data:** 2026-09-30
- **Impacto:** `/library` será evoluído futuramente (índice, filtros, preview de código). Nenhuma alteração funcional em `/library` na FASE 2.

## DEC-002 — Estrutura

- **Decisão:** Manter a estrutura oficial `app/`, `components/`, `lib/`, `public/`. Não criar `src/`, não mover arquivos, não reorganizar.
- **Motivo:** 33 componentes não justificam migração; `src/` exigiria `src/app/` + reconfiguração de `tsconfig`/`paths`, reduzindo simplicidade e compatibilidade com Next.js.
- **Data:** 2026-09-30
- **Impacto:** Novas categorias (`layouts/`, `patterns/`, `compositions/`) só serão adicionadas quando houver necessidade real, nunca vazias.

## DEC-003 — Design Tokens

- **Decisão:** O sistema atual de CSS variables + Tailwind 4 + shadcn é a base oficial. Não recriar, não adicionar biblioteca externa. Nesta fase apenas DOCUMENTAR.
- **Motivo:** O sistema já existe (~39 CSS variables). Recriar desperdiçaria trabalho e criaria duplicação.
- **Data:** 2026-09-30
- **Impacto:** Expansão dos tokens (escala de cinza, tipografia) é tarefa técnica posterior, não nesta fase. Não alterar `globals.css`.

## DEC-004 — Light/Dark

- **Decisão:** Manter infraestrutura existente (`@custom-variant dark` + classe `dark`). Theme switching e toggle visual NÃO implementados agora.
- **Motivo:** Suporte técnico já existe. Toggle é opcional e nem todo projeto derivado precisa. Priorizar facilidade de customização da identidade visual.
- **Data:** 2026-09-30
- **Impacto:** Projetos derivados poderão ser apenas light, apenas dark, ou light/dark, conforme necessidade.

## DEC-005 — Animações

- **Decisão:** `tw-animate-css` + Tailwind/CSS como solução base. Motion/GSAP só futuramente ON-DEMAND.
- **Motivo:** `tw-animate-css` já cobre transições/hover. Motion aumenta bundle e complexidade sem ganho real para animações simples.
- **Data:** 2026-09-30
- **Impacto:** Nenhuma biblioteca de animação instalada nesta fase.

## DEC-006 — Playwright

- **Decisão:** Playwright entra como P1 **antes** do início da rotina das 1000 evoluções. Visual regression completo permanece posterior.
- **Motivo:** Qualidade automática é chão para evolução em escala; sem catálogo estável, os testes seriam frágeis.
- **Data:** 2026-09-30
- **Impacto:** Não instalar Playwright nesta fase. Apenas documentado.

## DEC-007 — Memory Bank

- **Decisão:** Criar memory-bank mínimo e versionado: `memory-bank/CURRENT-STATE.md`, `DECISIONS.md`, `CHANGELOG.md`.
- **Motivo:** Com centenas de evoluções, memória persistente evita repetir erros e mantém consistência. Barato e de alto valor.
- **Data:** 2026-09-30
- **Impacto:** Evitar duplicar documentação existente (não usar `memory-bank/` local em vez de `/memories/` quando aplicável à skill de memória).

## DEC-008 — Instruções do Agent

- **Decisão:** Não criar `.clinerules/`. Criar `AGENTS.md` e `.github/copilot-instructions.md` (ambiente principal = GitHub Copilot).
- **Motivo:** O repositório usa GitHub Copilot, não Claude/Clinerules. `AGENTS.md` concentra o conteúdo; o arquivo do Copilot mantém instruções curtas e específicas sem duplicar integralmente o `AGENTS.md`.
- **Data:** 2026-09-30
- **Impacto:** Dois arquivos complementares, não duplicados.

## DEC-009 — Catálogo

- **Decisão:** Catálogo composto por `/library` (visual) + `docs/COMPONENT-CATALOG.md` (índice documental). Registry estruturado (JSON/YAML) será criado posteriormente.
- **Motivo:** Catálogo vivo (navegável) + documento de referência se complementam; um não substitui o outro.
- **Data:** 2026-09-30
- **Impacto:** Não criar JSON/YAML registry nesta fase.

## DEC-010 — Roadmap de 1000 evoluções

- **Decisão:** 1000 objetivos macro; detalhar apenas os próximos 25; reavaliar antes de cada novo lote; auditoria a cada 100.
- **Motivo:** Detalhar 25 por vez mantém foco, permite reavaliação e evita component inflation e duplicações.
- **Data:** 2026-09-30
- **Impacto:** Não criar o roadmap nem desafios nesta fase.

## DEC-011 — Theme policy (dark-only oficial)

- **Contexto:** Desde a fundação o `html` carregava `className="dark"` fixo e a paleta light do `:root` nunca renderizou — dead code inalcançável (QLT-009). A DEC-004 previa light/dark opcional para projetos derivados, mas no Lab a infraestrutura implicava um segundo tema sem consumer, sem toggle e sem QA visual. Auditoria completa em `.goal/evidence/T1-theme-audit.md` (2026-11-10).
- **Alternativas:** A) dark-only oficial — paleta única no `:root`, sem mecanismo de tema; B) light/dark suportados — provider + toggle acessível + persistência + QA visual dos 51 componentes em light.
- **Decisão:** **Opção A — dark-only oficial.** O Svitordev UI Lab tem um único tema oficial: o dark. A paleta oficial vive no `:root` de `app/globals.css` (com `color-scheme: dark`). Não existe bloco `.dark`, `@custom-variant dark`, provider, toggle, script pré-hidratação nem persistência de tema.
- **Motivos:** B falhou o próprio gate ("cabe na 030 sem refactor amplo") e exigiria componente novo sem consumer (anti-inflação); A satisfaz os 4 gates da auditoria — produto efetivamente dark, UI projetada/testada nesse modo (29 evoluções), light sem consumer real, infraestrutura light só gerava estado morto. Risco baixo, render preservado, SSR sem mudança.
- **Consequências:** Tokens únicos e sem ambiguidade; os 8 utilitários `dark:` dos 3 bases shadcn foram resolvidos inline com os valores hoje efetivos; `suppressHydrationWarning` removido do layout raiz; `color-scheme: dark` alinha controles nativos ao tema; +1 teste Playwright dual-project protege a política em rotas representativas.
- **Opção rejeitada:** B — não por incapacidade técnica, mas por falta de consumer real e custo de QA nunca realizado. Continua válida para projetos derivados quando houver demanda real.
- **Como revisar:** Se um projeto derivado precisar de light/dark, introduzir o mecanismo na origem do projeto (provider + toggle + testes nos dois temas). O Lab só reabre esta decisão se ele próprio ganhar um segundo tema com consumer real. Para o Lab, esta decisão supera a leitura da DEC-004 (que permanece válida para projetos derivados).
- **Data:** 2026-11-10
- **Impacto:** `app/globals.css`, `app/layout.tsx`, `components/ui/button.tsx`, `components/ui/input.tsx`, `components/ui/textarea.tsx`, `tests/smoke.spec.ts`; QLT-009 → VERIFIED; `docs/DESIGN-SYSTEM.md` alinhado.
