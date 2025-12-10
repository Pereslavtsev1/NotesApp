"use server";

import { getToken } from "@/lib/auth-server";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

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
    },
    { token },
  );
}

export async function handleFavorite({
  id,
  isFavorite,
}: {
  id: Id<"notes">;
  isFavorite: boolean;
}) {
  const token = await getToken();

  return await fetchMutation(
    api.notes.updateNote,
    {
      id: id,
      isFavorite: !isFavorite,
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
