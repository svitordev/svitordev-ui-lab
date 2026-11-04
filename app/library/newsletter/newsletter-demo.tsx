// app/library/newsletter/newsletter-demo.tsx
"use client";

import {
  NewsletterForm,
  type NewsletterSubmitResult,
} from "@/components/sections/newsletter/newsletter-form";

// Demo determinística: sem Math.random(), sem fetch, sem API.
// Emails iniciados por "erro@" exercitam o estado de erro; demais → sucesso.
async function demoSubmit(email: string): Promise<NewsletterSubmitResult> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (email.toLowerCase().startsWith("erro@")) {
    return {
      success: false,
      message: "Não foi possível concluir a inscrição.",
    };
  }

  return { success: true };
}

export function NewsletterDemo() {
  return (
    <NewsletterForm
      eyebrow="Newsletter"
      title="Receba novidades direto no seu e-mail."
      description="Sem spam e sem promessa vazia: só o que importa, e você pode sair quando quiser."
      label="Seu e-mail"
      placeholder="voce@exemplo.com"
      buttonLabel="Inscrever-se"
      submittingLabel="Enviando..."
      successMessage="Inscrição realizada com sucesso."
      errorMessage="Não foi possível concluir a inscrição."
      onSubmit={demoSubmit}
    />
  );
}
