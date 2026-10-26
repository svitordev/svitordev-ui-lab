# Svitordev UI Lab — Roadmap de 1000 Evoluções

Fonte de verdade do roadmap evolutivo do laboratório. Documento aprovado e versionado em 2026-10-15.

## Propósito

Direcionar a evolução contínua do Svitordev UI Lab (GitHub Template) ao longo de ~1000 evoluções macro, equilibrando criação visual, qualidade, APIs reutilizáveis, acessibilidade, motion, testes e documentação — sem inflação artificial.

Este documento detalha apenas o **lote ativo (001–025)**. As demais evoluções existem como direção macro até serem detalhadas no lote correspondente.

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
| 011 | Feature comparison | Nova section | Comparação em colunas (antes/depois, com/sem) | 001 | — | Médio–grande |
| 012 | Motion pass (entrance/hover) | Motion | Padrão de animação com reduced-motion | 001 | — | Médio |
| 013 | Separator + Skeleton | Primitivos sob demanda | Bases para estados e separação semântica | — | — | Pequeno |
| 014 | Newsletter com estados | Nova section | Lead form nascendo acessível, com feedback erro/sucesso | 001 | QLT-004 (PARCIAL) | Médio |
| 015 | Labels dos formulários existentes | Acessibilidade | `htmlFor`/`id` nos contact forms legados | — | QLT-008 | Pequeno |
| 016 | Pricing com toggle | Nova section | Alternância mensal/anual interativa | 001 | — | Médio–grande |
| 017 | Accordion acessível | Primitive sob demanda | Conteúdo expansível acessível e reutilizável | — | — | Médio |
| 018 | FAQ | Nova section | FAQ construída sobre o accordion 017 | 017 | — | Médio |
| 019 | Padronizar páginas legadas do `/library` | Showcase | Migrar as 7 páginas legadas para o padrão atual | — | QLT-010, QLT-011 (PARCIAL) | Médio |
| 020 | Sticky CTA bar | Nova section | CTA fixo mobile-first | 001, 007 | — | Médio |
| 021 | Sticky-column split | Responsivo | Split com coluna fixa em desktop | 001 | — | Médio |
| 022 | Landing composition completa | Composição/página | Página completa montada com peças do laboratório | 001, 002, 003, 005, 009, 011, 016, 018, 020 + footer existente | — | Grande |
| 023 | Metadata SEO | SEO/qualidade | `metadata` por página em home, blog e library | — | QLT-002 | Pequeno–médio |
| 024 | Corrigir datas/timezone | Correção | Datas date-only sem deslocamento de fuso | — | QLT-013 | Pequeno |
| 025 | Smoke Playwright estendido | Testes | Cobrir menu mobile e a landing composition | 007, 022 | — | Médio |

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

**Objetivo:** comparação em colunas (antes/depois, com/sem) — estrutura inexistente no lab.
**Entregável:** nova variante em `components/sections/features/` + página `/library` correspondente.
**Critérios de aceite:** data-driven; responsiva (colunas empilham); lint/build/e2e verdes.
**Dependências:** 001. **Finding:** — **Esforço:** Médio–grande.

## 012 — Motion pass (entrance/hover)

**Objetivo:** padrão de animação do laboratório usando CSS/Tailwind/tw-animate-css, com `prefers-reduced-motion` e sem layout shift. Padrão documentado quando implementado.
**Entregável:** classes de animação aplicadas nas sections exemplar + padrão documentado.
**Critérios de aceite:** animações desativam com reduced-motion; sem layout shift; lint/build/e2e verdes.
**Dependências:** 001. **Finding:** nenhum. **Esforço:** Médio.

## 013 — Separator + Skeleton

**Objetivo:** primitivos selecionados por demanda real (estados, separação semântica).
**Entregável:** `components/ui/separator.tsx`, `components/ui/skeleton.tsx`.
**Critérios de aceite:** sem dependência nova; entram no catálogo; lint/build/e2e verdes.
**Dependências:** nenhuma. **Finding:** — **Esforço:** Pequeno.

## 014 — Newsletter com estados

**Objetivo:** lead form que **nasce acessível**: labels associados, feedback de erro/sucesso, interação acessível. Decide o padrão de comportamento mínimo de form do laboratório.
**Entregável:** nova section de form/newsletter + página `/library` correspondente.
**Critérios de aceite:** estados vazio/erro/sucesso renderizáveis; labels já corretos desde a criação; lint/build/e2e verdes.
**Dependências:** 001. **Finding:** QLT-004 (PARCIAL — decisão de comportamento + estados no novo form). **Esforço:** Médio.

## 015 — Labels dos formulários existentes

**Objetivo:** corrigir a associação programática `htmlFor`/`id` nos contact forms legados (`contact-details`, `contact-simple`, `contact-split`). Não é pré-requisito da 014 — a 014 já nasce correta; a 015 corrige o legado.
**Entregável:** labels associados nos 3 contact sections.
**Critérios de aceite:** WCAG 3.3.2/1.3.1 nos forms; lint/build/e2e verdes.
**Dependências:** nenhuma. **Finding:** QLT-008 ✅. **Esforço:** Pequeno.

## 016 — Pricing com toggle

**Objetivo:** pricing com alternância mensal/anual interativa — primeiro client component interativo de section do lab.
**Entregável:** nova variante em `components/sections/pricing/` + página atualizada.
**Critérios de aceite:** toggle acessível; data-driven; lint/build/e2e verdes.
**Dependências:** 001. **Finding:** — **Esforço:** Médio–grande.

## 017 — Accordion acessível

