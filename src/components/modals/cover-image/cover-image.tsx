"use client";

import { useDropzoneCtx } from "@/components/dropzone/dropzone";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import CoverImageDropzone from "./cover-image-dropzone";

export default function CoverImage() {
  const { files, setFiles } = useDropzoneCtx();

  return (
    <>
      <CoverImageDropzone />

      {files.length > 0 && (
        <div className="space-y-3 overflow-y-hidden">
          <h3 className="text-sm font-semibold">
            Selected file{files.length > 1 ? "s" : ""}
          </h3>

          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.file.name}
                className="flex w-full items-center gap-3 rounded-lg border bg-muted/30 p-2"
              >
                <Image
                  src={file.previewUrl || "/placeholder.svg"}
                  alt="Preview"
                  width={40}
                  height={40}
                  className="shrink-0 rounded object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {file.file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.file.size)}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setFiles(
                        files.filter((f) => f.file.name !== file.file.name),
                      )
                    }
                  >
                    <X />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
