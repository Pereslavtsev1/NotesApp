import HeaderActions from '@/components/general/header/header-actions';
import { Skeleton } from '@/components/ui/skeleton';

export default function NotePageHeaderActionsSkeleton() {
  return (
    <HeaderActions>
      <Skeleton className='size-9 rounded-md' />
      <Skeleton className='size-9 rounded-md' />
    </HeaderActions>
  );
}
