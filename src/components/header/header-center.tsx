import { ReactNode } from "react";

export default function HeaderCenter({ children }: { children: ReactNode }) {
  return <div className="flex min-w-0 flex-1 justify-center">{children}</div>;
}
