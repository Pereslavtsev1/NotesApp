'use client';
import UserItem from '@/components/general/user-item/user-item';
import { usePreloadedUser } from '@/hooks/use-preloaded-user';

export function NavUserItem() {
  const user = usePreloadedUser();
  return (
    <>
      <UserItem src={user.pictureUrl!} alt={user.name!} />

      <div className='flex flex-col overflow-hidden'>
        <span className='truncate text-xs text-muted-foreground'>
          {user?.name}
        </span>
      </div>
    </>
  );
}
