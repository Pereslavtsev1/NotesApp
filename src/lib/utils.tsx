import { UploadFile } from "@/components/dropzone/dropzone";
import { clsx, type ClassValue } from "clsx";

import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function getStatusIcon(file: UploadFile) {
  if (file.uploading) {
    return <Loader2 className="size-4 animate-spin text-blue-500" />;
  }
  if (file.error) {
    return <AlertCircle className="size-4 text-red-500" />;
  }
  if (file.uploaded) {
    return <CheckCircle className="size-4 text-green-500" />;
  }
  return null;
}
