'use client';
import { buildImageUrl, ClassNameProps, cn } from '@/lib/utils';
import { Preloaded, usePreloadedQuery } from 'convex/react';
import Image from 'next/image';
import { api } from '../../../../../convex/_generated/api';

export default function NotePageCoverImage({
  preloadedQuery,
  className,
}: {
  preloadedQuery: Preloaded<typeof api.notes.findNote>;
} & ClassNameProps) {
  const note = usePreloadedQuery(preloadedQuery);

  if (!note.coverImageKey) return null;

  return (
    <div className={cn('relative h-48 w-full sm:h-64', className)}>
      <Image
        src={buildImageUrl(note.coverImageKey)}
        alt={note.title}
        fill
        className='object-cover'
        priority
      />
    </div>
  );
}
