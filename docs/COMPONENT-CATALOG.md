# COMPONENT-CATALOG.md — Svitordev UI Lab

Índice documental dos componentes reutilizáveis. Catálogo vivo = `/library` (visual) + este índice (documental).

## Contagem total

- **12** UI components
- **7** site components
- **31** section components
- **2** wrappers/shells
- **Total: 52** componentes reutilizáveis relevantes

---

## UI components — `components/ui/` (12)

| Nome | Path | Tipo | Status | Reutilização | Observações |
|---|---|---|---|---|---|
| Button | `components/ui/button.tsx` | Componente base shadcn/ui | Pronto | Alta | CVA variants (default, destructive, outline, secondary, ghost, link); sizes; `asChild` |
| Card | `components/ui/card.tsx` | Componente base shadcn/ui | Pronto | Alta | `Card`, `CardHeader`, `CardFooter`, `CardTitle`, `CardAction`, `CardDescription`, `CardContent` |
| Input | `components/ui/input.tsx` | Componente base shadcn/ui | Pronto | Alta | Sem conteúdo hardcoded |
| Textarea | `components/ui/textarea.tsx` | Componente base shadcn/ui | Pronto | Alta | Sem conteúdo hardcoded |
| Badge | `components/ui/badge.tsx` | Componente base shadcn/ui | Pronto | Alta | **Evolução 004.** `<span>` não interativo; CVA com variantes `default`/`secondary`/`outline` (tokens, sem cor hardcoded); `data-slot`; `cn()`; sem sizes, sem `asChild`, sem motion; consumido por 005 |
| Avatar | `components/ui/avatar.tsx` | Primitive de UI (Radix) | Pronto | Alta | **Evolução 008.** Baseado em `@radix-ui/react-avatar`; Client Component; API composicional `Avatar`/`AvatarImage`/`AvatarFallback`; tamanho base único; `className` + `data-slot` (`avatar`/`avatar-image`/`avatar-fallback`); imagem com `object-cover`; fallback com tokens existentes (conteúdo do consumer); `alt` controlado pelo consumer; sem geração automática de iniciais, sem size variants, sem status, sem AvatarGroup, sem interatividade própria; consumido por 009 |
| Separator | `components/ui/separator.tsx` | Primitive de UI (nativo) | Pronto | Alta | **Evolução 013.** Implementação nativa, zero dependências; Server Component; único `<div>`; orientação `horizontal` (default) / `vertical`; `decorative=true` por padrão — modo decorativo sem `role`/`aria-orientation`; modo semântico (`decorative=false`) com `role="separator"` + `aria-orientation` derivado de `orientation`; `decorative`/`orientation` são fonte de verdade — consumer não sobrescreve os atributos controlados; `data-slot="separator"` + `data-orientation`; `className` via `cn()`; `bg-border`; horizontal `h-px w-full` / vertical `h-full w-px`; sem CVA, sem variants, sem sizes |
| Skeleton | `components/ui/skeleton.tsx` | Primitive de UI (nativo) | Pronto | Alta | **Evolução 013.** Primitive visual de loading; Server Component; `React.ComponentProps<"div">` — dimensões definidas pelo consumer via `className`; `data-slot="skeleton"`; `bg-muted` + `rounded-md`; `motion-safe:animate-pulse` (reduced motion → estático); sem `role="status"`/`aria-live`/`aria-busy` automáticos — anunciar loading é responsabilidade do consumer/container; sem variants, sem size API, sem composed skeletons; sem consumer ainda |
| Accordion | `components/ui/accordion.tsx` | Primitive de UI (Radix) | Pronto | Alta | **Evolução 017.** Compound primitive acessível de disclosure; baseado em `@radix-ui/react-accordion` (^1.3.1, dependência aprovada); Client Component; API nativa do Radix preservada — `type="single"` (com `collapsible`) / `type="multiple"`, controlled (`value`/`onValueChange`) e uncontrolled (`defaultValue`), sem state wrapper próprio; exatamente 4 exports públicos `Accordion`/`AccordionItem`/`AccordionTrigger`/`AccordionContent` (o `Header` do Radix é interno ao Trigger, sem export); keyboard semantics e ARIA (`aria-expanded`, associação Trigger/Content) fornecidos pelo Radix, sem handlers customizados; focus-visible coerente com Button; `ChevronDown` decorativo com `aria-hidden="true"` explícito, rotaciona 180° pelo `data-state` do Trigger — a rotação acontece também com reduced motion (instantânea), apenas a transição é `motion-safe`; Content sem animação, spacing neutro, `overflow-hidden`; `data-slot` (`accordion`/`accordion-item`/`accordion-trigger`/`accordion-content`); `className` via `cn()` nos quatro; visual neutro sem Card/shadow; primeiro consumer real: `FaqAccordion` (Evolução 018); validação runtime visual/keyboard concluída na Evolução 018 — single, collapsible, ARIA, keyboard, foco, Chevron e reduced motion confirmados |
| Alert | `components/ui/alert.tsx` | Primitive de UI (nativo) | Pronto | Alta | **Evolução 027.** Primitive estático de feedback; Server Component, zero dependências; CVA com variantes `default`/`destructive` (somente tokens existentes — nenhum token novo, nenhuma cor raw); `data-slot` (`alert`/`alert-title`/`alert-description`); `cn()`; `React.ComponentProps<"div">` nos três exports — aceita props HTML normais; NÃO impõe `role`/`aria-live` (semântica live é do consumer); destructive com styling contextual também na description; sem `forwardRef`, sem `asChild`, sem sizes, sem motion, sem ícone automático (suporta `svg` como child); exports `Alert`/`AlertTitle`/`AlertDescription` + `alertVariants` (1 entrada de catálogo); demo em `/library/alerts`; consumers planejados (ainda não executados): 028 — Contact forms e 042 — Contact page |
| Tabs | `components/ui/tabs.tsx` | Primitive de UI (Radix) | Pronto | Alta | **Evolução 029.** Primitive de abas; baseado em `@radix-ui/react-tabs` (^1.2.1, única dependência nova — teclado/foco/ARIA nativos do Radix, consistência com Accordion/Avatar; a versão `^1.3.1` citada no plano não existe no registry); Client Component (boundary apenas no primitive); API pública preserva a API do Radix — controlled/uncontrolled via `value`/`defaultValue`/`onValueChange`, `orientation` preservada pelas props do Root; activation mode padrão do Radix preservado (automático — setas movem seleção e foco; Home/End; sem wrappers ou estado extra); `data-slot` (`tabs`/`tabs-list`/`tabs-trigger`/`tabs-content`); `cn()`; `React.ComponentProps` do primitive Radix correspondente em cada export; visual somente tokens (focus-visible `ring` do projeto, `bg-muted`, `data-[state=active]` com `bg-background`/`shadow-sm`, disabled `opacity-50`); transição CSS simples `motion-safe`; sem variants extras; exports `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent` (1 entrada de catálogo); demo em `/library/tabs`; consumer planejado (ainda não executado): 034 — Gallery |
| Breadcrumbs | `components/ui/breadcrumb.tsx` | Primitive de UI (nativo) | Pronto | Alta | **Evolução 033.** Navegação hierárquica semântica; Server Component; zero dependências novas (`@radix-ui/react-slot` e `lucide-react` já existentes); exatamente 6 exports `Breadcrumb`/`BreadcrumbList`/`BreadcrumbItem`/`BreadcrumbLink`/`BreadcrumbPage`/`BreadcrumbSeparator`; `nav` com `aria-label="breadcrumb"` default sobrescrevível; `ol`/`li` na semântica; `BreadcrumbPage` não-link com `aria-current="page"` default; separador decorativo `role="presentation"` + `aria-hidden="true"` com `ChevronRight` default (lucide-react), children sobrescrevível, sem prop `icon`; `asChild` via Slot somente em `BreadcrumbLink`; `data-slot` nos seis; `cn()`; `React.ComponentProps`; sem `forwardRef`, sem estado, sem contexto, sem motion, sem cor raw; demo em `/library/breadcrumbs`; consumer planejado (ainda não executado): 045 — Blog article layout |

