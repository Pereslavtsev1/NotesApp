'use client';
import UserItem from '@/components/general/user-item/user-item';
import { Preloaded, usePreloadedQuery } from 'convex/react';
import { use } from 'react';
import { api } from '../../../../../convex/_generated/api';

type UserItemDataProps = {
  preloadedQuery: Promise<Preloaded<typeof api.auth.getCurrentUser>>;
};
export function NavUserItem({ preloadedQuery }: UserItemDataProps) {
  const user = usePreloadedQuery(use(preloadedQuery));

  return (
    <>
      <UserItem src={user?.pictureUrl || ''} alt={user?.name || ''} />

      <div className='flex flex-col overflow-hidden'>
        <span className='truncate text-xs text-muted-foreground'>
          {user?.name}
        </span>
      </div>
    </>
  );
}
