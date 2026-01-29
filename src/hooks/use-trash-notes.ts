import { usePaginatedQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const ITEMS = 20;

type UseTrashNotesProps = {
  search?: string;
};

export function useTrashNotes({ search }: UseTrashNotesProps) {
  const trimmedSearch = search?.trim();

  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    trimmedSearch ? api.notes.searchTrashNotes : api.notes.findTrashNotes,
    trimmedSearch
      ? { search: trimmedSearch, isDeleted: true }
      : { isDeleted: true },
    { initialNumItems: ITEMS }
  );

  return {
    notes: results,
    status,
    loadMore,
    isLoading,
  };
}
