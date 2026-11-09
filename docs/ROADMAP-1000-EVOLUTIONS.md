# Svitordev UI Lab — Roadmap de 1000 Evoluções

Fonte de verdade do roadmap evolutivo do laboratório. Documento aprovado e versionado em 2026-10-15.

## Propósito

Direcionar a evolução contínua do Svitordev UI Lab (GitHub Template) ao longo de ~1000 evoluções macro, equilibrando criação visual, qualidade, APIs reutilizáveis, acessibilidade, motion, testes e documentação — sem inflação artificial.

Este documento detalha o **lote 01 (001–025), concluído**, e o **lote ativo 02 (026–050), planejado**. As demais evoluções existem como direção macro até serem detalhadas no lote correspondente.

## Princípios

1. **"1000 evoluções" ≠ 1000 componentes.** Evolução é qualquer entrega que aumente o valor do laboratório: componente, section, composição, página, variante estrutural válida, refatoração útil, acessibilidade, responsividade, animação, padrão de props, documentação, teste, infraestrutura, UX pattern, performance, design-system, showcase.
2. **Sem inflação artificial.** Variante só é válida com diferença real de estrutura, comportamento, composição, caso de uso, UX, responsividade, interação ou densidade/layout. Trocar texto, cor, ícone ou padding não conta.
3. **Reutilizar antes de duplicar** — consultar `docs/COMPONENT-CATALOG.md` e `/library` antes de criar.
4. **Cada evolução deixa a próxima mais fácil.** Padrões (props, motion, a11y) precedem as criações que os consomem.
5. **Criar desde o início.** O lote mistura criação + qualidade + API; nunca um lote inteiro só de infraestrutura ou documentação.
6. **Débitos orgânicos.** Findings do `QUALITY-REVIEW.md` são distribuídos dentro das evoluções que os tocam naturalmente — não formam fila própria. Findings VERIFIED (QLT-001, QLT-012) não entram no roadmap ativo.
7. **Definition of Done proporcional** (`docs/DEFINITION-OF-DONE.md`): lint + build sempre; `npm run test:e2e` quando a mudança afetar o que o smoke cobre; teste novo só para fluxo crítico novo.
8. **Sem dependências novas sem necessidade real.** Decisões de biblioteca (ex.: Radix para um primitive) são tomadas no Plan da evolução correspondente, nunca antes.

## Como funciona

- O roadmap é lido por lotes de **~25 evoluções**; apenas o lote ativo tem detalhamento individual.
- A **distribuição macro é direcional** e poderá ser rebalanceada entre lotes — é direção, não prisão.
- Findings pendentes viajam anexados às evoluções que os tratam (total ou parcialmente, sempre marcado como **PARCIAL** quando for o caso).

## Distribuição macro

A soma é exatamente 1000 como referência inicial. **A distribuição é direcional e poderá ser rebalanceada entre lotes.**

| Área | Evoluções aproximadas | Objetivo |
|---|---:|---|
| UI primitives | 80 | Primitives selecionados conforme demanda real das evoluções, reutilizando shadcn/Radix quando fizer sentido e evitando duplicação desnecessária. O número é orçamento de direção, não meta de importar componentes |
| Navigation | 55 | Headers, menus, mobile nav, breadcrumbs, sidebars — estruturas realmente distintas |
| Hero | 45 | Estruturas realmente diferentes de hero |
| Content / About | 60 | Text/image, stats, timelines, storytelling, logos, mission |
| Services / Features | 60 | Grids, tabs, comparação, processo, feature showcase |
| CTA | 35 | Inline, banner, split, sticky, contact-oriented |
| Pricing | 35 | Tables, tiers, toggles, comparação, cards |
| Testimonials / Social proof | 40 | Quotes, logos, reviews, case studies |
| Forms / Contact | 50 | Contato, lead, newsletter, validação UI, estados success/error |
| Footer | 30 | Padrões estruturais distintos de rodapé |
| Blog / Content marketing | 50 | Listagem, artigo, TOC, relacionados, autor, categorias |
| Data / Dashboard UI | 55 | Tabelas, métricas, filtros, layout de charts, padrões admin (UI patterns, não SaaS completo) |
| E-commerce UI | 45 | Product cards, grids, cart patterns, checkout UI — somente UI patterns reutilizáveis |
| Auth UI | 30 | Login, register, forgot password, verificação, perfil |
| Empty / Loading / Error states | 30 | Skeletons, empty states, erros, 404, loading patterns |
| Mobile / Responsive patterns | 35 | Padrões que exigem tratamento real de responsividade |
| Accessibility | 40 | Focus, labels, semântica de nav, teclado, reduced motion |
| Motion | 35 | CSS/Tailwind/tw-animate-css primeiro; Motion/GSAP apenas quando uma evolução específica justificar |
| Design System | 40 | Tokens (cinza, tipografia, spacing, elevation, radius), temas, contratos — incremental |
| Component APIs | 35 | Padrão de props/data-driven — definir e migrar gradualmente, nunca tudo de uma vez |
| Library / Showcase | 35 | Melhorias úteis da `/library` quando agregarem valor |
| Testing / Quality | 35 | Crescimento do Playwright, a11y automation, visual regression na fase futura |
| Full compositions / Pages | 45 | Landings e páginas completas montadas com peças do próprio laboratório |
| **Total** | **1000** | |

## Marcos

Marcos descrevem **maturidade esperada** do laboratório, não apenas quantidade. Promessas específicas podem ser ajustadas em reavaliações.

### 100

Esperado: padrões fundacionais em vigor (contrato de props exemplar seguido por toda criação nova); massa crítica de novas sections de uso geral; primitivos selecionados pela demanda real; mobile nav acessível; padrão de motion com reduced-motion documentado; `/library` com as categorias criadas; acessibilidade básica verde em tudo que foi criado.

### 250

Esperado: amplitude real — cada área principal com várias variações estruturais distintas; primeira landing composition completa de demonstração; tokens expandidos conforme demanda; decisão de tema (QLT-009) implementada se houver demanda real; visual regression entra como infraestrutura se houver demanda; catálogo consistente; smoke estendido cobrindo os fluxos críticos criados.

### 500

Esperado: áreas "sérias" maduras (dashboard/data UI, e-commerce UI, auth UI) com padrões reutilizáveis; compositions como starter pages do template; registry estruturado (JSON/YAML) apenas se houver dor real de descoberta; a11y automatizada (axe) rodando se houver demanda; API data-driven na maioria das sections novas.

### 750

Esperado: motion avançado aplicado onde justificado; padrões responsivos refinados; component testing onde houver lógica de componente; `/library` com preview de código/copy se houver demanda; conteúdo dos exemplos data-driven; duplicações eliminadas nas revisões periódicas.

### 1000

Esperado: laboratório consolidado — catálogo estável e navegável, visual regression cobrindo o core, receitas de composição documentadas, template pronto para montar um projeto de cliente em horas; evoluções recentes passando pelos gates sem retrabalho estrutural.

## Lotes e reavaliações

- **~25 evoluções por lote**; somente o lote ativo recebe detalhamento.
- **Ao final de cada lote, repriorizar**: o que amadureceu, o que perdeu sentido, o que projetos reais pediram. O backlog futuro pode mudar.
- **A cada ~100 evoluções**: quality review maior (arquitetura, catálogo, duplicação, acessibilidade, testes).
- **Findings novos** encontrados durante execuções podem alterar lotes.
- **Demanda de projetos reais** pode alterar prioridades e a distribuição macro.

---

# Lote 01 — Evoluções 001–025

**Status:** ✅ **CONCLUÍDO** — as 25 evoluções IMPLEMENTADAS / VERIFIED.

## Visão geral

O lote é dominado por **criação visual real**: CTA Split, logos, hero, stats, reviews, feature comparison, newsletter, pricing, FAQ, sticky CTA, sticky split e uma landing completa. As tarefas técnicas (contrato de props, primitivos sob demanda, acessibilidade, motion, smoke) existem para sustentar essas criações, não para dominar o lote.

