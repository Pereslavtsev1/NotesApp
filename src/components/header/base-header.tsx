"use client";

import { ReactNode } from "react";

export function BaseHeader({ children }: { children: ReactNode }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md">
      <div className="flex h-14 w-full items-center px-2 text-muted-foreground">
        {children}
      </div>
    </header>
  );
}
