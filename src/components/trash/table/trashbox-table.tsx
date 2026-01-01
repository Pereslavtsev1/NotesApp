"use client";

import { Button } from "@/components/ui/button";
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
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import { SearchIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { api } from "../../../../convex/_generated/api";
import { columns } from "./columns";
import { useIsMobile } from "@/hooks/use-mobile";

export function TrashboxTable({
  preloadedQuery,
}: {
  preloadedQuery: Preloaded<typeof api.notes.findAllUserNotes>;
}) {
  const notes = usePreloadedQuery(preloadedQuery);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const isMobile = useIsMobile();
  const table = useReactTable({
    data: notes,
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
    if (isMobile) {
      setColumnVisibility({
        deletedAt: false,
      });
    }
  }, [isMobile]);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between gap-x-10">
        <div className="relative flex-1 sm:max-w-md">
          <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search deleted notes..."
            className="pl-9"
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("title")?.setFilterValue(e.target.value)
            }
          />
        </div>

        <Button
          variant="outline"
          disabled={!table.getSelectedRowModel().rows.length}
          onClick={() => {
            handleDeleteNotePermanently(
              table
                .getSelectedRowModel()
                .flatRows.map((row) => row.original._id),
            );
          }}
        >
          <TrashIcon className="size-4" />
          Delete {table.getSelectedRowModel().rows.length}
        </Button>
      </div>

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
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
