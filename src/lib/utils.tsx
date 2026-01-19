import { UploadFile } from '@/components/general/dropzone/dropzone';
import { clsx, type ClassValue } from 'clsx';

import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

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
    return <Loader2 className='size-4 animate-spin text-blue-500' />;
  }
  if (file.error) {
    return <AlertCircle className='size-4 text-red-500' />;
  }
  if (file.uploaded) {
    return <CheckCircle className='size-4 text-green-500' />;
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

export function buildImageUrl(fileKey: string) {
  return `https://fuckingnotesapp.t3.storage.dev/${fileKey}`;
}

export type ClassNameProps = {
  className?: string;
};

export type ToastMessages = {
  success: string;
  error: string;
};

type runWithToastProps<T> = {
  action: () => Promise<T>;
  messages: ToastMessages;
  afterSuccess?: () => void;
};
export async function runWithToast<T>({
  action,
  messages,
  afterSuccess,
}: runWithToastProps<T>) {
  try {
    await action();
    afterSuccess?.();
    toast.success(messages.success);
  } catch {
    toast.error(messages.error);
  }
}