Contrato do Separator (resumo):

```ts
type SeparatorProps = React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}
```

Exports públicos do Accordion (resumo — API nativa do Radix preservada):

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>...</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
</Accordion>

<Accordion type="multiple">...</Accordion>
```

Exports: `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`. Controlled/uncontrolled via `value`/`defaultValue`/`onValueChange` do Radix. `AccordionHeader` não é export público.

Contrato do Alert (resumo):

```tsx
<Alert variant="default | destructive">
  <AlertTitle>...</AlertTitle>
  <AlertDescription>...</AlertDescription>
</Alert>
```

`React.ComponentProps<"div">` + `VariantProps` da CVA; container estático Server-compatible; `data-slot` em todos; o primitive NÃO impõe `role="alert"`/`role="status"`/`aria-live` — o consumer fornece quando necessário. Exports: `Alert`, `AlertTitle`, `AlertDescription`, `alertVariants`.

Contrato do Tabs (resumo — API nativa do Radix preservada):

```tsx
<Tabs defaultValue="...">
  <TabsList>
    <TabsTrigger value="...">...</TabsTrigger>
  </TabsList>
  <TabsContent value="...">...</TabsContent>
</Tabs>
```

Exports: `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`. Controlled/uncontrolled via `value`/`defaultValue`/`onValueChange` do Radix; `orientation` do Radix preservada; activation mode padrão (automático) sem wrappers.

Contrato do Breadcrumbs (resumo):

```tsx
<Breadcrumb> {/* nav, aria-label="breadcrumb" default */}
  <BreadcrumbList> {/* ol */}
    <BreadcrumbItem> {/* li */}
      <BreadcrumbLink href="...">...</BreadcrumbLink> {/* a; asChild via Slot */}
    </BreadcrumbItem>
    <BreadcrumbSeparator /> {/* li decorativo, aria-hidden, ChevronRight default */}
    <BreadcrumbItem>
      <BreadcrumbPage>...</BreadcrumbPage> {/* span não-link, aria-current="page" */}
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

