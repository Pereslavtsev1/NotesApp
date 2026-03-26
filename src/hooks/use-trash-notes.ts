'use client';

import { usePaginatedQuery } from 'convex/react';
import { useEffect, useEffectEvent } from 'react';
import { useInView } from 'react-intersection-observer';
import { api } from '../../convex/_generated/api';

const ITEMS = 10;

type UseTrashNotesProps = {
  search?: string;
};

export function useTrashNotes({ search }: UseTrashNotesProps) {
  const trimmedSearch = search?.trim();

  const query = usePaginatedQuery(
    trimmedSearch ? api.notes.searchTrashNotes : api.notes.findTrashNotes,
    trimmedSearch ? { search: trimmedSearch } : { isDeleted: true },
    { initialNumItems: ITEMS }
  );

  const { ref, inView } = useInView({
    rootMargin: '200px',
  });

  const handleLoadMore = useEffectEvent(() => {
    if (inView && query.status === 'CanLoadMore') {
      query.loadMore(ITEMS);
    }
  });
  useEffect(() => {
    handleLoadMore();
  }, [inView, query.status, query.loadMore]);

  return {
    ...query,
    observerRef: ref,
  };
}
