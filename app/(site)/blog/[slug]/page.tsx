// app/(site)/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";

// Evolução 023 — metadata dinâmica pela mesma fonte de conteúdo da página
// (getPostBySlug — nenhuma fonte nova). Slug inexistente → notFound(),
// coerente com a página: sem metadata enganosa para 404.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
        {new Date(post.date).toLocaleDateString("pt-BR")}
      </p>
      <h1 className="mt-1 mb-4 text-2xl font-semibold tracking-tight md:text-3xl">
        {post.title}
      </h1>
      <p className="text-sm text-muted-foreground">{post.excerpt}</p>
    </div>
  );
}