| # | Evolução | Tipo | Objetivo | Dependências | Finding | Esforço |
|---:|---|---|---|---|---|---|
| 001 | CTA Split Actions data-driven + contrato de props exemplar ✅ VERIFIED | Nova section + Component API | Criar section visualmente útil estabelecendo o primeiro contrato data-driven do laboratório | — | QLT-005 (PARCIAL), QLT-003 (PARCIAL) | Médio |
| 002 | Logos / social proof strip ✅ VERIFIED | Nova section | Prova social com logos, data-driven no padrão 001 | 001 | — | Médio |
| 003 | Hero Media Showcase ✅ VERIFIED | Nova section | Hero estruturalmente diferente dos existentes | 001 | — | Médio |
| 004 | Badge ✅ VERIFIED | Primitive sob demanda | Base visual para rating/tags consumida por 005 | — | — | Pequeno |
| 005 | Stats / métricas ✅ VERIFIED | Nova section | Números de destaque com badge de contexto | 001, 004 | — | Médio |
| 006 | `aria-label` nas navs ✅ VERIFIED | Acessibilidade | Rótulo semântico das regiões de navegação | — | QLT-007 | Pequeno |
| 007 | Mobile nav acessível ✅ VERIFIED | Responsivo/interação | Menu operável por teclado em viewport estreita | 006 | QLT-006 | Grande |
| 008 | Avatar ✅ VERIFIED | Primitive sob demanda | Base para autor/reviewer consumida por 009 | — | — | Pequeno |
| 009 | Review cards com rating ✅ VERIFIED | Nova section | Social proof com avaliação, avatar e citação | 001, 004, 008 | — | Médio |
| 010 | Migrar `hero-center-cta` para o contrato ✅ VERIFIED | Component API | Validar na prática o padrão estabelecido pela 001 | 001 | QLT-005 (PARCIAL) | Pequeno–médio |
| 011 | Feature comparison ✅ VERIFIED | Nova section | Comparação em colunas (antes/depois, com/sem) | 001 | — | Médio–grande |
| 012 | Motion pass (entrance/hover) ✅ VERIFIED | Motion | Padrão de animação com reduced-motion | 001 | — | Médio |
| 013 | Separator + Skeleton ✅ VERIFIED | Primitivos sob demanda | Bases para estados e separação semântica | — | — | Pequeno |
| 014 | Newsletter com estados ✅ VERIFIED | Nova section | Lead form nascendo acessível, com feedback erro/sucesso | 001 | QLT-004 (contribui — permanece aberto) | Médio |
| 015 | Labels dos formulários existentes ✅ VERIFIED | Acessibilidade | `htmlFor`/`id` nos contact forms legados | — | QLT-008 — **VERIFIED** | Pequeno |
| 016 | Pricing com toggle ✅ VERIFIED | Evolução de section existente | Alternância mensal/anual interativa | 001 | — | Médio–grande |
| 017 | Accordion acessível ✅ VERIFIED (technical) | Primitive sob demanda | Conteúdo expansível acessível e reutilizável | — | — | Médio |
| 018 | FAQ ✅ VERIFIED | Nova section | FAQ construída sobre o accordion 017 | 017 | — | Médio |
| 019 | Padronizar páginas legadas do `/library` ✅ VERIFIED | Showcase | Migrar as 7 páginas legadas para o padrão atual | — | QLT-010 ✅ | Médio |
| 020 | Sticky CTA bar ✅ VERIFIED | Nova section | CTA fixo mobile-first | 001, 007 | — | Médio |
| 021 | Sticky-column split ✅ VERIFIED | Responsivo | Split com coluna fixa em desktop | 001 | — | Médio |
| 022 | Landing composition completa ✅ VERIFIED | Composição/página | Página completa montada com peças do laboratório | 001, 002, 003, 005, 009, 011, 016, 018, 020 + footer existente | — | Grande |
| 023 | Metadata SEO ✅ VERIFIED | SEO/qualidade | `metadata` por página em home, blog e library | — | QLT-002 ✅ | Pequeno–médio |
| 024 | Corrigir datas/timezone ✅ VERIFIED | Correção | Datas date-only sem deslocamento de fuso | — | QLT-013 ✅ | Pequeno |
| 025 | Smoke Playwright estendido ✅ VERIFIED | Testes | Cobrir menu mobile e a landing composition | 007, 022 | — | Médio |

## 001 — CTA Split Actions data-driven + contrato de props exemplar

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-10-15)** — `components/sections/cta/cta-split-actions.tsx` (Server Component; contrato `CtaAction`/`CtaSplitActionsProps` com `title` e `actions` obrigatórios; links internos via `next/link`, protocolos/externos via `<a>`; demo fornecida pela página `/library/cta`). Padrão documentado em `docs/DESIGN-SYSTEM.md` e no catálogo. Lint 0/0; build PASS; e2e 16/16.

**Objetivo:** criar uma NOVA section visualmente útil que estabelece, simultaneamente, o primeiro contrato data-driven do laboratório — referência para todas as novas sections. A rotina não começa com refatoração interna.
**Entregável:** nova section `components/sections/cta/` (CTA split) + página `/library/cta` atualizada. Contrato mínimo, simples e não excessivamente genérico: eyebrow opcional, title, description, actions (com destinos válidos), conteúdo complementar quando estruturalmente necessário.
**Documentação do padrão:** `docs/DESIGN-SYSTEM.md` ou `docs/COMPONENT-CATALOG.md` — feita **quando a evolução for implementada** (não antes).
**Critérios de aceite:** section renderiza na `/library/cta` via props; sem conteúdo hardcoded no componente; actions com destinos válidos; lint 0/0; build PASS; e2e verde.
**Dependências:** nenhuma. **Findings:** QLT-005 (PARCIAL — início do padrão), QLT-003 (PARCIAL — actions do exemplar). **Esforço:** Médio.

## 002 — Logos / social proof strip

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-10-16)** — `components/sections/logos/logos-strip.tsx` (Server Component; contrato `LogoItem`/`LogosStripProps` com `items` obrigatório e `title` opcional; somente wordmarks tipográficos — sem imagem, links, motion ou props cosméticas; `<ul role="list">`). Página `/library/logos` no padrão atual do showcase (demo fornecida pela página); link "Logos" adicionado ao menu do shell. Lint 0/0; build PASS; e2e 16/16.

**Objetivo:** primeira section nova seguindo o contrato 001 — faixa de logos/clientes com fallback tipográfico.
**Entregável:** `components/sections/logos/` + página `/library/logos` no padrão atual do showcase.
**Critérios de aceite:** data-driven; responsiva; lint/build/e2e verdes.
**Dependências:** 001. **Finding:** — **Esforço:** Médio.

## 003 — Hero Media Showcase

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-10-17)** — `components/sections/hero/hero-media-showcase.tsx` (Server Component; contrato `HeroAction`/`HeroMediaShowcaseProps` com `title` obrigatório e `eyebrow`/`description`/`actions`/`mediaCaption` opcionais). Composição **vertical/showcase** aprovada no Plan — conteúdo editorial centralizado no topo + media frame dominante full-width abaixo (mock de browser/dashboard em HTML/Tailwind, sem imagem/asset/dependência) + `figcaption` opcional — estruturalmente distinta dos 3 heroes existentes (nenhuma coluna lateral de mídia). Actions via `Button asChild` (`next/link`/`<a>`, padrão 001), tipo local sem abstração compartilhada prematura. Demo fornecida pela página `/library/hero` (Variante 04, padrão atual da página). Sem motion (reservado para a 012). Lint 0/0; build PASS (15 rotas); e2e 16/16; sem overflow em 375×667 e 1280×720.

