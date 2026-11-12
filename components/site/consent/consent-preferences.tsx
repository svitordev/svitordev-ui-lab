"use client";

// components/site/consent/consent-preferences.tsx
// Evolução 035 — Consent preferences banner. Client Component justificado:
// localStorage + interação. O root layout (Server) renderiza o banner como
// leaf; o FooterCta (Server) renderiza o trigger como leaf. Comunicação entre
// os dois leaves via custom event — sem context global, sem lib de estado.
// Zero fake compliance: nenhuma integração externa existe hoje; a copy declara
// que as preferências são armazenadas localmente e nenhum dado é enviado.
import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "svitordev:consent-preferences:v1"
const OPEN_EVENT = "svitordev:consent-preferences:open"

type ConsentPreferences = {
  version: 1
  necessary: true
  analytics: boolean
  marketing: boolean
  updatedAt?: string
}

function parseStored(raw: string | null): ConsentPreferences | null {
  if (!raw) return null
  try {
    const data = JSON.parse(raw) as Partial<ConsentPreferences>
    if (
      data?.version === 1 &&
      data.necessary === true &&
      typeof data.analytics === "boolean" &&
      typeof data.marketing === "boolean"
    ) {
      return {
        version: 1,
        necessary: true,
        analytics: data.analytics,
        marketing: data.marketing,
        ...(typeof data.updatedAt === "string" ? { updatedAt: data.updatedAt } : {}),
      }
    }
    return null // version/shape incompatível → trata como ausência (fail-safe)
  } catch {
    return null // JSON inválido → trata como ausência (fail-safe)
  }
}

function readStored(): ConsentPreferences | null {
  if (typeof window === "undefined") return null
  return parseStored(window.localStorage.getItem(STORAGE_KEY))
}

function save(prefs: ConsentPreferences) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
}

export function ConsentPreferencesTrigger() {
  return (
    <button
      type="button"
      className="underline underline-offset-2 hover:text-foreground"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      Preferências de privacidade
    </button>
  )
}

export function ConsentPreferencesBanner() {
  // null = ainda sem decisão lida; leitura SOMENTE pós-mount (sem leitura no
  // render server → sem mismatch de hidratação, sem suppressHydrationWarning).
  const [stored, setStored] = React.useState<ConsentPreferences | null>(null)
  const [mounted, setMounted] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [analytics, setAnalytics] = React.useState(false)
  const [marketing, setMarketing] = React.useState(false)
  const [saved, setSaved] = React.useState(false)
  // Banner fechado explicitamente sem nova decisão pendente (não reabre sozinho).
  const [dismissed, setDismissed] = React.useState(false)

  React.useEffect(() => {
    // Leitura pós-mount: refresh respeita decisão salva (banner não reaparece).
    const current = readStored()
    setStored(current)
    setAnalytics(current?.analytics ?? false)
    setMarketing(current?.marketing ?? false)
    setMounted(true)
    const onOpen = () => {
      const latest = readStored()
      setStored(latest)
      setAnalytics(latest?.analytics ?? false)
      setMarketing(latest?.marketing ?? false)
      setSaved(false)
      setDismissed(false)
      setOpen(true)
    }
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_EVENT, onOpen)
  }, [])

  // Primeira visita (sem preferência salva): banner aparece pós-mount.
  // Decisão salva: banner não reaparece automaticamente — só via reabertura.
  const visible = mounted && !dismissed && (open || stored === null)
  if (!visible) return null

  // Aceitar/Recusar: salva e fecha (feedback visual = o banner fecha).
  const decide = (analyticsValue: boolean, marketingValue: boolean) => {
    save({ version: 1, necessary: true, analytics: analyticsValue, marketing: marketingValue, updatedAt: new Date().toISOString() })
    setStored(readStored())
    setOpen(false)
    setSaved(false)
  }

  // Salvar do painel Personalizar: salva, mantém o painel aberto e anuncia via
  // live region (role="status" só existe após ação de save do usuário).
  const savePersonalized = () => {
    save({ version: 1, necessary: true, analytics, marketing, updatedAt: new Date().toISOString() })
    setStored(readStored())
    setSaved(true)
  }

  return (
    <section
      aria-labelledby="consent-preferences-heading"
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-background p-4 shadow-lg"
    >
      <div className="mx-auto max-w-6xl space-y-3">
        <h2 id="consent-preferences-heading" className="text-sm font-semibold">
          Preferências de privacidade
        </h2>
        <p className="text-xs text-muted-foreground">
          Suas preferências são armazenadas localmente neste navegador. Nenhuma
          informação é enviada por este componente. Nenhuma integração externa
          (analytics ou marketing) está ativa atualmente — suas escolhas
          armazenam apenas esta preferência e preparam o comportamento futuro.
        </p>

        <details className="rounded-xl border bg-muted/20 p-3">
          <summary className="cursor-pointer text-sm font-medium">
            Personalizar
          </summary>
          <div className="mt-3 space-y-2">
            <label htmlFor="consent-necessary" className="flex items-center gap-2 text-sm">
              <input
                id="consent-necessary"
                type="checkbox"
                checked
                disabled
                className="size-4 accent-primary"
              />
              Necessários (sempre ativos — armazenam estas preferências neste navegador)
            </label>
            <label htmlFor="consent-analytics" className="flex items-center gap-2 text-sm">
              <input
                id="consent-analytics"
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="size-4 accent-primary"
              />
              Analytics (sem integração ativa hoje)
            </label>
            <label htmlFor="consent-marketing" className="flex items-center gap-2 text-sm">
              <input
                id="consent-marketing"
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="size-4 accent-primary"
              />
              Marketing (sem integração ativa hoje)
            </label>
            <Button size="sm" onClick={savePersonalized}>
              Salvar preferências
            </Button>
            {saved ? (
              <p role="status" className="text-xs text-muted-foreground">
                Preferências salvas neste navegador.
              </p>
            ) : null}
          </div>
        </details>

        <div className={cn("flex flex-wrap items-center gap-2")}>
          <Button size="sm" variant="outline" onClick={() => decide(true, true)}>
            Aceitar opcionais
          </Button>
          <Button size="sm" variant="outline" onClick={() => decide(false, false)}>
            Recusar opcionais
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setOpen(false)
              // Sem decisão salva (primeira visita), o banner só para de aparecer
              // automaticamente se o fechamento explícito for registrado.
              setDismissed(true)
            }}
          >
            Fechar
          </Button>
        </div>
      </div>
    </section>
  )
}
