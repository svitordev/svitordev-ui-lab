# Evidência T1 — Auditoria dos 3 Headers (attempt 2)

Data: 2026-11-19 · Builder: Strata Qwen3.8 Flash Next 256K · Goal 038
Attempt 2 por autorização explícita do operador (attempt 1: Inspector retornou PASS,
validador fail-closed bloqueou por payload incompatível com task de auditoria pura; nenhuma
correção factual na auditoria; nenhum arquivo de produção alterado; fingerprint preservado).

```
Task type: audit-only
Production code changed: no
Tests required in this task: no
Test evidence: not applicable to T1 by design
Future validation: T2–T4
```

## 1. Escopo auditado — exatamente 3 Headers (paths reais no disco)

| # | Header | Path real | Boundary |
|---|---|---|---|
| A | `HeaderBasic` | `components/site/headers/header-basic.tsx` | Client (`"use client"` + `usePathname`) |
| B | `HeaderCentered` | `components/site/headers/header-centered.tsx` | Client (`"use client"` + `usePathname`) |
| C | `HeaderWithTopbar` | `components/site/headers/header-with-topbar.tsx` | Client (`"use client"` + `usePathname`) |

Listagem real de `components/site/headers/`: exatamente os 3 acima + `mobile-nav.tsx`
(compartilhado — item 5). Nenhum quarto header existe. Ordem A/B/C = roadmap/catalago.

## 2. Consumers reais (grep global pelos exports)

| Consumer | Arquivo | Rota/contexto | Header usado | Migração |
|---|---|---|---|---|
| 1 | `app/library/headers/page.tsx` | `/library/headers` (previews) | os 3 (`Component: React.ComponentType`) | SIM — página vira heterogênea → `preview: React.ReactNode` (padrão consolidado) com data objects por header |
| 2 | `app/(site)/layout.tsx` | layout real do site (home/blog) | `HeaderCentered` | SIM — layout permanece Server; passa os dados 1:1 |

Nenhum outro uso dos 3 exports (landing não usa headers). Nenhum consumer ficará na API antiga.

## 3. Contratos aprovados (mínimos, sem inflação)

```ts
// A — HeaderBasic (único com CTA hoje)
type HeaderNavItem = { href: string; label: string };
type HeaderAction = { label: string; href: string };
type HeaderBasicProps = {
  brand: { prefix: string; suffix: string };
  navItems: HeaderNavItem[];
  action: HeaderAction;
};

// B — HeaderCentered (sem action — não tem CTA hoje)
type HeaderNavItem = { href: string; label: string };
type HeaderCenteredProps = {
  brand: { prefix: string; suffix: string };
  navItems: HeaderNavItem[];
};

// C — HeaderWithTopbar (sem action; topbar é sua razão de ser)
type HeaderNavItem = { href: string; label: string };
type HeaderWithTopbarProps = {
  brand: { prefix: string; suffix: string };
  navItems: HeaderNavItem[];
  topbar: { phone: string; email: string; note?: string };
};
```

- `brand` = texto em dois tons real (`prefix` bold + `suffix` muted) — não é asset/logo image
  (não existe asset; não inventar).
- `navItems` obrigatórios (existem hoje nos 3); `action` só no Basic (existe hoje); `topbar`
  só no WithTopbar (existe hoje; `note?` condicional); ícones Phone/Mail estruturais ficam
  internos (lucide — dependência real).
- **zero defaults mascarando hardcode** · **zero abstração artificial** (tipos locais por
  componente, convenção 001/003/010/016/031/032/036/037; `HeaderNavItem` estruturalmente
  idêntico ao `MobileNavLink` já exportado — TS aceita a passagem sem acoplamento de import) ·
  **zero DropdownMenu** (é a 039).
- Keys `item.href` (estáveis, já são os keys atuais) preservadas.

## 4. Client boundary (evidência de código)

```
HeaderBasic      = Client Component  ("use client" linha 2; usePathname — destaque de rota ativa)
HeaderCentered   = Client Component  ("use client" linha 2; usePathname)
HeaderWithTopbar = Client Component  ("use client" linha 2; usePathname)
```

