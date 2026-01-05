import { Table } from "@tanstack/react-table";
import { TrashTableSearch } from "./trashbox-table-search";
import { TrashTableActions } from "./trashbox-table-actions";
import { Doc } from "../../../../convex/_generated/dataModel";

export function TrashboxTableToolbar({
  table,
}: {
  table: Table<Doc<"notes">>;
}) {
  return (
    <div className="flex items-center justify-between gap-x-10">
      <TrashTableSearch table={table} />
      <TrashTableActions table={table} />
    </div>
  );
}
