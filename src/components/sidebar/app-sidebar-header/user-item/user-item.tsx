import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type UserItemProps = {
  className?: string;
  src: string;
  alt: string;
};
export default function UserItem({ className, src, alt }: UserItemProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className='rounded-lg'>{alt[0]}</AvatarFallback>
    </Avatar>
  );
}
