# Evidência T4 — Header C (HeaderWithTopbar) data-driven + regressão integrada (attempt 1)

Data: 2026-11-19 · Builder: Strata Qwen3.8 Flash Next 256K · Goal 038

## Escopo desta task

Migrar exatamente 1 componente: `components/site/headers/header-with-topbar.tsx` (Header C)
para o contrato aprovado na auditoria (T1, APPROVED), + consumer da página de previews
passando os dados 1:1, + o único teste novo do goal (lacuna real de cobertura), com execução
completa de Playwright. Headers A (T2) e B (T3) APPROVED permanecem íntegros. Zero redesign,
zero dependência nova, zero componente novo, zero rota nova, zero DropdownMenu.

## Contrato implementado (exatamente o aprovado na T1)

```ts
type HeaderNavItem = { href: string; label: string };
type HeaderWithTopbarProps = {
  brand: { prefix: string; suffix: string };
  navItems: HeaderNavItem[];
  topbar: { phone: string; email: string; note?: string };
};
export function HeaderWithTopbar({ brand, navItems, topbar }: HeaderWithTopbarProps) { ... }
```

- `topbar` é a razão de ser do componente (existe hoje) — phone/email obrigatórios, `note?`
  condicional (renderizada só se presente);
- ícones Phone/Mail (lucide — dependência real já usada) estruturais internos, não viraram
  dados;
- zero defaults; tipos locais; `"use client"` + `usePathname` preservados;
- `aria-label="Navegação principal"` preservado; keys `item.href` preservadas;
- `<MobileNav links={navItems} />` — mesma composição estrutural da T2 (MobileNav intocado);
- dados do consumer 1:1 com o hardcode anterior: brand `Sua`/`Empresa`; 5 nav items na mesma
  ordem (/, /#services, /#about, /blog, /#contact); topbar `(00) 00000-0000` /
  `contato@suaempresa.com` / nota de horário. Zero dead href, zero mudança de copy.

## Teste novo (único do goal — lacuna real aprovada na T1)

`tests/smoke.spec.ts` — `header com topbar: conteudo renderizado a partir dos dados do
consumer` (dual-project, roda nos 2 projects):
- escopo semântico pelo heading da variant (padrão 007/015 — sem classes Tailwind);
- marca dois tons vinda dos dados (prefix+suffix) como link real para `/` (visível nos 2);
- topbar phone/email visíveis nos 2 projects; nota condicional presente no DOM nos 2
  (oculta em mobile por `hidden md:inline` — assert por contagem de DOM);
- ordem exata dos hrefs dos nav items lida do DOM do nav escopado (funciona mesmo com a nav
  oculta em mobile);
- zero overflow horizontal nos dois viewports.
Sem asserts de classes Tailwind/pixels. Testes existentes não duplicados (cobrem menu mobile,
CTA e home; este cobre o conteúdo renderizado a partir dos dados no preview do consumer).

## Arquivos alterados nesta task

- `components/site/headers/header-with-topbar.tsx` (migração)
- `app/library/headers/page.tsx` (entry topbar passa dados; entries basic/centered das
  T2/T3 APPROVED intactos; ordem basic→centered→topbar preservada)
- `tests/smoke.spec.ts` (+1 teste)

## Gates executados (outputs reais)

```
> npm run lint
> eslint
(0 erros, 0 warnings — apenas nota informativa do baseline-browser-mapping)
LINT_EXIT=0

> npm run build
 ✓ Compiled successfully in 2.4s
 ✓ Generating static pages using 15 workers (24/24) in 1073.7ms
BUILD_EXIT=0

git diff --check → DIFFCHECK_EXIT=0

> npm run test:e2e
(porta 3000 verificada livre antes da execução — sem dev server órfão)
  3 skipped
  111 passed (42.5s)
E2E_EXIT=0
```

- Playwright: **57 testes × 2 projects = 114 execuções — 111 passed + 3 skipped, exit 0**
  (exatamente a previsão da auditoria T1; os 3 skipped são os mobile-only já conhecidos +
  desktop-only — mesma contagem do baseline 109+3 com os +2 do teste novo).

## Estado de contagens

- components: 54 (12 UI / 8 site / 32 sections / 2 wrappers) — inalterado.
- rotas: 24 — inalterado.
- Playwright: 56 → 57 testes (112 → 114 execuções; 111 passed + 3 skipped).
- QLT-005: 20 → 17 ao final (documentado na T5).
