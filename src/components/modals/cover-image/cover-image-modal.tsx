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
import CoverImage from "./cover-image";
import { Button } from "@/components/ui/button";

export default function CoverImageModal() {
  const { open, toggle } = useCoverImage();

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent className="md:space-y-5">
        <DialogHeader>
          <DialogTitle>Upload image</DialogTitle>
          <DialogDescription>Choose an image file to upload.</DialogDescription>
        </DialogHeader>

        <DropzoneProvider maxFiles={1} maxSize={10 * 1024 * 1024}>
          <CoverImage />
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => {}}>
              Cancel
            </Button>
            <Button type="submit">Upload</Button>
          </DialogFooter>
        </DropzoneProvider>
      </DialogContent>
    </Dialog>
  );
}
