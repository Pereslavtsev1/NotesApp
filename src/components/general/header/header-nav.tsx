import { ClassNameProps, cn } from '@/lib/utils';
import { ReactNode } from 'react';

export default function HeaderNav({
  children,
  className,
}: { children: ReactNode } & ClassNameProps) {
  return (
    <div className={cn('flex min-w-0 items-center gap-x-2', className)}>
      {children}
    </div>
  );
}
