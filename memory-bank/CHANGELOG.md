# CHANGELOG — Svitordev UI Lab

Registro de mudanças técnicas importantes ao longo da evolução. Formato inspirado em Keep a Changelog.

---

## [2026-10-14] — Playwright mínimo pré-rotina (VERIFIED)

- `@playwright/test` **1.64.1** instalado (devDependency — única dependência nova).
- Navegador: **Chromium somente**.
- Criado `playwright.config.ts`: `testDir: ./tests`, `baseURL: http://localhost:3000`, `webServer` com `npm run dev` (`reuseExistingServer: !CI`, timeout 120000).
- Criado `tests/smoke.spec.ts`: **8 smoke tests** (`/`, `/blog` listagem, post de slug válido, slug inexistente/404, `/library` redirect, `/library/headers`, `/library/footers`, navegação home → blog).
- **Dois projects:** desktop (1280×720) e mobile (375×667).
- Script `npm run test:e2e` adicionado; `.gitignore` com `/test-results/` e `/playwright-report/`.
- **16/16** (8 testes × 2 projects) em **duas execuções consecutivas**, sem retries.
- Lint **0 errors / 0 warnings**; build **PASS**.
- **Infraestrutura Playwright pré-rotina VERIFIED** (DEC-006 executada).
- Não incluído (posterior): visual regression, CI, Firefox, WebKit.

---

## [0.1.0] — 2026-09-30

### Fundação

- Criada a fundação documental da FASE 2.
- Documentação criada:
  - `AGENTS.md` — ponto de entrada para Agents.
  - `.github/copilot-instructions.md` — instruções para GitHub Copilot.
  - `README.md` — reescrito para GitHub Template.
  - `PROJETO.md` — visão do produto.
  - `docs/ARQUITETURA.md` — arquitetura real atual.
  - `docs/DESIGN-SYSTEM.md` — sistema de design existente.
  - `docs/COMPONENT-CATALOG.md` — inventário de componentes (33).
  - `docs/DEFINITION-OF-DONE.md` — critérios de evolução concluída.
  - `memory-bank/CURRENT-STATE.md`, `DECISIONS.md`, `CHANGELOG.md`.
- Decisões aprovadas: DEC-001 a DEC-010.

### Conhecido (não corrigido nesta fase)

- `app/(site)/blog/[slug]/page.tsx` vazio quebra o `next build`. **RESOLVIDO** via QLT-001 (ver abaixo).

### Correções

- **QLT-001** (P0): Implementação da rota dinâmica `/blog/[slug]`
  - Criado `lib/blog.ts` com fonte de dados compartilhada
  - Implementado busca por slug com `getPostBySlug()`
  - Implementado `notFound()` para slugs inexistentes
  - Corrigido href para formato público `/blog/${slug}`
  - Listagem agora consome fonte compartilhada
  - Rota dinâmica consome mesma fonte compartilhada
  - **Testes:** lint PASS, build PASS, runtime 200/404 verificados

- **QLT-012** (P3): Removidos 5 imports não utilizados
  - `app/(site)/layout.tsx`: `FooterColumns`
  - `app/(site)/page.tsx`: `AboutTimeline`, `CtaBanner`, `HeroCenterCta`, `ServicesSplitWithHighlight`
  - 2 arquivos modificados, 5 linhas removidas, JSX preservado
  - **Testes:** ESLint 0 errors / 0 warnings, build PASS
  - **QLT-012 VERIFIED**

### Novo finding

- **QLT-013** (P2): Datas date-only podem exibir o dia anterior por conversão de timezone
  - Evidência: `2025-11-01` renderizou como `31/10/2025` durante verificação runtime
  - Causa: `new Date(post.date).toLocaleDateString("pt-BR")` interpreta date-only como UTC
  - **Não corrigido** nesta fase — registrado para tratamento futuro
