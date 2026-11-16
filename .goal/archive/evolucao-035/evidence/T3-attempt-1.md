# T3 — Integração no ponto arquitetural aprovado na T1 (Goal 035)

Dois arquivos alterados, exatamente como previsto na auditoria T1 (§12): `app/layout.tsx`
e `components/site/footers/footer-cta.tsx`. Nenhum arquivo novo; nenhuma rota nova.

## Diff real

```diff
--- a/app/layout.tsx
+++ b/app/layout.tsx
@@ -1,5 +1,6 @@
 // app/layout.tsx
 import type { Metadata } from "next";
 import "./globals.css";
+import { ConsentPreferencesBanner } from "@/components/site/consent/consent-preferences";

 // Evolução 023 — nome oficial do projeto (README/AGENTS) + title template:
 // páginas declaram apenas o título próprio e o sufixo é aplicado pelo template.
@@ -20,6 +21,8 @@
     <html lang="pt-BR">
       <body className="min-h-screen bg-background text-foreground antialiased">
         {children}
+        {/* Evolução 035 — banner de preferências (client leaf; layout permanece Server). */}
+        <ConsentPreferencesBanner />
       </body>
     </html>
   );
 }
```

```diff
--- a/components/site/footers/footer-cta.tsx
+++ b/components/site/footers/footer-cta.tsx
@@ -2,6 +2,8 @@
 import Link from "next/link";
 import { Button } from "@/components/ui/button";
 import { ArrowRight } from "lucide-react";
+// Evolução 035 — trigger client leaf (Server Component permanece Server).
+import { ConsentPreferencesTrigger } from "@/components/site/consent/consent-preferences";

 export function FooterCta() {
   const year = new Date().getFullYear();
@@ -36,6 +38,8 @@
           <p>
             Este rodapé pode ser adaptado para escritórios, clínicas, consultorias e outros
             negócios de serviços.
           </p>
+          {/* Evolução 035 — reabertura das preferências de privacidade. */}
+          <ConsentPreferencesTrigger />
         </div>
       </div>
     </footer>
```

## Conformidade com o contrato T3

- **Root layout permanece Server Component** — apenas renderiza o client leaf
  `ConsentPreferencesBanner` como filho último do `<body>` (ordem de tabulação natural,
  conforme auditoria §9).
- **FooterCta permanece Server Component** — renderiza o client leaf
  `ConsentPreferencesTrigger` na linha final. `FooterColumns`/`FooterSimple` NÃO tocados
  (são variants de catálogo/demo, não o footer do site).
- **Comunicação:** custom event `svitordev:consent-preferences:open` (já implementada na
  T2 APPROVED) — sem context global, sem lib de estado, zero dependências novas.
- **Reabertura funcional:** clique no trigger → `window.dispatchEvent(OPEN_EVENT)` →
  listener no banner lê storage, carrega valores salvos nos checkboxes, reseta
  `dismissed`/`saved` e abre o painel → usuário altera e salva (nova decisão sobrescreve).
- **Zero rota nova** (build: 24/24 rotas); nenhuma rota de privacidade inventada; nenhum
  conteúdo jurídico fabricado.

## Gates reais (executados, exit codes reais)

- `npm run lint` → **LINT_EXIT=0** (0 erros / 0 warnings).
- `npm run build` → **BUILD_EXIT=0** (`Compiled successfully in 2.4s`; 24/24 páginas
  geradas — nenhuma rota nova).
- `git diff --check` → **CHECK_EXIT=0**.
