'use server';

import NotePageCoverImage from '@/components/pages/note-page/cover-image/note-page-cover-image';
import NotePageToolbar from '@/components/pages/note-page/toolbar/note-page-toolbar';
import { getToken } from '@/lib/auth-server';
import { preloadQuery } from 'convex/nextjs';
import { api } from '../../../../../../convex/_generated/api';
import type { Id } from '../../../../../../convex/_generated/dataModel';
import NotePageEditorWrapper from '@/components/pages/note-page/editor/note-page-editor-wrapper';

export default async function NotePage({
  params,
}: {
  params: Promise<{ noteId: Id<'notes'> }>;
}) {
  const { noteId } = await params;
  const token = await getToken();
  const preloadedQuery = await preloadQuery(
    api.notes.findNote,
    { id: noteId },
    { token }
  );

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
