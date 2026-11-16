# T1 — Auditoria das duas Services + contratos (Goal 036)

Investigação apenas — nenhum código de produção alterado nesta task. Todas as constatações vêm de leitura/grep direto do código atual (comandos reais ao final).

## 1. Tabela completa — `components/sections/services/**` (todos os componentes)

| Componente | Path | Consumers reais | Hardcoded? | Já data-driven? | Entra na 036? |
|---|---|---|---|---|---|
| ServicesWithIcons | `components/sections/services/services-with-icons.tsx` | **home** (`app/(site)/page.tsx` L14/L106) + Library (`app/library/services/page.tsx`) | SIM (zero props; array interno `servicesWithIcons` com title/desc/Icon) | NÃO | **SIM — Service A** |
| ServicesGridSimple | `components/sections/services/services-grid-simple.tsx` | Library (`app/library/services/page.tsx`) | SIM (zero props; array interno `services` com title/desc + heading/desc de seção) | NÃO | **SIM — Service B** |
| ServicesSplitWithHighlight | `components/sections/services/services-split-with-highlight.tsx` | Library (`app/library/services/page.tsx`) | SIM (zero props; `mainService`, `secondaryPoints`, caixa "Exemplo de uso", copy de adaptação) | NÃO | NÃO — fica na dívida |

**Seleção (exatamente 2):** ServicesWithIcons + ServicesGridSimple. Justificativa:
- **ServicesWithIcons** é o único service com **consumer real fora da Library** (home) — a migração prova o contrato com consumer dono dos dados imediatamente (padrão 031/032).
- **ServicesGridSimple** é a forma canônica da família grid (heading + description + items[] com título/descrição) — encaixa diretamente na linguagem dos contratos modernos sem campos one-off.
- **ServicesSplitWithHighlight permanece hardcoded**: estrutura heterogênea (bloco principal + caixa de exemplo + lista de bullets + copy meta-demo "Este bloco pode ser adaptado...") — o contrato seria um saco de campos únicos sem segundo consumer à vista; conteúdo é a própria demo de adaptabilidade (anti-inflação). A projeção do roadmap pós-lote confirma: **services 3 → 1** após a 036.
- Os dois migrados compartilham forma conceitual coerente (heading + description + lista de cards), mas **sem abstração compartilhada** — cada um define seus tipos locais (padrão de todos os contratos do Lab: `HeroPrimaryProps`, `HeroStepsProps`, `GalleryTabsProps` são locais).

## 2. Consumers mapeados (grep real em `app/**`)

- `app/(site)/page.tsx`: importa e renderiza `<ServicesWithIcons />` (L14, L106) — **único consumer fora da Library**.
- `app/library/services/page.tsx`: os 3 via `ServicesItem[]` com `Component: React.ComponentType` renderizado sem props — **a página precisará ser adaptada para passar dados** (consumer dono dos dados; `React.ComponentType` sem props não compila com props obrigatórias no TS strict).
- Landing composition (`/library/landing`): **não usa** nenhum service (grep não casa) — nada a migrar lá.
- Nenhum outro import de services no repositório.

## 3. Inventário de hardcode (o que sai do componente)

**ServicesWithIcons (A):** heading da seção ("Serviços que geram resultado para o seu negócio"), description da seção, array de 3 items (title, desc, **Icon**). Estrutura interna permanece: grid `md:grid-cols-3`, cards `rounded-2xl border bg-muted/20`, container do ícone `h-10 w-10 rounded-xl bg-muted`, `h-5 w-5 text-muted-foreground`, tokens, dark-only.

**ServicesGridSimple (B):** heading ("Como sua empresa ajuda os clientes"), description da seção, array de 3 items (title, desc). Estrutura interna permanece: grid `md:grid-cols-3`, cards `rounded-xl border bg-background`, tokens, dark-only.

**Nenhum dos dois tem CTA hoje** → contrato sem actions (não inventar API sem uso).

## 4. Contratos aprovados (linguagem dos contratos modernos 001/003/010/016/031/032)

**Service A — `services-with-icons.tsx`:**

```ts
type ServiceWithIcon = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

type ServicesWithIconsProps = {
  title: string;
  description?: string;
  services: ServiceWithIcon[];
};
```

**Service B — `services-grid-simple.tsx`:**

```ts
type ServiceGridItem = {
  title: string;
  description: string;
};

type ServicesGridSimpleProps = {
  title: string;
  description?: string;
  services: ServiceGridItem[];
};
```

- `title`/`services` obrigatórios; `description?` opcional com renderização condicional; **sem defaults internos escondendo conteúdo**; `desc` → `description` (naming do DS, precedente 032).
- Tipos locais por componente — **sem tipo compartilhado** entre A e B (cada contrato é independente; abstração só para reduzir linhas é proibida).

## 5. Icon strategy

