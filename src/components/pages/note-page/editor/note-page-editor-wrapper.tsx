'use client';
import { Preloaded, useMutation, usePreloadedQuery } from 'convex/react';
import dynamic from 'next/dynamic';
import { ClassNameProps, cn } from '@/lib/utils';
import { api } from '../../../../../convex/_generated/api';

const NotePageEditor = dynamic(() => import('./note-page-editor'), {
  ssr: false,
});

export default function NotePageEditorWrapper({
  preloadedQuery,
  className,
}: {
  preloadedQuery: Preloaded<typeof api.notes.findNote>;
} & ClassNameProps) {
  const note = usePreloadedQuery(preloadedQuery);
  const updateNote = useMutation(api.notes.updateNote);

  return (
    <div className={cn('wrap-anywhere', className)}>
      <NotePageEditor
        initialContent={note.content}
        onChange={(value: string): void => {
          try {
            updateNote({ id: note._id, content: value });
          } catch (error) {
            console.log(error);
          }
        }}
      />
    </div>
  );
}
