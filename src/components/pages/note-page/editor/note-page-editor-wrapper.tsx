'use client';
import { ClassNameProps, cn } from '@/lib/utils';
import { useMutation } from 'convex/react';
import dynamic from 'next/dynamic';
import { api } from '../../../../../convex/_generated/api';
import { usePreloadedNote } from '@/hooks/use-preloaded-note';

const NotePageEditor = dynamic(() => import('../../../general/editor/editor'), {
  ssr: false,
});

export default function NotePageEditorWrapper({ className }: ClassNameProps) {
  const note = usePreloadedNote();
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
