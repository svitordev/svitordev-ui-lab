# Svitordev UI Lab

Repositório base (**GitHub Template**) que acelera a criação de futuros projetos frontend.

## O que é

**Svitordev UI Lab** — uma biblioteca/laboratório/template reutilizável construída com Next.js, React, TypeScript e Tailwind CSS. Serve como ponto de partida para:

- landing pages;
- blogs;
- sites institucionais;
- portfólios;
- SaaS;
- dashboards;
- páginas de produto;
- sites para clientes.

## Objetivo

Permitir montar rapidamente um novo projeto a partir de peças reutilizáveis (componentes, seções, layouts, padrões), alterando apenas identidade visual e conteúdo.

## GitHub Template

Para usar como base de um projeto novo:

1. Acesse **Use this template** no GitHub.
2. Crie um novo repositório a partir deste.
3. Selecione componentes/seções/layouts.
4. Altere a identidade visual (cores, fontes, branding) e o conteúdo.
5. Monte o novo projeto.

## Stack

- Next.js 16.0.3 (App Router)
- React 19.2.0 / React DOM 19.2.0
- TypeScript 5 (strict)
- Tailwind CSS 4
- shadcn/ui (style new-york)
- `tw-animate-css`
- lucide-react
- ESLint 9

## Como executar

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

Outros comandos:

- `npm run build` — build de produção.
- `npm run start` — servir o build de produção.
- `npm run lint` — verificar qualidade com ESLint.

## Como navegar em `/library`

`/library` é o showcase oficial dos componentes e seções. Cada categoria lista as variações disponíveis com preview visual. Use a navegação do próprio `/library` para explorar `headers`, `footers`, `hero`, `about`, `services`, `testimonials`, `pricing`, `contact` e `cta`.

## Estrutura geral

```
app/              # Páginas + layouts (App Router)
components/
  ui/             # Componentes base shadcn/ui
  site/           # Headers + footers
  sections/       # Seções reutilizáveis
lib/              # Utilitários
public/           # Assets
docs/             # Documentação
memory-bank/      # Memória do projeto
```

Estrutura oficial: `app/`, `components/`, `lib/`, `public/`. `src/` **não** será introduzido.

## Filosofia de reutilização

- Reutilizar antes de duplicar.
- Cada peça deve ser fácil de personalizar (cores, fontes, branding) e remover.
- Evitar component inflation e duplicações.
- Uma nova variante é válida quando traz diferença real (estrutura, composição, hierarquia, layout, comportamento, interação, caso de uso, responsividade ou estilo visual substancial).

## Estado atual

Fundação documental concluída (FASE 2):

- Arquitetura, sistema de design e catálogo documentados.
- Decisões arquiteturais registradas em `memory-bank/DECISIONS.md`.
- Critérios de evolução definidos em `docs/DEFINITION-OF-DONE.md`.

## Como contribuir / evoluir

1. Leia `AGENTS.md` e `docs/DEFINITION-OF-DONE.md`.
2. Siga a arquitetura e os tokens existentes.
3. Atualize `docs/COMPONENT-CATALOG.md` e `docs/` quando a alteração impactar a documentação.
4. Revisse `git diff` antes de qualquer `commit`.

> **Problema conhecido:** `app/(site)/blog/[slug]/page.tsx` está vazio no baseline, o que quebra o `next build`. Será tratado posteriormente (não corrigido nesta fase).
