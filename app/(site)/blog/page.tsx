// app/(site)/blog/page.tsx
import Link from "next/link";

const posts = [
  {
    slug: "por-que-sua-empresa-precisa-de-um-site-hoje",
    title: "Por que sua empresa precisa de um site hoje",
    excerpt:
      "Mesmo com redes sociais fortes, ter um site próprio aumenta a credibilidade e o controle da sua presença digital.",
    date: "2025-11-01",
  },
  {
    slug: "quando-e-hora-de-sair-da-planilha-e-ir-para-um-sistema-web",
    title: "Quando é hora de sair da planilha e ir para um sistema web",
    excerpt:
      "Alguns sinais mostram que você está perdendo tempo e informação tentando controlar tudo em planilhas.",
    date: "2025-11-10",
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
      <h1 className="mb-4 text-2xl font-semibold tracking-tight md:text-3xl">
        Blog
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Conteúdos simples sobre presença digital, sistemas sob medida e automação para
        pequenos negócios.
      </p>

      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-xl border bg-background p-4 shadow-sm"
          >
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
              {new Date(post.date).toLocaleDateString("pt-BR")}
            </p>
            <h2 className="mt-1 text-lg font-semibold">
              <Link href={`/(site)/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
