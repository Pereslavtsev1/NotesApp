'use client';

import { useExpanded } from '@/hooks/use-expanded';
import { usePaginatedNotes } from '@/hooks/use-paginated-notes';
import { useParams, useRouter } from 'next/navigation';
import { Id } from '../../../../../convex/_generated/dataModel';
import AppSidebarNoteButton, {
  AppSidebarNoteButtonSkeleton,
} from './app-sidebar-note-button';

type AppSidebarNotesSectionProps = {
  isFavorite: boolean;
  parentNote?: Id<'notes'>;
  skeletonCount?: number;
  level?: number;
};

export default function AppSidebarNotesSection({
  isFavorite,
  parentNote,
  level = 0,
  skeletonCount = 5,
}: AppSidebarNotesSectionProps) {
  const { noteId: selectedNoteId } = useParams<{ noteId: string }>();
  const { results, isLoading, observerRef } = usePaginatedNotes({
    parentNote,
    isFavorite,
  });
  const { expanded, handleExpand } = useExpanded();
  const router = useRouter();

  const handleClick = (noteId: Id<'notes'>) => {
    router.push(`/notes/${noteId}`);
  };
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
              onExpand={() => handleExpand(note._id)}
              selectedNoteId={selectedNoteId}
            />

            {expanded[note._id] && (
              <AppSidebarNotesSection
                isFavorite={isFavorite}
                parentNote={note._id}
                level={level + 1}
                skeletonCount={3}
              />
            )}

            {index === results.length - 1 && <div ref={observerRef} />}
          </div>
        ))
      )}
    </>
  );
}
