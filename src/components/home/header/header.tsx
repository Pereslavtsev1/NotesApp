"use client";
import { BaseHeader } from "@/components/header/base-header";
import HeaderCenter from "@/components/header/header-center";
import { Button } from "@/components/ui/button";
import { FileTextIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggleAnimated } from "../footer/theme-toggle-animated";
import { useTheme } from "next-themes";

export default function HomePageHeader() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const { theme, setTheme } = useTheme();
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
            <FileTextIcon />
            <span className="text-xl font-bold text-foreground">NotesApp</span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggleAnimated
              theme={currentTheme}
              setTheme={setTheme}
              ref={ref}
            />

            <Button variant="ghost" className="hidden sm:flex">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button variant="ghost">
              <Link href="/sign-up">Get started</Link>
            </Button>
          </div>
        </nav>
      </HeaderCenter>
    </BaseHeader>
  );
}