**Objetivo:** hero estruturalmente distinto dos existentes (texto + área de mídia/placeholder), no padrão de props.
**Entregável:** nova variante em `components/sections/hero/` + página `/library/hero` atualizada.
**Critérios de aceite:** diferença real de estrutura; data-driven; reduced-motion respeitado; lint/build/e2e verdes.
**Dependências:** 001. **Finding:** — **Esforço:** Médio.

## 004 — Badge

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-10-18)** — `components/ui/badge.tsx` (UI primitive; Server Component; `<span>` não interativo; CVA + `VariantProps` + `cn()` + `data-slot="badge"`, no padrão local dos primitives; variantes `default`/`secondary`/`outline` somente por tokens — sem destructive, sem sizes, sem `asChild`/Slot, sem hover próprio, sem motion). Sem dependência nova; sem shadcn CLI. Sem página própria no `/library` — igual aos demais primitives; verificação visual quando consumido pela 005. Lint 0/0; build PASS; e2e 16/16.

**Objetivo:** primitive base (consumido por 005) — selecionado por demanda real, não por catálogo.
**Entregável:** `components/ui/badge.tsx` com variantes temáticas (sem cor hardcoded), no padrão shadcn new-york já adotado pelo projeto.
**Critérios de aceite:** CVA como `button.tsx`; entra no catálogo; lint/build/e2e verdes.
**Dependências:** nenhuma. **Finding:** — **Esforço:** Pequeno.

## 005 — Stats / métricas

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-10-19)** — `components/sections/stats/stats-grid.tsx` (Server Component; contrato `StatItem`/`StatsGridProps` com `items` obrigatório e `eyebrow`/`title`/`description` opcionais; tipos locais). Header centralizado com **`Badge variant="secondary"`** para o eyebrow — primeiro consumo real do primitive 004, requisito desta evolução. `ul[role=list]` em grid 2 colunas no mobile / 4 no desktop; `li` por item com value (`text-3xl/4xl font-bold tabular-nums`) + label + description opcional. Demo fornecida pela página `/library/stats` (padrão showcase atual; inclui value longo `R$ 2 mi` para validar o grid em 375px); link "Stats" adicionado ao menu do shell. Sem motion (reservado para a 012). Lint 0/0; build PASS (16 rotas); e2e 16/16; sem overflow em 375×667 e 1280×720 (value longo sem truncamento, gap 32px).

**Objetivo:** seção de números de destaque com badge de contexto — padrão recorrente em landing pages.
**Entregável:** `components/sections/stats/` + página `/library/stats`.
**Critérios de aceite:** data-driven; usa Badge; responsiva; lint/build/e2e verdes.
**Dependências:** 001, 004. **Finding:** — **Esforço:** Médio.

## 006 — `aria-label` nas navs

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-10-19)** — `aria-label="Navegação principal"` adicionado nos `<nav>` dos 3 headers (`header-basic`, `header-centered`, `header-with-topbar`) e `aria-label="Navegação da biblioteca"` no `<nav>` do `library-shell` — exatamente os 4 `<nav>` do escopo, rótulos em pt-BR aprovados no Plan. Rótulos confirmados na árvore de acessibilidade em `/`, `/library/headers` e `/library/stats`; tabulação inalterada; nada visual mudou. Lint 0/0; build PASS (16 rotas); e2e 16/16. QLT-007 → VERIFIED.

**Objetivo:** rótulo semântico nas regiões `<nav>` (headers + shell do library).
**Entregável:** `aria-label` descritivo em todos os `<nav>`.
**Critérios de aceite:** tabulação e rótulos corretos; nada visual muda; lint/build/e2e verdes.
**Dependências:** nenhuma. **Finding:** QLT-007 ✅. **Esforço:** Pequeno.

## 007 — Mobile nav acessível

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-10-20)** — `components/site/headers/mobile-nav.tsx` (`MobileNav`, Client Component; contrato `MobileNavLink`/`MobileNavProps` somente `links`; `Button` real ghost/icon-lg com lucide Menu/X, `aria-label` dinâmico, `aria-expanded`, `aria-controls` via `useId`; painel condicional `<nav aria-label="Navegação principal">` com `ul[role=list]`; fecha por botão/Escape com retorno de foco/clique fora; sem Sheet/portal/focus trap; visível só abaixo de `md`) integrado a `header-basic` (grupo direito, após o CTA) e `header-with-topbar` (linha principal; topbar intacta). `header-centered` reavaliado e intencionalmente mantido (flex-wrap funciona). 2 testes Playwright focados mobile-only adicionados ao smoke. Validação live 375×667 (painel dentro da viewport, ids únicos, independência de estado, link fecha menu, active state preservado) e 1280×720 (sem regressão); zero overflow em todos os casos. Lint 0/0; build PASS (16 rotas); e2e 18 passed + 2 skipped (20 execuções). Padrão documentado em `docs/DESIGN-SYSTEM.md` e no catálogo. QLT-006 → VERIFIED.

**Objetivo:** navegação acessível em viewport estreita nos headers que hoje escondem o menu (`header-basic`, `header-with-topbar`); `header-centered` (flex-wrap) é reavaliado.
**Entregável:** toggle + painel de navegação operável por teclado (foco, `aria-expanded`, `Escape`).
**Critérios de aceite:** menu visível e operável por teclado em viewport mobile; padrão documentado para headers futuros; lint/build/e2e verdes.
**Dependências:** 006. **Finding:** QLT-006 ✅. **Esforço:** Grande.

## 008 — Avatar

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-10-23)** — `components/ui/avatar.tsx` (`Avatar`, Client Component; dependência nova aprovada `@radix-ui/react-avatar` ^1.3.1; API composicional Root/Image/Fallback com exatamente 3 exports `Avatar`/`AvatarImage`/`AvatarFallback`; tamanho base único; `className` + `data-slot` nos três; imagem com `object-cover`; fallback com tokens existentes — comportamento image/fallback fornecido pelo Radix, sem máquina de estado própria; conteúdo do fallback e `alt` fornecidos pelo consumer; sem geração automática de iniciais, sem CVA, sem size variants, sem status/group, sem consumer artificial). A validação visual image → fallback será realizada na Evolução 009, primeiro consumer real do Avatar. Lint 0/0; build PASS (16 rotas); e2e 18 passed + 2 skipped; `git diff --check` limpo.

**Objetivo:** primitive para autor/reviewer — consumido por 009 e pelo blog futuro.
**Entregável:** avatar no `components/ui/`. A implementação será decidida **na execução da evolução**, após verificar o stack atual, entre: primitive já disponível; implementação simples compatível com o projeto; ou primitive oficial shadcn/Radix com dependência justificada. Nada é instalado antes disso.
**Critérios de aceite:** decisão registrada; entra no catálogo; lint/build/e2e verdes.
**Dependências:** nenhuma. **Finding:** — **Esforço:** Pequeno.

## 009 — Review cards com rating

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-10-25)** — `components/sections/testimonials/testimonials-rating-cards.tsx` (`TestimonialsRatingCards`, quarta variante do grupo, estruturalmente distinta das três testimonials legadas; Server Component; contrato data-driven `ReviewItem`/`ReviewAvatar`/`TestimonialsRatingCardsProps`; rating inteiro 1–5 com normalização defensiva; rating acessível via `aria-label` "N de 5 estrelas" com ícones `aria-hidden`; semântica `article`/`blockquote`/`footer`; `avatar` obrigatório por item com `src` opcional e `fallback` obrigatório; `role` opcional; sem mudança no Avatar; sem dependência nova). Variação 04 adicionada à `/library/testimonials` (padrão atual da página, sem antecipar a migração da 019). Consumo real do Avatar 008: imagem válida (data URL SVG), fallback por src quebrado e fallback sem src. Validação live 375×667 (1 coluna) e 1280×720 (3 colunas), zero overflow em ambos. Lint 0/0; build PASS (16 rotas); Playwright 24 passed + 2 skipped (26 execuções, confirmado em duas execuções consecutivas); `git diff --check` limpo. **Avatar 008 — validação visual image/fallback concluída pela Evolução 009.** Contribui para a estratégia de migração gradual de QLT-005 (permanece aberto).

