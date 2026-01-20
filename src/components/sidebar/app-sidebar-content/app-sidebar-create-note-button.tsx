'use client';
import { handleCreateNote } from '@/lib/actions';
import { runWithToast } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
import { Button } from '../../ui/button';

export default function AppCreateNoteButton() {
  return (
    <Button
      type='submit'
      variant='ghost'
      className='absolute right-2 size-5 rounded p-0 hover:bg-sidebar-accent'
      onClick={async () =>
        await runWithToast({
          action: async () => await handleCreateNote({}),
          messages: {
            success: 'Note created successfully',
            error: 'Failed to create note',
          },
        })
      }
    >
      <PlusIcon />
    </Button>
  );
}
