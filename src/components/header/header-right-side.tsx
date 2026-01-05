import { ReactNode } from "react";

export default function HeaderRight({ children }: { children: ReactNode }) {
  return <div className="ml-auto flex items-center gap-x-2">{children}</div>;
}
