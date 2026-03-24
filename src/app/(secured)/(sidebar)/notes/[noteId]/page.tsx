import EditorSkeleton from '@/components/general/editor/skeletons/editor-skeleton';
import NotePageCoverImage from '@/components/pages/note-page/cover-image/note-page-cover-image';
import NotePageEditorWrapper from '@/components/pages/note-page/editor/note-page-editor-wrapper';
import NotePageToolbar from '@/components/pages/note-page/toolbar/note-page-toolbar';
import { Suspense } from 'react';

export default function NotePage() {
  return (
    <>
      <Suspense>
        <NotePageCoverImage />
      </Suspense>

      <div className='mx-auto px-14 md:px-16 lg:px-20'>
        <NotePageToolbar />
        <Suspense fallback={<EditorSkeleton />}>
          <NotePageEditorWrapper />
        </Suspense>
      </div>
    </>
  );
}
