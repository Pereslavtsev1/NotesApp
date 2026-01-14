"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import type { Doc } from "../../../convex/_generated/dataModel";
import { Skeleton } from "../ui/skeleton";
import NoteButton from "./note-button";
import NoteNode from "./notes-list";

export default function AppSidebarNotesSection({
  preloadedQuery,
}: {
  preloadedQuery: Preloaded<typeof api.notes.findAllUserNotes>;
}) {
  const notes = usePreloadedQuery(preloadedQuery);
  console.log(notes);

  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (noteId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [noteId]: !prev[noteId],
    }));
  };

  const handleClick = (note: Doc<"notes">) => {
    router.push(`/notes/${note._id}`);
  };

  if (!notes) return <Skeleton className="size-9 w-full" />;

  return (
    <>
      {notes.map((note) => (
        <div key={note._id}>
          <NoteButton
            key={note._id}
            note={note}
            level={0}
            expanded={expanded[note._id]}
            onClick={() => handleClick(note)}
            onExpand={() => onExpand(note._id)}
          />
          {expanded[note._id] && <NoteNode parentNote={note._id} level={1} />}
        </div>
      ))}
    </>
  );
}
