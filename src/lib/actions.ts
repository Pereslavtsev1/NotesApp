'use server';

import { getToken } from '@/lib/auth-server';
import { fetchMutation, fetchQuery } from 'convex/nextjs';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';

export async function handleFindNote({ id }: { id: Id<'notes'> }) {
  const token = await getToken();

  return fetchQuery(api.notes.findNote, { id }, { token });
}

export async function handleDeleteNote({ id }: { id: Id<'notes'> }) {
  const token = await getToken();

  return fetchMutation(
    api.notes.updateNote,
    {
      id,
      isDeleted: true,
      deletedAt: Date.now(),
      recursive: true,
    },
    { token }
  );
}

export async function handleRemoveIcon({ id }: { id: Id<'notes'> }) {
  const token = await getToken();

  return fetchMutation(api.notes.removeIcon, { id }, { token });
}

export async function handleSetIcon({
  id,
  icon,
}: {
  id: Id<'notes'>;
  icon: string;
}) {
  const token = await getToken();

  return fetchMutation(api.notes.updateNote, { id, icon }, { token });
}

export async function handleFavoriteNote({
  id,
  isFavorite,
  recursive,
}: {
  id: Id<'notes'>;
  isFavorite: boolean;
  recursive: boolean;
}) {
  const token = await getToken();

  return fetchMutation(
    api.notes.updateNote,
    { id, isFavorite, recursive },
    { token }
  );
}

export async function handleDuplicateNote({ id }: { id: Id<'notes'> }) {
  const token = await getToken();

  return await fetchMutation(api.notes.duplicate, { id }, { token });
}

export async function handleCreateNote({
  title = 'Untitled',
}: {
  title?: string;
}) {
  const token = await getToken();
  return await fetchMutation(api.notes.createNote, { title }, { token });
}

export async function handleAddChildrenNote({
  parentNoteId,
  title = 'Untitled',
}: {
  parentNoteId: Id<'notes'>;
  title?: string;
}) {
  const token = await getToken();

  return fetchMutation(
    api.notes.createNote,
    {
      parentNote: parentNoteId,
      title,
    },
    { token }
  );
}

export async function handleRestoreNote({ id }: { id: Id<'notes'> }) {
  const token = await getToken();

  return await fetchMutation(api.notes.restoreSmart, { id }, { token });
}

export async function handleDeleteNotePermanently({
  ids,
}: {
  ids: Id<'notes'>[];
}) {
  const token = await getToken();

  return await fetchMutation(api.notes.deletePermanently, { ids }, { token });
}

export async function handleSetCoverImage({
  id,
  coverImageKey,
}: {
  id: Id<'notes'>;
  coverImageKey: string;
}) {
  const token = await getToken();

  return await fetchMutation(
    api.notes.updateNote,
    { id, coverImageKey },
    { token }
  );
}

export async function handleRemoveCoverImage({ id }: { id: Id<'notes'> }) {
  const token = await getToken();

  return await fetchMutation(api.notes.removeCoverImage, { id }, { token });
}
