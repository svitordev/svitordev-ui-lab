// components/sections/newsletter/newsletter-form.tsx
"use client";

import { type FormEvent, useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type NewsletterSubmitResult =
  | { success: true }
  | { success: false; message?: string };

export type NewsletterFormProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  label: string;
  placeholder?: string;
  buttonLabel: string;
  submittingLabel: string;
  successMessage: string;
  errorMessage: string;
  onSubmit: (
    email: string
  ) => Promise<NewsletterSubmitResult> | NewsletterSubmitResult;
};

type NewsletterStatus = "idle" | "submitting" | "success" | "error";

export function NewsletterForm({
  eyebrow,
  title,
  description,
  label,
  placeholder,
  buttonLabel,
  submittingLabel,
  successMessage,
  errorMessage,
  onSubmit,
}: NewsletterFormProps) {
  const baseId = useId();
  const inputId = `${baseId}-email`;
  const feedbackId = `${baseId}-feedback`;

  const [status, setStatus] = useState<NewsletterStatus>("idle");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const submitting = status === "submitting";

  function handleChange(value: string) {
    setEmail(value);
    // Qualquer edição fora de submitting devolve o formulário para idle
    // (limpa success/error e as referências semânticas do input).
    if (!submitting && status !== "idle") {
      setStatus("idle");
      setFeedback("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    try {
      const result = await onSubmit(email);
      if (result.success) {
        setStatus("success");
        setFeedback(successMessage);
        setEmail("");
      } else {
        setStatus("error");
        setFeedback(result.message ?? errorMessage);
      }
    } catch {
      // Exceção do consumer: usa a mensagem de fallback do contrato —
      // exception.message nunca é exibida diretamente.
      setStatus("error");
      setFeedback(errorMessage);
    }
  }

  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <div className="mb-6 space-y-2 text-center">
          {eyebrow ? (
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            {title}
          </h2>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>

        <form
          aria-busy={submitting}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label htmlFor={inputId} className="text-sm font-medium">
              {label}
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                id={inputId}
                type="email"
                required
                autoComplete="email"
                placeholder={placeholder}
                value={email}
                onChange={(event) => handleChange(event.target.value)}
                disabled={submitting}
                aria-invalid={status === "error" ? true : undefined}
                aria-describedby={status === "error" ? feedbackId : undefined}
              />
              <Button type="submit" disabled={submitting}>
                {submitting ? submittingLabel : buttonLabel}
              </Button>
            </div>
          </div>

          {/* Live region persistente: existe desde o primeiro render, vazia em
              idle/submitting (submitting já é sinalizado por aria-busy + botão). */}
          <p id={feedbackId} role="status" aria-live="polite" aria-atomic="true">
            {feedback}
          </p>
        </form>
      </div>
    </section>
  );
}
