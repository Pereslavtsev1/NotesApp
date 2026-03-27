'use client';
import IconPickerPopover from '@/components/general/icon-picker/icon-picker-popover';
import { Button } from '@/components/ui/button';
import { useCoverImage } from '@/hooks/use-cover-image';
import { usePreloadedNote } from '@/hooks/use-preloaded-note';
import {
  handleRemoveCoverImage,
  handleRemoveIcon,
  handleSetIcon,
} from '@/lib/actions';
import { Preloaded } from 'convex/react';
import { ImageIcon, Smile, X } from 'lucide-react';
import { api } from '../../../../../convex/_generated/api';

export function NotePageToolbarActions() {
  const note = usePreloadedNote();
  const { toggle } = useCoverImage();

  return (
    <div className='hidden items-center gap-x-2 py-4 opacity-0 transition-opacity group-hover:opacity-100 sm:flex'>
      {note.icon ? (
        <Button
          variant='ghost'
          className='font-semibold hover:text-destructive'
          onClick={() => handleRemoveIcon({ id: note._id })}
        >
          <X className='size-4' />
          Remove icon
        </Button>
      ) : (
        <IconPickerPopover
          onChange={(icon) => handleSetIcon({ id: note._id, icon })}
          asChild={true}
        >
          <Button variant='ghost' className='font-semibold'>
            <Smile className='size-4' />
            Add icon
          </Button>
        </IconPickerPopover>
      )}

      <Button
        variant='ghost'
        className='font-semibold'
        onClick={() =>
          note.coverImageKey
            ? handleRemoveCoverImage({ id: note._id })
            : toggle()
        }
      >
        {note.coverImageKey ? (
          <>
            <X className='size-4' />
            Remove cover
          </>
        ) : (
          <>
            <ImageIcon className='size-4' />
            Add cover
          </>
        )}
      </Button>
    </div>
  );
}
