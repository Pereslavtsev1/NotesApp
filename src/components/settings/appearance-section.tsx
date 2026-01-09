"use client";
import { useRef } from "react";
import { useTheme } from "next-themes";
import { useThemeTransition } from "@/hooks/use-theme-transition";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

export default function AppearanceSection() {
  const { theme, setTheme } = useTheme();
  const { changeThemeWithTransition } = useThemeTransition();

  const lightRef = useRef<HTMLButtonElement>(null);
  const darkRef = useRef<HTMLButtonElement>(null);

  return (
    <Card className="bg-background">
      <CardHeader className="font-semibold">
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize the appearance of the application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Label className="font-semibold">Application Theme</Label>
          <div className="flex justify-start gap-3 pt-2">
            <div className="flex flex-col items-center space-y-3">
              <button
                ref={lightRef}
                suppressHydrationWarning
                type="button"
                onClick={() =>
                  changeThemeWithTransition({
                    nextTheme: "light",
                    buttonRef: lightRef,
                    setTheme,
                  })
                }
                className={cn(
                  "relative border-2 rounded-lg p-2 transition-all duration-300",
                  theme === "light"
                    ? "border-primary shadow-lg"
                    : "border-border hover:border-primary/50",
                )}
              >
                <div className="w-20 space-y-2 rounded-md bg-white p-3 shadow-sm">
                  <div className="h-2 w-full rounded-full bg-gray-300" />
                  <div className="space-y-1">
                    <div className="h-1.5 w-3/4 rounded-sm bg-gray-300" />
                    <div className="h-1 w-full rounded-sm bg-gray-300" />
                    <div className="h-1 w-5/6 rounded-sm bg-gray-300" />
                  </div>
                  <div className="mt-1 flex justify-start space-x-1">
                    <div className="h-2 w-3 rounded-full bg-gray-300" />
                    <div className="h-2 w-3 rounded-full bg-gray-300" />
                    <div className="h-2 w-3 rounded-full bg-gray-300" />
                  </div>
                </div>
              </button>
              <span className="text-sm font-medium">Light</span>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <button
                ref={darkRef}
                suppressHydrationWarning
                type="button"
                onClick={() =>
                  changeThemeWithTransition({
                    nextTheme: "dark",
                    buttonRef: darkRef,
                    setTheme,
                  })
                }
                className={cn(
                  "relative border-2 rounded-lg p-2 transition-all duration-300",
                  theme === "dark"
                    ? "border-primary shadow-lg"
                    : "border-border hover:border-primary/50",
                )}
              >
                <div className="w-20 space-y-2 rounded-md bg-zinc-900 p-3 shadow-sm">
                  <div className="h-2 w-full rounded-full bg-zinc-700" />
                  <div className="space-y-1">
                    <div className="h-1.5 w-3/4 rounded-sm bg-zinc-600" />
                    <div className="h-1 w-full rounded-sm bg-zinc-600" />
                    <div className="h-1 w-5/6 rounded-sm bg-zinc-600" />
                  </div>
                  <div className="mt-1 flex justify-start space-x-1">
                    <div className="h-2 w-3 rounded-full bg-zinc-600" />
                    <div className="h-2 w-3 rounded-full bg-zinc-600" />
                    <div className="h-2 w-3 rounded-full bg-zinc-600" />
                  </div>
                </div>
              </button>
              <span className="text-sm font-medium">Dark</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
