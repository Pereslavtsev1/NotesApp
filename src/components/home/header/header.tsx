"use client";
import { BaseHeader } from "@/components/header/base-header";
import HeaderCenter from "@/components/header/header-center";
import { Button } from "@/components/ui/button";
import { FileTextIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggleAnimated } from "../footer/theme-toggle-animated";

export default function HomePageHeader() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const { theme } = useTheme();
  const currentTheme = theme === "dark" ? "dark" : "light";
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  if (!mounted) return null;

  return (
    <BaseHeader>
      <HeaderCenter className="py-6">
        <nav className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <FileTextIcon className="size-4.5" />
            <span className="text-xl font-bold text-foreground">NotesApp</span>
          </div>

          <div className="flex items-center">
            <ThemeToggleAnimated theme={currentTheme} ref={ref} />

            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link href="/sign-up">Get started</Link>
            </Button>
          </div>
        </nav>
      </HeaderCenter>
    </BaseHeader>
  );
}
