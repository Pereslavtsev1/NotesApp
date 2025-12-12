import {
  Dropzone,
  DropzoneContent,
  DropzoneTitle,
  useDropzoneCtx,
} from "@/components/dropzone/dropzone";
import { cn } from "@/lib/utils";

export default function CoverImageDropzone() {
  const { isDragActive } = useDropzoneCtx();

  return (
    <Dropzone className={cn("rounded-lg", isDragActive && "border-green-400")}>
      <DropzoneContent className="mx-auto w-full justify-center py-20">
        <div className="flex flex-col items-center gap-2">
          <DropzoneTitle>Drag and drop or click to select</DropzoneTitle>
          <p className="text-sm text-muted-foreground">
            {isDragActive
              ? "Drop the file here..."
              : "Click to upload or drag and drop"}
          </p>
        </div>
      </DropzoneContent>
    </Dropzone>
  );
}