`React.ComponentProps` do elemento nativo correspondente em cada export; `asChild` apenas em `BreadcrumbLink` (`@radix-ui/react-slot`, dependência existente); `data-slot` nos seis exports; separador decorativo com children sobrescrevíveis e sem prop `icon`; `BreadcrumbPage` não-link com `aria-current="page"` default. Server-compatible, sem estado, sem contexto, sem motion. Exports: `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`.

## Site components — `components/site/` (7)

### Headers — `components/site/headers/` (4)

| Nome | Path | Tipo | Status | Reutilização | Observações |
|---|---|---|---|---|---|
| HeaderBasic | `components/site/headers/header-basic.tsx` | Header | Template | Média | Logo/textos hardcoded; nav com hash anchors; **Evolução 007:** `MobileNav` no grupo direito (após o CTA) |
| HeaderCentered | `components/site/headers/header-centered.tsx` | Header | Template | Média | Logo/textos hardcoded; centralizado; sem MobileNav — decisão Evolução 007 (flex-wrap funciona em mobile) |
| HeaderWithTopbar | `components/site/headers/header-with-topbar.tsx` | Header | Template | Média | Topbar com telefone/email; logo/textos hardcoded; **Evolução 007:** `MobileNav` na linha principal |
| MobileNav | `components/site/headers/mobile-nav.tsx` | Componente interativo compartilhado (Client) | Pronto | Alta | **Evolução 007.** Contrato `MobileNavLink`/`MobileNavProps` (somente `links`); `Button` ghost/icon-lg (Menu/X) com `aria-label` dinâmico, `aria-expanded`, `aria-controls` via `useId`; painel condicional `<nav aria-label="Navegação principal">` com `ul[role=list]`; fecha por botão/Escape (devolve foco)/clique fora; sem Sheet/portal/focus trap; visível só abaixo de `md`; usado por HeaderBasic e HeaderWithTopbar |

### Footers — `components/site/footers/` (3)

| Nome | Path | Tipo | Status | Reutilização | Observações |
|---|---|---|---|---|---|
| FooterColumns | `components/site/footers/footer-columns.tsx` | Footer | Template | Média | Links/textos hardcoded; ano dinâmico |
| FooterCta | `components/site/footers/footer-cta.tsx` | Footer | Template | Média | CTA com botão |
| FooterSimple | `components/site/footers/footer-simple.tsx` | Footer | Template | Média | Minimalista |

## Section components — `components/sections/` (31)

### Hero — `components/sections/hero/` (4)

