# T2 — tentativa 2: correções do Inspector + gates reexecutados

Arquivo: `components/site/consent/consent-preferences.tsx` (único arquivo de produção da task).

## Correção 1 — leitura de localStorage no mount (refresh respeita decisão salva)

```diff
   React.useEffect(() => {
+    // Leitura pós-mount: refresh respeita decisão salva (banner não reaparece).
+    const current = readStored()
+    setStored(current)
+    setAnalytics(current?.analytics ?? false)
+    setMarketing(current?.marketing ?? false)
     setMounted(true)
     const onOpen = () => {
-      const current = readStored()
-      setStored(current)
-      setAnalytics(current?.analytics ?? false)
-      setMarketing(current?.marketing ?? false)
+      const latest = readStored()
+      setStored(latest)
+      setAnalytics(latest?.analytics ?? false)
+      setMarketing(latest?.marketing ?? false)
       setSaved(false)
+      setDismissed(false)
       setOpen(true)
     }
     window.addEventListener(OPEN_EVENT, onOpen)
     return () => window.removeEventListener(OPEN_EVENT, onOpen)
   }, [])

-  const visible = mounted && (open || stored === null)
+  const visible = mounted && !dismissed && (open || stored === null)
```

- Server render e primeiro render client pré-effect continuam retornando `null` — nenhuma
  leitura de `localStorage` no render; sem `suppressHydrationWarning`.

## Correção 2 — fechamento consistente (botão Fechar explícito)

O painel `Personalizar` permanece aberto após `Salvar preferências` para exibir a live
region `role="status"` (critério do plano aprovado na T1: "role=status exibido somente
após ação do usuário"). Para o banner não ficar preso aberto, foi adicionado botão
explícito de fechar no grupo de ações:

```diff
   const [saved, setSaved] = React.useState(false)
+  // Banner fechado explicitamente sem nova decisão pendente (não reabre sozinho).
+  const [dismissed, setDismissed] = React.useState(false)
```

```diff
           <Button size="sm" variant="outline" onClick={() => decide(false, false)}>
             Recusar opcionais
           </Button>
+          <Button
+            size="sm"
+            variant="ghost"
+            onClick={() => {
+              setOpen(false)
+              // Sem decisão salva (primeira visita), o banner só para de aparecer
+              // automaticamente se o fechamento explícito for registrado.
+              setDismissed(true)
+            }}
+          >
+            Fechar
+          </Button>
```

- `decide` (Aceitar/Recusar) salva e fecha (`setOpen(false)`) — inalterado.
- `savePersonalized` salva, mantém o painel aberto e anuncia via `role="status"` —
  inalterado; fechável via Fechar.
- Fluxo completo: reabrir via trigger → editar checkboxes → Salvar (status anuncia) →
  Fechar → recarregar → banner não reaparece e a decisão sobrescrita persiste no storage.
- Anti-dark-pattern preservado: Aceitar e Recusar seguem com o mesmo peso (`outline`);
  Fechar é `ghost` (neutral, não é decisão de consentimento).

## Gates reexecutados (saída real, exit codes reais)

- `npm run lint` → **LINT_EXIT=0** (0 erros / 0 warnings; única linha extra é aviso de
  dados antigos do baseline-browser-mapping, não lint).
- `npm run build` → **BUILD_EXIT=0** (`Compiled successfully in 1813.8ms`; TypeScript ok;
  24/24 páginas, sem rota nova).
- `git diff --check` → **CHECK_EXIT=0**.

## Estado do arquivo após correções (pontos-chave do contrato, inalterados)

- Exatamente 1 arquivo de produção novo; exports `ConsentPreferencesBanner` +
  `ConsentPreferencesTrigger`.
- `"use client"` apenas nele; storage key `svitordev:consent-preferences:v1`; modelo
  `{version:1, necessary:true, analytics, marketing, updatedAt?}`; `necessary` nunca
  false (checkbox checked+disabled com explicação factual).
- `parseStored`: try/catch + validação de shape; JSON corrompido/versão incompatível →
  ausência (fail-safe).
- Copy factual (armazenamento local, nenhuma informação enviada, nenhuma integração
  ativa); zero alegação jurídica.
- Somente tokens; dark-only; `fixed inset-x-0 bottom-0`; zero dependências novas.
