# CHANGELOG — Svitordev UI Lab

Registro de mudanças técnicas importantes ao longo da evolução. Formato inspirado em Keep a Changelog.

---

## [2026-10-20] — Evolução 007: Mobile nav acessível (VERIFIED — QLT-006)

- Criado `components/site/headers/mobile-nav.tsx` — `MobileNav`, Client Component (`useState`/`useId`/`useRef`/`useEffect` com cleanup), contrato `MobileNavLink`/`MobileNavProps` (somente `links` obrigatório) — primeiro componente interativo compartilhado do laboratório.
- Toggle: `Button` real (ghost, icon-lg) com lucide `Menu`/`X`, `aria-label` dinâmico ("Abrir menu"/"Fechar menu"), `aria-expanded`, `aria-controls` via `useId` (ids únicos por instância, sem duplicar no DOM).
- Painel: landmark `<nav aria-label="Navegação principal">` condicional com `ul[role="list"]` (decisão do Plan — painel preserva semântica de navegação); fecha pelo botão, `Escape` (devolve foco ao botão) e clique fora; sem focus trap, sem Sheet, sem portal; visível somente abaixo de `md`.
- Modificados `header-basic.tsx` (MobileNav no grupo direito, depois do CTA — hamburger é o elemento mais à direita, garantindo o painel dentro da viewport em 375px; CTA permanece fora do menu) e `header-with-topbar.tsx` (MobileNav na linha principal; topbar intacta). `header-centered` reavaliado e intencionalmente mantido (flex-wrap funciona; sem hamburger).
- Adicionados 2 testes Playwright focados ao `tests/smoke.spec.ts` (mobile-only, pulam o project desktop): abrir por teclado → `aria-expanded`/`aria-controls` → painel landmark com links → `Escape` fecha e devolve foco; abrir por clique → clique fora fecha. Suíte: 10 testes / 20 execuções.
- Validação live: 375×667 (painel dentro da viewport — left 87→right 311 no Basic, left 86→right 310 no Topbar; ids únicos; independência de estado entre instâncias; link fecha menu e navega; active state preservado; zero overflow) e 1280×720 (botão mobile invisível, painel inexistente, nav desktop preservada, zero overflow).
- Lint **0/0**; build **PASS** (16 rotas); e2e **18 passed + 2 skipped** (20 execuções; skips intencionais dos testes mobile-only no project desktop).
- **QLT-006 → VERIFIED** no `QUALITY-REVIEW.md` (seção + tabela de prioridade P2 + total).
- Documentação atualizada: `QUALITY-REVIEW.md`, `docs/ROADMAP-1000-EVOLUTIONS.md` (007 VERIFIED), `docs/COMPONENT-CATALOG.md` (MobileNav + contagem 39), `memory-bank/CURRENT-STATE.md` (próxima execução: 008).

---

## [2026-10-19] — Evolução 006: `aria-label` nas navegações (VERIFIED — QLT-007)

- `aria-label="Navegação principal"` adicionado nos `<nav>` dos 3 headers (`header-basic`, `header-centered`, `header-with-topbar`); `aria-label="Navegação da biblioteca"` no `<nav>` do `library-shell` — exatamente os 4 `<nav>` do escopo, rótulos em pt-BR aprovados no Plan.
- `<nav>` já é landmark nativo — apenas o nome acessível faltava; nenhum outro ARIA adicionado; nada visual mudou; tab order inalterado.
- Rótulos confirmados na árvore de acessibilidade em `/` (HeaderCentered ativo), `/library/headers` (os 3 previews) e `/library/stats` (shell ativo).
- Lint **0/0**; build **PASS** (16 rotas); e2e **16/16** (suíte inalterada — smoke de navegação por role/texto continua verde).
- **QLT-007 → VERIFIED** no `QUALITY-REVIEW.md` (seção + tabela de prioridade P3 + total).
- Documentação atualizada: `QUALITY-REVIEW.md`, `docs/ROADMAP-1000-EVOLUTIONS.md` (006 VERIFIED), `memory-bank/CURRENT-STATE.md` (próxima execução: 007).

---

## [2026-10-19] — Evolução 005: Stats / métricas (VERIFIED)

- Criado `components/sections/stats/stats-grid.tsx` — `StatsGrid`, Server Component (sem `"use client"`), data-driven, seguindo o contrato exemplar da Evolução 001.
- Contrato: `StatItem = { value, label, description? }` (tipo local) + `StatsGridProps = { eyebrow?, title?, description?, items }` — `items` obrigatório; sem `className` público; sem props cosméticas.
- Primeiro consumo real do `Badge` (004): `eyebrow` renderiza via `<Badge variant="secondary">` centralizado no header — requisito explícito do roadmap.
- Lista: `ul[role="list"]` em `grid grid-cols-2 gap-8 md:grid-cols-4`; `li` por item com value (`text-3xl/4xl font-bold tabular-nums`) + label + description opcional; key `value-label`; tokens apenas; sem motion (reservado para a 012).
- Criada `app/library/stats/page.tsx` no padrão atual do showcase (metadata, array tipado, preview, label code) — demo fornecida pela página com 4 métricas conceituais; inclui value longo `R$ 2 mi` para validar o grid de 2 colunas em 375px.
- Modificado `components/sections/library-shell.tsx` — link "Stats" adicionado ao menu após "Logos" (+1 linha).
- Responsivo (375×667: grid 2×2, value longo sem truncamento, gap 32px, sem overflow; 1280×720: 4 colunas, sem overflow); acessível (h2, `ul[role=list]`, Badge nativo, tokens, sem ARIA gratuito).
- Lint **0/0**; build **PASS** (16 rotas); e2e **16/16** (suíte inalterada).
- Findings: nenhum.
- Documentação atualizada: `docs/COMPONENT-CATALOG.md` (entrada + contagem 38), `docs/ROADMAP-1000-EVOLUTIONS.md` (005 VERIFIED), `memory-bank/CURRENT-STATE.md` (próxima execução: 006). `docs/DESIGN-SYSTEM.md`: não alterado.

---

## [2026-10-18] — Evolução 004: Badge (VERIFIED)

- Criado `components/ui/badge.tsx` — `Badge`, UI primitive, Server Component (sem `"use client"`), `<span>` não interativo por conceito.
- API: `React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>`; `defaultVariants: { variant: "default" }`; `data-slot="badge"`; `className` combinado via `cn()` — padrões reais dos primitives locais (button/card/input/textarea), sem cópia da web.
- Variantes (decisão do Plan): `default`, `secondary`, `outline` — somente tokens, sem cor hardcoded; sem `destructive` por enquanto.
- Sem sizes, sem `asChild`/Radix Slot, sem hover próprio, sem motion (reservado para a 012); sem dependência nova; sem shadcn CLI.
- Sem página no `/library` — igual aos demais primitives; verificação visual quando consumido pela 005/009.
- Lint **0/0**; build **PASS** (15 rotas); e2e **16/16** (suíte inalterada).
- Findings: nenhum.
- Documentação atualizada: `docs/COMPONENT-CATALOG.md` (entrada + contagem 37), `docs/ROADMAP-1000-EVOLUTIONS.md` (004 VERIFIED), `memory-bank/CURRENT-STATE.md` (próxima execução: 005). `docs/DESIGN-SYSTEM.md`: não alterado.

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
