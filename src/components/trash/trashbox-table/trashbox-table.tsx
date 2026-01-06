"use client";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { handleDeleteNotePermanently } from "@/lib/actions";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { usePaginatedQuery } from "convex/react";
import { SearchIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDebounce } from "use-debounce";
import { api } from "../../../../convex/_generated/api";
import type { Doc } from "../../../../convex/_generated/dataModel";
import { columns } from "./columns";
import TrashboxTableSkeletonRow from "./skeletons/trashbox-table-skeleton-row";

const ITEMS = 10;

export default function TrashboxTable() {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [searchInput, setSearchInput] = useState("");

  const [debouncedSearch] = useDebounce(searchInput, 300);

  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.notes.findAllUserDeletedNotes1,
    { search: debouncedSearch },
    { initialNumItems: ITEMS },
  );

  const { ref, inView } = useInView({
    rootMargin: "200px",
  });

  const table = useReactTable<Doc<"notes">>({
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
    if (inView && status === "CanLoadMore") {
      loadMore(ITEMS);
    }
  }, [inView, status, loadMore]);

  const selectedCount = table.getSelectedRowModel().flatRows.length;
  const hasResults = results.length > 0;
  const hasSearchQuery = debouncedSearch.trim().length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-x-10">
        <div className="relative flex-1 sm:max-w-md">
          <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search deleted notes..."
            className="pl-9"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          disabled={selectedCount <= 0}
          onClick={() =>
            handleDeleteNotePermanently(
              table
                .getSelectedRowModel()
                .flatRows.map((row) => row.original._id),
            )
          }
        >
          Delete {selectedCount} items
        </Button>
      </div>

      {!hasResults && !isLoading ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Trash2Icon className="size-6" />
            </EmptyMedia>
            <EmptyContent className="-space-y-2">
              {hasSearchQuery ? (
                <>
                  <EmptyTitle className="font-semibold">
                    No results found
                  </EmptyTitle>
                  <EmptyDescription className="font-semibold">
                    No deleted notes match &quot;{debouncedSearch}&quot;. Try
                    adjusting your search query.
                  </EmptyDescription>
                </>
              ) : (
                <>
                  <EmptyTitle className="font-semibold">
                    Trash is empty
                  </EmptyTitle>
                  <EmptyDescription className="font-semibold">
                    You don’t have any deleted notes. Deleted notes will appear
                    here.
                  </EmptyDescription>
                </>
              )}
            </EmptyContent>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="overflow-hidden rounded-md border">
          <Table className="table-fixed">
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((h) => (
                    <TableHead
                      key={h.id}
                      style={{ width: h.getSize() }}
                      className="px-3 md:px-5 lg:px-10"
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
                      className="px-3 md:px-5 lg:px-10"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
