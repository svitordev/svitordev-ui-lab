// components/sections/testimonials/testimonials-rating-cards.tsx
import { Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type ReviewAvatar = {
  src?: string;
  alt?: string;
  fallback: string;
};

export type ReviewItem = {
  quote: string;
  author: string;
  role?: string;
  rating: number;
  avatar: ReviewAvatar;
};

export type TestimonialsRatingCardsProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: ReviewItem[];
};

function normalizeRating(rating: number) {
  return Math.min(5, Math.max(1, Number.isFinite(rating) ? Math.round(rating) : 1));
}

export function TestimonialsRatingCards({
  eyebrow,
  title,
  description,
  items,
}: TestimonialsRatingCardsProps) {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {eyebrow || title || description ? (
          <div className="mb-8 space-y-2 text-center">
            {eyebrow ? (
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item) => {
            const rating = normalizeRating(item.rating);

            return (
              <article
                key={item.author}
                className="flex h-full flex-col gap-3 rounded-2xl border bg-background p-4 text-sm shadow-sm"
              >
                <div
                  className="flex items-center gap-0.5"
                  aria-label={`${rating} de 5 estrelas`}
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      aria-hidden="true"
                      className={
                        index < rating
                          ? "size-4 fill-current text-primary"
                          : "size-4 text-muted-foreground"
                      }
                    />
                  ))}
                </div>

                <blockquote className="text-sm">{item.quote}</blockquote>

                <footer className="mt-auto flex items-center gap-3 pt-1">
                  <Avatar>
                    {item.avatar.src ? (
                      <AvatarImage src={item.avatar.src} alt={item.avatar.alt ?? ""} />
                    ) : null}
                    <AvatarFallback>{item.avatar.fallback}</AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold">{item.author}</p>
                    {item.role ? (
                      <p className="truncate text-xs text-muted-foreground">
                        {item.role}
                      </p>
                    ) : null}
                  </div>
                </footer>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
