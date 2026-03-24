'use client';

import { Streamable } from '@/lib/utils';
import { Preloaded } from 'convex/react';
import { createContext } from 'react';
import { api } from '../../../convex/_generated/api';
type PreloadedUserContextType = {
  preloadedQuery: Streamable<Preloaded<typeof api.auth.getCurrentUser>>;
};
export const PreloadedUserContext = createContext<
  PreloadedUserContextType | undefined
>(undefined);

export default function PreloadedUserProvider({
  children,
  preloadedQuery,
}: {
  children: React.ReactNode;
} & PreloadedUserContextType) {
  return (
    <PreloadedUserContext value={{ preloadedQuery }}>
      {children}
    </PreloadedUserContext>
  );
}
