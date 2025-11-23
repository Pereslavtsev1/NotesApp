"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "../ui/button";

export default function AppSidebarNotesSection({
  preloadedQuery,
}: {
  preloadedQuery: Preloaded<typeof api.notes.findAllCurrentUserNotes>;
}) {
  const notes = usePreloadedQuery(preloadedQuery);
  return (
    <>
      {notes.map((note) => (
        <Button key={note._id} variant="ghost" className="tex w-full">
          {note.title}
        </Button>
      ))}
    </>
  );
}
