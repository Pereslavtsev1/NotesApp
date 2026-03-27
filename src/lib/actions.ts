'use server';

import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';
import { fetchAuthMutation, fetchAuthQuery } from './auth-server';

export async function handleFindNote({ id }: { id: Id<'notes'> }) {
  return fetchAuthQuery(api.notes.findNote, { id });
}

export async function handleDeleteNote({ id }: { id: Id<'notes'> }) {
  return fetchAuthMutation(api.notes.updateNote, {
    id,
    isDeleted: true,
    deletedAt: Date.now(),
    recursive: true,
  });
}

export async function handleRemoveIcon({ id }: { id: Id<'notes'> }) {
  return fetchAuthMutation(api.notes.removeIcon, { id });
}

export async function handleSetIcon({
  id,
  icon,
}: {
  id: Id<'notes'>;
  icon: string;
}) {
  return fetchAuthMutation(api.notes.updateNote, { id, icon });
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
  return fetchAuthMutation(api.notes.updateNote, { id, isFavorite, recursive });
}

export async function handleDuplicateNote({ id }: { id: Id<'notes'> }) {
  return await fetchAuthMutation(api.notes.duplicate, { id });
}

export async function handleCreateNote({
  title = 'Untitled',
}: {
  title?: string;
}) {
  return await fetchAuthMutation(api.notes.createNote, { title });
}

export async function handleAddChildrenNote({
  parentNoteId,
  title = 'Untitled',
}: {
  parentNoteId: Id<'notes'>;
  title?: string;
}) {
  return fetchAuthMutation(api.notes.createNote, {
    parentNote: parentNoteId,
    title,
  });
}

export async function handleRestoreNote({ id }: { id: Id<'notes'> }) {
  return await fetchAuthMutation(api.notes.restoreSmart, { id });
}

export async function handleDeleteNotePermanently({
  ids,
}: {
  ids: Id<'notes'>[];
}) {
  return await fetchAuthMutation(api.notes.deletePermanently, { ids });
}

export async function handleSetCoverImage({
  id,
  coverImageKey,
}: {
  id: Id<'notes'>;
  coverImageKey: string;
}) {
  return await fetchAuthMutation(api.notes.updateNote, { id, coverImageKey });
}

export async function handleRemoveCoverImage({ id }: { id: Id<'notes'> }) {
  return await fetchAuthMutation(api.notes.removeCoverImage, { id });
}
