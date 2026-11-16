# T1 — Auditoria de privacidade + storage + arquitetura (Goal 035)

Investigação apenas — nenhum código de produção alterado nesta task. Todas as constatações vêm de grep/leitura direta do código atual (comandos reais ao final).

## 1. Tracking real encontrado (grep em `app/`+`components/`+`lib/` + `app/layout.tsx` + `package.json`)

Grep: `cookie|cookies|document.cookie|localStorage|sessionStorage|analytics|gtag|googletagmanager|GoogleAnalytics|GA4|pixel|facebook|meta pixel|clarity|segment|posthog|mixpanel|tracking|consent` → **79 matches, todos falsos positivos de `tracking-wide`/`tracking-tight` (Tailwind letter-spacing)**. Zero ocorrências reais de cookie/storage/analytics/pixel/consent.

- **Existe tracking não essencial? NÃO.**
- **Existem cookies próprios? NÃO** (zero `document.cookie`, nenhuma cookie API).
- **Existe analytics? NÃO** (sem gtag/GA4/PostHog/Mixpanel/Clarity/Segment; `package.json` sem nenhuma SDK de analytics).
- **Existe publicidade/pixel? NÃO.**
- **Existe armazenamento local atual? NÃO** — nenhum uso de `localStorage`/`sessionStorage` no código de produção. **Não há convenção de naming pré-existente** → adota-se a direção do plano: key namespaced versionada `svitordev:consent-preferences:v1`.
- `app/layout.tsx`: Server Component puro, sem scripts externos, sem injeção de terceiros. `package.json`: nenhuma dependência de consent/CMP/analytics.

**Consequência (regra crítica):** o componente **não pode afirmar** que bloqueia cookies de analytics/marketing — nenhuma integração existe. Ele **armazena preferências localmente** e **prepara a arquitetura**; a copy deve dizer exatamente isso.

## 2. Componentes de site — onde UI site-wide deve viver

- `app/layout.tsx` (root, Server) → ponto arquitetural correto para o banner site-wide (renderiza o client leaf como filho direto; layout permanece Server).
- Footer real do site: **`FooterCta`** via `app/(site)/layout.tsx` (home + blog). `FooterColumns`/`FooterSimple` são variants de catálogo; `FooterColumns` aparece na landing composition (`/library/landing`) — **não é o footer do site**.
- **Ponto de reabertura aprovado:** `FooterCta` (linha final), único ponto de UI site-wide real. `FooterColumns` não é alterado (é demo de composition; alterá-lo inflaria escopo).

## 3. Primitives existentes

- `components/ui/`: accordion, alert, avatar, badge, button, card, input, separator, skeleton, tabs, textarea, breadcrumb. **Não existe Checkbox/Switch** → **HTML nativo acessível** (`<input type="checkbox">` estilizado com tokens; `<label htmlFor>` real). **Nenhum primitive novo, nenhuma instalação Radix.**
- `Button` existente usado nas ações (sem `asChild` — ações são handlers, não links).

## 4. Decisão de categorias — **Opção A (arquitetura preparada)**

Justificativa: o roadmap já nomeia o consumer real (044/046 — SaaS landing) e a evolução existe para estabelecer a arquitetura de preferências. Opção B (não expor categoria sem consumer) deixaria o banner sem o que personalizar — a própria evolução seria o consumer. **Copy factual obrigatória** (ver §8).

## 5. Modelo de estado (contrato mínimo)

```ts
type ConsentPreferences = {
  version: 1
  necessary: true          // sempre true — nunca salvo como false
  analytics: boolean
  marketing: boolean
  updatedAt?: string       // ISO local, informativo
}
```

- **Necessary:** sempre ativa, checkbox `checked` + `disabled` (nativo — disabled em checkbox checked mantém o estado visível e a semântica é clara), com explicação factual: cobre o armazenamento local das próprias preferências (este componente usa localStorage — é a única categoria realmente ativa hoje).
- **Analytics/Marketing:** categorias opcionais reais do modelo, mas **sem side effect hoje** — a copy declara isso.

## 6. Storage

- **`localStorage`** (UI de preferências não precisa de backend nesta evolução).
- Key: **`svitordev:consent-preferences:v1`** (namespaced + versionada; sem convenção pré-existente — §1).
- Leitura **somente no client** (`useEffect` pós-mount); escrita em `localStorage.setItem` no save. JSON inválido / `version !== 1` / shape inválido → tratado como **ausência** (banner reaparece; nada quebra).

## 7. Comportamento

- **Primeira visita** (sem key): banner aparece (pós-mount, sem leitura no render server).
- **Decisão salva:** banner não reaparece automaticamente; refresh preserva.
- **Reabertura:** controle real no FooterCta → painel reaparece com valores salvos carregados → usuário altera e salva (nova decisão sobrescreve).
- **Ações:** `Aceitar opcionais` / `Recusar opcionais` / `Personalizar` (expansão **inline** — `<details>` nativo com checkboxes + `Salvar preferências`). Sem Dialog/modal novo. **Anti-dark-pattern:** Aceitar e Recusar com o mesmo peso visual (ambos `variant="outline"`); `Salvar preferências` como ação primária do painel expandido; nenhum botão escondido.

