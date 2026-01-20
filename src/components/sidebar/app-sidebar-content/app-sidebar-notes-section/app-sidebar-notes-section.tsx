'use client';

import { usePaginatedQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import AppSidebarNoteButton, {
  AppSidebarNoteButtonSkeleton,
} from './app-sidebar-note-button';

const ITEMS = 10;

type AppSidebarNotesSectionProps = {
  isFavorite: boolean;
  expanded: Record<string, boolean>;
  handleClick: (noteId: Id<'notes'>) => void;
  onExpand: (noteId: string) => void;
  parentNote?: Id<'notes'>;
  skeletonCount?: number;
  level?: number;
};

export default function AppSidebarNotesSection({
  isFavorite,
  expanded,
  handleClick,
  onExpand,
  parentNote,
  level = 0,
  skeletonCount = 5,
}: AppSidebarNotesSectionProps) {
  const { noteId: selectedNoteId } = useParams<{ noteId: string }>();
  const { results, loadMore, status, isLoading } = usePaginatedQuery(
    api.notes.findAllNotes,
    {
      parentNoteId: parentNote,
      isDeleted: false,
      isFavorite: isFavorite,
    },
    { initialNumItems: ITEMS }
  );
  console.log('isLoading', isLoading);

  const { ref, inView } = useInView({
    rootMargin: '200px',
  });

  useEffect(() => {
    if (inView && status === 'CanLoadMore') {
      loadMore(ITEMS);
    }
  }, [inView, status, loadMore]);

  return (
    <>
      {results.length === 0 && isLoading ? (
        <>
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <AppSidebarNoteButtonSkeleton level={level} key={i} />
          ))}
        </>
      ) : (
        results.map((note, index) => (
          <div key={note._id}>
            <AppSidebarNoteButton
              note={note}
              level={level}
              expanded={expanded[note._id]}
              onClick={() => handleClick(note._id)}
              onExpand={() => onExpand(note._id)}
              selectedNoteId={selectedNoteId}
            />

            {expanded[note._id] && (
              <AppSidebarNotesSection
                isFavorite={isFavorite}
                expanded={expanded}
                handleClick={handleClick}
                onExpand={onExpand}
                parentNote={note._id}
                level={level + 1}
                skeletonCount={3}
              />
            )}

            {index === results.length - 1 && <div ref={ref} />}
          </div>
        ))
      )}
    </>
  );
}
