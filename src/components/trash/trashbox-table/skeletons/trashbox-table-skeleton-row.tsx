import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { Table } from "@tanstack/react-table";

export default function TrashboxTableSkeletonRow({
  table,
}: {
  table: Table<Doc<"notes">>;
}) {
  return (
    <TableRow>
      {table.getVisibleLeafColumns().map((column) => (
        <TableCell
          key={column.id}
          style={{ width: column.getSize() }}
          className="px-3 md:px-5 lg:px-10"
        >
          {renderSkeletonCell(column.id)}
        </TableCell>
      ))}
    </TableRow>
  );
}

function renderSkeletonCell(columnId: string) {
  switch (columnId) {
    case "select":
      return <Skeleton className="size-4 rounded" />;

    case "title":
      return <Skeleton className="h-4 w-full" />;

    case "updatedAt":
      return <Skeleton className="h-4 w-1/3" />;

    case "actions":
      return <Skeleton className="size-6 rounded" />;

    default:
      return <Skeleton className="h-4 w-2/3" />;
  }
}
