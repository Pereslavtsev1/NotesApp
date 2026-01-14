"use client";

import { ClassNameProps, cn } from "@/lib/utils";
import { ReactNode } from "react";

export function BaseHeader({
  children,
  className,
}: { children: ReactNode } & ClassNameProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md flex h-14 items-center px-2 text-muted-foreground",
        className,
      )}
    >
      {children}
    </header>
  );
}
