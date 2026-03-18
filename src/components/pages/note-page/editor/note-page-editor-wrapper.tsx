'use client';
import { ClassNameProps, cn } from '@/lib/utils';
import { Preloaded, useMutation, usePreloadedQuery } from 'convex/react';
import dynamic from 'next/dynamic';
import { api } from '../../../../../convex/_generated/api';
import { use } from 'react';

const NotePageEditor = dynamic(() => import('../../../general/editor/editor'), {
  ssr: false,
});

export default function NotePageEditorWrapper({
  preloadedQuery,
  className,
}: {
  preloadedQuery: Promise<Preloaded<typeof api.notes.findNote>>;
} & ClassNameProps) {
  const note = usePreloadedQuery(use(preloadedQuery));
  const updateNote = useMutation(api.notes.updateNote);

  return (
    <div className={cn('wrap-anywhere', className)}>
      <NotePageEditor
        initialContent={note.content}
        onChangeAction={(value: string): void => {
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