**Objetivo:** social proof com avaliação (SVG/Lucide), avatar e citação — variante estrutural nova.
**Entregável:** nova variante em `components/sections/testimonials/` + página atualizada.
**Critérios de aceite:** data-driven; review cards com rating acessível + Avatar; lint/build/e2e verdes.
**Dependências:** 001, 004, 008. **Finding:** — **Esforço:** Médio.

## 010 — Migrar `hero-center-cta` para o contrato

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-10-26)** — `hero-center-cta` migrada para contrato data-driven sem redesign: copy/CTAs removidos do componente; `HeroCenterAction`/`HeroCenterCtaProps` (tipos locais); `title` obrigatório; `description?`/`supportingText?`/`actions?`; Server Component preservado; sem eyebrow; `Button asChild` com links reais (internos `next/link`, protocolos `<a>`); `/library/hero` virou consumer real com demo tipada; os dois botões falsos da Hero viraram links reais (CTA interno "Ver conteúdos" → `/blog`). Contribui para QLT-003 (11→10 ocorrências, permanece aberto) e para QLT-005 (permanece aberto); QLT-010 intocado. Validação live 375×667 e 1280×720, zero overflow. +1 teste Playwright. Lint 0/0; build PASS (16 rotas); Playwright 26 passed + 2 skipped (28 execuções); `git diff --check` limpo.

**Objetivo:** validar na prática o padrão estabelecido pela Evolução 001, migrando um componente legado exemplar (migração acontece "quando for tocado" — aqui é tocado de propósito).
**Entregável:** `hero-center-cta` com props do contrato; catálogo atualizado.
**Critérios de aceite:** comportamento visual preservado com props default; lint/build/e2e verdes.
**Dependências:** 001. **Finding:** QLT-005 (PARCIAL). **Esforço:** Pequeno–médio.

## 011 — Feature comparison

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-10-31)** — novo grupo `components/sections/features/` com `feature-comparison.tsx` (`FeatureComparison`); nova rota `/library/features` + link "Features" na library. Contrato data-driven (`ComparisonValue = boolean | string`, `ComparisonOption`, `ComparisonFeature`, `FeatureComparisonProps` — tipos locais), `values` keyed pelo id da opção; tabela HTML semântica real com `Recurso` como primeiro column header explícito e `scope="col"`/`scope="row"`; booleanos via Check/X Lucide `aria-hidden` + sr-only (Incluído/Não incluído); strings como dados; valor ausente com representação própria distinta de `false` ("Não informado"); Server Component; CSS-only responsive com scroll horizontal interno no mobile (wrapper rolável mantém o scroll interno sem provocar overflow no documento); sem pricing, sem CTA, sem highlight, sem feature groups, sem tooltip; sem dependência nova. Validação live 375×667 (page overflow 0, scroll interno testado e utilizável, label longo quebra) e 1280×720 (page overflow 0, 3 opções alinhadas, sem scroll desnecessário). +1 teste Playwright. Lint 0/0; build PASS (17 rotas); Playwright 28 passed + 2 skipped (30 execuções); `git diff --check` limpo.

**Objetivo:** comparação em colunas (antes/depois, com/sem) — estrutura inexistente no lab.
**Entregável:** nova variante em `components/sections/features/` + página `/library` correspondente.
**Critérios de aceite:** data-driven; responsiva (colunas empilham); lint/build/e2e verdes.
**Dependências:** 001. **Finding:** — **Esforço:** Médio–grande.

## 012 — Motion pass (entrance/hover)

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-11-02)** — motion pass controlado: 2 componentes alterados, nenhum componente novo, nenhuma dependência nova, nenhuma abstração de motion. `HeroMediaShowcase`: entrance discreto (fade + translate-y pequeno) via CSS/tw-animate-css. `TestimonialsRatingCards`: hover com translate mínimo + shadow discreto. Todo motion novo protegido por `motion-safe`; reduced motion validado (conteúdo no estado final, sem animação). Server Components preservados, nenhum Client Component novo. MobileNav deliberadamente excluído (montagem condicional produziria animação assimétrica). Validação live 375×667 e 1280×720, overflow 0 em todos os casos. +1 teste Playwright de reduced motion. Lint 0/0; build PASS (17 rotas); Playwright 30 passed + 2 skipped (32 execuções); `git diff --check` limpo. Padrão documentado em `docs/DESIGN-SYSTEM.md` (seção Motion).

**Objetivo:** padrão de animação do laboratório usando CSS/Tailwind/tw-animate-css, com `prefers-reduced-motion` e sem layout shift. Padrão documentado quando implementado.
**Entregável:** classes de animação aplicadas nas sections exemplar + padrão documentado.
**Critérios de aceite:** animações desativam com reduced-motion; sem layout shift; lint/build/e2e verdes.
**Dependências:** 001. **Finding:** nenhum. **Esforço:** Médio.

## 013 — Separator + Skeleton

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-11-02)** — `components/ui/separator.tsx` (`Separator`, implementação nativa, zero dependências; Server Component; único `<div>`; horizontal/vertical; `decorative=true` default sem `role`/`aria-orientation`; modo semântico com `role="separator"` + `aria-orientation` derivado de `orientation`; `data-slot`/`data-orientation`; `bg-border`; a precedência das props foi ajustada para preservar `decorative`/`orientation` como fonte de verdade) e `components/ui/skeleton.tsx` (`Skeleton`, Server Component; `React.ComponentProps<"div">`; `bg-muted` + `rounded-md`; `motion-safe:animate-pulse` — reduced motion estático, convenção da 012; sem `role="status"` automático — anúncio de loading é do consumer; composição via `className`). Nenhum consumer artificial, nenhuma rota nova, nenhum teste novo. Lint 0/0; build PASS (17 rotas); Playwright 30 passed + 2 skipped (32 execuções, inalterado); `git diff --check` limpo.

**Objetivo:** primitivos selecionados por demanda real (estados, separação semântica).
**Entregável:** `components/ui/separator.tsx`, `components/ui/skeleton.tsx`.
**Critérios de aceite:** sem dependência nova; entram no catálogo; lint/build/e2e verdes.
**Dependências:** nenhuma. **Finding:** — **Esforço:** Pequeno.

## 014 — Newsletter com estados

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-11-04)** — `NewsletterForm` (`components/sections/newsletter/newsletter-form.tsx`), novo grupo `newsletter`, Client Component justificado (estado, `useId`, submit, callback); nova rota `/library/newsletter` (Server Component) com client wrapper apenas de showcase (fora do catálogo) + link "Newsletter" na library; contrato data-driven com callback externo `onSubmit`, sem backend; estados idle/submitting/success/error; label real + `useId`; `submittingLabel`; `aria-busy` no form; live region persistente única (`role="status"`, polite, atomic); erro com `aria-invalid`/`aria-describedby`; success limpa o campo; retry; demo determinística; validado em 375×667 e 1280×720 com overflow 0; sem motion novo; nenhuma dependência nova; +2 testes Playwright. Contribui para QLT-004 (permanece aberto); QLT-008 permanece aberto (015). Lint 0/0; build PASS (18 rotas); Playwright 34 passed + 2 skipped (18 testes / 36 execuções); `git diff --check` limpo.

**Objetivo:** lead form que **nasce acessível**: labels associados, feedback de erro/sucesso, interação acessível. Decide o padrão de comportamento mínimo de form do laboratório.
**Entregável:** nova section de form/newsletter + página `/library` correspondente.
**Critérios de aceite:** estados vazio/erro/sucesso renderizáveis; labels já corretos desde a criação; lint/build/e2e verdes.
**Dependências:** 001. **Finding:** QLT-004 (PARCIAL — decisão de comportamento + estados no novo form). **Esforço:** Médio.

