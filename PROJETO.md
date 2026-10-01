# PROJETO.md — Svitordev UI Lab

Visão do produto, finalidade e filosofia do projeto.

## O que é

**Svitordev UI Lab** — repositório base (GitHub Template) que acelera a criação de futuros projetos frontend.

## Objetivo

Servir como biblioteca/laboratório/template reutilizável para montar rapidamente:

- landing pages;
- blogs;
- sites institucionais;
- portfólios;
- SaaS;
- dashboards;
- páginas de produto;
- sites para clientes.

## GitHub Template

Quando aparecer um projeto real:

1. Usar **GitHub Template** → criar novo repositório.
2. Selecionar componentes/seções/layouts existentes.
3. Alterar identidade visual (cores, fontes, branding).
4. Alterar conteúdo.
5. Montar rapidamente o novo projeto.

O template deve permitir remover/adicinar peças com facilidade, sem acoplamento a um projeto único.

## Filosofia de reutilização

- Reutilizar antes de duplicar.
- Cada peça deve ser autossuficiente e fácil de personalizar.
- Evitar component inflation e duplicações.
- Uma nova variante é válida quando traz diferença real (estrutura, composição, hierarquia, layout, comportamento, interação, caso de uso, responsividade ou estilo visual substancial) — não apenas texto ou cor.

## Estrutura oficial

```
app/
components/
  ui/
  site/
  sections/
lib/
public/
docs/
memory-bank/
```

`src/` **não** será introduzido. Categorias novas só quando houver necessidade real.

## Objetivos de longo prazo

Evoluir continuamente com:

- primitives, UI components, sections, patterns, layouts, compositions, páginas completas;
- diferentes estilos visuais, animações, responsividade, acessibilidade;
- design tokens, temas, showcase, catálogo;
- testes, visual testing, quality gates;
- documentação, automações.

## Conceito das 1000 evoluções

Futuramente existirão **1000 objetivos macro** de evolução, que poderão envolver:

- componentes, seções, layouts, páginas;
- infraestrutura, acessibilidade, testes, animações;
- auditorias, documentação, compositions completas.

Regra de execução:

- detalhar apenas os próximos **25** por vez;
- reavaliar antes de abrir o próximo lote;
- auditoria a cada **100**.

## O que pertence ao projeto

- Peças reutilizáveis (componentes, seções, layouts, padrões).
- Sistema de design (tokens, temas).
- Showcase (`/library`) e catálogo (`docs/COMPONENT-CATALOG.md`).
- Documentação e infraestrutura de qualidade.

## O que NÃO pertence ao projeto

- Um produto/cliente específico com branding fixo.
- Conteúdo hardcoded de um projeto real (deve ser removível).
- Um único "app" monolítico — o repositório é a base, não o destino final de um cliente.
