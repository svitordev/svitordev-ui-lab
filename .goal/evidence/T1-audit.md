# Evidência T1 — Auditoria dos 3 Headers + consumers + contratos (attempt 1)

Data: 2026-11-19 · Builder: Strata Qwen3.8 Flash Next 256K · Goal 038
T1 é investigação — NENHUM arquivo de produção alterado (apenas `.goal/`).

## 0. Baseline confirmado no repositório real

- Catálogo: 12 UI / 8 site / 32 sections / 2 wrappers / **total 54** · rotas **24** ·
  Playwright **56 testes / 112 execuções — 109 passed + 3 skipped**.
- QLT-005: **20** (14 sections + 6 site), ISSUE_CONFIRMED / ABERTO. QLT-006 **VERIFIED**.
  QLT-007 **VERIFIED**. QLT-011 parcial/aberto.
- Git: `main`, HEAD == origin/main == `8849713` (operador commitou a 037). Working tree:
  renames do arquivamento 037 + plan/state novos do bootstrap — esperado, registrado.

## 1. Os 3 Headers (código real — exatamente os previstos pela 038)

| Header | Path | Boundary | Hardcoded | Data-driven? | Entra na 038 |
|---|---|---|---|---|---|
| **A — HeaderBasic** | `components/site/headers/header-basic.tsx` | **Client** (`usePathname` — destaque de rota ativa) | navLinks (4), brand, CTA "Entrar em contato" → `/#contact` | Não (Template) | **SIM** |
| **B — HeaderCentered** | `components/site/headers/header-centered.tsx` | **Client** (`usePathname`) | navLinks (5), brand | Não (Template) | **SIM** |
| **C — HeaderWithTopbar** | `components/site/headers/header-with-topbar.tsx` | **Client** (`usePathname`) | navLinks (5), brand, topbar: `(00) 00000-0000`, `contato@suaempresa.com`, nota de horário | Não (Template) | **SIM** |
| MobileNav (compartilhado) | `components/site/headers/mobile-nav.tsx` | Client (estado real) | — | **JÁ data-driven** (`MobileNavLink`/`MobileNavProps` — contrato da 007) | NÃO (intocável) |

Ordem A/B/C = ordem do roadmap/catalago (HeaderBasic, HeaderCentered, HeaderWithTopbar).

## 2. Consumers reais (grep global pelos exports)

| Consumer | Headers usados | Ação |
|---|---|---|
| `app/library/headers/page.tsx` | os 3 (previews `Component: React.ComponentType`) | página vira heterogênea → `preview: React.ReactNode` (padrão consolidado) com data objects por header |
| `app/(site)/layout.tsx` | **HeaderCentered** (layout real do site) | layout permanece Server; passa os dados 1:1 |

Nenhum outro consumer (landing não usa headers). Nenhum consumer ficará na API antiga.

## 3. Inventário do hardcode (conteúdo vs estrutura)

### Conteúdo configurável → props
- **brand** (os 3): texto em dois tons — `prefix` (bold) + `suffix` (muted). Não é asset/logo
  image (não existe asset — não inventar). Vira prop com os dois campos para preservar o
  visual exato.
- **navItems** (os 3): array `{href, label}` — hoje `navLinks` interno.
- **action** (só HeaderBasic — único com CTA hoje): `{label, href}` — `Button asChild` +
  `Link` preservados (convenção 001).
- **topbar** (só WithTopbar — sua razão de ser): `{phone, email, note?}` — `note` opcional com
  renderização condicional; ícones Phone/Mail são estruturais (lucide, dependência real, ficam
  internos).

### Estrutura interna → permanece no componente
- Layouts (logo à esquerda/nav à direita; centralizado; topbar+linha), breakpoints,
  `hidden md:flex`, `flex-wrap`, `border-b`, `backdrop-blur`, `bg-muted/40`, espaçamentos,
  classes, tokens, dark-only; destaque de rota ativa (`usePathname` + `cn`); MobileNav
  intocado; `aria-label="Navegação principal"` em todos os `<nav>` (QLT-007).

## 4. Contratos propostos (mínimos, sem inflação, sem defaults)

```ts
// HeaderBasic (A)
type HeaderNavItem = { href: string; label: string };
type HeaderAction = { label: string; href: string };
type HeaderBasicProps = {
  brand: { prefix: string; suffix: string };
  navItems: HeaderNavItem[];
  action: HeaderAction;
};

// HeaderCentered (B) — sem action (não tem CTA hoje — não inflar)
type HeaderNavItem = { href: string; label: string };
type HeaderCenteredProps = {
  brand: { prefix: string; suffix: string };
  navItems: HeaderNavItem[];
};

// HeaderWithTopbar (C) — sem action (não tem CTA hoje)
type HeaderNavItem = { href: string; label: string };
type HeaderWithTopbarProps = {
  brand: { prefix: string; suffix: string };
  navItems: HeaderNavItem[];
  topbar: { phone: string; email: string; note?: string };
};
```