## 015 — Labels dos formulários existentes

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-11-04)** — 3 contact forms corrigidos (`contact-simple`, `contact-split`, `contact-details`): 10 labels com `<label htmlFor>` + 10 campos com `id` (associação 1:1); IDs determinísticos prefixados por variant e únicos na mesma página; Server Components preservados; zero mudança visual; zero comportamento novo (nenhum `name`/`required`/ARIA adicionada); QLT-008 encerrado (100% dos casos corrigidos); QLT-004 e QLT-010 continuam abertos; +1 teste Playwright abrangente (10 associações, `getByLabel`, htmlFor/id, tipos de campo, foco por label, unicidade dos IDs); validado em 375×667 e 1280×720 com overflow 0. Lint 0/0; build PASS (18 rotas); Playwright 36 passed + 2 skipped (19 testes / 38 execuções); `git diff --check` limpo.

**Objetivo:** corrigir a associação programática `htmlFor`/`id` nos contact forms legados (`contact-details`, `contact-simple`, `contact-split`). Não é pré-requisito da 014 — a 014 já nasce correta; a 015 corrige o legado.
**Entregável:** labels associados nos 3 contact sections.
**Critérios de aceite:** WCAG 3.3.2/1.3.1 nos forms; lint/build/e2e verdes.
**Dependências:** nenhuma. **Finding:** QLT-008 ✅. **Esforço:** Pequeno.

## 016 — Pricing com toggle

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-11-04)** — decisão anti-inflação: `PricingThreeTiers` evoluído, nenhuma variante nova, contagem inalterada (28/8/45). Contrato data-driven (`PricingInterval`/`PricingAction`/`PricingPlan`/`PricingThreeTiersProps` — tipos locais); Client Component justificado (estado do intervalo); toggle mensal/anual via `role="group"` com botões `aria-pressed` (selecionado = default, não selecionado = outline), teclado nativo, estado inicial mensal; preços como strings completas do consumer, zero cálculo comercial; `featured` separado de `action.variant`; CTAs como links reais (convenção 001). Consumers: Variação 01 da `/library/pricing` e a home — a home foi identificada durante o build como segunda consumidora real e incorporada ao escopo mínimo para preservar o contrato obrigatório (nenhum fallback hardcoded; a copy anterior da pricing foi movida para a home; ambas as páginas continuam Server Components). Contribui para QLT-003 e QLT-005 (uma ocorrência a menos cada, ambos permanecem abertos); QLT-010 intocado. Validação live 375×667 e 1280×720 na library e na home, zero overflow nos quatro cenários. +1 teste Playwright. Lint 0/0; build PASS (18 rotas); Playwright 38 passed + 2 skipped (20 testes / 40 execuções); `git diff --check` limpo.

**Objetivo:** pricing com alternância mensal/anual interativa — primeiro client component interativo de section do lab.
**Entregável:** nova variante em `components/sections/pricing/` + página atualizada.
**Critérios de aceite:** toggle acessível; data-driven; lint/build/e2e verdes.
**Dependências:** 001. **Finding:** — **Esforço:** Médio–grande.

## 017 — Accordion acessível

**Status:** ✅ **IMPLEMENTADA / VERIFIED (technical — 2026-11-04)** — anti-duplicação confirmou inexistência de Accordion prévio; Radix escolhido por comportamento acessível real; `@radix-ui/react-accordion` ^1.3.1 (dependência aprovada no Plan); wrapper fino com compound API de exatamente 4 exports (`Accordion`/`AccordionItem`/`AccordionTrigger`/`AccordionContent`, Header interno ao Trigger); single/multiple, collapsible, controlled/uncontrolled pela API nativa do Radix, sem state wrapper próprio; Client boundary no primitive; `data-slot`s; focus-visible; `ChevronDown` decorativo com `aria-hidden` explícito — rotação 180° controlada pelo `data-state` do Trigger, também com reduced motion (instantânea), apenas a transição `motion-safe`; Content sem animação; nenhum consumer, nenhuma rota, nenhum teste Playwright novo. Validação técnica concluída na Evolução 017 (instalação, types, composição, lint 0/0, build PASS 18 rotas, suíte existente 38 passed + 2 skipped, diff check limpo). A validação visual e de interação em browser (open/close, keyboard runtime, `aria-expanded` runtime, foco, single/collapsible runtime) será realizada na Evolução 018, primeiro consumer real — decisão deliberada de sequência, equivalente ao precedente Avatar 008→009, não uma dívida.

**Objetivo:** primitive de conteúdo expansível, acessível e reutilizável. A escolha entre HTML nativo, primitive existente ou Radix/shadcn será decidida **no Plan da evolução**, após verificar requisitos de comportamento, animação, acessibilidade e dependências. Nada é instalado antes disso.
**Entregável:** accordion em `components/ui/`, entra no catálogo.
**Critérios de aceite:** operável por teclado; animação respeitando reduced-motion; lint/build/e2e verdes.
**Dependências:** nenhuma. **Finding:** — **Esforço:** Médio.

## 018 — FAQ

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-11-04)** — inventário confirmou ausência de FAQ existente; nova section justificada. `components/sections/faq/faq-accordion.tsx` (`FaqAccordion`, data-driven, Server Component), primeiro consumer real do Accordion 017 com `type="single" collapsible` e nenhum state wrapper próprio. Nova rota `/library/faq` + link "FAQ" na navegação da library; demo genérica com 6 itens; nenhuma dependência nova; Accordion primitive intacto. A validação visual/keyboard runtime deliberadamente reservada pela Evolução 017 foi concluída na Evolução 018 (mouse, open/close, single, collapsible, `aria-expanded`/`aria-controls`, teclado, foco, Chevron, reduced motion, heading hierarchy). Validação live 375×667 e 1280×720, zero overflow. +2 testes Playwright. Lint 0/0; build PASS (19 rotas); Playwright 42 passed + 2 skipped (22 testes / 44 execuções); `git diff --check` limpo.

**Objetivo:** seção FAQ construída sobre o accordion 017 — padrão recorrente em landing pages.
**Entregável:** `components/sections/faq/` + página `/library/faq`.
**Critérios de aceite:** data-driven; lint/build/e2e verdes.
**Dependências:** 017. **Finding:** — **Esforço:** Médio.

## 019 — Padronizar páginas legadas do `/library`

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-11-04)** — inventário confirmou exatamente 7 páginas legacy; todas migradas ao padrão moderno consolidado (`metadata` local, page headers modernos, entries locais tipadas, preview boxes padronizados, labels `Componente: <code>{id}</code>`). Nenhuma nova abstração global; nenhuma section criada ou alterada. Tipagem preservada: páginas simples usam `Component`; páginas heterogêneas usam `preview: React.ReactNode` — zero `any`, zero `Record<string, unknown>`. Variants preservadas (Hero 4, About 3, Services 3, Testimonials 4, Pricing 3, Contact 3, CTA 4), mesma ordem, mesmos demo props. Navigation intacta; 19 rotas preservadas; contagem 29/9/47 inalterada. +1 teste Playwright — **44 passed + 2 skipped** (23 testes / 46 execuções). Validação live mobile/desktop nas representativas, zero overflow; varredura legacy limpa nas 7 pages. **QLT-010 → VERIFIED.**

**Objetivo:** migrar as 7 páginas legadas (`hero`, `about`, `services`, `testimonials`, `pricing`, `contact`, `cta`) para o padrão atual do showcase (`metadata`, array tipado, preview `<Component />`, label `<code>{id}</code>`), preservando as categorias novas já adicionadas até aqui.
**Entregável:** as 7 páginas migradas.
**Critérios de aceite:** padrão uniforme; `metadata` em todas; lint/build/e2e verdes.
**Dependências:** nenhuma. **Findings:** QLT-010 ✅. **Esforço:** Médio.

