# ARQUITETURA.md — Svitordev UI Lab

Arquitetura real atual do repositório.

## Stack

- Next.js 16.0.3 (App Router)
- React 19.2.0 / React DOM 19.2.0
- TypeScript 5 (strict)
- Tailwind CSS 4 (config **inline** em `app/globals.css`, sem `tailwind.config.ts`)
- shadcn/ui (style new-york)
- `tw-animate-css` 1.4.0
- lucide-react
- class-variance-authority, clsx, tailwind-merge
- ESLint 9 (flat config)

## Estrutura oficial (DEC-002)

```
app/
components/
lib/
public/
```

- **`src/` NÃO será introduzido.** A estrutura atual é a oficial.
- Categorias novas (`layouts/`, `patterns/`, `compositions/`) só serão adicionadas quando houver necessidade real, nunca vazias.

## `app/`

- `app/layout.tsx` — layout raiz (metadata, `lang="pt-br"`, dark por padrão via classe `dark`).
- `app/globals.css` — import do Tailwind + `tw-animate-css`, `@theme inline`, tokens light/dark.
- `app/page.tsx` — página inicial.
- `app/(site)/` — **route group** de rotas do site (parênteses = sem segmento de URL):
  - `layout.tsx` — layout do site (header + main + footer).
  - `page.tsx` — home com seções empilhadas.
  - `blog/page.tsx` — listagem de posts.
  - `blog/[slug]/page.tsx` — rota dinâmica de post (hoje vazia — ver problema conhecido).
- `app/library/` — showcase oficial (ver DEC-001):
  - `layout.tsx` — wrapper com `SectionsShell`.
  - `page.tsx` — índice/redirect.
  - `[categoria]/page.tsx` — uma página por grupo (headers, footers, hero, about, services, testimonials, pricing, contact, cta).

## `components/`

- `components/ui/` — **4** componentes base shadcn/ui (`button`, `card`, `input`, `textarea`).
- `components/site/` — **6** componentes de site:
  - `headers/` (3), `footers/` (3).
- `components/sections/` — **21** seções (7 grupos × 3):
  - `hero/`, `about/`, `services/`, `testimonials/`, `pricing/`, `contact/`, `cta/`.
  - `library-shell.tsx` — wrapper de navegação do `/library`.

## `lib/`

- `lib/utils.ts` — `cn()` (clsx + tailwind-merge), utilitário padrão shadcn/ui.

## `public/`

- Assets estáticos (imagens, fontes, ícones).

## App Router / route groups

- Uso de **route groups** com `(site)` para organizar rotas sem influenciar a URL.
- Layouts aninhados (`app/(site)/layout.tsx`, `app/library/layout.tsx`).
- Rutas dinâmicas (`[slug]`) para conteúdo variável.

## Componentes / sections

- Seções como blocos reutilizáveis que compõem páginas.
- Componentes de site (headers/footers) reaproveitados em layouts.
- `ui/` como base temática (CSS variables, sem conteúdo hardcoded).

## Fluxo de imports

- Alias `@/*` → raiz do projeto (via `tsconfig.json`).
- Exemplo: `import { HeaderCentered } from "@/components/site/headers/header-centered"`.
- Componentes UI importados de `@/components/ui/*` e utilitários de `@/lib/utils`.

## Organização atual

- Separação clara: `app/` (páginas/routing), `components/` (reutilizável), `lib/` (utilitários).
- `docs/` e `memory-bank/` para documentação e memória do projeto.
- Nenhuma reorganização nesta fase.
