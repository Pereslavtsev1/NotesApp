'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

import { Preloaded, usePreloadedQuery } from 'convex/react';
import Link from 'next/link';
import { api } from '../../../../../convex/_generated/api';
import { use } from 'react';

type NotePageHeaderBreadcrumbsProps = {
  prelaodedQuery: Promise<Preloaded<typeof api.notes.findNote>>;
};

export default function NotePageHeaderBreadcrumbs({
  prelaodedQuery,
}: NotePageHeaderBreadcrumbsProps) {
  const note = usePreloadedQuery(use(prelaodedQuery));
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage className='max-w-36 truncate font-semibold text-muted-foreground'>
            <Link href={`/note/${note._id}`}>{note.title}</Link>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