## 020 — Sticky CTA bar

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-11-05)** — inventário confirmou inexistência de CTA sticky/fixed no projeto; nova section justificada no grupo CTA existente (`StickyCtaBar`, `components/sections/cta/sticky-cta-bar.tsx`), nenhuma CTA legacy refatorada. `position: sticky; bottom: 0` (não `fixed`), limitada pelo containing/scroll block do consumer; Server Component; CSS-only; contrato data-driven; links reais (convenção 001); sem JS de scroll; sem visibility state; sem z-index novo; sem motion; sem dependência nova. `/library/cta` 4 → 5 entries (demo com contexto real de scroll); nenhuma rota nova. Runtime sticky comprovado por geometria: desktop `scrollHeight 521 > clientHeight 420`, mobile `909 > 420`, delta `containerBottom − asideBottom = 0` no início, meio e final do scroll. Mobile 375×667 e desktop 1280×720 validados, zero overflow. +1 teste Playwright — **46 passed + 2 skipped** (24 testes / 48 execuções). Lint 0/0; build PASS (19 rotas); `git diff --check` limpo.

**Objetivo:** CTA fixo mobile-first — variante estrutural nova da área CTA.
**Entregável:** nova variante em `components/sections/cta/` + página atualizada.
**Critérios de aceite:** sticky funcional sem cobrir conteúdo; data-driven; lint/build/e2e verdes.
**Dependências:** 001, 007. **Finding:** — **Esforço:** Médio.

## 021 — Sticky-column split

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-11-05)** — inventário confirmou inexistência de sticky-column no lab; nova section justificada no grupo `features` (`StickyColumnSplit`, `components/sections/features/sticky-column-split.tsx`), nenhuma section legacy refatorada. Server Component; data-driven; grid responsivo (`md:grid-cols-2`); sticky somente em `lg` (`lg:sticky lg:top-8` com `md:self-start`); mobile em fluxo normal; sem `fixed`; sem z-index; sem JS; sem IntersectionObserver; sem scrollspy; sem motion. `/library/features` 1 → 2 entries (`FeatureComparison` intacto); nenhuma rota nova; demo com contexto de scroll próprio e conteúdo posterior que torna o boundary da section observável. Runtime geométrico validado: `scrollHeight 965 > clientHeight 420`; `deltaTop = stickyRect.top − scrollContainerRect.top` — inicial 64px (posição natural), intermediário 32px (sticky engajado exatamente no `top-8`), final −84px (coluna liberada pelo fim do containing block). Mobile: computed `static`, coluna acompanha o scroll (breakpoint CSS, não JS), 6 items, zero overflow. Desktop 1280×720 validado, zero overflow. +1 teste Playwright — **48 passed + 2 skipped** (25 testes / 50 execuções). Lint 0/0; build PASS (19 rotas); `git diff --check` limpo.

**Objetivo:** padrão responsivo de split com coluna fixa em desktop (conteúdo + mídia/CTA) — inexistente no lab.
**Entregável:** nova variante de section + página `/library` correspondente.
**Critérios de aceite:** coluna fixa só em desktop; empilha em mobile; lint/build/e2e verdes.
**Dependências:** 001. **Finding:** — **Esforço:** Médio.

## 022 — Landing composition completa

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-11-05)** — objetivo cumprido por composição: landing completa montada exclusivamente com peças existentes, **nenhum component novo** (contagem 31/9/49 inalterada). Page dedicada `app/library/landing/page.tsx` (Server Component) dentro do domínio da Library; demo data no consumer; narrativa brand-neutral única e coerente (Features e Pricing usam os mesmos planos). Composição final: HeroMediaShowcase → LogosStrip → StatsGrid → FeatureComparison → TestimonialsRatingCards → PricingThreeTiers → FaqAccordion → CtaSplitActions → StickyCtaBar → FooterColumns. Header deliberadamente omitido após inventário real dos hrefs: os headers existentes usam links root+fragment (`/#...`) que navegam para a home `/` — seriam enganosos nesta rota; nenhum header/footer alterado. FooterColumns reutilizado como footer existente exigido pelo roadmap, como está. Fragmentos locais apenas com consumer real: `#services` (hero, sticky bar) e `#contact` (actions do pricing). Client boundaries preservadas (PricingThreeTiers, FaqAccordion→Accordion). StickyCtaBar validada no document scroll real (computed `sticky`/`bottom 0`; desktop `barBottom 720 = innerHeight`, mobile `667 = 667`) com boundary antes do footer (desktop `barBottom 409 ≤ footerTop 449`; mobile `93 ≤ 133`). Teste de links classifica corretamente fragmento puro (DOM atual) vs path+fragment (outra rota). Mobile 375×667 e desktop 1280×720 validados, zero overflow. +2 testes Playwright — **52 passed + 2 skipped** (27 testes / 54 execuções). Lint 0/0; build PASS (20 rotas); `git diff --check` limpo. Nenhuma dependência nova.

**Objetivo:** demonstração viva do conceito do template: landing completa montada com peças do próprio laboratório.
**Entregável:** página de demonstração com conteúdo coeso, usando: 001 (CTA Split/contrato), 002 (logos), 003 (Hero Media Showcase), 005 (stats), 009 (reviews), 011 (feature comparison), 016 (pricing), 018 (FAQ), 020 (sticky CTA) e o footer existente.
**Critérios de aceite:** monta/desmonta por composição; responsiva; lint/build/e2e verdes.
**Dependências:** apenas as peças listadas. **Finding:** — **Esforço:** Grande.

## 023 — Metadata SEO

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-11-07)** — auditoria global de metadata: Library já estava coberta após 019/022 (15/15 com title+description, auditadas sem duplicação — marca exatamente 1x em cada title). Root metadata atualizada para o nome oficial "Svitordev UI Lab" com title template `%s | Svitordev UI Lab` e description global preservada; `lang="pt-BR"` normalizado. Home com metadata própria (`Início`, description herdada conscientemente); `/blog` com metadata própria (description baseada na copy real); blog dinâmico com `generateMetadata` usando a fonte real (`post.title`/`post.excerpt`; slug inexistente → `notFound()`, sem metadata enganosa para 404); `/library` (redirect) conscientemente sem metadata. Nenhuma URL fictícia — metadataBase, canonical, sitemap, robots, OG/Twitter custom e icons deliberadamente adiados (sem origem pública oficial nem assets sociais). +2 testes Playwright — **56 passed + 2 skipped** (29 testes / 58 execuções). Lint 0/0; build PASS (20 rotas); `git diff --check` limpo. **QLT-002 → VERIFIED.**

**Objetivo:** `metadata` por página em home, blog e páginas do library ainda sem (reaproveitando o padrão de `headers`/`footers`).
**Entregável:** `export const metadata` nas páginas pendentes.
**Critérios de aceite:** `<title>`/`description` únicos por rota; lint/build/e2e verdes.
**Dependências:** nenhuma. **Finding:** QLT-002 ✅. **Esforço:** Pequeno–médio.

## 024 — Corrigir datas/timezone

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-11-07)** — causa raiz: `new Date("YYYY-MM-DD")` tratava data civil DATE-ONLY como instante UTC, deslocando o dia em fusos negativos. Correção por parsing estrutural em `lib/format-date.ts` (`formatDateOnly`, `YYYY-MM-DD → dd/mm/yyyy`) — sem `Date`, sem `Intl`, sem timezone, sem locale, sem biblioteca. Dados dos posts intactos; os 2 consumers (`/blog`, `/blog/[slug]`) usam o mesmo helper; nenhum timezone hardcoded na aplicação. Teste direto do helper + E2E (listagem e detalhe exibem o mesmo dia editorial); varredura final limpa. +1 teste Playwright — **58 passed + 2 skipped** (30 testes / 60 execuções). Lint 0/0; build PASS (20 rotas); `git diff --check` limpo. **QLT-013 → VERIFIED.**

