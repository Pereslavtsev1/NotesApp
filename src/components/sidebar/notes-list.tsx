'use client';

import { useQuery } from 'convex/react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { api } from '../../../convex/_generated/api';
import type { Doc, Id } from '../../../convex/_generated/dataModel';
import NoteButton from './note-button';

type NotesListProps = {
  parentNote?: Id<'notes'>;
  level?: number;
};

const NoteNode = ({ parentNote, level = 0 }: NotesListProps) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (noteId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [noteId]: !prev[noteId],
    }));
  };
  const { noteId: selectedNoteId } = useParams<{ noteId: string }>();

  const notes = useQuery(api.notes.findAllUserNotes, { parentNote });

  const handleClick = (note: Doc<'notes'>) => {
    router.push(`/notes/${note._id}`);
  };

  if (!notes) return <></>;

  return (
    <div>
      {notes.map((note) => (
        <div key={note._id}>
          <NoteButton
            note={note}
            expanded={expanded[note._id]}
            onClick={() => handleClick(note)}
            onExpand={() => onExpand(note._id)}
            level={level}
            selectedNoteId={selectedNoteId}
          />
          {expanded[note._id] && (
            <NoteNode parentNote={note._id} level={level + 1} />
          )}
        </div>
      ))}
    </div>
  );
};

export default NoteNode;
