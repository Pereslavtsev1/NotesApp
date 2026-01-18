'use client';

import { useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { Doc, Id } from '../../../../../convex/_generated/dataModel';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  BreadcrumbLink,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '../../../../../convex/_generated/api';

export default function NotePageNav({ note }: { note: Doc<'notes'> }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {note.parentNote && (
          <ParentBreadcrumbItem parentNoteId={note.parentNote} />
        )}
        <BreadcrumbItem>
          <BreadcrumbPage className='max-w-36 truncate font-semibold text-muted-foreground'>
            {note.title}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

const ParentBreadcrumbItem = ({
  parentNoteId,
}: {
  parentNoteId: Id<'notes'>;
}) => {
  const router = useRouter();
  const parentNote = useQuery(api.notes.findNote, { id: parentNoteId });

  if (parentNote === undefined)
    return (
      <>
        <BreadcrumbItem>
          <Skeleton className='h-4 w-24' />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
      </>
    );

  if (!parentNote) {
    return null;
  }

  const handleClick = () => {
    router.push(`/notes/${parentNoteId}`);
  };

  return (
    <>
      {parentNote.parentNote && (
        <>
          <BreadcrumbEllipsis className='pt-1' />
          <BreadcrumbSeparator />
        </>
      )}
      <BreadcrumbLink
        className='max-w-36 truncate font-semibold text-muted-foreground'
        asChild
      >
        <Button onClick={handleClick} variant='ghost' className='px-2'>
          {parentNote.title}
        </Button>
      </BreadcrumbLink>
      <BreadcrumbSeparator />
    </>
  );
};
