// components/sections/logos/logos-strip.tsx

export type LogoItem = {
  name: string;
};

export type LogosStripProps = {
  title?: string;
  items: LogoItem[];
};

export function LogosStrip({ title, items }: LogosStripProps) {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {title && (
          <h2 className="mb-6 text-center text-xl font-semibold tracking-tight md:text-2xl">
            {title}
          </h2>
        )}
        <ul
          role="list"
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
        >
          {items.map((item) => (
            <li
              key={item.name}
              className="font-semibold text-muted-foreground"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
