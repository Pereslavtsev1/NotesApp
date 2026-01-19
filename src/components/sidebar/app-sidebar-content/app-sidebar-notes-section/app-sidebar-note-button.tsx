'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  handleAddChildren,
  handleDelete,
  handleDuplicate,
  handleFavorite,
} from '@/lib/actions';
import { cn, runWithToast } from '@/lib/utils';
import {
  ChevronRight,
  Copy,
  MoreHorizontal,
  Plus,
  Star,
  StarOff,
  Trash2,
} from 'lucide-react';
import { Doc } from '../../../../../convex/_generated/dataModel';

type AppSidebarNoteButtonProps = {
  note: Doc<'notes'>;
  expanded?: boolean;
  onExpand?: () => void;
  level: number;
  selectedNoteId: string;
};

const getActionsList = (
  note: Doc<'notes'>,
  onExpand?: () => void,
  expanded?: boolean
) => [
  {
    label: 'Add children',
    icon: Plus,
    className: 'hover:text-green-500',
    onClick: async () =>
      await runWithToast({
        action: () => handleAddChildren({ parentNoteId: note._id }),
        messages: {
          success: 'Child note added',
          error: 'Failed to add child note',
        },
        afterSuccess: () => !expanded && onExpand?.(),
      }),
  },
  {
    label: note.isFavorite ? 'Remove from favorite' : 'Mark as favorite',
    icon: note.isFavorite ? StarOff : Star,
    className: 'hover:text-yellow-500',
    onClick: async () => {
      await runWithToast({
        action: () =>
          handleFavorite({
            id: note._id,
            isFavorite: !note.isFavorite,
            recursive: true,
          }),
        messages: {
          success: note.isFavorite
            ? 'Removed from favorites'
            : 'Added to favorites',
          error: 'Failed to update favorite',
        },
      });
    },
  },
  {
    label: 'Duplicate',
    icon: Copy,
    className: 'hover:text-blue-500',
    onClick: async () =>
      await runWithToast({
        action: () => handleDuplicate({ id: note._id }),
        messages: {
          success: 'Note duplicated',
          error: 'Failed to duplicate note',
        },
      }),
  },
  {
    label: 'Delete',
    icon: Trash2,
    className: 'hover:text-destructive',
    onClick: async () =>
      await runWithToast({
        action: () => handleDelete({ id: note._id }),
        messages: { success: 'Note deleted', error: 'Failed to delete note' },
      }),
  },
];

export default function AppSidebarNoteButton({
  note,
  level,
  selectedNoteId,
  expanded,
  onExpand,
  ...props
}: AppSidebarNoteButtonProps & React.ComponentProps<'button'>) {
  return (
    <DropdownMenu>
      <div className={cn('relative flex items-center')}>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onExpand?.();
          }}
          variant='ghost'
          className={cn(
            'absolute size-6 shrink-0 items-center rounded text-muted-foreground'
          )}
          style={{
            left: `${4 + level * 12}px`,
          }}
        >
          <ChevronRight
            className={cn(
              expanded ? 'rotate-90' : 'rotate-0',
              'size-4 transition-transform duration-200'
            )}
          />
        </Button>

        <Button
          className={cn(
            selectedNoteId === note._id
              ? 'bg-accent text-accent-foreground  dark:bg-accent/50'
              : 'text-muted-foreground',
            'flex w-full items-center justify-between truncate text-sm font-medium'
          )}
          style={{
            paddingLeft: `${32 + level * 12}px`,
          }}
          variant='ghost'
          {...props}
        >
          <div className='flex min-w-0 items-center gap-2'>
            <span className='flex-1 truncate' style={{ paddingRight: '20px' }}>
              {note.title}
            </span>
          </div>
        </Button>
        <DropdownMenuTrigger asChild>
          <Button
            className='absolute right-2 size-6 shrink-0 items-center rounded text-muted-foreground'
            variant='ghost'
          >
            <MoreHorizontal className='size-4' />
          </Button>
        </DropdownMenuTrigger>
      </div>

      <DropdownMenuContent align='start' className='flex flex-col'>
        {getActionsList(note, onExpand, expanded).map(
          ({ label, icon: Icon, className, onClick }) => (
            <Button
              key={label}
              variant='ghost'
              className={cn(
                'justify-start text-sm font-medium text-muted-foreground',
                className
              )}
              onClick={onClick}
            >
              <Icon className='size-4' />
              {label}
            </Button>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
