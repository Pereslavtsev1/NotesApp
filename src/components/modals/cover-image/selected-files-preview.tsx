import { useDropzoneCtx } from "@/components/dropzone/dropzone";
import { Button } from "@/components/ui/button";
import { formatFileSize, getStatusIcon } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";

export default function SelectedFilePreview() {
  const { files, setFiles } = useDropzoneCtx();

  if (files.length === 0) return null;

  return (
    <div className="w-full space-y-3">
      <h3 className="text-sm font-semibold">Selected File</h3>
      <div className="space-y-2">
        {files.map((file) => (
          <div
            key={file.file.name}
            className="flex items-center justify-between rounded-lg border bg-muted/30 p-3"
          >
            <div className="flex min-w-0 flex-1 items-center space-x-3">
              <Image
                src={file.previewUrl || "/placeholder.svg"}
                alt="Preview"
                width={40}
                height={40}
                className="rounded object-cover"
              />
              <div className="truncate">
                <p className="text-sm font-medium">{file.file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.file.size)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(file)}
              <Button
                variant="ghost"
                size="sm"
                className="size-8 p-0"
                type="button"
                onClick={() => setFiles([])}
                disabled={file.uploading || file.uploaded}
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
