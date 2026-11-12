# T1 — Auditoria Gallery (Goal 034)

Investigação apenas — nenhum código de produção alterado nesta task. Todas as constatações abaixo vêm de leitura direta do código atual (comandos e achados reais ao final).

## 1. Tabs atual auditado (`components/ui/tabs.tsx`)

- Exports: `Tabs` / `TabsList` / `TabsTrigger` / `TabsContent` (exatamente 4, API pública preserva a do Radix).
- Client boundary: `"use client"` está APENAS no primitive (decisão da 029). Server Components podem consumi-lo normalmente — é o que a página `/library/tabs` já faz.
- API: `React.ComponentProps` do primitive Radix correspondente em cada export; controlled/uncontrolled via `value`/`defaultValue`/`onValueChange`; `orientation` preservada.
- `data-slot`: `tabs` / `tabs-list` / `tabs-trigger` / `tabs-content`. `cn()` em todos.
- Estilização: somente tokens (`bg-muted`, `text-muted-foreground`, `data-[state=active]:bg-background` etc.), focus-visible `ring` do projeto, transição `motion-safe`.
- Teclado: herdado do Radix (activation mode automático — setas movem seleção e foco; Home/End). **Já existe cobertura no consumer da demo** (teste `tabs: primitive Radix com selecao por clique, teclado e paineis correspondentes`, smoke.spec.ts:1148 — cobre clique, ArrowRight, ArrowLeft, Home, End, aria-selected e associação aria-controls).
- Dependência: `@radix-ui/react-tabs` ^1.2.1 (já instalada). **Nada em Tabs impede a Gallery — nenhum finding que justifique modificá-lo.**

## 2. Padrões modernos data-driven auditados

De `feature-comparison.tsx`, `hero-media-showcase.tsx`, `hero-primary.tsx`/`hero-steps.tsx` (contratos 001/003/010/016) e `sticky-column-split.tsx`:

- Props: tipos locais exportados; `eyebrow?: string` + `title: string` obrigatório + `description?: string`; arrays de objetos no plural (`options`/`features`/`actions`/`steps`); opcionais condicionais sem defaults internos escondendo conteúdo.
- Item types: `id` string para key; `label` para texto visível; campos de conteúdo opcionais com renderização condicional.
- Header da section: bloco `eyebrow` (p, uppercase, xs) + `h2` + `description` (p, muted) — padrão FeatureComparison.
- Cards de item: `article` com `h3` (padrão sticky-column-split) — hierarquia h1 (página) → h2 (section) → h3 (card).
- Server Component quando não há estado próprio (FeatureComparison, HeroMediaShowcase, StickyColumnSplit são todos Server Components puros).
- Sem links falsos (convenção 001 — só links reais; Gallery não precisa de links).

## 3. Library — naming real

- **Convenção real verificada: rota = nome do grupo do catálogo 1:1** (`features`→`/library/features`, `testimonials`→`/library/testimonials`, `newsletter`→`/library/newsletter`, `pricing`→`/library/pricing`, `contact`→`/library/contact`, `about`→`/library/about`). O roadmap nomeia a categoria **"Gallery"** → **rota `/library/gallery`**, grupo `components/sections/gallery/`.
- Filename da section: precedente exato de "grupo + mecanismo" = `faq-accordion.tsx` (grupo faq, mecanismo accordion). Gallery usa Tabs como mecanismo → **`gallery-tabs.tsx`**, export **`GalleryTabs`** (named export, padrão do repo).
- Library Shell: entrada adicionada após "Breadcrumbs", antes de "Landing" (Landing permanece a última; nada reordenado). Label no shell: "Gallery" (nome oficial do roadmap).
- Metadata: `title: "Library · Gallery"` + `description` real, padrão das demos modernas (metadata + page header + entries locais tipadas + preview boxes + label `Componente:`).

## 4. Mídia — padrão real do projeto

- Grep em `app/`+`components/`+`lib/`: **zero assets de imagem reais usados** (único match: `/__avatar-009-missing__.svg` — src quebrado proposital do teste de fallback do Avatar). `public/` contém apenas os 5 SVGs default do framework, não usados por sections.
- Padrão vigente de mídia visual: **media frame HTML/Tailwind** (HeroMediaShowcase — `figure` + moldura com chrome de janela, `bg-muted`, `rounded`, `shadow-sm`, sem `<img>`).
- Decisão: **placeholder estrutural** — cada card do grid renderiza uma moldura decorativa (`div` com aspect-ratio + tokens `bg-muted`/`border`, `aria-hidden` quando puramente decorativa) + título + descrição. **Sem `<img>`, sem CMS, sem remote image, sem `next/image`, sem asset externo, sem stock photo.** Sem campo `image` na API (nenhum consumer passaria imagem — anti-inflação).