| Nome | Path | Status | Observações |
|---|---|---|---|
| HeroCenterCta | `components/sections/hero/hero-center-cta.tsx` | Pronto | **Data-driven** (Evolução 010, migração — visual preservado). Contrato `HeroCenterAction`/`HeroCenterCtaProps` (tipos locais); `title` obrigatório; `description?`/`supportingText?`/`actions?`; uso típico de 1–2 actions (ausente/vazio → sem bloco de CTA); `Button asChild` — internos via `next/link`, protocolos/externos via `<a>`; sem eyebrow; sem `className` público; Server Component; demo na `/library/hero` (consumer) |
| HeroPrimary | `components/sections/hero/hero-primary.tsx` | Pronto | **Data-driven** (Evolução 031, migração — visual preservado). Contrato `HeroPrimaryAction`/`HeroPrimaryProps` (tipos locais); `title`/`actions` obrigatórios; `eyebrow?`/`description?`/`supportingText?`/`mediaTitle?`/`mediaBadge?`; sem defaults internos; `Button asChild` size lg — internos via `next/link`, protocolos/externos via `<a>` (convenção 001); media frame estrutural com rótulos vindos do consumer; Server Component; demo na `/library/hero` (consumer) |
| HeroSteps | `components/sections/hero/hero-steps.tsx` | Pronto | **Data-driven** (Evolução 032, migração — visual preservado). Tipos locais `HeroStep`/`HeroStepsAction`/`HeroStepsProps`; `title`/`steps` obrigatórios; `description?`/`action?`/`supportingText?` opcionais com renderização condicional; sem defaults internos; CTA único — internos via `next/link`, protocolos/externos via `<a>` (convenção 001); heading hierarchy sem skip (principal h1 + steps h2, Evolução 032); Server Component; consumers: home (`heroStepsHomeData`) e `/library/hero` (`heroStepsDemo`) |
| HeroMediaShowcase | `components/sections/hero/hero-media-showcase.tsx` | Pronto | **Data-driven** (Evolução 003). Composição vertical/showcase: conteúdo editorial centralizado no topo + media frame dominante full-width (mock HTML/Tailwind, sem imagem) + `figcaption` opcional; Server Component; entrance discreto via CSS/tw-animate-css — fade + pequeno translate-y, `motion-safe` (Evolução 012), estado final visível com reduced motion; demo na `/library/hero` |

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

### Testimonials — `components/sections/testimonials/` (4)

| Nome | Path | Status | Observações |
|---|---|---|---|
| TestimonialsColumns | `components/sections/testimonials/testimonials-columns.tsx` | Template | Colunas |
| TestimonialsGrid | `components/sections/testimonials/testimonials-grid.tsx` | Template | Grade |
| TestimonialsHighlight | `components/sections/testimonials/testimonials-highlight.tsx` | Template | Destaque |
| TestimonialsRatingCards | `components/sections/testimonials/testimonials-rating-cards.tsx` | Pronto | **Data-driven** (Evolução 009). Rating + Avatar + review cards — quarta variante estrutural do grupo; contrato `ReviewItem`/`ReviewAvatar`/`TestimonialsRatingCardsProps` (tipos locais); rating inteiro 1–5 com normalização defensiva; exatamente 5 estrelas Lucide, accessible name `N de 5 estrelas`, ícones `aria-hidden`; semântica `article`/`blockquote`/`footer`; `avatar` obrigatório por item (`src` opcional, `fallback` obrigatório, sem geração automática de initials); `role` opcional; sem `className` público; Server Component consumindo o Avatar (client); layout 1 coluna mobile / 3 desktop; microinteraction de hover — translate-y mínimo + shadow discreto, protegida por `motion-safe`, estático com reduced motion (Evolução 012); sem ações interativas; demo na `/library/testimonials` (Variação 04) |

### Pricing — `components/sections/pricing/` (3)

| Nome | Path | Status | Observações |
|---|---|---|---|
| PricingHighlight | `components/sections/pricing/pricing-highlight.tsx` | Template | Destaque |
| PricingSimpleCards | `components/sections/pricing/pricing-simple-cards.tsx` | Template | Cards simples |
| PricingThreeTiers | `components/sections/pricing/pricing-three-tiers.tsx` | Pronto | **Data-driven** (Evolução 016, migração — visual preservado). Client Component justificado (estado do intervalo); toggle mensal/anual como grupo acessível `role="group"` com dois botões `aria-pressed` (selecionado = `default`, não selecionado = `outline`); teclado nativo; estado inicial `monthly`; preços como strings completas fornecidas pelo consumer (sem cálculo comercial); `featured` controla apenas o destaque do card; `action.variant` controla a variant do CTA; CTAs como links reais (convenção 001); features `string[]`; sem Badge forçado, sem `aria-live`, sem motion novo, sem dependência nova; consumers: `/library/pricing` (Variação 01) e home |

Contrato (resumo):

