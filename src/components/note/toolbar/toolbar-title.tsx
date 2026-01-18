'use client';

import { useMutation } from 'convex/react';
import { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useDebounce } from 'use-debounce';

import { useIconPickerDrawer } from '@/hooks/use-icon-picker-drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { api } from '../../../../convex/_generated/api';
import { Doc } from '../../../../convex/_generated/dataModel';
import IconPickerPopover from './icon-picker-popover';

type ToolbarTitleProps = {
  note: Doc<'notes'>;
};

export function ToolbarTitle({ note }: ToolbarTitleProps) {
  const updateNote = useMutation(api.notes.updateNote);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [title, setTitle] = useState(note.title);
  const [isEditing, setIsEditing] = useState(false);
  const [debouncedTitle] = useDebounce(title, 200);
  const { toggle } = useIconPickerDrawer();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (!isEditing) return;

    updateNote({
      id: note._id,
      title: debouncedTitle.trim() || 'Untitled',
    });
  }, [debouncedTitle, isEditing, note._id, updateNote]);

  const enableInput = () => {
    setIsEditing(true);
    requestAnimationFrame(() => {
      if (!inputRef.current) return;
      const el = inputRef.current;
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    });
  };

  return (
    <div className='flex items-center gap-x-2'>
      {note.icon &&
        (isMobile ? (
          <button type='button' onClick={() => toggle()}>
            <h1 className='text-lg font-bold leading-tight sm:text-2xl md:text-3xl'>
              {note.icon}
            </h1>
          </button>
        ) : (
          <IconPickerPopover onChange={() => {}} asChild>
            <button type='button'>
              <h1 className='text-lg font-bold leading-tight sm:text-2xl md:text-3xl'>
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
            onBlur={() => setIsEditing(false)}
            className='w-full resize-none bg-transparent text-lg font-bold leading-tight outline-none sm:text-2xl md:text-3xl'
          />
        ) : (
          <button
            type='button'
            onClick={enableInput}
            className='w-full text-left'
          >
            <h1 className='wrap-anywhere text-lg font-bold leading-tight sm:text-2xl md:text-3xl'>
              {title}
            </h1>
          </button>
        )}
      </div>
    </div>
  );
}
