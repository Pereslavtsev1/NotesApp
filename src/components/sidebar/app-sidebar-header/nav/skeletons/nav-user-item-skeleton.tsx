import UserItemSkeleton from '@/components/general/user-item/skeletons/user-item-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function NavUserSkeleton() {
  return (
    <div className='mb-2 flex items-center gap-3 rounded-md'>
      <UserItemSkeleton />
      <Skeleton className='h-4 w-32' />
    </div>
  );
}
