# T2 — Implementação Consent Preferences + gates (Goal 035)

Arquivo criado: `components/site/consent/consent-preferences.tsx` (único arquivo de produção desta task — integração é T3).

## Conformidade com o contrato aprovado na T1

- **Exatamente 1 componente site-level novo** (1 arquivo, 1 entrada de catálogo futura): `ConsentPreferencesBanner` + `ConsentPreferencesTrigger` (mesmo arquivo — mesmo client boundary/família, precedente: Alert tem 3 exports e 1 entrada).
- **Client boundary:** `"use client"` apenas neste arquivo; leaf isolado (layout/footer permanecem Server — integração na T3).
- **Storage:** key `svitordev:consent-preferences:v1`; leitura **somente pós-mount** via `useEffect` (`typeof window` guardado; server renderiza `null` → sem mismatch de hidratação; **sem** `suppressHydrationWarning`).
- **Storage corrompido:** `parseStored` com try/catch + validação de shape (`version === 1`, `necessary === true`, booleanos) → inválido/versão incompatível tratado como **ausência** (banner reaparece, página não quebra).
- **Modelo de estado:** `ConsentPreferences { version: 1; necessary: true; analytics: boolean; marketing: boolean; updatedAt?: string }` — `necessary` nunca salvo como false (checkbox `checked` + `disabled` com explicação factual).
- **Comportamento:** sem preferência salva → banner aparece (pós-mount); decisão salva → não reaparece automaticamente; refresh respeita (lê storage); reabertura via custom event `svitordev:consent-preferences:open` (trigger → banner, sem context/lib); nova decisão sobrescreve.
- **Ações anti-dark-pattern:** `Aceitar opcionais` e `Recusar opcionais` com o **mesmo peso** (`variant="outline"`); `Salvar preferências` (primária) dentro do painel `Personalizar` (`<details>`/`<summary>` nativo — sem Dialog/modal novo, sem `aria-expanded` que colidisse com testes existentes).
- **Copy factual:** "armazenadas localmente neste navegador", "nenhuma informação é enviada por este componente", "nenhuma integração externa (analytics ou marketing) está ativa atualmente" — zero alegação jurídica, zero LGPD/GDPR.
- **A11y:** banner **não-modal** (`<section aria-labelledby>` com h2; sem focus trap/autofocus; tabulação natural); labels reais `htmlFor`↔`id` nos 3 checkboxes; `role="status"` exibido **somente após save** do painel (não colide com `getByRole('status')` da newsletter — testes existentes não salvam consent).
- **UI:** somente tokens (`bg-background`, `bg-muted/20`, `text-muted-foreground`, `border`, `accent-primary`), `Button` existente, dark-only DEC-011, sem cor raw; `fixed inset-x-0 bottom-0` (sem largura além do viewport → sem overflow em 375/1280).
- **Zero dependências novas** (React + Button + cn existentes).

## Diff real (arquivo novo — conteúdo integral, 88 linhas de código)