**Objetivo:** primitive de conteúdo expansível, acessível e reutilizável. A escolha entre HTML nativo, primitive existente ou Radix/shadcn será decidida **no Plan da evolução**, após verificar requisitos de comportamento, animação, acessibilidade e dependências. Nada é instalado antes disso.
**Entregável:** accordion em `components/ui/`, entra no catálogo.
**Critérios de aceite:** operável por teclado; animação respeitando reduced-motion; lint/build/e2e verdes.
**Dependências:** nenhuma. **Finding:** — **Esforço:** Médio.

## 018 — FAQ

**Objetivo:** seção FAQ construída sobre o accordion 017 — padrão recorrente em landing pages.
**Entregável:** `components/sections/faq/` + página `/library/faq`.
**Critérios de aceite:** data-driven; lint/build/e2e verdes.
**Dependências:** 017. **Finding:** — **Esforço:** Médio.

## 019 — Padronizar páginas legadas do `/library`

**Objetivo:** migrar as 7 páginas legadas (`hero`, `about`, `services`, `testimonials`, `pricing`, `contact`, `cta`) para o padrão atual do showcase (`metadata`, array tipado, preview `<Component />`, label `<code>{id}</code>`), preservando as categorias novas já adicionadas até aqui. Trata somente as partes de QLT-011 que pertencem diretamente aos arquivos tocados — não é limpeza geral.
**Entregável:** as 7 páginas migradas.
**Critérios de aceite:** padrão uniforme; `metadata` em todas; lint/build/e2e verdes.
**Dependências:** nenhuma. **Findings:** QLT-010 ✅, QLT-011 (PARCIAL — apenas itens dos arquivos tocados). **Esforço:** Médio.

## 020 — Sticky CTA bar

**Objetivo:** CTA fixo mobile-first — variante estrutural nova da área CTA.
**Entregável:** nova variante em `components/sections/cta/` + página atualizada.
**Critérios de aceite:** sticky funcional sem cobrir conteúdo; data-driven; lint/build/e2e verdes.
**Dependências:** 001, 007. **Finding:** — **Esforço:** Médio.

## 021 — Sticky-column split

**Objetivo:** padrão responsivo de split com coluna fixa em desktop (conteúdo + mídia/CTA) — inexistente no lab.
**Entregável:** nova variante de section + página `/library` correspondente.
**Critérios de aceite:** coluna fixa só em desktop; empilha em mobile; lint/build/e2e verdes.
**Dependências:** 001. **Finding:** — **Esforço:** Médio.

## 022 — Landing composition completa

**Objetivo:** demonstração viva do conceito do template: landing completa montada com peças do próprio laboratório.
**Entregável:** página de demonstração com conteúdo coeso, usando: 001 (CTA Split/contrato), 002 (logos), 003 (Hero Media Showcase), 005 (stats), 009 (reviews), 011 (feature comparison), 016 (pricing), 018 (FAQ), 020 (sticky CTA) e o footer existente.
**Critérios de aceite:** monta/desmonta por composição; responsiva; lint/build/e2e verdes.
**Dependências:** apenas as peças listadas. **Finding:** — **Esforço:** Grande.

## 023 — Metadata SEO

**Objetivo:** `metadata` por página em home, blog e páginas do library ainda sem (reaproveitando o padrão de `headers`/`footers`).
**Entregável:** `export const metadata` nas páginas pendentes.
**Critérios de aceite:** `<title>`/`description` únicos por rota; lint/build/e2e verdes.
**Dependências:** nenhuma. **Finding:** QLT-002 ✅. **Esforço:** Pequeno–médio.

## 024 — Corrigir datas/timezone

**Objetivo:** datas date-only sem deslocamento de fuso.
**Entregável:** formatação estável em `lib/blog.ts`/páginas do blog.
**Critérios de aceite:** data date-only renderiza o dia correto; lint/build/e2e verdes.
**Dependências:** nenhuma. **Finding:** QLT-013 ✅. **Esforço:** Pequeno.

## 025 — Smoke Playwright estendido

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
| QLT-011 | 019 | PARCIAL (somente arquivos tocados) |
| QLT-013 | 024 | total |

## Findings futuros

- **QLT-009** (theme light morto / toggle) — exige decisão de produto; permanece para lote futuro. Não inserir toggle artificialmente no lote 01.
- Resíduos de **QLT-003 / QLT-004 / QLT-005 / QLT-011** nos componentes não tocados pelo lote 01 — migram quando forem tocados (estratégia B).
- **QLT-001** e **QLT-012** estão VERIFIED e não fazem parte do roadmap ativo.

## Estado esperado após 025

Esperado ao fim do lote: contrato de props em vigor (1 migração + ~10 novas seções data-driven); primitivos adicionados por demanda real (badge, avatar, separator, skeleton, accordion); mobile nav acessível; padrão de motion com reduced-motion; `/library` padronizada com novas categorias (logos, stats, features/forms, FAQ); 1 landing composition completa; SEO básico nas páginas principais; datas corrigidas; Playwright estendido com menu mobile e composition cobertos, verde em duas execuções consecutivas; lint 0/0 e build PASS permanentes. Findings: 6 tratados por completo, 4 parcialmente. ~25 evoluções reais, sem inflação.

## Critério para iniciar a 001

Working tree limpo em `main` (HEAD = origin/main), roadmap aprovado, nenhuma dependência pendente (a 001 não instala nada). A partir daí, cada evolução segue a `DEFINITION-OF-DONE` vigente (lint + build sempre; `npm run test:e2e` quando afetar o smoke), com `git add` explícito por arquivo.