**Objetivo:** datas date-only sem deslocamento de fuso.
**Entregável:** formatação estável em `lib/blog.ts`/páginas do blog.
**Critérios de aceite:** data date-only renderiza o dia correto; lint/build/e2e verdes.
**Dependências:** nenhuma. **Finding:** QLT-013 ✅. **Esforço:** Pequeno.

## 025 — Smoke Playwright estendido

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-11-08)** — suíte auditada antes da expansão (30 testes; gaps reais: `/library/logos` e `/library/stats` nunca visitadas por teste direto; navegação pelo menu mobile inexistente; sem monitoramento de erros de runtime). +3 testes em `tests/smoke.spec.ts`: navegação real pelo menu mobile (preview do `HeaderBasic` escopado semanticamente, painel real via `aria-controls`, clique em link real do painel até outra rota — o destino inicialmente considerado no planejamento foi ajustado ao contrato real do `HeaderBasic`, que não possui link `Blog` no painel; o critério "abrir menu mobile e navegar" foi preservado integralmente); `library: rotas sem smoke proprio renderizam via shell com entry e zero overflow` (clique real na shell nav → `/library/logos` e `/library/stats`, desktop + mobile); `nenhuma rota representativa lanca page error durante render` (6 rotas; `pageerror` como sinal de exceção não capturada; `console.error` deliberadamente excluído para evitar ruído do ambiente dev/Turbopack). Cobertura de rotas públicas relevantes: 17/19 → **19/19 + 404**. 15/15 categorias da Library com visita direta ou smoke funcional. Nenhuma alteração de produção. Nenhuma dependência nova. **33 testes / 66 execuções — 63 passed + 3 skipped** (3 skips intencionais: 2 mobile-only da 007 + 1 mobile-only novo da 025; menu não existe no breakpoint desktop). Duas execuções consecutivas verdes, zero retries. Lint 0/0; build PASS (20 rotas); `git diff --check` limpo.

**Objetivo:** estender o Playwright aos fluxos críticos criados no lote: abrir menu mobile e navegar; smoke da landing composition.
**Entregável:** `tests/smoke.spec.ts` estendido (roles/textos estáveis, sem seletores frágeis).
**Critérios de aceite:** duas execuções consecutivas verdes; sem retries; lint/build verdes.
**Dependências:** 007, 022. **Finding:** — **Esforço:** Médio.

## Findings incorporados

Apenas os findings com relação natural com evoluções do lote. PARCIAL = a evolução trata somente parte do finding; o restante segue pendente.

| Finding | Tratado em | Abrangência |
|---|---|---|
| QLT-002 | 023 | total |
| QLT-003 | 001 | PARCIAL |
| QLT-004 | 014 | PARCIAL |
| QLT-005 | 001, 010 | PARCIAL |
| QLT-006 | 007 | total |
| QLT-007 | 006 | total |
| QLT-008 | 015 | total |
| QLT-010 | 019 | total |
| QLT-013 | 024 | total |

## Findings futuros

- **QLT-009** (theme light morto / toggle) — exige decisão de produto; permanece para lote futuro. Não inserir toggle artificialmente no lote 01.
- Resíduos de **QLT-003 / QLT-004 / QLT-005 / QLT-011** nos componentes não tocados pelo lote 01 — migram quando forem tocados (estratégia B).
- **QLT-001** e **QLT-012** estão VERIFIED e não fazem parte do roadmap ativo.

## Estado esperado após 025

Esperado ao fim do lote: contrato de props em vigor (1 migração + ~10 novas seções data-driven); primitivos adicionados por demanda real (badge, avatar, separator, skeleton, accordion); mobile nav acessível; padrão de motion com reduced-motion; `/library` padronizada com novas categorias (logos, stats, features/forms, FAQ); 1 landing composition completa; SEO básico nas páginas principais; datas corrigidas; Playwright estendido com menu mobile e composition cobertos, verde em duas execuções consecutivas; lint 0/0 e build PASS permanentes. Findings: 6 tratados por completo, 4 parcialmente. ~25 evoluções reais, sem inflação.

## Critério para iniciar a 001

Working tree limpo em `main` (HEAD = origin/main), roadmap aprovado, nenhuma dependência pendente (a 001 não instala nada). A partir daí, cada evolução segue a `DEFINITION-OF-DONE` vigente (lint + build sempre; `npm run test:e2e` quando afetar o smoke), com `git add` explícito por arquivo.

---

# Lote 02 — Evoluções 026–050

**Status:** **EM EXECUÇÃO** — planejado na repriorização ao fim do Lote 01 (2026-11-09). **026 ✅ VERIFIED (2026-11-09)**; 027–050 planejadas e não iniciadas.

## Visão geral

O lote abre com a dívida real de confiança do template (026 — QLT-003) e combina qualidade com criação: primitivos novos apenas com consumer real nomeado, migrações incrementais do contrato de props, compositions que validam a reutilização com peças já existentes, e um fecho que reaudita em vez de fechar automaticamente. A 049 é auditoria de regressão (só gaps reais) e a 050 é documentação + reauditoria.

## Evoluções

