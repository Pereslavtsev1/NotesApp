'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useThemeTransition } from '@/hooks/use-theme-transition';
import { ClassNameProps, cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useRef } from 'react';
import ThemePreview from './theme-preview';

type ThemeOption = {
  key: 'light' | 'dark';
  label: string;
  previewClass: string;
  barClass: string;
};

const THEMES: ThemeOption[] = [
  {
    key: 'light',
    label: 'Light',
    previewClass: 'bg-white',
    barClass: 'bg-gray-300',
  },
  {
    key: 'dark',
    label: 'Dark',
    previewClass: 'bg-zinc-900',
    barClass: 'bg-zinc-700',
  },
];

export default function AppearanceSection({ className }: ClassNameProps) {
  const { theme, setTheme } = useTheme();
  const { changeThemeWithTransition } = useThemeTransition();

  const refs = {
    light: useRef<HTMLButtonElement>(null),
    dark: useRef<HTMLButtonElement>(null),
  };

  return (
    <Card className={cn('bg-background', className)}>
      <CardHeader className='font-semibold'>
        <CardTitle className='text-sm sm:text-base'>Appearance</CardTitle>
        <CardDescription className='text-xs sm:text-sm'>
          Customize the appearance of the application.
        </CardDescription>
      </CardHeader>

      <CardContent className='space-y-4'>
        <Label className='text-sm sm:text-base font-semibold'>
          Application Theme
        </Label>

        <div className='flex gap-3 pt-2'>
          {THEMES.map(({ key, label, previewClass, barClass }) => {
            const active = theme === key;

            return (
              <div key={key} className='flex flex-col items-center gap-3'>
                <button
                  ref={refs[key]}
                  suppressHydrationWarning
                  type='button'
                  onClick={() =>
                    changeThemeWithTransition({
                      nextTheme: key,
                      buttonRef: refs[key],
                      setTheme,
                    })
                  }
                  className={cn(
                    'rounded-lg border-2 p-2 transition-all',
                    active
                      ? 'border-primary shadow-lg'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <ThemePreview
                    containerClass={previewClass}
                    barClass={barClass}
                  />
                </button>

                <span className='text-sm font-medium'>{label}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
