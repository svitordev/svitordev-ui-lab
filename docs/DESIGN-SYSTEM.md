# DESIGN-SYSTEM.md — Svitordev UI Lab

Sistema de design real atual. Não alterar `app/globals.css` nesta fase.

## Base

- **Tailwind CSS 4** — framework de estilização.
- **Configuração inline** em `app/globals.css` (estilo Tailwind v4). **Não existe `tailwind.config.ts`.**
- **shadcn/ui** (style new-york) — componentes base, sem dependência de biblioteca de UI.
- **CSS variables** — tokens definidos em `:root` (light) e `.dark` (dark).
- **`@theme inline`** — mapeia CSS variables para tokens do Tailwind (`--color-*`, `--radius-*`, `--font-*`).

## EXISTENTE (documentar, não recriar)

### Tokens de cor (semantic)

- `--background`, `--foreground`
- `--primary` (= `--brand`), `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--accent` (= `--brand-soft`), `--accent-foreground`
- `--muted`, `--muted-foreground`
- `--destructive`
- `--border`, `--input`, `--ring`
- `--card`, `--card-foreground`
- `--popover`, `--popover-foreground`


### Brand (identidade visual)

- `--brand` — roxo (light: `oklch(0.55 0.20 280)`, dark: `oklch(0.70 0.18 280)`)
- `--brand-foreground` — texto sobre o brand
- `--brand-soft`, `--brand-soft-foreground` — variantes suaves do brand

### Radius

- `--radius` (base 0.625rem) + `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`

### Fontes

- `--font-sans` (Geist Sans), `--font-mono` (Geist Mono)

### Sidebar tokens (Tailwind 4 sidebar API)

- `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-accent`, `--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring`

### Light/dark

- `@custom-variant dark` define o suporte a dark mode via classe `dark`.
- Layout raiz aplica `className="dark"` (dark por padrão).

## A EXPANDIR (tarefa técnica posterior)

- **Escala de cinza completa** (100→900) — hoje só `secondary`/`muted`.
- **Escala de tipografia** (tamanho/weight/leading para h1→h6, body, caption).
- **Tokens de spacing customizados** (hoje usa-se o spacing padrão do Tailwind).

## OPCIONAL (não urgente)

- Chart colors / gradientes customizados.
- Tokens de animação (tempo/easing como token).
- Theme switching / toggle visual de tema (DEC-004).

## Regras de uso

- Preferir cores semânticas (`bg-primary`, `text-muted`, `border-border`) a cores hardcoded.
- Customizar identidade via CSS variables em `globals.css` (brand, cores, radius).
- Não duplicar valores de cor/espaçamento — usar tokens existentes.

## Estratégia para projetos derivados (DEC-004)

Projetos criados a partir do template poderão ser:

- **apenas light**;
- **apenas dark**;
- **light/dark** (com toggle opcional).

A facilidade de customização da identidade visual é o requisito principal: trocar cores, fontes e branding é feito alterando as CSS variables, sem mexer na lógica dos componentes.
