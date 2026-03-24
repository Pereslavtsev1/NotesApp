import { usePaginatedQuery } from 'convex/react';
import { useEffect, useEffectEvent } from 'react';
import { useInView } from 'react-intersection-observer';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

const ITEMS = 10;

type UsePaginatedNotesProps = {
  parentNote?: Id<'notes'>;
  isFavorite: boolean;
};

export function usePaginatedNotes({
  parentNote,
  isFavorite,
}: UsePaginatedNotesProps) {
  const query = usePaginatedQuery(
    api.notes.findAllNotes,
    {
      parentNoteId: parentNote,
      isDeleted: false,
      isFavorite,
    },
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
  }, [inView, query.loadMore]);

  return {
    ...query,
    observerRef: ref,
  };
}
