"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { usePaginatedQuery } from "convex/react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { api } from "../../../../convex/_generated/api";
import { Doc } from "../../../../convex/_generated/dataModel";
import { columns } from "./columns";
import { TrashboxTableToolbar } from "./trashbox-table-toolbar";
export function TrashboxTable() {
  const { results, isLoading, loadMore, status } = usePaginatedQuery(
    api.notes.findAllUserDeletedNotes,
    {},
    {
      initialNumItems: 1,
    },
  );
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && !isLoading && status === "CanLoadMore") {
      loadMore(1);
    }
  }, [inView, loadMore, status, isLoading]);

  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const isMobile = useIsMobile();
  const table = useReactTable<Doc<"notes">>({
    data: results,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      rowSelection,
      columnFilters,
      columnVisibility,
    },
  });
  useEffect(() => {
    if (!isLoading && isMobile) {
      setColumnVisibility({
        deletedAt: false,
      });
    }
  }, [isMobile]);

  return (
    <div className="space-y-10">
      <TrashboxTableToolbar table={table} />
      <div className="overflow-hidden rounded-md border">
        <Table className="w-full table-fixed">
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            {status !== "Exhausted" &&
              Array.from({ length: 4 }).map((_, index) => (
                <TableRow ref={ref} key={index}>
                  {columns.map((col) => (
                    <TableCell
                      key={col.id}
                      style={{ width: col.size }}
                      className="px-3 py-4 md:px-5 lg:px-10"
                    >
                      {(status === "LoadingFirstPage" ||
                        status === "LoadingMore") && (
                        <Skeleton className="h-5 w-1/3" />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
