'use client';

import { ClassNameProps, cn } from '@/lib/utils';
import { ReactNode } from 'react';

export function BaseHeader({
  children,
  className,
}: { children: ReactNode } & ClassNameProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md flex h-14 items-center text-muted-foreground mx-auto px-2 sm:px-4 md:px-8 lg:px-8',
        className
      )}
    >
      {children}
    </header>
  );
}
