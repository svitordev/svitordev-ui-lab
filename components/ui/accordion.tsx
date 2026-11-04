"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b", className)}
      {...props}
    />
  )
}

// O Header do Radix (h3) embrulha o Trigger internamente — sem export público,
// sem prop de heading level nesta evolução. O Trigger permanece o button real do Radix.
function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium outline-none hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        {/* aria-hidden explícito (não depender do implícito do Lucide). A rotação é
            controlada pelo data-state do próprio Trigger (Radix o define no button,
            não no SVG) e acontece também com reduced motion; apenas a transição
            é protegida por motion-safe (convenção da Evolução 012). */}
        <ChevronDown
          aria-hidden="true"
          className="size-4 shrink-0 motion-safe:transition-transform motion-safe:duration-200"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

// Sem animação de abertura/fechamento na 017 — comportamento/accessible primeiro;
// animação de conteúdo fica para quando houver consumer real (Evolução 018).
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn("overflow-hidden text-sm text-muted-foreground", className)}
      {...props}
    >
      <div className="pb-4">{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
