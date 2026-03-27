'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronsDown } from 'lucide-react';
import { Suspense } from 'react';
import NavUserDropdown from './nav-user-dropdown';
import { NavUserItem } from './nav-user-item';
import NavUserSkeleton from './skeletons/nav-user-item-skeleton';

export default function AppSidebarNavUser() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className='relative flex w-full items-center justify-start gap-x-2 px-2 font-semibold text-muted-foreground'
          variant='ghost'
          size='lg'
        >
          <Suspense fallback={<NavUserSkeleton />}>
            <NavUserItem />
          </Suspense>

          <div className='absolute right-3'>
            <ChevronsDown className='size-4' />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='w-72 p-2'
        side='bottom'
        align='start'
        sideOffset={8}
      >
        <div className='flex-2'>
          <Suspense fallback={<NavUserSkeleton />}>
            <NavUserDropdown />
          </Suspense>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
