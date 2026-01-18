import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { ClassNameProps, cn } from '@/lib/utils';
import { CircleAlert } from 'lucide-react';

export default function TrashPageWarningCard({ className }: ClassNameProps) {
  return (
    <Card className={cn('border-border/50 bg-sidebar shadow-sm', className)}>
      <CardContent className='flex flex-col items-start gap-3 sm:flex-row sm:items-center'>
        <div className='mx-auto shrink-0 rounded-full bg-amber-500/10 p-2 sm:mx-0'>
          <CircleAlert className='size-5 text-amber-600 dark:text-amber-500' />
        </div>

        <CardDescription className='text-center text-sm leading-relaxed text-balance wrap-break-word text-muted-foreground sm:text-left md:text-base'>
          All deleted items will be permanently removed after{' '}
          <span className='font-semibold text-foreground'>30 days</span>. If any
          of these items are still in use, make sure to restore them before this
          period ends.
        </CardDescription>
      </CardContent>
    </Card>
  );
}
