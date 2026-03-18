'use server';

import EditorSkeleton from '@/components/general/editor/skeletons/editor-skeleton';
import NotePageCoverImage from '@/components/pages/note-page/cover-image/note-page-cover-image';
import NotePageEditorWrapper from '@/components/pages/note-page/editor/note-page-editor-wrapper';
import NotePageHeader from '@/components/pages/note-page/header/note-page-header';
import NotePageToolbar from '@/components/pages/note-page/toolbar/note-page-toolbar';
import { preloadAuthQuery } from '@/lib/auth-server';
import { Suspense } from 'react';
import { api } from '../../../../../../convex/_generated/api';
import type { Id } from '../../../../../../convex/_generated/dataModel';

export default async function NotePage({
  params,
}: {
  params: Promise<{ noteId: Id<'notes'> }>;
}) {
  const { noteId } = await params;
  const preloadedQuery = preloadAuthQuery(api.notes.findNote, { id: noteId });
  return (
    <>
      <NotePageHeader prelaodedQuery={preloadedQuery} />
      <Suspense>
        <NotePageCoverImage preloadedQuery={preloadedQuery} />
      </Suspense>

      <div className='mx-auto px-14 md:px-16 lg:px-20'>
        <NotePageToolbar preloadedQuery={preloadedQuery} />
        <Suspense fallback={<EditorSkeleton />}>
          <NotePageEditorWrapper preloadedQuery={preloadedQuery} />
        </Suspense>
      </div>
    </>
  );
}
