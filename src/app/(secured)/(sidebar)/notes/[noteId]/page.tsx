'use server';

import NotePageCoverImage from '@/components/pages/note-page/cover-image/note-page-cover-image';
import NotePageEditorWrapper from '@/components/pages/note-page/editor/note-page-editor-wrapper';
import NotePageToolbar from '@/components/pages/note-page/toolbar/note-page-toolbar';
import { preloadAuthQuery } from '@/lib/auth-server';
import { api } from '../../../../../../convex/_generated/api';
import type { Id } from '../../../../../../convex/_generated/dataModel';

export default async function NotePage({
  params,
}: {
  params: Promise<{ noteId: Id<'notes'> }>;
}) {
  const { noteId } = await params;
  const preloadedQuery = await preloadAuthQuery(api.notes.findNote, {
    id: noteId,
  });

  return (
    <div className='w-full'>
      <NotePageCoverImage preloadedQuery={preloadedQuery} />
      <div className='mx-auto px-14 md:px-16 lg:px-20'>
        <NotePageToolbar preloadedQuery={preloadedQuery} />
        <NotePageEditorWrapper preloadedQuery={preloadedQuery} />
      </div>
    </div>
  );
}
