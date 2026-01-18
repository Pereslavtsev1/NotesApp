'use client';
import type { ColumnDef } from '@tanstack/react-table';
import { FileIcon, MoreHorizontal, RotateCcw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { handleDeleteNotePermanently, handleRestoreNote } from '@/lib/actions';
import { Doc } from '../../../../../convex/_generated/dataModel';

function getTrashActions(note: Doc<'notes'>) {
  return [
    {
      label: 'Restore',
      icon: RotateCcw,
      className: 'hover:text-green-400',
      onClick: () => handleRestoreNote(note._id),
    },
    {
      label: 'Delete permanently',
      icon: Trash2,
      className: 'hover:text-destructive',
      onClick: () => handleDeleteNotePermanently([note._id]),
    },
  ];
}

export const trashPageTableColumns: ColumnDef<Doc<'notes'>>[] = [
  {
    id: 'select',
    maxSize: 50,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
  },

  {
    id: 'title',
    accessorKey: 'title',
    header: 'Title',
    maxSize: 120,
    cell: ({ row }) => {
      const icon = row.original.icon;
      return (
        <span className='flex min-w-0 items-center gap-2'>
          {icon ? (
            <span className='shrink-0 text-lg leading-none'>{icon}</span>
          ) : (
            <FileIcon className='size-4 shrink-0 text-muted-foreground' />
          )}

          <span className='min-w-0 truncate'>{row.original.title}</span>
        </span>
      );
    },
  },

  {
    accessorKey: 'deletedAt',
    header: 'Deleted',
    maxSize: 120,
    cell: ({ row }) => {
      const deletedAt = row.getValue<number>('deletedAt');
      if (!deletedAt) return '—';

      const now = Date.now();
      const diff = now - deletedAt;

      const MS_IN_MINUTE = 1000 * 60;
      const MS_IN_HOUR = MS_IN_MINUTE * 60;
      const MS_IN_DAY = MS_IN_HOUR * 24;

      if (diff >= MS_IN_DAY) {
        const days = Math.floor(diff / MS_IN_DAY);
        return `${days} day${days > 1 ? 's' : ''} ago`;
      }

      if (diff >= MS_IN_HOUR) {
        const hours = Math.floor(diff / MS_IN_HOUR);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      }

      const minutes = Math.floor(diff / MS_IN_MINUTE);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    },
  },

  {
    id: 'daysLeft',
    header: 'Days left',
    maxSize: 90,
    cell: ({ row }) => {
      const deletedAt = row.getValue<number>('deletedAt');
      if (!deletedAt) return '—';

      const DAYS_TO_DELETE = 30;
      const MS_IN_DAY = 1000 * 60 * 60 * 24;

      const deleteAt = deletedAt + DAYS_TO_DELETE * MS_IN_DAY;
      const diff = deleteAt - Date.now();

      const daysLeft = diff <= 0 ? 0 : Math.ceil(diff / MS_IN_DAY);

      return <span>{daysLeft} days</span>;
    },
  },

  {
    id: 'actions',
    size: 50,
    cell: ({ row }) => {
      const note = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='size-6'>
              <MoreHorizontal className='size-4' />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='start' className='flex flex-col'>
            {getTrashActions(note).map(
              ({ label, icon: Icon, onClick, className }) => (
                <Button
                  variant='ghost'
                  key={label}
                  onClick={onClick}
                  className={`${className} justify-start text-sm font-medium text-muted-foreground `}
                >
                  <Icon className='size-4' />
                  {label}
                </Button>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
