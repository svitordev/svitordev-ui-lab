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

## Contratos de props (seções data-driven)

Primeiro contrato exemplar do laboratório (Evolução 001): `CtaSplitActions` (`components/sections/cta/cta-split-actions.tsx`).

- Contrato mínimo e local ao componente: `title` e `actions` obrigatórios; `eyebrow`, `description` e `supportingText` opcionais; `actions[].variant` restrito a `default | outline`.
- Sem props cosméticas (`className`, cor, padding) e sem render-props no contrato.
- Conteúdo vem por props; dados de demo pertencem à página da `/library`, não ao componente.
- Server Component quando não há interação client-side.
- Novas sections data-driven seguem este padrão; componentes legados migram quando forem tocados (estratégia B — sem refatoração em massa).

## Motion

Padrão estabelecido pela Evolução 012 (motion pass controlado — aplicado em `HeroMediaShowcase` e `TestimonialsRatingCards`).

### Princípio

- Motion deve ter propósito de UX: reforçar hierarquia ou feedback.
- Deve ser discreto e não atrasar o acesso ao conteúdo.
- Não é decoração gratuita nem requisito automático de todo componente.
- Deve preservar acessibilidade e respeitar reduced motion.

### Hierarquia tecnológica

1. **CSS / Tailwind** — primeira escolha.
2. **`tw-animate-css`** — quando animation utilities forem o mecanismo adequado.
3. **JavaScript / bibliotecas especializadas** — somente quando CSS não resolver o comportamento necessário.

### Reduced motion (obrigatório)

- Motion novo deve respeitar `prefers-reduced-motion`.
- No padrão atual: comportamento que contém movimento usa `motion-safe:`.
- Com reduced motion: conteúdo permanece visível, aparece diretamente no estado final, nenhum elemento depende de animação para existir e transforms de motion não permanecem ativos.
- O princípio é obrigatório; a implementação exata pode variar por componente.

### Durações preferenciais

- Microinteraction: ~150–300ms.
- Entrance: ~300–500ms.
- Faixas preferenciais — não são valores rígidos; evitar proliferar durações.

### Propriedades

- Preferir animar/transicionar `opacity` e `transform`.
- Feedback visual pode usar `border-color` e `box-shadow`.
- Evitar animar sem necessidade: width, height, top, left, margin, padding.

### Padrões que exigem justificativa

Não recomendados por padrão (não proibidos — exigem justificativa clara): loops decorativos contínuos, parallax sem necessidade, motion excessivo, escalas grandes, bounce/overshoot exagerado, stagger via JS sem necessidade, transformar Server Components em Client Components apenas por animação.

### Server Components

Se o efeito pode ser resolvido por CSS, manter Server Component e não adicionar `"use client"` apenas por motion — demonstrado na Evolução 012 em `HeroMediaShowcase` e `TestimonialsRatingCards`.

## Estratégia para projetos derivados (DEC-004)

Projetos criados a partir do template poderão ser:

- **apenas light**;
- **apenas dark**;
- **light/dark** (com toggle opcional).

A facilidade de customização da identidade visual é o requisito principal: trocar cores, fontes e branding é feito alterando as CSS variables, sem mexer na lógica dos componentes.
