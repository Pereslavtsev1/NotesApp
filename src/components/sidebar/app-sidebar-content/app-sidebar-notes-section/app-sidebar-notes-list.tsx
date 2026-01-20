'use client';

import { usePaginatedQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import AppSidebarNoteButton from './app-sidebar-note-button';

const ITEMS = 1;
type AppSidebarNotesSectionProps = {
  handleClick: (noteId: Id<'notes'>) => void;
  onExpand: (noteId: string) => void;
  expanded: Record<string, boolean>;
  parentNote?: Id<'notes'>;
  level: number;
};

export default function AppSidebarNotesSection({
  expanded,
  handleClick,
  onExpand,
  parentNote,
  level,
}: AppSidebarNotesSectionProps) {
  const { noteId: selectedNoteId } = useParams<{ noteId: string }>();
  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.notes.findAllNotes,
    { parentNoteId: parentNote, isDeleted: false, isFavorite: true },
    {
      initialNumItems: ITEMS,
    }
  );

  const { ref, inView } = useInView({
    rootMargin: '200px',
  });
  return (
    <>
      {results.map((note) => (
        <AppSidebarNoteButton
          key={note._id}
          note={note}
          level={level}
          expanded={expanded[note._id]}
          onClick={() => handleClick(note._id)}
          onExpand={() => onExpand(note._id)}
          selectedNoteId={selectedNoteId}
        />
      ))}
    </>
  );
}
