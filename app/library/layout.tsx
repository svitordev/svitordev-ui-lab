// app/sections/layout.tsx
import type { ReactNode } from "react";
import { SectionsShell } from "@/components/sections/library-shell";
import "../globals.css"

export default function SectionsLayout({ children }: { children: ReactNode }) {
  return <SectionsShell>{children}</SectionsShell>;
}
