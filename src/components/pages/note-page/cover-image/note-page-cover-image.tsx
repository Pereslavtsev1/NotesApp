'use client';
import { usePreloadedNote } from '@/hooks/use-preloaded-note';
import { buildImageUrl, ClassNameProps, cn } from '@/lib/utils';
import Image from 'next/image';

export default function NotePageCoverImage({ className }: ClassNameProps) {
  const note = usePreloadedNote();

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