| # | Nome | Tipo | Objetivo | Entregável | Finding | Dependências | Esforço |
|---|---|---|---|---|---|---|---|
| 026 | Padronizar destinos de CTAs e anchors ✅ VERIFIED | quality | Só QLT-003: botões mortos, anchors sem alvo, destinos reais, sem `href="#"`, sem botão navegacional sem destino — sem props/contratos novos | 9 arquivos + header-centered + ids reais | QLT-003 ✅ | — | Pequeno |
| 027 | Alert (primitive) | UI | Feedback acessível via tokens/CVA | `components/ui/alert.tsx` + demo | — | — | Pequeno |
| 028 | Contact forms: comportamento de demo | quality | Submit demonstrativo com Alert; explícito: sem backend real, sem envio fingido; estados só os que o contrato da demo justificar | 3 contact forms + teste | QLT-004 | 026, 027 | Médio |
| 029 | Tabs (primitive) | UI | Tabs acessíveis (Radix — dependência a aprovar no Plan) | `components/ui/tabs.tsx` + demo | — | — | Médio |
| 030 | Tema: definir política e alinhar implementação | quality | Decidir com base no produto: A) dark-only → explicitar código+DS e eliminar/reclassificar light enganoso; B) suportar light/dark → mecanismo real de acesso. Plan próprio antes de implementar | decisão + implementação alinhada | QLT-009 | — | Pequeno–médio |
| 031 | Migrar hero-primary para contrato | refactor | QLT-005 incremental | contrato + demo | QLT-005 | 026 | Pequeno |
| 032 | Migrar hero-steps + corrigir heading | refactor | Contrato + h1→h3 | contrato + heading hierarchy | QLT-005, QLT-011 | 026 | Pequeno |
| 033 | Breadcrumbs (primitive) | UI | Navegação hierárquica | `components/ui/breadcrumbs.tsx` + demo | — | — | Pequeno |
| 034 | Gallery (section) | section | Grid de mídia data-driven, estruturalmente distinta, **usando Tabs como parte funcional** (conjuntos reais da demo) | nova section + categoria + demo | — | 029 | Médio |
| 035 | Consent preferences banner | site | Componente de UI/comportamento de consentimento (não compliance engine); persistência explícita, acessível, sem tracking real, demo segura | `components/site/consent-banner.tsx` + demo + teste | — | 026 | Pequeno |
| 036 | Migrar services×2 para contrato | refactor | QLT-005 incremental | 2 contratos + demos | QLT-005 | 026 | Médio |
| 037 | Migrar AboutTimeline para contrato | refactor | Preparar About composition; reduzir QLT-005 sem migração escondida | contrato + demo | QLT-005 | — | Pequeno |
| 038 | Migrar headers×3 para API data-driven | refactor | Links/actions via props; consolidar padrão da 026; preservar MobileNav e acessibilidade (3 componentes pequenos — cabem numa evolução) | 3 contratos + demos | QLT-005 | 026 | Médio |
| 039 | DropdownMenu + Header with dropdown navigation | UI | Primitive com consumer real imediato: 4º header funcionalmente distinto | `components/ui/dropdown-menu.tsx` + header novo + demo + teste | — | 038 | Médio |
| 040 | Migrar footers×3 para contrato | refactor | QLT-005 incremental | 3 contratos + demos | QLT-005 | 026 | Médio |
| 041 | Composition: Pricing page | composition | Página completa com peças existentes (billing toggle já próprio — sem Tabs) | rota dedicada + teste | — | 040 | Médio |
| 042 | Composition: Contact page | composition | Página completa: forms corrigidos + Alert + footer + peças existentes | rota dedicada + teste | — | 027, 028, 040 | Médio |
| 043 | Composition: About page | composition | Página completa com AboutTimeline migrada | rota dedicada | — | 037, 040 | Médio |
| 044 | Composition: Services page | composition | Valida as migrações com consumer real: services migrados + Gallery + testimonials + FAQ + CTA + footer | rota dedicada + teste | — | 034, 036, 040 | Médio |
| 045 | Blog: article layout | composition | Breadcrumbs + Avatar + post relacionado real + semântica de artigo; sem paginação artificial; sem author/schema sem contrato | evolução blog + teste | — | 033 | Médio |
| 046 | Composition: SaaS landing | composition | 2ª landing completa; peças novas só quando semanticamente adequadas; **consumer do Consent banner** e do Header with dropdown navigation | rota dedicada + teste | — | 035, 039, 040 | Médio |
| 047 | Loading states com Skeleton | quality | Skeleton ganha consumidores reais: `loading.tsx` em `/blog` e `/blog/[slug]` (valor real para projetos derivados com dados; não criar loading só para marcar uso) | 2 loading.tsx + teste | — | 045 | Pequeno |
| 048 | Skip link + focus audit | accessibility | Skip-to-content + auditoria de focus dos primitivos | skip link + teste | — | — | Pequeno |
| 049 | Auditoria de regressão do Lote 02 | testing | Inventariar 026–048, verificar cobertura, adicionar SOMENTE gaps reais, sem duplicar, matrix completa | suíte revisada | — | 026–048 | Médio |
| 050 | Documentação + reauditoria do Lote 02 | docs | Catálogo final, recipes úteis, reauditar findings abertos, validar contagens, dívida restante, preparar Lote 03 | docs + catálogo | QLT-011* | 049 | Pequeno |

\* QLT-011 só poderá ser marcado VERIFIED na 050 se TODAS as evidências restantes tiverem sido eliminadas.

## 026 — Padronizar destinos de CTAs e anchors

**Status:** ✅ **IMPLEMENTADA / VERIFIED (2026-11-09)** — **QLT-003 → VERIFIED**.

Inventário de 10 Buttons mortos (9 arquivos) convertido em links reais (`Button asChild` + `Link`, visual preservado); anchors da home corrigidos; zero `href="#"`; `#services` e `#about` definidos no consumer da home, não nos components reutilizáveis; sem migração de props (QLT-005 intacto); +2 testes; ajuste de locator preexistente apenas para manter o escopo correto. lint 0/0; build 20 rotas; Playwright 67+3.

## Anti-inflação

Aplicada estritamente: cada primitive novo tem consumer real nomeado dentro do lote (tabela abaixo). Pagination e Empty State foram removidos do lote (sem demanda hoje — voltam em lote futuro quando houver consumer). Toast adiado (sem consumer). Nenhum componente novo nasce "porque poderá ser útil".

## Consumer real de cada component novo

| Component novo | Evolução | Consumer real | Evolução consumer |
|---|---|---|---|
| Alert | 027 | Contact forms (feedback demo) | 028, 042 |
| Tabs | 029 | Gallery (alternar conjuntos) | 034 |
| Breadcrumbs | 033 | Blog article layout | 045 |
| Consent preferences banner | 035 | SaaS landing | 046 |
| DropdownMenu | 039 | Header with dropdown navigation | 039 (mesma evolução) |
| Gallery | 034 | Composition: Services page | 044 |

## Findings no lote

- **QLT-003** — ✅ **VERIFIED pela 026** (2026-11-09): 10 botões mortos → 0; anchors `/#services`/`/#about` passaram a resolver por alvos reais na home; zero `href="#"`.
- **QLT-004** — planejado para a **028** (comportamento demonstrativo explícito via Alert; sem backend, sem envio fingido).
- **QLT-005** — hoje **25 componentes sem props** (19 sections + 6 site); o lote migra **11** (031, 032, 036×2, 037, 038×3, 040×3); **14 permanecem** após o lote (about 2, services 1, testimonials 3, contact 3, cta 3, pricing 2, site 0). **Permanece ABERTO** — novos components de contact/CTA não contam como migração dos legacy hardcoded.
- **QLT-009** — **candidato a VERIFIED apenas após decisão + implementação da 030** (Plan próprio; ADR sozinha não transforma código morto em código resolvido).
- **QLT-011** — **parcialmente atacado na 032** (heading hierarchy) **e reauditado na 050** (comentários stale, nit do wrapper). Sem fechamento garantido.

## Componentes novos previstos (7)

- **UI (+4):** Alert, Tabs, Breadcrumbs, DropdownMenu.
- **site (+2):** Consent preferences banner, Header with dropdown navigation.
- **sections (+1):** Gallery.

## Migrações do contrato (11)

hero-primary, hero-steps, services-grid-simple, services-split-with-highlight, AboutTimeline, HeaderBasic, HeaderCentered, HeaderWithTopbar, FooterColumns, FooterCta, FooterSimple.

## Compositions (6)

Pricing page, Contact page, About page, Services page, Blog article layout, SaaS landing. A Services page foi escolhida sobre a alternativa "Portfolio page" porque valida as migrações da 036 com consumer real e inclui a Gallery (034) como demonstração de projetos/trabalhos/exemplos relacionados aos serviços.

## Testes

Cada evolução interativa traz o seu teste pelo DoD (028, 034, 035, 039, 041–047, 048). A 049 adiciona **somente gaps reais** do inventário — nada predeterminado. Sem axe, sem visual regression ainda.

## Contagem estimada ao fim do lote

UI 9 → **13** · site 7 → **9** · sections 31 → **32** · shells 2 → 2 · **total 49 → 56** (estimativa direcional, não promessa rígida).

## Itens adiados

Pagination, Empty State, Toast (sem consumer real hoje), dashboard/data UI (decisão de produto no checkpoint 050), axe/visual regression, CI, migração massiva do contrato.

## Riscos

- **2 dependências Radix novas** (Tabs 029, DropdownMenu 039) — política exige justificativa documentada; a11y de teclado é a justificativa; aprovar no Plan de cada uma.
- **030 pode crescer** se a decisão for a Opção B (mecanismo de tema real) — por isso exige Plan próprio.
- **039 acumula primitive + header novo** — se o Plan mostrar escopo excessivo, dividir e reportar antes de implementar.
- Suíte crescer ~10–14 testes ao longo do lote — tempo ainda aceitável.

## Checkpoints

- **030 (curto):** revisar 026–030 — padrão de destinos em vigor? consumers reais ativos? decisão de tema tomada e implementada de fato?
- **040 (intermediário):** revisar migrações sem regressão; primitivos novos com consumidores reais em uso; compositions ainda fazem sentido na ordem; reequilibrar 041–050.
- **050 (global):** repriorização antes do Lote 03 — reauditar produto, validar contagens, decidir dashboard/data UI, axe/visual regression, findings restantes, rebalancear a distribuição macro.
