import { usePaginatedQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const ITEMS = 20;

type UseSearchNotesProps = {
  search?: string;
};

export function useSearchNotes({ search }: UseSearchNotesProps) {
  const trimmedSearch = search?.trim();

  const query = trimmedSearch ? api.notes.searchNote : api.notes.findTrashNotes;

  const args = trimmedSearch
    ? { isDeleted: false, search: trimmedSearch }
    : { isDeleted: false };

  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    query,
    args,
    { initialNumItems: ITEMS }
  );

  return {
    notes: results,
    status,
    loadMore,
    isLoading,
  };
}
