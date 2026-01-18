'use client';
import { BaseHeader } from '@/components/general/header/base-header';
import HeaderActions from '@/components/general/header/header-actions';
import HeaderNav from '@/components/general/header/header-nav';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';

export default function NoteHeaderSkeleton() {
  return (
    <BaseHeader className='px-4 sm:px-6 md:px-6 lg:px-10'>
      <HeaderNav>
        <SidebarTrigger />
        <Skeleton className='h-4 w-24' />
      </HeaderNav>

      <HeaderActions>
        <Skeleton className='size-9 rounded-md' />
        <Skeleton className='size-9 rounded-md' />
      </HeaderActions>
    </BaseHeader>
  );
}