```ts
PricingInterval = "monthly" | "yearly"

PricingAction {
  label: string
  href: string
  variant?: "default" | "outline"
}

PricingPlan {
  name: string
  description?: string
  prices: Record<PricingInterval, string>
  features: string[]
  action: PricingAction
  featured?: boolean
}

PricingThreeTiersProps {
  eyebrow?: string
  title: string
  description?: string
  billingLabel: string
  monthlyLabel: string
  yearlyLabel: string
  plans: PricingPlan[]
}
```

### Contact — `components/sections/contact/` (3)

| Nome | Path | Status | Observações |
|---|---|---|---|
| ContactDetails | `components/sections/contact/contact-details.tsx` | Template | Detalhes + form; labels associados programaticamente (`htmlFor` + ids exclusivos — Evolução 015); 2 campos corretamente nomeados |
| ContactSimple | `components/sections/contact/contact-simple.tsx` | Template | Form simples; labels associados programaticamente (`htmlFor` + ids exclusivos — Evolução 015); 4 campos corretamente nomeados |
| ContactSplit | `components/sections/contact/contact-split.tsx` | Template | Dividido; labels associados programaticamente (`htmlFor` + ids exclusivos — Evolução 015); 4 campos corretamente nomeados |

### Newsletter — `components/sections/newsletter/` (1)

| Nome | Path | Status | Observações |
|---|---|---|---|
| NewsletterForm | `components/sections/newsletter/newsletter-form.tsx` | Pronto | **Data-driven — primeiro form funcional do Lab** (Evolução 014). Client Component justificado (estado, `useId`, submit); callback externo `onSubmit` — sem backend acoplado; estados idle/submitting/success/error; email controlado; `type="email"` + `required` + `autoComplete="email"`; label real com `htmlFor`/`useId`; input/button disabled em submitting; `aria-busy` no form; live region persistente única (`role="status"`, `aria-live="polite"`, `aria-atomic`); erro com `aria-invalid` + `aria-describedby`; success limpa o campo e remove o estado de erro; editar após success/error volta para idle; retry permitido; mobile stack / desktop inline; sem motion, sem dependência nova; demo na `/library/newsletter` |

Contrato (resumo):

```ts
NewsletterSubmitResult =
  | { success: true }
  | { success: false; message?: string }

NewsletterFormProps {
  eyebrow?: string
  title: string
  description?: string
  label: string
  placeholder?: string
  buttonLabel: string
  submittingLabel: string
  successMessage: string
  errorMessage: string
  onSubmit: (email: string) => Promise<NewsletterSubmitResult> | NewsletterSubmitResult
}
```

Estados: `idle → submitting → success | error`. Submitting desabilita input/button; success limpa o input; error preserva o input; editar após success/error volta para idle; retry permitido.

Acessibilidade: `<label htmlFor>` + `useId`; `aria-busy` durante submitting; live region persistente única `role="status"` (`aria-live="polite"`, `aria-atomic`); erro com `aria-invalid` + `aria-describedby`; success remove o estado de erro.

### CTA — `components/sections/cta/` (5)

| Nome | Path | Status | Observações |
|---|---|---|---|
| CtaBanner | `components/sections/cta/cta-banner.tsx` | Template | Banner |
| CtaSimple | `components/sections/cta/cta-simple.tsx` | Template | CTA simples |
| CtaSplit | `components/sections/cta/cta-split.tsx` | Template | Dividido |
| CtaSplitActions | `components/sections/cta/cta-split-actions.tsx` | Pronto | **Data-driven — contrato exemplar** (Evolução 001). Coluna editorial + painel de conversão; Server Component; links internos via `next/link`, protocolos/externos via `<a>` |
| StickyCtaBar | `components/sections/cta/sticky-cta-bar.tsx` | Pronto | **Data-driven** (Evolução 020). CTA compacta e persistente; `position: sticky; bottom: 0` — o comportamento sticky fica limitado pelo containing/scroll block no qual o componente é inserido (não é `fixed`, não gruda no viewport global); Server Component; CSS-only — sem scroll listeners, sem state; actions reais via `Button asChild` — internos via `next/link`, protocolos/externos via `<a>`; mobile-first (copy + actions empilhadas), horizontal em desktop; root `<aside>`; sem motion, sem z-index customizado, sem compensação de safe-area; sem dependência nova; demo na `/library/cta` (scroll container próprio da página) |

Contrato do StickyCtaBar (resumo):

