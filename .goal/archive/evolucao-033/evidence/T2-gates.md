# T2 — Gates do primitive breadcrumb

Arquivo criado: `components/ui/breadcrumb.tsx` (único arquivo de produção alterado nesta task — sem demo, conforme plano).

## Conformidade com o contrato aprovado na T1

- Exatamente 6 exports: Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator — nenhum export extra.
- `Breadcrumb` = `nav` com `aria-label="breadcrumb"` default sobrescrevível (props espalhadas depois do default).
- `BreadcrumbList` = `ol` flex flex-wrap gap-1.5 text-sm.
- `BreadcrumbItem` = `li` sem semântica extra.
- `BreadcrumbLink` = `a` por padrão, `asChild` via `@radix-ui/react-slot` (dependência já instalada, padrão do repo via Button).
- `BreadcrumbPage` = `span` não-link com `aria-current="page"` default.
- `BreadcrumbSeparator` = `li` decorativo com `role="presentation"` + `aria-hidden="true"`, default `ChevronRight` (lucide-react, já instalada), children sobrescrevíveis, sem prop `icon`.
- `data-slot` em todos os 6; `cn()` em todos os elementos com className; `React.ComponentProps<...>`; sem `forwardRef`; sem `"use client"` (Server-compatible); sem estado/contexto/motion; sem cor raw (apenas tokens `text-muted-foreground`/`text-foreground`); nenhuma dependência nova.

## Resultados dos gates (executados de fato)

- `npm run lint` → 0 erros, 0 warnings.
- `npm run build` → compilado com sucesso, TypeScript ok, 22 rotas (sem nova rota ainda — demo é T3).
- `git diff --check` → limpo.
