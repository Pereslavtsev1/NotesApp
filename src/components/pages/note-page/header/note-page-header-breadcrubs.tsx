'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { usePreloadedNote } from '@/hooks/use-preloaded-note';

import Link from 'next/link';

export default function NotePageHeaderBreadcrumbs() {
  const note = usePreloadedNote();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage className='max-w-36 truncate font-semibold text-muted-foreground'>
            <Link href={`/notes/${note._id}`}>{note.title}</Link>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
