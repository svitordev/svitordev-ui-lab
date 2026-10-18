# CHANGELOG — Svitordev UI Lab

Registro de mudanças técnicas importantes ao longo da evolução. Formato inspirado em Keep a Changelog.

---

## [2026-10-17] — Evolução 003: Hero Media Showcase (VERIFIED)

- Criado `components/sections/hero/hero-media-showcase.tsx` — `HeroMediaShowcase`, Server Component (sem `"use client"`), data-driven, seguindo o contrato exemplar da Evolução 001.
- Contrato: `HeroAction` (tipo local, sem abstração compartilhada prematura com `CtaAction`) + `HeroMediaShowcaseProps` — `title` obrigatório; `eyebrow`/`description`/`actions`/`mediaCaption` opcionais; sem `className` nem props cosméticas.
- Composição **vertical/showcase** (decisão do Plan, anti-inflação com `hero-primary`): conteúdo editorial centralizado no topo (eyebrow → h1 → descrição → actions) + media frame dominante full-width abaixo + legenda opcional — nenhuma coluna lateral de mídia.
- Media frame estruturalmente fixo: mock de browser/dashboard em HTML + Tailwind + tokens (chrome com dots, sidebar, stat cards, gráfico de barras, linhas) — sem imagem, sem asset, sem vídeo, sem ReactNode/render-prop, sem texto interno, sem `aria-*`/`role` gratuitos; legenda via `figcaption` (filho direto do `figure`).
- Actions via `Button asChild`: internos via `next/link`, protocolos/externos via `<a>` (padrão 001); sem motion (reservado para a Evolução 012).
- Modificado `app/library/hero/page.tsx` — constante local tipada `heroMediaShowcaseDemo` + bloco "Variante 04 · Showcase vertical com media frame" no padrão atual da página (página não reconstruída; QLT-010 segue na 019).
- Responsivo (375×667 e 1280×720 sem overflow, ordem DOM natural; media ≈ 1,9× a altura do conteúdo no desktop); acessível (h1, links reais, `figure`/`figcaption`, tokens, foco nativo do Button).
- Lint **0/0**; build **PASS** (15 rotas); e2e **16/16** (suíte inalterada — opção A, smoke novo na 025).
- Findings: nenhum.
- Documentação atualizada: `docs/COMPONENT-CATALOG.md` (entrada + contagem 36), `docs/ROADMAP-1000-EVOLUTIONS.md` (003 VERIFIED, renomeada para Hero Media Showcase), `memory-bank/CURRENT-STATE.md` (próxima execução: 004). `docs/DESIGN-SYSTEM.md`: não alterado (aplica o padrão já documentado).

---

## [2026-10-16] — Evolução 002: Logos / Social Proof Strip (VERIFIED)

- Criado `components/sections/logos/logos-strip.tsx` — `LogosStrip`, Server Component (sem `"use client"`), data-driven, seguindo o contrato exemplar da Evolução 001.
- Contrato mínimo: `LogoItem = { name }` via `items` obrigatório; `title` opcional; sem imagem, links, motion, `className` ou props cosméticas (suporte a imagem/links fica para evolução futura somente com demanda real).
- Wordmarks tipográficos em `<ul role="list">` com `<li>` por marca; flex-wrap centralizado; tokens apenas.
- Criada `app/library/logos/page.tsx` no padrão atual do showcase (metadata, array tipado, preview, label code) — demo fornecida pela página.
- Modificado `components/sections/library-shell.tsx` — link "Logos" adicionado ao menu (+1 linha).
- Responsivo (375 e 1280 sem overflow); acessível (h2, `ul[role=list]`, texto real, sem ARIA desnecessário).
- Lint **0/0**; build **PASS** (15 rotas); e2e **16/16** (suíte inalterada).
- Findings: nenhum (segundo caso de uso do contrato da 001).
- Documentação atualizada: `docs/COMPONENT-CATALOG.md` (entrada + contagem 35), `docs/ROADMAP-1000-EVOLUTIONS.md` (002 VERIFIED).

---

## [2026-10-15] — Evolução 001: CTA Split Actions data-driven + contrato exemplar (VERIFIED)

- Criado `components/sections/cta/cta-split-actions.tsx` — `CtaSplitActions`, Server Component (sem `"use client"`), data-driven, sem conteúdo hardcoded.
- Primeiro contrato de props do laboratório: `CtaAction` + `CtaSplitActionsProps` (`title` e `actions` obrigatórios; `eyebrow`/`description`/`supportingText` opcionais; `variant` restrito a `default | outline`; sem props cosméticas).
- Coluna editorial + painel de conversão; estruturalmente distinto do `cta-split.tsx` legado (caso de uso: decisão/conversão).
- Links internos via `next/link`; protocolos/externos via `<a>`; key das actions por `href + label`.
- Demo fornecida pela página `app/library/cta/page.tsx` (constante local tipada) — 4º bloco adicionado, página não reconstruída.
- Responsivo (1 coluna em 375, 2 colunas em 1280, sem overflow); acessível (h2, links reais, foco, tokens, sem ARIA desnecessário).
- Lint **0/0**; build **PASS**; e2e **16/16**.
- Findings: QLT-005 **PARCIAL** (início do padrão), QLT-003 **PARCIAL** (actions do exemplar).
- Documentação atualizada: `docs/DESIGN-SYSTEM.md` (padrão de contrato), `docs/COMPONENT-CATALOG.md` (entrada + contagem 34), `docs/ROADMAP-1000-EVOLUTIONS.md` (001 VERIFIED).

---

## [2026-10-15] — Roadmap oficial das 1000 evoluções (documental)

- Criado `docs/ROADMAP-1000-EVOLUTIONS.md` — fonte de verdade do roadmap evolutivo.
- Distribuição macro por áreas somando exatamente 1000 (direcional, rebalanceável entre lotes).
- Primeiro lote 001–025 detalhado; marcos 100/250/500/750/1000 descritos por maturidade.
- Estratégia de lotes de ~25 com reavaliação ao fim de cada lote e quality review maior a cada ~100 registrada no documento.
- `PROJETO.md` e `memory-bank/CURRENT-STATE.md` atualizados minimamente (referência ao roadmap oficial; lote ativo e próxima execução).
- **Nenhuma evolução implementada nesta mudança** — somente documentação.

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
