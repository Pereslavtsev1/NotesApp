import { Suspense } from 'react';
import { NotePageToolbarActions } from './note-page-toolbar-actions';
import ToolbarSkeleton from './note-page-toolbar-skeleton';
import { NotePageToolbarTitle } from './note-page-toolbar-title';
import NotePageToolbarTitleSkeleton from './skeletons/note-page-toolbar-title-skeleton';

export default async function NotePageToolbar() {
  return (
    <div className='group relative mb-4 py-3 sm:py-4 md:py-6'>
      <div className='h-16'>
        <Suspense fallback={<ToolbarSkeleton />}>
          <NotePageToolbarActions />
        </Suspense>
      </div>
      <Suspense fallback={<NotePageToolbarTitleSkeleton />}>
        <NotePageToolbarTitle />
      </Suspense>
    </div>
  );
}
