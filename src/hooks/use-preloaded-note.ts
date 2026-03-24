import { PreloadedNoteContext } from '@/components/providers/prelaoded-note-provider';
import { isPromise } from '@/lib/utils';
import { usePreloadedQuery } from 'convex/react';
import { use, useContext } from 'react';

export function usePreloadedNote() {
  const ctx = useContext(PreloadedNoteContext);
  if (!ctx) {
    throw new Error('usePreloadedNote must be used within a NoteProvider');
  }
  const { preloadedQuery } = ctx;
  return usePreloadedQuery(
    isPromise(preloadedQuery) ? use(preloadedQuery) : preloadedQuery
  );
}
