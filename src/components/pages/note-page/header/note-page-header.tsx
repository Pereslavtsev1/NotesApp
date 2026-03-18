'use server';
import { ClassNameProps } from '@/lib/utils';

import { BaseHeader } from '@/components/general/header/base-header';
import HeaderNav from '@/components/general/header/header-nav';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Preloaded } from 'convex/react';
import { Suspense } from 'react';
import { api } from '../../../../../convex/_generated/api';
import NotePageHeaderActions from './note-page-header-actions';
import NotePageHeaderBreadcrumbs from './note-page-header-breadcrubs';
import NotePageHeaderActionsSkeleton from './skeletons/note-page-header-actions-skeleton';
import NotePageHeaderBreadcrumbsSkeleton from './skeletons/note-page-header-breadcrubs-skeleton';
type NotePageHeaderProps = {
  prelaodedQuery: Promise<Preloaded<typeof api.notes.findNote>>;
};
export default async function NotePageHeader({
  prelaodedQuery,
  className,
}: NotePageHeaderProps & ClassNameProps) {
  return (
    <BaseHeader className={className}>
      <HeaderNav className='flex-1'>
        <SidebarTrigger />
        <Suspense fallback={<NotePageHeaderBreadcrumbsSkeleton />}>
          <NotePageHeaderBreadcrumbs prelaodedQuery={prelaodedQuery} />
        </Suspense>

        <Suspense fallback={<NotePageHeaderActionsSkeleton />}>
          <NotePageHeaderActions preloadedQuery={prelaodedQuery} />
        </Suspense>
      </HeaderNav>
    </BaseHeader>
  );
}
