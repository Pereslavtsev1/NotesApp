'use client';

import { type Preloaded, usePreloadedQuery } from 'convex/react';

import { api } from '../../../../convex/_generated/api';

import { ToolbarActions } from './toolbar-actions';
import { ToolbarTitle } from './toolbar-title';

type ToolbarProps = {
  preloadedQuery: Preloaded<typeof api.notes.findNote>;
};

export default function Toolbar({ preloadedQuery }: ToolbarProps) {
  const note = usePreloadedQuery(preloadedQuery);

  return (
    <div className='group relative mb-4 py-3 sm:py-4 md:py-6'>
      <div className='h-16'>
        <ToolbarActions note={note} />
      </div>

      <ToolbarTitle note={note} />
    </div>
  );
}
