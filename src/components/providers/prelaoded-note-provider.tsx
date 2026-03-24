'use client';

import { Preloaded } from 'convex/react';
import { createContext } from 'react';
import { api } from '../../../convex/_generated/api';
type PreloadedNoteProviderType = {
  preloadedQuery:
    | Promise<Preloaded<typeof api.notes.findNote>>
    | Preloaded<typeof api.notes.findNote>;
};
export const PreloadedNoteContext = createContext<
  PreloadedNoteProviderType | undefined
>(undefined);

export default function PreloadedNoteProvider({
  children,
  prelaodedQuery,
}: {
  children: React.ReactNode;
  prelaodedQuery: Promise<Preloaded<typeof api.notes.findNote>>;
}) {
  return (
    <PreloadedNoteContext value={{ preloadedQuery: prelaodedQuery }}>
      {children}
    </PreloadedNoteContext>
  );
}
