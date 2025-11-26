"use server";

import { getToken } from "@/lib/auth-server";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

export async function handleDelete(id: Id<"notes">) {
  const token = await getToken();

  return await fetchMutation(
    api.notes.update,
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
    api.notes.update,
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
