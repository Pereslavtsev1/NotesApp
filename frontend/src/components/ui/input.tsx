import * as React from "react";

import { cn } from "@/lib/utils";
function Input({
  className,
  type,
  variant,
  ...props
}: { variant: "default" | "custom" } & React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={
        variant === "default"
          ? cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              className,
            )
          : `shadow-md flex w-full items-center rounded-md border border-muted-foreground/50 bg-transparent px-3 py-1.5 text-base transition-colors placeholder:text-muted-foreground hover:border-muted-foreground/80 focus:border-muted-foreground focus:outline-none ${className}`
      }
      {...props}
    />
  );
}

export { Input };