Boundary **preservado** — a interação real (destaque de rota) justifica Client; nada muda.

## 5. MobileNav

`components/site/headers/mobile-nav.tsx` — **já é data-driven** (contrato
`MobileNavLink`/`MobileNavProps` da Evolução 007) — **não entra na migração, não deve ser
alterado**. Basic e WithTopbar continuam passando os links (mesma ordem).
**QLT-006 VERIFIED preservado** (menu mobile acessível: aria-expanded/aria-controls via useId,
Escape com retorno de foco, clique fora, painel condicional). **QLT-007 VERIFIED preservado**
(`aria-label="Navegação principal"` nos 3 headers + shell). Os 3 testes existentes de menu
mobile (dependentes da ordem basic→centered→topbar nos previews) permanecem válidos — ordem
preservada.

## 6. Destinos atuais (preservar 1:1 — QLT-003 VERIFIED, zero dead href)

- Basic: `/`, `/#services`, `/#about`, `/#contact` + CTA `Entrar em contato` → `/#contact`.
- Centered: `/`, `/#services`, `/#about`, `/blog`, `/#contact` (sem CTA).
- WithTopbar: `/`, `/#services`, `/#about`, `/blog`, `/#contact` (sem CTA) + topbar
  `(00) 00000-0000` / `contato@suaempresa.com` / nota de horário.
- Brand link `/` nos 3. Zero `href="#"`.

## 7. QLT-005

```
baseline = 20 (14 sections + 6 site — QUALITY-REVIEW pós-037, ABERTO)
3 Headers confirmados no finding (lista de migrações do roadmap)
previsão pós-038 = 17 (14 sections + 3 site — sobram os 3 footers)
status continuará ABERTO (nunca VERIFIED)
```

QUALITY-REVIEW não foi editado na T1 (edição é T5).

## 8. Test strategy

- Cobertura existente (não duplicar): 3 testes de menu mobile (teclado+Escape Basic,
  clique+fora WithTopbar, navegação real pelo painel), home header → `#services` + CTA →
  `/#contact`, CTA da página de headers, shell da página.
- **Lacuna real:** conteúdo renderizado a partir dos dados do consumer no desktop (brand dois
  tons, nav items na ordem, topbar phone/email/nota). Plano T4: **+1 teste dual-project**
  (roles/textos reais, escopo semântico por preview, zero overflow). Sem asserts de classes
  Tailwind/pixels.
- Esperado pós-T4: **57 testes / 114 execuções — 111 passed + 3 skipped**, exit 0.
- Nesta T1: nenhuma execução de teste é devida (audit-only); nada foi inventado.

## 9. Arquivos previstos (T2–T5)

- T2 (A): `header-basic.tsx` + `app/library/headers/page.tsx` (entry basic → preview com
  dados; página convertida para preview ReactNode — padrão das heterogêneas).
- T3 (B): `header-centered.tsx` + `app/library/headers/page.tsx` (entry centered) +
  `app/(site)/layout.tsx` (Server, dados 1:1). Header A íntegro.
- T4 (C + regressão): `header-with-topbar.tsx` + `app/library/headers/page.tsx` (entry topbar)
  + `tests/smoke.spec.ts` (+1 teste da lacuna). Gates completos.
- T5: QUALITY-REVIEW (20→17), catálogo (3 entries existentes), ROADMAP (038 VERIFIED, próxima
  039), CURRENT-STATE, CHANGELOG. DESIGN-SYSTEM/DECISIONS inalterados.

## 10. Riscos

- Testes existentes usam `button[aria-expanded]` com `.first()`/`.nth(1)` — dependem da ordem
  dos previews; ordem preservada, risco nulo.
- `app/(site)/layout.tsx` Server renderizando Client Component com dados — padrão existente
  (root layout + Consent).
- Armadilha conhecida: dev server órfão na porta 3000 → verificar antes do Playwright.
- Zero dependências novas; zero componente/rota nova; commit/push só pelo operador.
