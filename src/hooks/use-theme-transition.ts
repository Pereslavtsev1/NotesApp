"use client";

import { useCallback } from "react";

export function useThemeTransition() {
  const changeThemeWithTransition = useCallback(
    ({
      nextTheme,
      buttonRef,
      setTheme,
    }: {
      nextTheme: "light" | "dark";
      buttonRef: React.RefObject<HTMLButtonElement | null>;
      setTheme: (theme: "light" | "dark") => void;
    }) => {
      if (!buttonRef.current) return;

      if (!document.startViewTransition) {
        setTheme(nextTheme);
        return;
      }

      document.startViewTransition(() => {
        setTheme(nextTheme);
      });

      const { top, left, width, height } =
        buttonRef.current.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;

      const maxRadius = Math.hypot(
        Math.max(left, window.innerWidth - left),
        Math.max(top, window.innerHeight - top),
      );

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    },
    [],
  );

  return { changeThemeWithTransition };
}