```ts
export type StickyCtaAction = {
  label: string
  href: string
  variant?: "default" | "outline"
}

export type StickyCtaBarProps = {
  title: string
  description?: string
  actions: StickyCtaAction[]
}
```

### Logos — `components/sections/logos/` (1)

| Nome | Path | Status | Observações |
|---|---|---|---|
| LogosStrip | `components/sections/logos/logos-strip.tsx` | Pronto | **Data-driven** (Evolução 002). Faixa de wordmarks tipográficos; Server Component; sem imagem/links/motion; demo na `/library/logos` |

### Stats — `components/sections/stats/` (1)

| Nome | Path | Status | Observações |
|---|---|---|---|
| StatsGrid | `components/sections/stats/stats-grid.tsx` | Pronto | **Data-driven** (Evolução 005). Grid de números de destaque (`value` + `label` + `description` opcional) com badge de contexto via `Badge` (004); Server Component; `ul[role=list]` 2 colunas no mobile / 4 no desktop; sem motion; demo na `/library/stats` |

### Features — `components/sections/features/` (2)

| Nome | Path | Status | Observações |
|---|---|---|---|
| FeatureComparison | `components/sections/features/feature-comparison.tsx` | Pronto | **Data-driven** (Evolução 011). Tabela HTML semântica real de recursos entre opções dinâmicas; `values` keyed por `ComparisonOption.id`; `boolean \| string`; fallback defensivo para valor ausente (distinto de `false`); `Recurso` como primeiro column header; `scope="col"`/`scope="row"`; Check/X Lucide `aria-hidden` com textos acessíveis via sr-only (Incluído/Não incluído/Não informado); Server Component; mobile com scroll horizontal interno controlado; sem pricing, sem CTA, sem highlight, sem grupos, sem JS responsivo; demo na `/library/features` |
| StickyColumnSplit | `components/sections/features/sticky-column-split.tsx` | Pronto | **Data-driven** (Evolução 021). Section editorial de duas colunas — coluna de contexto à esquerda, conteúdo detalhado à direita; responsiva: mobile em fluxo normal, `md` grid de 2 colunas ainda sem sticky, `lg+` coluna esquerda sticky (`md:self-start lg:sticky lg:top-8`) limitada pelo containing block; Server Component; CSS-only — sem JS de scroll, sem scrollspy; items semânticos `<article>` (título `h3` + descrição); root `<section>`; sem z-index customizado, sem motion, sem dependência nova; demo na `/library/features` |

Contrato do StickyColumnSplit (resumo):

```ts
export type StickyColumnItem = {
  title: string
  description: string
}

export type StickyColumnSplitProps = {
  eyebrow?: string
  title: string
  description?: string
  items: StickyColumnItem[]
}
```

Contrato (resumo):

```ts
ComparisonValue = boolean | string

ComparisonOption {
  id: string
  label: string
}

ComparisonFeature {
  label: string
  values: Record<string, ComparisonValue>
}

FeatureComparisonProps {
  eyebrow?: string
  title: string
  description?: string
  options: ComparisonOption[]
  features: ComparisonFeature[]
}
```

### FAQ — `components/sections/faq/` (1)

| Nome | Path | Status | Observações |
|---|---|---|---|
| FaqAccordion | `components/sections/faq/faq-accordion.tsx` | Pronto | **Data-driven** (Evolução 018). FAQ reutilizável — primeiro consumer real do Accordion (017); contrato simples (`FaqItem`/`FaqAccordionProps` — tipos locais); Server Component (sem `"use client"`); `answer: string`; `type="single"` + `collapsible` — uma resposta por vez, item aberto pode colapsar; nenhum state wrapper próprio (o estado vive no primitive Client); visual editorial/neutro; sem Card por item; sem motion adicional; nenhuma dependência nova; demo na `/library/faq` |

Contrato (resumo):

```ts
export type FaqItem = {
  question: string
  answer: string
}

export type FaqAccordionProps = {
  eyebrow?: string
  title: string
  description?: string
  items: FaqItem[]
}
```

Server/Client boundary: `FaqAccordion` = Server Component; Accordion primitive = Client Component. A página `/library/faq` também é Server Component.

Modo: `<Accordion type="single" collapsible>`, sem wrapper de estado próprio.

Semântica: título da section em `h2`; perguntas usam o Header interno do Radix; Trigger permanece o `button` real do Radix; nenhum heading manual duplicado; ARIA de disclosure fornecida pelo Radix.

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
