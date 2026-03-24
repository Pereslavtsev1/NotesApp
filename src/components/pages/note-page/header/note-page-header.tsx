'use server';
import { ClassNameProps } from '@/lib/utils';

import { BaseHeader } from '@/components/general/header/base-header';
import HeaderNav from '@/components/general/header/header-nav';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Suspense } from 'react';
import NotePageHeaderActions from './note-page-header-actions';
import NotePageHeaderBreadcrumbs from './note-page-header-breadcrubs';
import NotePageHeaderActionsSkeleton from './skeletons/note-page-header-actions-skeleton';
import NotePageHeaderBreadcrumbsSkeleton from './skeletons/note-page-header-breadcrubs-skeleton';
export default async function NotePageHeader({ className }: ClassNameProps) {
  return (
    <BaseHeader className={className}>
      <HeaderNav className='flex-1'>
        <SidebarTrigger />
        <Suspense fallback={<NotePageHeaderBreadcrumbsSkeleton />}>
          <NotePageHeaderBreadcrumbs />
        </Suspense>

        <Suspense fallback={<NotePageHeaderActionsSkeleton />}>
          <NotePageHeaderActions />
        </Suspense>
      </HeaderNav>
    </BaseHeader>
  );
}
