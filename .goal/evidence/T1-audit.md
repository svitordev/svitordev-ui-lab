# T1 — Auditoria Breadcrumbs (Goal 033)

Investigação apenas (nenhum código de produção alterado nesta task). Fontes: código atual (`components/ui/*`, `package.json`), roadmap (linhas 406, 418, 466).

## Padrões reais verificados no código

- Primitives usam `React.ComponentProps<"elemento">`, `data-slot="<nome>"`, `cn()` de `@/lib/utils`, named exports, sem `forwardRef`, sem `"use client"` (Server Components puros).
- `asChild` existe apenas onde há Slot: `button.tsx` usa `import { Slot } from "@radix-ui/react-slot"` (dependência `^1.2.4` já instalada — confirmada em `package.json`).
- `lucide-react ^0.554.0` já instalado (confirmado em `package.json`).
- Nomenclatura de arquivos em `components/ui/`: majoritariamente singular (accordion, alert, avatar, badge, button, card, input, separator, skeleton, textarea; exceção tabs).

## Decisão de nome/path

- **`components/ui/breadcrumb.tsx` (singular)** — segue a convenção majoritária real do repositório (10/11 singular) e o upstream shadcn/ui. O roadmap (linha 406) dizia `breadcrumbs.tsx`; a T5 atualizará o roadmap para o path real aprovado aqui.

## API final aprovada (exatamente 6 exports, nada extra)

1. `Breadcrumb` — `<nav>` com `aria-label="breadcrumb"` default (sobrescrevível via props `React.ComponentProps<"nav">`); sem heading hardcoded.
2. `BreadcrumbList` — `<ol>` com flex + wrap responsivo (`flex flex-wrap items-center gap-1.5` + `text-sm`), `data-slot="breadcrumb-list"`.
3. `BreadcrumbItem` — `<li>` simples (`flex items-center gap-1.5`), `data-slot="breadcrumb-item"`, sem semântica extra.
4. `BreadcrumbLink` — `<a>` por padrão; `asChild` via `@radix-ui/react-slot` (opção B — permitida: dependência existe e já é padrão no repo via Button); `data-slot="breadcrumb-link"`; estilo link discreto (`break-words` para hierarquia longa, sem sublinhado default agressivo).
5. `BreadcrumbPage` — elemento não-link (`<span>`) com `aria-current="page"` default, `data-slot="breadcrumb-page"`, fonte de peso médio.
6. `BreadcrumbSeparator` — decorativo: wrapper `<li aria-hidden="true">` (ou span com aria-hidden) com default `ChevronRight` de `lucide-react`; consumer pode sobrescrever via `children`; **sem** prop `icon`.

Sem `BreadcrumbEllipsis`, Dropdown, Menu, Icon, Provider — nenhum consumer real hoje (045 precisa apenas dos 6 acima).

## Semântica / a11y (contrato)

- Estrutura: `nav[aria-label] > ol > li > (a | span[aria-current=page])`, separadores decorativos `aria-hidden="true"` fora da árvore de acessibilidade.
- Server-compatible: sem estado, sem contexto, sem motion, sem hooks de cliente; sem `"use client"`.
- Tokens: apenas tokens semânticos existentes via classes utilitárias padrão do padrão shadcn (`text-muted-foreground`, `hover:text-foreground`, `text-foreground`), sem cor raw.

## Dependências

- Nenhuma nova. Usa apenas: `@radix-ui/react-slot` (instalada), `lucide-react` (instalada), `cn()` local, `react`.

## Arquivos previstos

- T2: `components/ui/breadcrumb.tsx` (criação — nada de demo ainda).
- T3: `app/library/breadcrumbs/page.tsx` (criação, padrão moderno) + `components/sections/library-shell.tsx` (adicionar link "Breadcrumbs" na navigation, Landing permanece última, sem reordenar).
- T4: `tests/smoke.spec.ts` (novos testes: landmark nav com accessible name "breadcrumb", lista ordenada ol, links presentes, aria-current=page no item atual, separador aria-hidden, foco visível por teclado).
- T5: `docs/COMPONENT-CATALOG.md`, `docs/ROADMAP-1000-EVOLUTIONS.md` (033 VERIFIED, path real `breadcrumb.tsx`, próxima 034), `memory-bank/CURRENT-STATE.md`, `memory-bank/CHANGELOG.md`.

## Testes necessários (T4)

- `getByRole('navigation', { name: 'breadcrumb' })` no demo.
- Assert `ol` com `li` filhos na ordem correta; link do nível raiz presente.
- Item atual: `aria-current="page"` presente e não é link.
- Separadores: `aria-hidden="true"` (decorativos, fora da árvore de acessibilidade).
- Foco: teclado alcança o link com foco visível (padrão focus-visible global já existente).
- Armadilhas conhecidas (memória): `getByText` é substring case-insensitive → usar `{ exact: true }` para textos curtos; Radix/Playwright sem `require` em run_playwright_code.

## Riscos

- Baixo. Componente puro, sem estado. Risco único: asserts frágeis por substring (mitigado com `{ exact: true }`).
- Roadmap será corrigido na T5 para o path real (`breadcrumb.tsx`), mantendo consistência catálogo↔código.

## Consumer 045 (confirmada, não implementar agora)

- Roadmap linha 418: 045 (Blog article layout) depende de 033; linha 466: Breadcrumbs 033 → Blog article layout 045. A API acima atende 045 sem exports extras.
