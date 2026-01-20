'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCoverImage } from '@/hooks/use-cover-image';
import CoverImageModalContent from './cover-image-modal-content';
import { DropzoneProvider } from '@/components/general/dropzone/dropzone';

export default function CoverImageModal() {
  const { open, toggle } = useCoverImage();

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent className='md:space-y-5'>
        <DialogHeader>
          <DialogTitle>Upload image</DialogTitle>
          <DialogDescription>Choose an image file to upload.</DialogDescription>
        </DialogHeader>

        <DropzoneProvider maxFiles={1} maxSize={10 * 1024 * 1024}>
          <CoverImageModalContent />
        </DropzoneProvider>
      </DialogContent>
    </Dialog>
  );
}
