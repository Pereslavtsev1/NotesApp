import {
  Dropzone,
  DropzoneContent,
  DropzoneTitle,
  useDropzoneCtx,
} from '@/components/general/dropzone/dropzone';
import { cn } from '@/lib/utils';
type CoverImageDropzoneProps = {
  className?: string;
};

export default function CoverImageDropzone({
  className,
}: CoverImageDropzoneProps) {
  const { isDragActive } = useDropzoneCtx();

  return (
    <Dropzone
      className={cn(
        'rounded-lg border-2',
        isDragActive && 'border-green-400',
        className
      )}
    >
      <DropzoneContent className='mx-auto w-full justify-center py-20'>
        <div className='flex flex-col items-center gap-2'>
          <DropzoneTitle className='text-sm font-semibold sm:text-base'>
            Drag and drop or click to select
          </DropzoneTitle>
          <p
            className={cn(
              'text-xs sm:text-sm text-muted-foreground transition-all duration-300 ease-out font-medium',
              isDragActive
                ? 'opacity-100 translate-y-0'
                : 'opacity-70 translate-y-1'
            )}
          >
            {isDragActive
              ? 'Drop the file here...'
              : 'Click to upload or drag and drop.'}
          </p>
        </div>
      </DropzoneContent>
    </Dropzone>
  );
}