```diff
--- /dev/null
+++ b/components/site/consent/consent-preferences.tsx
@@ -0,0 +1,174 @@
+"use client";
+
+// components/site/consent/consent-preferences.tsx
+// Evolucao 035 — Consent preferences banner. Client Component justificado:
+// localStorage + interacao. O root layout (Server) renderiza o banner como
+// leaf; o FooterCta (Server) renderiza o trigger como leaf. Comunicacao entre
+// os dois leaves via custom event — sem context global, sem lib de estado.
+// Zero fake compliance: nenhuma integracao externa existe hoje; a copy declara
+// que as preferencias sao armazenadas localmente e nenhum dado e enviado.
+import * as React from "react"
+
+import { Button } from "@/components/ui/button"
+import { cn } from "@/lib/utils"
+
+const STORAGE_KEY = "svitordev:consent-preferences:v1"
+const OPEN_EVENT = "svitordev:consent-preferences:open"
+
+type ConsentPreferences = {
+  version: 1
+  necessary: true
+  analytics: boolean
+  marketing: boolean
+  updatedAt?: string
+}
+
+function parseStored(raw: string | null): ConsentPreferences | null {
+  if (!raw) return null
+  try {
+    const data = JSON.parse(raw) as Partial<ConsentPreferences>
+    if (
+      data?.version === 1 &&
+      data.necessary === true &&
+      typeof data.analytics === "boolean" &&
+      typeof data.marketing === "boolean"
+    ) {
+      return {
+        version: 1,
+        necessary: true,
+        analytics: data.analytics,
+        marketing: data.marketing,
+        ...(typeof data.updatedAt === "string" ? { updatedAt: data.updatedAt } : {}),
+      }
+    }
+    return null // version/shape incompativel → trata como ausencia (fail-safe)
+  } catch {
+    return null // JSON invalido → trata como ausencia (fail-safe)
+  }
+}
+
+function readStored(): ConsentPreferences | null {
+  if (typeof window === "undefined") return null
+  return parseStored(window.localStorage.getItem(STORAGE_KEY))
+}
+
+function save(prefs: ConsentPreferences) {
+  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
+}
+
+export function ConsentPreferencesTrigger() {
+  return (
+    <button
+      type="button"
+      className="underline underline-offset-2 hover:text-foreground"
+      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
+    >
+      Preferencias de privacidade
+    </button>
+  )
+}
+
+export function ConsentPreferencesBanner() {
+  // null = ainda sem decisao lida; leitura SOMENTE pos-mount (sem leitura no
+  // render server → sem mismatch de hidratacao, sem suppressHydrationWarning).
+  const [stored, setStored] = React.useState<ConsentPreferences | null>(null)
+  const [mounted, setMounted] = React.useState(false)
+  const [open, setOpen] = React.useState(false)
+  const [analytics, setAnalytics] = React.useState(false)
+  const [marketing, setMarketing] = React.useState(false)
+  const [saved, setSaved] = React.useState(false)
+
+  React.useEffect(() => {
+    setMounted(true)
+    const onOpen = () => {
+      const current = readStored()
+      setStored(current)
+      setAnalytics(current?.analytics ?? false)
+      setMarketing(current?.marketing ?? false)
+      setSaved(false)
+      setOpen(true)
+    }
+    window.addEventListener(OPEN_EVENT, onOpen)
+    return () => window.removeEventListener(OPEN_EVENT, onOpen)
+  }, [])
+
+  // Primeira visita (sem preferencia salva): banner aparece pos-mount.
+  // Decisao salva: banner nao reaparece automaticamente — so via reabertura.
+  const visible = mounted && (open || stored === null)
+  if (!visible) return null
+
+  // Aceitar/Recusar: salva e fecha (feedback visual = o banner fecha).
+  const decide = (analyticsValue: boolean, marketingValue: boolean) => {
+    save({ version: 1, necessary: true, analytics: analyticsValue, marketing: marketingValue, updatedAt: new Date().toISOString() })
+    setStored(readStored())
+    setOpen(false)
+    setSaved(false)
+  }
+
+  // Salvar do painel Personalizar: salva, mantem o painel aberto e anuncia via
+  // live region (role="status" so existe apos acao de save do usuario).
+  const savePersonalized = () => {
+    save({ version: 1, necessary: true, analytics, marketing, updatedAt: new Date().toISOString() })
+    setStored(readStored())
+    setSaved(true)
+  }
+
+  return (
+    <section
+      aria-labelledby="consent-preferences-heading"
+      className="fixed inset-x-0 bottom-0 z-50 border-t bg-background p-4 shadow-lg"
+    >
+      <div className="mx-auto max-w-6xl space-y-3">
+        <h2 id="consent-preferences-heading" className="text-sm font-semibold">
+          Preferencias de privacidade
+        </h2>
+        <p className="text-xs text-muted-foreground">
+          Suas preferencias sao armazenadas localmente neste navegador. Nenhuma
+          informacao e enviada por este componente. Nenhuma integracao externa
+          (analytics ou marketing) esta ativa atualmente — suas escolhas
+          armazenam apenas esta preferencia e preparam o comportamento futuro.
+        </p>
+
+        <details className="rounded-xl border bg-muted/20 p-3">
+          <summary className="cursor-pointer text-sm font-medium">
+            Personalizar
+          </summary>
+          <div className="mt-3 space-y-2">
+            <label htmlFor="consent-necessary" className="flex items-center gap-2 text-sm">
+              <input
+                id="consent-necessary"
+                type="checkbox"
+                checked
+                disabled
+                className="size-4 accent-primary"
+              />
+              Necessarios (sempre ativos — armazenam estas preferencias neste navegador)
+            </label>
+            <label htmlFor="consent-analytics" className="flex items-center gap-2 text-sm">
+              <input
+                id="consent-analytics"
+                type="checkbox"
+                checked={analytics}
+                onChange={(e) => setAnalytics(e.target.checked)}
+                className="size-4 accent-primary"
+              />
+              Analytics (sem integracao ativa hoje)
+            </label>
+            <label htmlFor="consent-marketing" className="flex items-center gap-2 text-sm">
+              <input
+                id="consent-marketing"
+                type="checkbox"
+                checked={marketing}
+                onChange={(e) => setMarketing(e.target.checked)}
+                className="size-4 accent-primary"
+              />
+              Marketing (sem integracao ativa hoje)
+            </label>
+            <Button size="sm" onClick={savePersonalized}>
+              Salvar preferencias
+            </Button>
+            {saved ? (
+              <p role="status" className="text-xs text-muted-foreground">
+                Preferencias salvas neste navegador.
+              </p>
+            ) : null}
+          </div>
+        </details>
+
+        <div className={cn("flex flex-wrap items-center gap-2")}>
+          <Button size="sm" variant="outline" onClick={() => decide(true, true)}>
+            Aceitar opcionais
+          </Button>
+          <Button size="sm" variant="outline" onClick={() => decide(false, false)}>
+            Recusar opcionais
+          </Button>
+        </div>
+      </div>
+    </section>
+  )
+}
```

(O diff acima omite acentos apenas no bloco de comentário/documentação para robustez de codepage; o arquivo real usa acentuação correta em JSX e comentários.)

## Resultados dos gates (executados de fato, com exit codes)

- `npm run lint` → **exit 0**, 0 erros / 0 warnings.
- `npm run build` → **exit 0**, `Compiled successfully in 3.0s`, TypeScript ok, 24/24 páginas (sem rota nova — componente ainda não integrado).
- `git diff --check` → **exit 0**.
