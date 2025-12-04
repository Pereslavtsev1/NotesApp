"use client";
import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import dynamic from "next/dynamic";
import { api } from "../../../convex/_generated/api";

const Editor = dynamic(() => import("./editor"), { ssr: false });

export default function EditorWrapper({
  preloadedQuery,
}: {
  preloadedQuery: Preloaded<typeof api.notes.findNote>;
}) {
  const note = usePreloadedQuery(preloadedQuery);
  const updateNote = useMutation(api.notes.updateNote);

  return (
    <Editor
      initialContent={note.content}
      onChange={(value: string): void => {
        try {
          updateNote({ id: note._id, content: value });
        } catch (error) {
          console.log(error);
        }
      }}
    />
  );
}
