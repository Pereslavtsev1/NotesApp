"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import type { PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";

import {
  GridSuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useTheme } from "next-themes";
import "../../app/block-note.css";
import { Skeleton } from "../ui/skeleton";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}
export default function Editor({ onChange, initialContent }: EditorProps) {
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  });
  return (
    <BlockNoteView
      className="mb-40 overflow-y-hidden text-wrap"
      theme={theme !== "dark" ? "dark" : "light"}
      editor={editor}
      shadCNComponents={{}}
      onChange={async () => {
        onChange(JSON.stringify(editor.document));
      }}
      emojiPicker={false}
      data-theming-css-demo
    >
      <GridSuggestionMenuController
        triggerCharacter={":"}
        columns={isMobile ? 5 : 8}
      />
    </BlockNoteView>
  );
}
export function EditorSkeleton() {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <Skeleton className="h-8 w-1/3" />
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-10" />
        <Skeleton className="h-8 w-10" />
        <Skeleton className="h-8 w-10" />
        <Skeleton className="h-8 w-10" />
      </div>

      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/5" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
