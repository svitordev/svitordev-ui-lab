// components/sections/services/services-with-icons.tsx
import { Globe2, LayoutDashboard, Workflow } from "lucide-react";

const servicesWithIcons = [
  {
    title: "Atendimento especializado",
    desc: "Serviços pensados para as necessidades reais dos clientes, com foco em orientação clara e soluções práticas.",
    Icon: Globe2,
  },
  {
    title: "Gestão e organização",
    desc: "Apoio na organização de rotinas, prazos, documentos e informações, trazendo mais controle para o dia a dia.",
    Icon: LayoutDashboard,
  },
  {
    title: "Otimização de processos",
    desc: "Análise e melhoria de processos internos, reduzindo retrabalho e tornando o atendimento mais ágil e eficiente.",
    Icon: Workflow,
  },
];

export function ServicesWithIcons() {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8 space-y-2 text-center">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Serviços que geram resultado para o seu negócio
          </h2>
          <p className="text-sm text-muted-foreground">
            O foco é facilitar a rotina, dar mais segurança nas decisões e melhorar a experiência de quem é atendido pela sua empresa.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {servicesWithIcons.map(({ title, desc, Icon }) => (
            <div
              key={title}
              className="flex h-full flex-col gap-3 rounded-2xl border bg-muted/20 p-4 text-left text-sm shadow-sm"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>

              <h3 className="text-base font-semibold">{title}</h3>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
