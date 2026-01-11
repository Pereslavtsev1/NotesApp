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
      theme={theme === "dark" ? "dark" : "light"}
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