## 8. Copy constraints (factual — zero fake compliance)

- Dizer: preferências **armazenadas localmente neste navegador**; **nenhum dado é enviado** por este componente; **nenhuma integração externa (analytics/marketing) está ativa atualmente** — as escolhas preparam o comportamento futuro.
- **Não dizer:** "bloqueamos cookies de analytics", "analytics foi desativado", "100% conforme LGPD/GDPR", nenhuma alegação jurídica.

## 9. A11y

- Banner **não-modal**: `<section>` com `aria-labelledby` apontando para heading interno (h2); **não captura foco** como modal (sem focus trap, sem autofocus); ordem de tabulação natural (banner no fim do DOM — filho último do body).
- Checkboxes com `<label htmlFor>` real; necessary `disabled` + `checked` + explicação textual; estado `checked` nativo reportado.
- `<details>`/`<summary>` nativos para Personalizar (divulgação acessível por teclado sem JS extra).
- Status após salvar: painel/banner fecha (feedback visual) + `role="status"` **somente no painel de reabertura** após save — ver §11 (evita colisão com `getByRole('status')` da newsletter).
- Reabertura: controle é `<button>` real com texto "Preferências de privacidade".

## 10. Client boundary + comunicação

- `ConsentPreferencesBanner` = **Client Component** (storage + interação) — boundary mínimo, leaf isolado no root layout (layout permanece Server).
- `ConsentPreferencesTrigger` = client leaf mínimo no FooterCta (Server).
- **Comunicação:** custom event `svitordev:consent-preferences:open` (trigger → banner). Sem context global, sem lib de estado, sem dependência nova — menor acoplamento entre dois client leaves que não têm ancestral comum client.

## 11. Interferência na suíte existente (auditada antes — sem helpers preventivos)

- `button[aria-expanded]` (testes mobile nav, linhas 75/107/897): o banner **não usa** `aria-expanded` (usa `<details>` nativo) → zero interferência.
- `getByRole('status')` (newsletter, linhas 352/375): `role="status"` só aparece **após save no painel de reabertura** — testes da newsletter não salvam consent → zero interferência.
- `getByRole('checkbox')`: nenhum teste existente usa → livre.
- Testes de overflow (`scrollWidth === clientWidth`): banner fixed bottom sem largura além do viewport → sem overflow.
- Cliques em elementos cobertos: banner compacto no rodapé; suíte roda primeiro sem mudança em testes existentes; se houver interferência real, criar **helper mínimo explícito** (não `localStorage.setItem` em todos).

## 12. Arquivos previstos

- T2: `components/site/consent/consent-preferences.tsx` (novo — banner + trigger, um arquivo, um client boundary por folha).
- T3: `app/layout.tsx` (renderizar o banner leaf) + `components/site/footers/footer-cta.tsx` (renderizar o trigger leaf).
- T4: `tests/smoke.spec.ts` (+6 testes dual-project cobrindo os 7 cenários).
- T5: catálogo (1 entrada site), roadmap (035 VERIFIED, próxima 036), CURRENT-STATE, CHANGELOG; `DECISIONS.md` — **avaliar DEC nova** apenas se a política (localStorage-only, zero integração fictícia, reabertura obrigatória) for tratada como duradoura (provável — é comportamento de template).

## 13. Contagens esperadas (baseline REAL confirmado)

- Catálogo real hoje: sections **32** · UI **12** · site **7** (o plano do usuário dizia 9 — divergência registrada, usa-se a realidade) · wrappers 2 · total **53**.
- Pós-035: site **8**, total **54**; sections 32; rotas **24** (nenhuma nova); Playwright 47 → **53 testes** (106 execuções: 103 passed + 3 skipped).

## 14. Riscos

- **Hidratação:** banner renderizado condicionalmente com estado lido no mount — server renderiza vazio, client decide (sem mismatch; sem suppressHydrationWarning).
- **Custom event em testes:** Playwright dispara cliques reais — sem dependência de timing além do normal; asserts com `expect.poll`/web-first onde necessário.
- **Interferência visual em screenshots/overflow:** mitigada no §11; suíte valida.
- Risco residual baixo — componente isolado, zero dependências.

## Material auditável (comandos reais desta task)

- `grep "cookie|cookies|document.cookie|localStorage|sessionStorage|analytics|gtag|googletagmanager|GoogleAnalytics|GA4|pixel|facebook|meta pixel|clarity|segment|posthog|mixpanel|tracking|consent" em {app,components,lib}/**` → 79 matches, **todos** `tracking-*` do Tailwind (falsos positivos) — zero tracking/storage real.
- Leituras: `app/layout.tsx` (Server, sem scripts), `app/(site)/layout.tsx` (usa FooterCta), `components/site/footers/footer-cta.tsx`, `package.json` (nenhuma SDK), `docs/COMPONENT-CATALOG.md` (contagens reais 32/12/7/2=53), `tests/smoke.spec.ts` (auditado `button[aria-expanded]`, `getByRole('status')`, `getByRole('checkbox')`).
- Nenhuma alteração de código nesta task.
