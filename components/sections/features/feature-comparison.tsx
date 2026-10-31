// components/sections/features/feature-comparison.tsx
import { Check, X } from "lucide-react";

export type ComparisonValue = boolean | string;

export type ComparisonOption = {
  id: string;
  label: string;
};

export type ComparisonFeature = {
  label: string;
  values: Record<string, ComparisonValue>;
};

export type FeatureComparisonProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  options: ComparisonOption[];
  features: ComparisonFeature[];
};

function ComparisonCell({ value }: { value: ComparisonValue | undefined }) {
  if (typeof value === "string") {
    return <>{value}</>;
  }

  if (value === true) {
    return (
      <>
        <Check aria-hidden="true" className="size-4 text-primary" />
        <span className="sr-only">Incluído</span>
      </>
    );
  }

  if (value === false) {
    return (
      <>
        <X aria-hidden="true" className="size-4 text-muted-foreground" />
        <span className="sr-only">Não incluído</span>
      </>
    );
  }

  // Ausência de dado não é o mesmo que false — representação própria.
  return (
    <>
      <span aria-hidden="true">—</span>
      <span className="sr-only">Não informado</span>
    </>
  );
}

export function FeatureComparison({
  eyebrow,
  title,
  description,
  options,
  features,
}: FeatureComparisonProps) {
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
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              {title}
            </h2>
            {description ? (
              <p className="text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
        ) : null}

        {/* relative: mantém os spans sr-only (position:absolute) dentro do bloco
            rolável — sem isso eles escapam do clipping e estouram o scroll da página. */}
        <div className="relative overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="pb-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  Recurso
                </th>
                {options.map((option) => (
                  <th
                    key={option.id}
                    scope="col"
                    className="pb-3 text-center text-xs font-semibold"
                  >
                    {option.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature.label} className="border-t border-border">
                  <th scope="row" className="py-3 pr-4 text-left font-medium">
                    {feature.label}
                  </th>
                  {options.map((option) => (
                    <td key={option.id} className="py-3 text-center align-middle">
                      <span className="inline-flex items-center justify-center gap-1.5">
                        <ComparisonCell value={feature.values[option.id]} />
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
