"use server";

import { fetchMutation, fetchQuery } from "convex/nextjs";
import { getToken } from "@/lib/auth-server";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

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

export async function handleDelete(id: Id<"notes">) {
  const token = await getToken();
  return await fetchMutation(
    api.notes.updateNote,
    {
      id: id,
      isDeleted: true,
      deletedAt: Date.now(),
      recursive: true,
    },
    { token },
  );
}

export async function handleFavorite({
  id,
  isFavorite,
  recursive,
}: {
  id: Id<"notes">;
  isFavorite: boolean;
  recursive: boolean;
}) {
  const token = await getToken();

  return await fetchMutation(
    api.notes.updateNote,
    {
      id: id,
      isFavorite: isFavorite,
      recursive: recursive,
    },
    { token },
  );
}

export async function handleDuplicate(id: Id<"notes">) {
  const token = await getToken();

  return await fetchMutation(api.notes.duplicate, { id }, { token });
}

export async function handleCreate() {
  const token = await getToken();
  console.log("Here");
  const res = await fetchMutation(
    api.notes.createNote,
    {
      title: "Untitled",
    },
    { token },
  );

  console.log(res);
}

export async function handleAddChildren(parentNoteId: Id<"notes">) {
  const token = await getToken();
  console.log("Here");
  const res = await fetchMutation(
    api.notes.createNote,
    {
      parentNote: parentNoteId,
      title: "Untitled",
    },
    { token },
  );

  console.log(res);
}

export async function handleRestoreNote(noteId: Id<"notes">) {
  const token = await getToken();

  await fetchMutation(api.notes.restoreSmart, { id: noteId }, { token });
}

export async function handleDeleteNotePermanently(noteIds: Id<"notes">[]) {
  const token = await getToken();
  await fetchMutation(api.notes.deletePermanently, { ids: noteIds }, { token });
}
