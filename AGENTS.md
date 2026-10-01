# AGENTS.md — Svitordev UI Lab

Ponto de entrada principal para qualquer Agent. Leia antes de agir.

## O que é

**Svitordev UI Lab** — repositório base (GitHub Template) que acelera a criação de futuros projetos frontend: landing pages, blogs, sites institucionais, portfólios, SaaS, dashboards, páginas de produto e sites para clientes.

A ideia é usar **GitHub Template** → criar novo repositório → selecionar componentes/seções/layouts → alterar identidade visual e conteúdo → montar rapidamente um novo projeto.

## Objetivo

Servir como biblioteca/laboratório/template reutilizável, evoluída continuamente (primitivos, UI components, sections, patterns, layouts, compositions, páginas, animações, responsividade, acessibilidade, design tokens, temas, showcase, documentação, testes).

Stack confirmada: **Next.js 16.0.3 (App Router) + React 19.2 + TypeScript 5 + Tailwind CSS 4 + shadcn/ui + ESLint 9.**

## Arquitetura resumida

```
app/              # Next.js App Router (páginas + layouts)
components/
  ui/             # 4 componentes base shadcn/ui
  site/           # 6 componentes (headers + footers)
  sections/       # 21 seções (7 grupos × 3)
lib/              # utils (cn)
public/           # assets
docs/             # documentação
memory-bank/      # memória do projeto
```

Estrutura oficial é `app/`, `components/`, `lib/`, `public/`. **`src/` não será introduzido.** Categorias novas (`layouts/`, `patterns/`, `compositions/`) só quando houver necessidade real.

## Documentos importantes

- `PROJETO.md` — visão do produto e filosofia.
- `docs/ARQUITETURA.md` — arquitetura real.
- `docs/DESIGN-SYSTEM.md` — sistema de design.
- `docs/COMPONENT-CATALOG.md` — inventário de componentes.
- `docs/DEFINITION-OF-DONE.md` — critérios de evolução concluída.
- `memory-bank/` — estado, decisões, changelog.

## Regras operacionais

1. **Código atual é a fonte de verdade** (acima de documentação antiga).
2. **Não ampliar escopo.** Cumprir exatamente o pedido.
3. **Reutilizar antes de duplicar.** Antes de criar, consultar `docs/COMPONENT-CATALOG.md` e `/library`.
4. **Manter a estrutura atual.** Não reorganizar, não mover, não renomear arquivos.
5. **Seguir a Definition of Done** para qualquer evolução.
6. **Não instalar dependências sem necessidade.**
7. **Idioma:** português-BR para respostas e documentação.

## Uso das Skills

- `project-bootstrap` — discovery/plan e fundação.
- `quality-review` — inspeção de qualidade e geração de findings.
- `safe-implementation` — execução controlada de planos aprovados.
- `security-audit` — auditorias de segurança.

## Qualidade

Toda evolução deve satisfazer a `docs/DEFINITION-OF-DONE.md` (TypeScript, lint, build, responsividade, acessibilidade, teclado, reduced-motion, overflow, documentação, catálogo).

**Playwright = P1 antes da rotina das 1000 evoluções. Visual regression = posterior.**

## Política de dependências

- Não atualizar/remover/adicinar dependências fora do escopo.
- Documentar qualquer dependência nova (finalidade + onde é usada).

## Política de alterações

- Mudanças relevantes primeiro: analisar → explicar → plano mínimo → implementar (se autorizado) → validar → revisar diff.
- Não refatorar amplamente para resolver um bug pequeno.

## Política de Git

- Preferir `git add` explícito por arquivo.
- NUNCA sem autorização explícita: `git reset --hard`, `git clean`, `git push --force`, remoção de branches, exclusão de histórico, `git add .`.
- Sem `commit`/`push` a menos que explicitamente pedido. Revisar `git status`, `git diff`, `git diff --cached` antes de qualquer commit.

## Regra de parada

Quando a missão terminar (ou quando houver dúvida/risco), **PARE** e apresente o estado + próximos passos para aprovação. Não executar `commit`/`push` por conta própria.

## Obrigação de atualizar documentação

Qualquer alteração que impacte arquitetura, design tokens, estrutura de componentes ou comportamento **deve** atualizar o(s) documento(s) correspondente(s) em `docs/` e `memory-bank/`.
