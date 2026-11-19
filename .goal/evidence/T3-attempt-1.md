# Evidência T3 — Header B (HeaderCentered) data-driven (attempt 1)

Data: 2026-11-19 · Builder: Strata Qwen3.8 Flash Next 256K · Goal 038

## Escopo desta task

Migrar exatamente 1 componente: `components/site/headers/header-centered.tsx` (Header B)
para o contrato aprovado na auditoria (T1, APPROVED), + seus 2 consumers reais passando os
dados 1:1. Header A (T2, APPROVED) permanece íntegro. Zero redesign, zero dependência nova,
zero componente novo, zero rota nova, zero DropdownMenu.

## Contrato implementado (exatamente o aprovado na T1)

```ts
type HeaderNavItem = { href: string; label: string };
type HeaderCenteredProps = {
  brand: { prefix: string; suffix: string };
  navItems: HeaderNavItem[];
};
export function HeaderCentered({ brand, navItems }: HeaderCenteredProps) { ... }
```

- sem `action` (HeaderCentered não tem CTA hoje — contrato mínimo, sem inflação);
- zero defaults; tipos locais; `"use client"` + `usePathname` preservados;
- `aria-label="Navegação principal"` preservado; keys `item.href` preservadas;
- layout `flex-col items-center` + `flex-wrap justify-center` intocado (decisão 007 — sem
  MobileNav neste header, flex-wrap cobre mobile);
- marca com `{" "}` entre os spans preservado (fiel ao original).

## Consumers atualizados (dados 1:1 com o hardcode anterior)

1. `app/library/headers/page.tsx` — entry `header-centered` agora renderiza
   `<HeaderCentered brand={...} navItems={...} />` com os mesmos 5 itens na mesma ordem
   (Início `/`, Serviços `/#services`, Sobre `/#about`, Blog `/blog`, Contato `/#contact`);
   entry `header-basic` (T2) intacto; entry `header-with-topbar` segue híbrido até T4;
   ordem dos previews basic→centered→topbar preservada.
2. `app/(site)/layout.tsx` — Server Component; dados definidos em `headerData` e passados ao
   `HeaderCentered` (mesmos brand/navItems 1:1); `FooterCta` e estrutura intocados; Server →
   Client com dados é o padrão existente (root layout + Consent).

## Arquivos alterados nesta task (git diff --stat acumulado T2+T3)

```
 app/(site)/layout.tsx                       | 13 ++++++++++-   (esta task)
 app/library/headers/page.tsx                | 34 ++++++++++++++++++++++++-----  (T2 + esta task)
 components/site/headers/header-basic.tsx    | 29 +++++++++++++-----------   (T2, APPROVED)
 components/site/headers/header-centered.tsx | 21 +++++++++---------   (esta task)
 4 files changed, 66 insertions(+), 31 deletions(-)
```

## Gates executados (outputs reais)

```
> npm run lint
> eslint
(0 erros, 0 warnings — apenas nota informativa do baseline-browser-mapping)
LINT_EXIT=0

> npm run build
 ✓ Compiled successfully in 1961.1ms
 ✓ Generating static pages using 15 workers (24/24) in 1007.3ms
BUILD_EXIT=0

git diff --check → DIFFCHECK_EXIT=0
```

- Rotas: **24** (baseline preservado).
- Playwright: execução completa na T4 (plano aprovado na T1).

## Estado de contagens

- components: 54 (12 UI / 8 site / 32 sections / 2 wrappers) — inalterado.
- rotas: 24 — inalterado.
- QLT-005: 20 → 17 ao final (documentado na T5).
