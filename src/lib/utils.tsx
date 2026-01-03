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

const DAYS_TO_DELETE = 30;
const MS_IN_DAY = 1000 * 60 * 60 * 24;

export function getDaysLeft(deletedAt: number) {
  const deleteAt = deletedAt + DAYS_TO_DELETE * MS_IN_DAY;
  const now = Date.now();

  const diff = deleteAt - now;

  if (diff <= 0) return 0;

  return Math.ceil(diff / MS_IN_DAY);
}

export async function uploadFile(file: UploadFile) {
  const response = await fetch("/api/s3", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      key: file.key,
      filename: file.file.name,
      contentType: file.file.type,
      size: file.file.size,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    console.error("[upload] failed to get presigned URL", {
      status: response.status,
      error: errorData,
    });

    throw new Error(
      "Failed to get upload URL" +
        (errorData?.error ? `: ${errorData.error}` : ""),
    );
  }

  const { presignedUrl } = (await response.json()) as {
    presignedUrl: string;
  };

  console.log("[upload] presigned URL received");

  const uploadResponse = await fetch(presignedUrl, {
    method: "PUT",
    headers: { "Content-Type": file.file.type },
    body: file.file,
  });

  if (!uploadResponse.ok) {
    console.error("[upload] S3 upload failed", {
      status: uploadResponse.status,
      statusText: uploadResponse.statusText,
    });

    throw new Error(`Failed to upload file to S3 (${uploadResponse.status})`);
  }

  console.log("[upload] success", file.key);
  return file.key;
}

export function buildImageUrl(fileKey: string) {
  return `https://fuckingnotesapp.t3.storage.dev/${fileKey}`;
}
