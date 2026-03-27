'use client';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useTrashNotes } from '@/hooks/use-trash-notes';
import { handleDeleteNotePermanently } from '@/lib/actions';
import { ClassNameProps, cn, runWithToast } from '@/lib/utils';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import { SearchIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useEffectEvent, useState } from 'react';
import { useDebounce } from 'use-debounce';
import TrashboxTableSkeletonRow from './skeletons/trash-table-skeleton-row';
import { trashPageTableColumns } from './trash-page-table-columns';

export default function TrashPageTable({ className }: ClassNameProps) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch] = useDebounce(searchInput, 300);
  const {
    results: notes,
    isLoading,
    observerRef,
  } = useTrashNotes({
    search: debouncedSearch,
  });
  const isMobile = useMediaQuery('(max-width: 768px)');

  const table = useReactTable({
    data: notes,
    columns: trashPageTableColumns,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
    manualPagination: true,
    state: { rowSelection, columnVisibility },
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
  });

  const toggleDaysLeftColumn = useEffectEvent(() => {
    const daysLeftColumn = table.getColumn('daysLeft');
    if (!daysLeftColumn) return;

    daysLeftColumn.toggleVisibility(!isMobile);
  });

  useEffect(() => {
    toggleDaysLeftColumn();
  }, [isMobile]);

  const selectedCount = table.getSelectedRowModel().flatRows.length;
  const hasResults = notes.length > 0;
  const hasSearchQuery = debouncedSearch.trim().length > 0;

  const handleDeleteSelectedNotes = async () => {
    await runWithToast({
      action: () =>
        handleDeleteNotePermanently({
          ids: table
            .getSelectedRowModel()
            .flatRows.map((row) => row.original._id),
        }),
      messages: {
        success: `Deleted ${table.getSelectedRowModel().flatRows.length} items`,
        error: 'Failed to delete',
      },
    });
  };

  return (
    <div className={cn('space-y-6', className)}>
      <div className='flex items-center justify-between gap-3'>
        <div className='relative flex-1 sm:max-w-md'>
          <SearchIcon className='absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            placeholder='Search trash…'
            className='pl-9 font-medium'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <Button
          variant='outline'
          disabled={selectedCount <= 0}
          onClick={handleDeleteSelectedNotes}
          className='font-medium text-muted-foreground'
        >
          <Trash2Icon className='flex text-muted-foreground sm:hidden' />
          <span className='hidden font-medium sm:flex'>
            Delete {selectedCount} items
          </span>
        </Button>
      </div>

      {!hasResults && !isLoading ? (
        <Empty className='rounded-lg py-16 sm:py-24'>
          <EmptyMedia
            variant='icon'
            className='bg-muted/40 text-muted-foreground'
          >
            <Trash2Icon className='size-6' />
          </EmptyMedia>
          <EmptyContent>
            {hasSearchQuery ? (
              <>
                <EmptyTitle>No results found</EmptyTitle>
                <EmptyDescription>
                  We couldn&apos;t find anything matching{' '}
                  <span className='font-semibold text-foreground'>
                    &quot;{debouncedSearch}&quot;
                  </span>
                </EmptyDescription>
              </>
            ) : (
              <>
                <EmptyTitle>Your trash is empty</EmptyTitle>
                <EmptyDescription>
                  Permanently deleted notes will appear here. Items are
                  automatically removed after 30 days.
                </EmptyDescription>
              </>
            )}
          </EmptyContent>
        </Empty>
      ) : (
        <div className='overflow-hidden rounded-md border'>
          <Table className='table-fixed'>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((h) => (
                    <TableHead
                      key={h.id}
                      style={{ width: h.getSize() }}
                      className='px-3 md:px-5 lg:px-10'
                    >
                      {h.isPlaceholder
                        ? null
                        : flexRender(h.column.columnDef.header, h.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className='px-3 font-medium md:px-5 lg:px-10'
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

              <TableRow ref={observerRef} />

              {isLoading &&
                Array.from({ length: 10 }).map((_, i) => (
                  <TrashboxTableSkeletonRow key={i} table={table} />
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
