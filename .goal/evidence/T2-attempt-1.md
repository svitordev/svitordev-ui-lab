# Evidência T2 — Header A (HeaderBasic) data-driven (attempt 1)

Data: 2026-11-19 · Builder: Strata Qwen3.8 Flash Next 256K · Goal 038

## Escopo desta task

Migrar exatamente 1 componente: `components/site/headers/header-basic.tsx` (Header A) para o
contrato aprovado na auditoria (T1, APPROVED). Consumer da página de previews convertido para
o padrão `preview: React.ReactNode` (páginas heterogêneas). Zero redesign, zero dependência
nova, zero componente novo, zero rota nova, zero DropdownMenu.

## Contrato implementado (exatamente o aprovado na T1)

```ts
type HeaderNavItem = { href: string; label: string };
type HeaderAction = { label: string; href: string };
type HeaderBasicProps = {
  brand: { prefix: string; suffix: string };
  navItems: HeaderNavItem[];
  action: HeaderAction;
};
export function HeaderBasic({ brand, navItems, action }: HeaderBasicProps) { ... }
```

- zero defaults; todos obrigatórios (existem hoje no componente);
- tipos locais (sem abstração global); `HeaderNavItem` estruturalmente idêntico ao
  `MobileNavLink` — `<MobileNav links={navItems} />` compõe sem acoplamento de import;
- `"use client"` + `usePathname` preservados (Client boundary);
- `aria-label="Navegação principal"` preservado; keys `item.href` preservadas;
- marca continua link para `/` com dois tons (prefix bold + suffix muted) — agora via dados;
- CTA renderiza `action.label` → `action.href` (mesmo destino real `/#contact`);
- dados passados pelo consumer 1:1 com o estado anterior (Início `/`, Serviços `/#services`,
  Sobre `/#about`, Contato `/#contact`; action `Entrar em contato` → `/#contact`;
  brand `Sua`/`Empresa`). Zero dead href.

## Arquivos alterados (git diff --stat)

```
 app/library/headers/page.tsx             | 23 +++++++++++++++++------
 components/site/headers/header-basic.tsx | 29 ++++++++++++++++-------------
 2 files changed, 33 insertions(+), 19 deletions(-)
```

- `app/library/headers/page.tsx`: `HeaderItem.Component: React.ComponentType` →
  `preview: React.ReactNode`; entry `header-basic` passa os dados 1:1 ao `HeaderBasic`;
  entries `header-centered`/`header-with-topbar` permanecem renderizando os componentes sem
  props (ainda não migrados — serão convertidos com dados nas T3/T4); ordem dos previews
  basic→centered→topbar preservada (testes existentes dependem dela).
- Acoplamento documentado (padrão 037): a conversão da página para `preview` na T2 é
  necessária porque o `HeaderBasic` agora exige props; os outros dois previews ficam híbridos
  até suas tasks.

## Gates executados (outputs reais)

```
> npm run lint
> eslint
(0 erros, 0 warnings — apenas nota informativa do baseline-browser-mapping)
LINT_EXIT=0

> npm run build
[baseline-browser-mapping] The data in this module is over two months old...
 ✓ Compiled successfully in 2.2s
 ✓ Generating static pages using 15 workers (24/24) in 1012.8ms
BUILD_EXIT=0
```

- Rotas no build: **24** (baseline preservado; `/`, `/_not-found`, `/blog`, `/blog/[slug]`,
  `/library` + 19 rotas `/library/*`, incluindo `/library/headers`).
- `git diff --check`: **DIFFCHECK_EXIT=0** (sem whitespace errors).
- Playwright: não executado nesta task (execução completa na T4, conforme plano aprovado na
  T1; testes existentes de menu mobile/CTA cobrem o Header A e permanecem válidos — ordem
  preservada).

## Estado de contagens

- components: 54 (12 UI / 8 site / 32 sections / 2 wrappers) — inalterado (nenhum componente
  novo).
- rotas: 24 — inalterado.
- QLT-005: 20 → (fechamento documentado na T5; previsão final 17).

## Riscos/conhecido

- Dev server órfão na porta 3000 pode afetar Playwright na T4 (verificar antes).
- Testes existentes usam `.first()`/`.nth(1)` em `button[aria-expanded]` — ordem dos previews
  não mudou.
