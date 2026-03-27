'use client';
import type { PartialBlock } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';

import { useMediaQuery } from '@/hooks/use-media-query';
import {
  GridSuggestionMenuController,
  useCreateBlockNote,
} from '@blocknote/react';
import { BlockNoteView } from '@blocknote/shadcn';
import '@blocknote/shadcn/style.css';
import { useTheme } from 'next-themes';
import '@/app/block-note.css';

type EditorProps = {
  onChangeAction: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};
export default function Editor({
  onChangeAction,
  initialContent,
}: EditorProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { theme } = useTheme();
  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  });
  return (
    <BlockNoteView
      theme={theme === 'dark' ? 'dark' : 'light'}
      editor={editor}
      onChange={async () => {
        onChangeAction(JSON.stringify(editor.document));
      }}
      emojiPicker={false}
      data-theming-css-demo
    >
      <GridSuggestionMenuController
        triggerCharacter={':'}
        columns={isMobile ? 5 : 8}
      />
    </BlockNoteView>
  );
}
