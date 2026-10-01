# COMPONENT-CATALOG.md — Svitordev UI Lab

Índice documental dos componentes reutilizáveis. Catálogo vivo = `/library` (visual) + este índice (documental).

## Contagem total

- **4** UI components
- **6** site components
- **21** section components
- **2** wrappers/shells
- **Total: 33** componentes reutilizáveis relevantes

---

## UI components — `components/ui/` (4)

| Nome | Path | Tipo | Status | Reutilização | Observações |
|---|---|---|---|---|---|
| Button | `components/ui/button.tsx` | Componente base shadcn/ui | Pronto | Alta | CVA variants (default, destructive, outline, secondary, ghost, link); sizes; `asChild` |
| Card | `components/ui/card.tsx` | Componente base shadcn/ui | Pronto | Alta | `Card`, `CardHeader`, `CardFooter`, `CardTitle`, `CardAction`, `CardDescription`, `CardContent` |
| Input | `components/ui/input.tsx` | Componente base shadcn/ui | Pronto | Alta | Sem conteúdo hardcoded |
| Textarea | `components/ui/textarea.tsx` | Componente base shadcn/ui | Pronto | Alta | Sem conteúdo hardcoded |

## Site components — `components/site/` (6)

### Headers — `components/site/headers/` (3)

| Nome | Path | Tipo | Status | Reutilização | Observações |
|---|---|---|---|---|---|
| HeaderBasic | `components/site/headers/header-basic.tsx` | Header | Template | Média | Logo/textos hardcoded; nav com hash anchors |
| HeaderCentered | `components/site/headers/header-centered.tsx` | Header | Template | Média | Logo/textos hardcoded; centralizado |
| HeaderWithTopbar | `components/site/headers/header-with-topbar.tsx` | Header | Template | Média | Topbar com telefone/email; logo/textos hardcoded |

### Footers — `components/site/footers/` (3)

| Nome | Path | Tipo | Status | Reutilização | Observações |
|---|---|---|---|---|---|
| FooterColumns | `components/site/footers/footer-columns.tsx` | Footer | Template | Média | Links/textos hardcoded; ano dinâmico |
| FooterCta | `components/site/footers/footer-cta.tsx` | Footer | Template | Média | CTA com botão |
| FooterSimple | `components/site/footers/footer-simple.tsx` | Footer | Template | Média | Minimalista |

## Section components — `components/sections/` (21)

### Hero — `components/sections/hero/` (3)

| Nome | Path | Status | Observações |
|---|---|---|---|
| HeroCenterCta | `components/sections/hero/hero-center-cta.tsx` | Template | CTA central |
| HeroPrimary | `components/sections/hero/hero-primary.tsx` | Template | Layout principal |
| HeroSteps | `components/sections/hero/hero-steps.tsx` | Template | Hero com passos |

### About — `components/sections/about/` (3)

| Nome | Path | Status | Observações |
|---|---|---|---|
| AboutSimple | `components/sections/about/about-simple.tsx` | Template | Layout simples |
| AboutSplit | `components/sections/about/about-split.tsx` | Template | Layout dividido |
| AboutTimeline | `components/sections/about/about-timeline.tsx` | Template | Timeline |

### Services — `components/sections/services/` (3)

| Nome | Path | Status | Observações |
|---|---|---|---|
| ServicesGridSimple | `components/sections/services/services-grid-simple.tsx` | Template | Grade simples |
| ServicesSplitWithHighlight | `components/sections/services/services-split-with-highlight.tsx` | Template | Dividido com destaque |
| ServicesWithIcons | `components/sections/services/services-with-icons.tsx` | Template | Com ícones |

### Testimonials — `components/sections/testimonials/` (3)

| Nome | Path | Status | Observações |
|---|---|---|---|
| TestimonialsColumns | `components/sections/testimonials/testimonials-columns.tsx` | Template | Colunas |
| TestimonialsGrid | `components/sections/testimonials/testimonials-grid.tsx` | Template | Grade |
| TestimonialsHighlight | `components/sections/testimonials/testimonials-highlight.tsx` | Template | Destaque |

### Pricing — `components/sections/pricing/` (3)

| Nome | Path | Status | Observações |
|---|---|---|---|
| PricingHighlight | `components/sections/pricing/pricing-highlight.tsx` | Template | Destaque |
| PricingSimpleCards | `components/sections/pricing/pricing-simple-cards.tsx` | Template | Cards simples |
| PricingThreeTiers | `components/sections/pricing/pricing-three-tiers.tsx` | Template | 3 planos |

### Contact — `components/sections/contact/` (3)

| Nome | Path | Status | Observações |
|---|---|---|---|
| ContactDetails | `components/sections/contact/contact-details.tsx` | Template | Detalhes + form |
| ContactSimple | `components/sections/contact/contact-simple.tsx` | Template | Form simples |
| ContactSplit | `components/sections/contact/contact-split.tsx` | Template | Dividido |

### CTA — `components/sections/cta/` (3)

| Nome | Path | Status | Observações |
|---|---|---|---|
| CtaBanner | `components/sections/cta/cta-banner.tsx` | Template | Banner |
| CtaSimple | `components/sections/cta/cta-simple.tsx` | Template | CTA simples |
| CtaSplit | `components/sections/cta/cta-split.tsx` | Template | Dividido |

## Wrappers / shells (2)

| Nome | Path | Finalidade |
|---|---|---|
| SectionsShell | `components/sections/library-shell.tsx` | Wrapper de navegação do `/library` |
| Library layout | `app/library/layout.tsx` | Wrapper que aplica `SectionsShell` |

---

## Observações de reutilização

- Componentes `ui/` são base e sem conteúdo hardcoded (prontos para reutilização direta).
- Componentes `site/` e `sections/` são **templates** — estrutura reutilizável, mas com conteúdo hardcoded que deve ser substituído por dados do projeto.
- Catálogo vivo (preview visual) = `/library`.
