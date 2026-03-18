import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type UserItemProps = {
  className?: string;
  src: string;
  alt: string;
};
export default function UserItem({ className, src, alt }: UserItemProps) {
  return (
    <Avatar className={cn('size-9', className)}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className='rounded-lg'>{alt[0]}</AvatarFallback>
    </Avatar>
  );
}
