import { cn } from '@/lib/utils';

export default function ThemePreview({
  containerClass,
  barClass,
}: {
  containerClass: string;
  barClass: string;
}) {
  return (
    <div
      className={cn('w-20 space-y-2 rounded-md p-3 shadow-sm', containerClass)}
    >
      <div className={cn('h-2 w-full rounded-full', barClass)} />

      <div className='space-y-1'>
        <div className={cn('h-1.5 w-3/4 rounded-sm', barClass)} />
        <div className={cn('h-1 w-full rounded-sm', barClass)} />
        <div className={cn('h-1 w-5/6 rounded-sm', barClass)} />
      </div>

      <div className='mt-1 flex gap-1'>
        <div className={cn('h-2 w-3 rounded-full', barClass)} />
        <div className={cn('h-2 w-3 rounded-full', barClass)} />
        <div className={cn('h-2 w-3 rounded-full', barClass)} />
      </div>
    </div>
  );
}
