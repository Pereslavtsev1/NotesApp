"use client";
import { cn } from "@/lib/utils";
import { v4 as uuid } from "uuid";
import { createContext, ReactNode, useContext, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { EmptyContent, EmptyDescription, EmptyTitle } from "../ui/empty";

export type UploadFile = {
  key: string;
  file: File;
  uploading: boolean;
  uploaded: boolean;
  error: boolean;
  progress: number;
  previewUrl: string;
};

type DropzoneContextValue = {
  open: () => void;
  files: UploadFile[];
  setFiles: (files: UploadFile[]) => void;
  getRootProps: ReturnType<typeof useDropzone>["getRootProps"];
  getInputProps: ReturnType<typeof useDropzone>["getInputProps"];
  isDragActive: boolean;
};

const DropzoneContext = createContext<DropzoneContextValue | null>(null);

export function useDropzoneCtx() {
  const ctx = useContext(DropzoneContext);
  if (!ctx)
    throw new Error("useDropzoneCtx must be used within DropzoneProvider");
  return ctx;
}

type DropzoneProviderProps = {
  children: ReactNode;
  maxFiles: number;
  maxSize: number;
};

export function DropzoneProvider({
  children,
  maxFiles,
  maxSize,
}: DropzoneProviderProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);

  const handleDrop = (accepted: File[]) => {
    const newFiles: UploadFile[] = accepted.map((file) => ({
      key: uuid(),
      file,
      uploading: false,
      uploaded: false,
      error: false,
      progress: 0,
      previewUrl: URL.createObjectURL(file),
    }));
    setFiles(newFiles);
  };

  const handleRejectedFiles = (rejected: FileRejection[]) => {
    for (const r of rejected) {
      for (const e of r.errors) {
        if (e.code === "file-too-large")
          toast.error("File size exceeds limit.");
        if (e.code === "too-many-files") toast.error("Too many files.");
        if (e.code === "file-invalid-type") toast.error("Invalid file type.");
      }
    }
  };

  const dropzone = useDropzone({
    onDrop: handleDrop,
    onDropRejected: handleRejectedFiles,
    maxFiles,
    maxSize,
    noKeyboard: true,
  });

  const { getRootProps, getInputProps, isDragActive, open } = dropzone;

  return (
    <DropzoneContext.Provider
      value={{
        open,
        files,
        setFiles,
        getRootProps,
        getInputProps,
        isDragActive,
      }}
    >
      {children}
    </DropzoneContext.Provider>
  );
}

type DropzoneProps = {
  children?: React.ReactNode;
  className?: string;
};

export function Dropzone({ children, className }: DropzoneProps) {
  const { getRootProps, getInputProps } = useDropzoneCtx();

  return (
    <div
      {...getRootProps()}
      className={cn(
        "rounded-lg border border-dashed transition-colors duration-300",
        className,
      )}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  );
}

type DropzoneTitleProps = {
  children?: React.ReactNode;
  className?: string;
};

export function DropzoneTitle({ children, className }: DropzoneTitleProps) {
  return <EmptyTitle className={className}>{children}</EmptyTitle>;
}

export function DropzoneDescription({
  children,
  className,
}: DropzoneTitleProps) {
  return <EmptyDescription className={className}>{children}</EmptyDescription>;
}

type DropzoneContentProps = {
  children?: React.ReactNode;
  className?: string;
};

export function DropzoneContent({ children, className }: DropzoneContentProps) {
  return <EmptyContent className={className}>{children}</EmptyContent>;
}
