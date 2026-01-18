'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Preloaded, usePreloadedQuery } from 'convex/react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { api } from '../../../../../convex/_generated/api';
import { Doc } from '../../../../../convex/_generated/dataModel';
import AppSidebarNoteButton from './app-sidebar-note-button';
import AppSidebarNoteNode from './app-sidebar-note-node';

export default function AppSidebarNotesSection({
  preloadedQuery,
}: {
  preloadedQuery: Preloaded<typeof api.notes.findAllUserNotes>;
}) {
  const notes = usePreloadedQuery(preloadedQuery);
  console.log(notes);
  const { noteId: selectedNoteId } = useParams<{ noteId: string }>();
  console.log(selectedNoteId);

  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (noteId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [noteId]: !prev[noteId],
    }));
  };

  const handleClick = (note: Doc<'notes'>) => {
    router.push(`/notes/${note._id}`);
  };

  if (!notes) return <Skeleton className='size-9 w-full' />;

  return (
    <>
      {notes.map((note) => (
        <div key={note._id}>
          <AppSidebarNoteButton
            key={note._id}
            note={note}
            level={0}
            expanded={expanded[note._id]}
            onClick={() => handleClick(note)}
            onExpand={() => onExpand(note._id)}
            selectedNoteId={selectedNoteId}
          />
          {expanded[note._id] && (
            <AppSidebarNoteNode parentNote={note._id} level={1} />
          )}
        </div>
      ))}
    </>
  );
}
