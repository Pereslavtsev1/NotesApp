'use client';

import { type Preloaded, usePreloadedQuery } from 'convex/react';

import { api } from '../../../../../convex/_generated/api';
import { NotePageToolbarActions } from './note-page-toolbar-actions';
import { NotePageToolbarTitle } from './note-page-toolbar-title';

type NotePageToolbarProps = {
  preloadedQuery: Preloaded<typeof api.notes.findNote>;
};

export default function NotePageToolbar({
  preloadedQuery,
}: NotePageToolbarProps) {
  const note = usePreloadedQuery(preloadedQuery);

  return (
    <div className='group relative mb-4 py-3 sm:py-4 md:py-6'>
      <div className='h-16'>
        <NotePageToolbarActions note={note} />
      </div>

      <NotePageToolbarTitle note={note} />
    </div>
  );
}
