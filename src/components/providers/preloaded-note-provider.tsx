'use client';

import { Streamable } from '@/lib/utils';
import { Preloaded } from 'convex/react';
import { createContext } from 'react';
import { api } from '../../../convex/_generated/api';
type PreloadedNoteContext = {
  preloadedQuery: Streamable<Preloaded<typeof api.notes.findNote>>;
};
export const PreloadedNoteContext = createContext<
  PreloadedNoteContext | undefined
>(undefined);

export default function PreloadedNoteProvider({
  children,
  preloadedQuery,
}: {
  children: React.ReactNode;
} & PreloadedNoteContext) {
  return (
    <PreloadedNoteContext value={{ preloadedQuery }}>
      {children}
    </PreloadedNoteContext>
  );
}
