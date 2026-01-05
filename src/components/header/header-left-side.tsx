import { ReactNode } from "react";

export default function HeaderLeft({ children }: { children: ReactNode }) {
  return <div className="flex min-w-0 items-center gap-x-2">{children}</div>;
}
