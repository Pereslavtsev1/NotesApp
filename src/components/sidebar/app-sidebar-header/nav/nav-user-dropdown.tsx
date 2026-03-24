'use client';
import UserItem from '@/components/general/user-item/user-item';
import { Button } from '@/components/ui/button';
import { usePreloadedUser } from '@/hooks/use-preloaded-user';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { LogOut } from 'lucide-react';

export default function NavUserDropdown() {
  const user = usePreloadedUser();

  return (
    <>
      <div className='mb-2 flex items-center gap-3 rounded-md'>
        <UserItem src={user.pictureUrl!} alt={user.name!} />

        <div className='flex flex-col overflow-hidden'>
          <span className='truncate text-xs font-semibold text-muted-foreground'>
            {user.name}
          </span>
        </div>
      </div>

      <DropdownMenuSeparator />

      <Button
        variant='ghost'
        className='w-full justify-start text-xs font-semibold text-muted-foreground transition-colors duration-300 hover:text-destructive'
      >
        <LogOut className='size-4' />
        Sign Out
      </Button>
    </>
  );
}
