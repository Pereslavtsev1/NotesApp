import EditorSkeleton from '@/components/general/editor/skeletons/editor-skeleton';
import NotePageCoverImage from '@/components/pages/note-page/cover-image/note-page-cover-image';
import NotePageEditorWrapper from '@/components/pages/note-page/editor/note-page-editor-wrapper';
import NotePageToolbar from '@/components/pages/note-page/toolbar/note-page-toolbar';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

export default function NotePage() {
  return (
    <>
      <Suspense
        fallback={<Skeleton className='relative h-48 w-full sm:h-64' />}
      >
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
