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
import { handleDeleteNotePermanently } from '@/lib/actions';
import { ClassNameProps, cn } from '@/lib/utils';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import { usePaginatedQuery } from 'convex/react';
import { SearchIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useEffectEvent, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDebounce } from 'use-debounce';
import { api } from '../../../../convex/_generated/api';
import type { Doc } from '../../../../convex/_generated/dataModel';
import { columns } from './columns';
import TrashboxTableSkeletonRow from './skeletons/trashbox-table-skeleton-row';

const ITEMS = 10;

export default function TrashboxTable({ className }: ClassNameProps) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch] = useDebounce(searchInput, 300);

  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.notes.findAllNotes,
    { search: debouncedSearch, isDeleted: true },
    { initialNumItems: ITEMS }
  );
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { ref, inView } = useInView({
    rootMargin: '200px',
  });

  const table = useReactTable<Doc<'notes'>>({
    data: results,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
    manualPagination: true,
    state: { rowSelection, columnVisibility },
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
  });

  useEffect(() => {
    if (inView && status === 'CanLoadMore') {
      loadMore(ITEMS);
    }
  }, [inView, status, loadMore]);

  const toggleDaysLeftColumn = useEffectEvent(() => {
    const daysLeftColumn = table.getColumn('daysLeft');
    if (!daysLeftColumn) return;

    daysLeftColumn.toggleVisibility(!isMobile);
  });

  useEffect(() => {
    toggleDaysLeftColumn();
  }, [isMobile]);

  const selectedCount = table.getSelectedRowModel().flatRows.length;
  const hasResults = results.length > 0;
  const hasSearchQuery = debouncedSearch.trim().length > 0;

  return (
    <div className={cn('space-y-6', className)}>
      <div className='flex items-center justify-between gap-3'>
        <div className='relative flex-1 sm:max-w-md'>
          <SearchIcon className='absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            placeholder='Search trash…'
            className='pl-9'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <Button
          variant='outline'
          disabled={selectedCount <= 0}
          className='hidden sm:inline-flex'
          onClick={() =>
            handleDeleteNotePermanently(
              table
                .getSelectedRowModel()
                .flatRows.map((row) => row.original._id)
            )
          }
        >
          Delete {selectedCount}
        </Button>

        <Button
          variant='outline'
          size='icon'
          disabled={selectedCount <= 0}
          className='sm:hidden'
          onClick={() =>
            handleDeleteNotePermanently(
              table
                .getSelectedRowModel()
                .flatRows.map((row) => row.original._id)
            )
          }
        >
          <Trash2Icon className='size-4' />
        </Button>
      </div>

      {!hasResults && !isLoading ? (
        <Empty className='rounded-lg bg-linear-to-b from-muted/20 via-transparent to-transparent py-16 sm:py-24'>
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
                  We couldn't find anything matching{' '}
                  <span className='font-semibold text-foreground'>
                    "{debouncedSearch}"
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
                      className='px-3 md:px-5 lg:px-10'
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

              <TableRow ref={ref} />

              {isLoading &&
                Array.from({ length: ITEMS }).map((_, i) => (
                  <TrashboxTableSkeletonRow key={i} table={table} />
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
