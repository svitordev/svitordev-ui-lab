export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
}

export const posts: BlogPost[] = [
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
]

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug)
}