# T3 — Demo /library/breadcrumbs + integração

Arquivos alterados:
- `app/library/breadcrumbs/page.tsx` (criado) — Server Component, metadata, page header, entries locais tipadas (`BreadcrumbsEntry`), preview boxes no padrão das demos modernas (ex.: `app/library/tabs/page.tsx`), label "Componente:".
- `components/sections/library-shell.tsx` (modificado) — adicionado `{ href: "/library/breadcrumbs", label: "Breadcrumbs" }` após Tabs; **Landing permanece a última**; nenhuma outra categoria reordenada.

## Conteúdo do demo

- Entrada 1 (`breadcrumb`): hierarquia simples — `BreadcrumbLink href="/library"` (caminho `<a>` default) + separador default + `BreadcrumbPage` (aria-current="page").
- Entrada 2 (`breadcrumb-aschild`): três níveis com `asChild` renderizando `next/link` — prova o contrato de composição aprovado na T1.
- Sem estado, sem motion, sem "use client", apenas tokens existentes.

## Resultados dos gates (executados de fato)

- `npm run lint` → 0 erros, 0 warnings.
- `npm run build` → compilado com sucesso, TypeScript ok, **23 rotas** (22 + `/library/breadcrumbs` confirmada na listagem).
- `git diff --check` → limpo.