- **Tipos locais por componente** (convenção 001/003/010/016/031/032/036/037 — sem abstração
  global artificial). `HeaderNavItem` é estruturalmente idêntico ao `MobileNavLink` já
  exportado pelo MobileNav — TypeScript aceita a passagem `navItems` → `links` sem acoplamento
  de import. Sem três tipos incompatíveis: mesma linguagem (`href`/`label`, `action`, `brand`).
- Obrigatórios: o que existe hoje em cada header (brand, navItems; action só no Basic; topbar
  no WithTopbar). Opcionais condicionais: `note?`. **Sem defaults** mascarando hardcode.
- Keys: `item.href` (identificador estável, já é o key atual — preservado).

## 5. Mobile nav / a11y / destinos (não-regressão)

- **QLT-006 (VERIFIED, 007):** MobileNav intocado — botão ghost icon-lg Menu/X, `aria-label`
  dinâmico, `aria-expanded`, `aria-controls` via `useId`, painel condicional, fecha por
  botão/Escape com retorno de foco/clique fora, `md:hidden`. Basic e WithTopbar continuam
  passando os links (mesma ordem). Testes existentes (3 de menu mobile) devem permanecer
  verdes sem modificação.
- **QLT-007 (VERIFIED, 006):** `aria-label="Navegação principal"` preservado nos 3 headers +
  shell. Nenhum nav ambiguamente duplicado.
- **Destinos (026/QLT-003 VERIFIED):** hrefs 1:1 — `/`, `/#services`, `/#about`, `/#contact`,
  `/blog`; CTA Basic → `/#contact`. Zero `href="#"` reintroduzido.
- **Headings:** headers não usam h1–h6 — nada a preservar/alterar (QLT-011 intocado).

## 6. QLT-005

- Baseline real: **20** (14 sections + 6 site). Os 3 headers estão na dívida (lista de
  migrações do roadmap). Previsão pós-038: **20 → 17** (14 sections + 3 site — sobram os
  3 footers). **Permanece ABERTO.** QUALITY-REVIEW não foi editado na T1.

## 7. Testes — cobertura atual e lacuna real

Cobertura existente (não duplicar): 3 testes de menu mobile (teclado+Escape no Basic,
clique+fora no WithTopbar, navegação real pelo painel do Basic — todos mobile-only, dependem
da ORDEM dos previews: basic 1º, topbar 2º — preservada); home header → `#services` +
CTA → `/#contact` (HeaderCentered); CTA "Entrar em contato" → `/#contact` em
`/library/headers`; shell da página de headers (h1 + previews).
**Lacuna real:** conteúdo renderizado a partir dos dados do consumer no desktop — brand
(dois tons), nav items na ordem, topbar phone/email/nota. Plano T4: **+1 teste dual-project**
(roles/textos reais, escopo semântico por preview, zero overflow). Sem asserts de classes
Tailwind/pixels.
Esperado pós-T4: **57 testes / 114 execuções — 111 passed + 3 skipped**, exit 0.

## 8. Arquivos previstos (T2–T5)

- T2 (Header A): `header-basic.tsx` + `app/library/headers/page.tsx` (entry basic → preview
  com dados; página convertida para `preview: React.ReactNode` — padrão das heterogêneas).
- T3 (Header B): `header-centered.tsx` + `app/library/headers/page.tsx` (entry centered) +
  `app/(site)/layout.tsx` (Server, dados 1:1). Header A íntegro.
- T4 (Header C + regressão): `header-with-topbar.tsx` + `app/library/headers/page.tsx`
  (entry topbar) + `tests/smoke.spec.ts` (+1 teste da lacuna). Gates completos.
- T5: QUALITY-REVIEW (20→17, ABERTO), catálogo (3 entries existentes), ROADMAP (038 VERIFIED,
  próxima 039), CURRENT-STATE, CHANGELOG. DESIGN-SYSTEM/DECISIONS inalterados.

## 9. Riscos

- Testes existentes usam `button[aria-expanded]` com `.first()`/`.nth(1)` — dependem da ordem
  dos previews (basic → centered → topbar); ordem preservada, risco nulo se nada for
  reordenado.
- `app/(site)/layout.tsx` é Server renderizando Client Component com dados — padrão já
  existente (root layout + Consent banner).
- Armadilha conhecida: dev server órfão na porta 3000 → verificar antes do Playwright.
- Zero dependências novas (DropdownMenu é 039); zero componente/rota nova; commit/push só pelo
  operador.
