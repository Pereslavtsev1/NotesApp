import { PreloadedUserContext } from '@/components/providers/preloaded-user-proivder';
import { isPromise } from '@/lib/utils';
import { usePreloadedQuery } from 'convex/react';
import { redirect } from 'next/navigation';
import { use, useContext } from 'react';

export function usePreloadedUser() {
  const ctx = useContext(PreloadedUserContext);
  if (!ctx) {
    throw new Error('usePreloadedUser must be used within a NoteProvider');
  }
  const { preloadedQuery } = ctx;
  const user = usePreloadedQuery(
    isPromise(preloadedQuery) ? use(preloadedQuery) : preloadedQuery
  );
  if (!user) {
    return redirect('/login');
  }
  return user;
}
