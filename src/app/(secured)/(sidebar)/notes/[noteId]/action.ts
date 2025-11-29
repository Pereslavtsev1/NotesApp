"use server";

import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../../convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import { Id } from "../../../../../../convex/_generated/dataModel";

export default async function findNoteAction({
  noteId,
}: {
  noteId: Id<"notes">;
}) {
  const token = await getToken();
  const note = await fetchQuery(
    api.notes.findNote,
    {
      id: noteId,
    },
    { token },
  );
  return note;
}
