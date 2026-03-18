import { Preloaded } from 'convex/react';
import { Suspense } from 'react';
import { api } from '../../../../../convex/_generated/api';
import { NotePageToolbarActions } from './note-page-toolbar-actions';
import { NotePageToolbarTitle } from './note-page-toolbar-title';
import ToolbarSkeleton from './note-page-toolbar-skeleton';
import NotePageToolbarTitleSkeleton from './skeletons/note-page-toolbar-title-skeleton';

type NotePageToolbarProps = {
  preloadedQuery: Promise<Preloaded<typeof api.notes.findNote>>;
};

export default async function NotePageToolbar({
  preloadedQuery,
}: NotePageToolbarProps) {
  return (
    <div className='group relative mb-4 py-3 sm:py-4 md:py-6'>
      <div className='h-16'>
        <Suspense fallback={<ToolbarSkeleton />}>
          <NotePageToolbarActions preloadedQuery={preloadedQuery} />
        </Suspense>
      </div>
      <Suspense fallback={<NotePageToolbarTitleSkeleton />}>
        <NotePageToolbarTitle prelaodedQuery={preloadedQuery} />
      </Suspense>
    </div>
  );
}
