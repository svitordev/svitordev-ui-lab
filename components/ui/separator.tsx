import * as React from "react"

import { cn } from "@/lib/utils"

type SeparatorProps = React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <div
      {...props}
      data-slot="separator"
      data-orientation={orientation}
      role={decorative ? undefined : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
    />
  )
}

export { Separator }
