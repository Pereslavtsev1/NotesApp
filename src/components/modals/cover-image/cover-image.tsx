"use client";

import { DropzoneProvider } from "@/components/dropzone/dropzone";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCoverImage } from "@/hooks/use-cover-image";
import SelectedFilePreview from "./selected-files-preview";
import CoverImageDropzone from "./cover-image-dropzone";

export default function CoverImageModal() {
  const { open, toggle } = useCoverImage();

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent className="md:space-y-5">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>Choose an image file to upload.</DialogDescription>
        </DialogHeader>

        <DropzoneProvider maxFiles={1} maxSize={10 * 1024 * 1024}>
          <CoverImageDropzone />
          <DialogFooter>
            <SelectedFilePreview />
          </DialogFooter>
        </DropzoneProvider>
      </DialogContent>
    </Dialog>
  );
}
