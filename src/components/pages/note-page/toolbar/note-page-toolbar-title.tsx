'use client';

import IconPickerPopover from '@/components/general/icon-picker/icon-picker-popover';
import { useIconPickerDrawer } from '@/hooks/use-icon-picker-drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { handleSetIcon } from '@/lib/actions';
import { Preloaded, useMutation, usePreloadedQuery } from 'convex/react';
import { use, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { api } from '../../../../../convex/_generated/api';

type NotePageToolbarTitleProps = {
  prelaodedQuery: Promise<Preloaded<typeof api.notes.findNote>>;
};

export function NotePageToolbarTitle({
  prelaodedQuery,
}: NotePageToolbarTitleProps) {
  const note = usePreloadedQuery(use(prelaodedQuery));
  const updateNote = useMutation(api.notes.updateNote);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const [title, setTitle] = useState(note.title);
  const [isEditing, setIsEditing] = useState(false);
  const { toggle } = useIconPickerDrawer();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const saveTitle = () => {
    const trimmed = title.trim() || 'Untitled';
    if (trimmed !== note.title) {
      updateNote({ id: note._id, title: trimmed });
    }
    setTitle(trimmed);
    setIsEditing(false);
  };

  const enableInput = () => {
    setIsEditing(true);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveTitle();
    }
  };

  return (
    <div className='flex items-center gap-x-2'>
      {note.icon &&
        (isMobile ? (
          <button type='button' onClick={() => toggle()}>
            <h1 className='text-lg leading-tight font-bold sm:text-2xl md:text-3xl'>
              {note.icon}
            </h1>
          </button>
        ) : (
          <IconPickerPopover
            onChange={(icon) => handleSetIcon({ id: note._id, icon })}
            asChild
          >
            <button type='button'>
              <h1 className='text-lg leading-tight font-bold sm:text-2xl md:text-3xl'>
                {note.icon}
              </h1>
            </button>
          </IconPickerPopover>
        ))}

      <div className='min-w-0 flex-1'>
        {isEditing ? (
          <TextareaAutosize
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={handleKeyDown}
            className='w-full resize-none bg-transparent text-lg leading-tight font-bold outline-none sm:text-2xl md:text-3xl'
          />
        ) : (
          <button
            type='button'
            onClick={enableInput}
            className='w-full text-left'
          >
            <h1 className='text-lg leading-tight font-bold wrap-anywhere sm:text-2xl md:text-3xl'>
              {title}
            </h1>
          </button>
        )}
      </div>
    </div>
  );
}
