// app/(site)/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/blog";
import { formatDateOnly } from "@/lib/format-date";

// Description reutiliza a copy introdutória real da própria página.
export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conteúdos simples sobre presença digital, sistemas sob medida e automação para pequenos negócios.",
};

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
              {formatDateOnly(post.date)}
            </p>
            <h2 className="mt-1 text-lg font-semibold">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