## 5. API final aprovada (derivada da auditoria — roadmap: "Grid de mídia data-driven, estruturalmente distinta, usando Tabs como parte funcional (conjuntos reais da demo)")

```ts
export type GalleryItem = {
  id: string;
  title: string;
  description?: string;
};

export type GallerySet = {
  id: string;
  label: string; // label do TabsTrigger
  items: GalleryItem[]; // conjunto exibido no painel da tab
};

export type GalleryTabsProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  sets: GallerySet[];
};
```

- Tabs = conjuntos (sets); cada painel renderiza um **grid** de cards (moldura placeholder + título + descrição) — "conjuntos reais" do roadmap, não um item por tab.
- Uncontrolled (`defaultValue={sets[0].id}`) — estado é do Radix, **nenhum estado manual no Builder**.
- Server Component (consome o primitive client sem `"use client"` próprio — boundary mínimo: só o Tabs, como a página `/library/tabs` já faz).
- Sem `image`/`icon`/`href`/`action` na API (nenhum consumer real os usaria agora; 044 consumirá conteúdo via props).

## 6. A11y (contrato)

- Hierarquia: h1 (página demo) → h2 (section) → h3 (cards `article`).
- Tabs: teclado/ARIA nativos do Radix (tablist/tab/tabpanel, setas, Home/End, aria-selected, aria-controls) — herdados, sem handlers customizados.
- Conteúdo do painel corresponde ao trigger (associação real via Radix).
- Placeholder de mídia decorativo: `aria-hidden="true"` (sem `<img>` com alt falso).
- Sem links falsos; sem `role` inventado; focus-visible do primitive preservado.
- Grid responsivo (1 col mobile → 2/3 desktop) com zero overflow em 375×667 e 1280×720.

## 7. Testes necessários (T4 — sem duplicar o teste do primitive)

Pelo consumer oficial `/library/gallery` (dual-project), 1 teste abrangente de alto valor: section renderiza com h2 correto; tablist com 3 triggers; tab inicial `aria-selected=true` com painel correspondente; clique na 2ª tab troca o conteúdo; conteúdo ativo corresponde ao trigger; conteúdo inativo não aparece como ativo; 1 passo de teclado (ArrowRight troca seleção — prova do wiring no consumer; cobertura completa já existe no teste do primitive, smoke.spec.ts:1148); zero overflow horizontal. Armadilhas conhecidas: `{ exact: true }` em nomes curtos; asserts sem acentos quando possível.

## 8. Contagens esperadas

- Sections 31 → **32** · UI 12 (inalterado) · total 52 → **53** · rotas 23 → **24** · Playwright 46 → **47 testes** (94 execuções: 91 passed + 3 skipped).

## 9. Riscos

- Baixo. Server Component consumindo client primitive é padrão comprovado (página tabs). Único risco real: asserts frágeis por substring (mitigado com `{ exact: true }`).

## 10. Consumer futuro 044 (confirmado no roadmap, não implementar)

- Roadmap: `044 | Composition: Services page | ... | — | 034, 036, 040` — depende da 034. A API acima atende 044 via props (conjuntos reais de serviços). Criação da Gallery justificada pela regra anti-inflação (consumer real planejado + Tabs como parte funcional).

## Material auditável (comandos reais desta task)

- `grep "\.svg|\.png|\.jpg|next/image" em {app,components,lib}/**` → 1 match (avatar fallback teste) — nenhuma imagem real em produção.
- `list public/` → file.svg, globe.svg, next.svg, vercel.svg, window.svg (defaults não usados).
- Leituras: `components/ui/tabs.tsx` (79 linhas), `components/sections/features/feature-comparison.tsx`, `components/sections/hero/hero-media-showcase.tsx`, `tests/smoke.spec.ts` (teste do primitive na linha 1148), `docs/ROADMAP-1000-EVOLUTIONS.md` (linhas 407, 417), `docs/COMPONENT-CATALOG.md`.
- Nenhuma alteração de código nesta task (T1 é investigação; gates de código aplicam-se às próximas tasks).
