'use client';

import { useDropzoneCtx } from '@/components/dropzone/dropzone';
import { Button } from '@/components/ui/button';
import { useCoverImage } from '@/hooks/use-cover-image';
import { handleSetCoverImage } from '@/lib/actions';
import { formatFileSize, uploadFile } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import CoverImageDropzone from './cover-image-dropzone';
import { Id } from '../../../../convex/_generated/dataModel';

export default function CoverImageModalContent() {
  const { toggle } = useCoverImage();
  const { files, setFiles } = useDropzoneCtx();
  const params = useParams();

  const noteId = params.noteId as Id<'notes'>;

  const uploadMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: (key) => {
      handleSetCoverImage({ id: noteId, coverImageKey: key });
      setFiles([]);
      toggle();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <>
      <CoverImageDropzone />

      {files.length > 0 && (
        <div className='space-y-3 overflow-y-hidden'>
          <h3 className='text-sm font-semibold'>
            Selected file{files.length > 1 ? 's' : ''}
          </h3>

          <div className='space-y-2'>
            {files.map((file) => (
              <div
                key={file.file.name}
                className='flex w-full items-center gap-3 rounded-lg border bg-muted/30 p-2'
              >
                <Image
                  src={file.previewUrl}
                  alt='Preview'
                  width={40}
                  height={40}
                  className='shrink-0 rounded object-cover'
                />

                <div className='min-w-0 flex-1'>
                  <p className='truncate text-sm font-medium'>
                    {file.file.name}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    {formatFileSize(file.file.size)}
                  </p>
                </div>

                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() =>
                    setFiles(
                      files.filter((f) => f.file.name !== file.file.name)
                    )
                  }
                  disabled={uploadMutation.isPending}
                >
                  <X />
                </Button>
              </div>
            ))}
          </div>

          {uploadMutation.isError && (
            <p className='text-sm text-destructive'>
              {(uploadMutation.error as Error).message}
            </p>
          )}

          <div className='flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>
            <Button
              variant='outline'
              type='button'
              disabled={uploadMutation.isPending}
            >
              Cancel
            </Button>

            <Button
              type='button'
              onClick={() => uploadMutation.mutate(files[0])}
              disabled={uploadMutation.isPending}
            >
              {uploadMutation.isPending ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