- **A:** consumer fornece `icon` como **componente** (`React.ComponentType<{ className?: string }>`) — `lucide-react` é dependência existente; home passa `Globe2`/`LayoutDashboard`/`Workflow`; página da Library idem. O componente mantém o **markup estrutural** do ícone (container `h-10 w-10 rounded-xl bg-muted`, `h-5 w-5 text-muted-foreground`) — o consumer decide **qual** ícone, não como ele é emoldurado.
- Lookup global por string arbitrária: **rejeitado** (sem necessidade — nenhum padrão assim no repo; `contact-details` usa `Icon:` como componente nos dados locais, mesma direção).
- **B:** sem ícones — nada a decidir.

## 6. CTA strategy

Nenhum dos dois componentes migrados tem CTA hoje → **nenhuma action entra no contrato** (não inventar API sem consumer). Convenção 001 permanece documentada para contratos futuros com actions.

## 7. QLT-005 — previsão (não atualizar na T1)

- Baseline real confirmado em `QUALITY-REVIEW.md`: **23 (17 sections + 6 site), ISSUE_CONFIRMED/ABERTO**.
- Os 2 componentes migrados **estão na dívida** → previsão pós-036: **23 → 21** (15 sections + 6 site). **Permanece ABERTO** — nunca VERIFIED.
- Consistência com a projeção do roadmap pós-lote: services 3 → 1 ✓.

## 8. Heading / a11y

Ambos: `h2` da seção + `h3` dos cards — **hierarquia preservada sem alteração** (QLT-011 não é objetivo da 036; nenhum ajuste de heading necessário para preservar semântica na migração).

## 9. Visual — zero redesign

Layout, grid, breakpoints, spacing, classes, tokens, dark-only DEC-011 e conteúdo atual (copy exata movida para os consumers) preservados integralmente. Nenhuma rota nova, nenhum componente novo, nenhuma dependência nova.

## 10. Testes — lacunas reais (T4)

- Existentes que tocam services: `/library/services` via shell (linha 525 — visita + `firstId: 'services-grid-simple'`; **ordem das entries da shell não pode mudar**); âncoras `#services` da home/landing (linhas 220/759–764/984/1004–1025). **Nenhum teste atual asserta conteúdo dos components services.**
- Lacunas reais a cobrir (dual-project): contrato de A provado via consumer oficial (Library: heading, 3 items, ordem, ícones; home: copy real preservada); contrato de B via consumer (heading, 3 items, ordem); zero overflow nos dois viewports; SplitWithHighlight continua renderizando (regressão da página intacta).
- Sem helpers que mascarem bugs; sem duplicar teste sem valor.

## 11. Arquivos previstos

- **T2 (Service A):** `components/sections/services/services-with-icons.tsx` + `app/(site)/page.tsx` + `app/library/services/page.tsx`.
- **T3 (Service B):** `components/sections/services/services-grid-simple.tsx` + `app/library/services/page.tsx`.
- **T4:** `tests/smoke.spec.ts` (apenas lacunas reais).
- **T5:** `QUALITY-REVIEW.md` (QLT-005 23→21, aberto), `docs/COMPONENT-CATALOG.md` (entradas existentes marcadas data-driven), `docs/ROADMAP-1000-EVOLUTIONS.md` (036 VERIFIED, próxima 037), `memory-bank/CURRENT-STATE.md`, `memory-bank/CHANGELOG.md`. `docs/DESIGN-SYSTEM.md` e `memory-bank/DECISIONS.md` inalterados (nenhuma convenção/decisão nova).

## 12. Riscos

- **Type da página da Library:** `Component: React.ComponentType` (sem props) não compila com props obrigatórias — adaptação mínima e explícita na página (consumer passa os dados), sem mudar o padrão das entries da shell.
- **Copy da home:** deve ser movida 1:1 para o consumer (testes de âncora/heading da home não podem regredir).
- **Ordem das entries da Library:** `firstId: 'services-grid-simple'` é assertado — não reordenar.
- Risco baixo — migração mecânica de dados com contrato mínimo; zero mudança visual.

## Material auditável (comandos reais desta task)

- `grep "services-grid-simple|services-split-with-highlight|services-with-icons|ServicesGridSimple|ServicesSplitWithHighlight|ServicesWithIcons" em app/**` → 11 matches em 2 arquivos (home + library/services) — consumers completos.
- Leituras integrais: os 3 componentes de `components/sections/services/`, `app/library/services/page.tsx`, `components/sections/hero/hero-primary.tsx` (linguagem de contrato), `QUALITY-REVIEW.md` §QLT-005 (baseline 23), `docs/COMPONENT-CATALOG.md` (3 entradas Template), `tests/smoke.spec.ts` (grep services — nenhuma cobertura de conteúdo).
- Nenhuma alteração de código nesta task.
