'use client';
import { Button } from '@/components/ui/button';
import { useCoverImage } from '@/hooks/use-cover-image';
import {
  handleRemoveCoverImage,
  handleRemoveIcon,
  handleSetIcon,
} from '@/lib/actions';
import { ImageIcon, Smile, X } from 'lucide-react';
import { Doc } from '../../../../../convex/_generated/dataModel';
import IconPickerPopover from '@/components/general/icon-picker/icon-picker-popover';

type NotePageToolbarActionsProps = {
  note: Doc<'notes'>;
};

export function NotePageToolbarActions({ note }: NotePageToolbarActionsProps) {
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
          <span className='flex items-center hover:text-destructive gap-x-2'>
            <X className='size-4' />
            Remove cover
          </span>
        ) : (
          <span className='flex items-center hover:text-destructive gap-x-2'>
            <ImageIcon className='size-4' />
            Add cover
          </span>
        )}
      </Button>
    </div>
  );
}
