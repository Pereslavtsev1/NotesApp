"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { useCoverImage } from "@/hooks/use-cover-image";
export default function CoverImageModal() {
  const { open, toggle } = useCoverImage();

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent className="space-y-5">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>
            Choose an image file to upload. Drag and drop or click to select.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Empty className="border border-dashed">
            <EmptyHeader className="space-y-2">
              <EmptyTitle>Click to upload or drag and drop</EmptyTitle>
              <EmptyDescription>
                PNG, JPG, GIF up to 10MB (only one file)
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" size="sm">
                Upload File
              </Button>
            </EmptyContent>
          </Empty>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
