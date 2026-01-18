'use client';
import { BaseHeader } from '@/components/header/base-header';
import HeaderCenter from '@/components/header/header-center';
import { Button } from '@/components/ui/button';
import { useThemeTransition } from '@/hooks/use-theme-transition';
import { FileTextIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRef } from 'react';

export default function HomePageHeader() {
  const ref = useRef<HTMLButtonElement>(null);
  const { theme, setTheme } = useTheme();
  const { changeThemeWithTransition } = useThemeTransition();
  return (
    <BaseHeader>
      <HeaderCenter className='py-6'>
        <nav className='flex w-full items-center justify-between'>
          <div className='flex items-center gap-2'>
            <FileTextIcon className='size-4.5' />
            <span className='text-xl font-bold text-foreground'>NotesApp</span>
          </div>

          <div className='flex items-center'>
            <Button
              ref={ref}
              variant='ghost'
              size='icon'
              suppressHydrationWarning
              onClick={() =>
                changeThemeWithTransition({
                  nextTheme: theme === 'light' ? 'dark' : 'light',
                  buttonRef: ref,
                  setTheme,
                })
              }
              aria-label='Toggle theme'
            >
              {theme === 'light' ? (
                <MoonIcon suppressHydrationWarning />
              ) : (
                <SunIcon suppressHydrationWarning />
              )}
            </Button>

            <Button variant='ghost' asChild>
              <Link href='/login'>Login</Link>
            </Button>
            <Button variant='ghost' asChild className='hidden sm:flex'>
              <Link href='/sign-up'>Get started</Link>
            </Button>
          </div>
        </nav>
      </HeaderCenter>
    </BaseHeader>
  );
}
