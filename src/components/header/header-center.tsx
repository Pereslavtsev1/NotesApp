import { ClassNameProps, cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function HeaderCenter({
  children,
  className,
}: { children?: ReactNode } & ClassNameProps) {
  return (
    <div
      className={cn("flex flex-1 justify-center max-w-7xl mx-auto", className)}
    >
      {children}
    </div>
  );
}
