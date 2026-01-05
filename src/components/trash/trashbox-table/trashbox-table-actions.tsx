import { Button } from "@/components/ui/button";
import { handleDeleteNotePermanently } from "@/lib/actions";
import { Table } from "@tanstack/react-table";
import { Doc } from "../../../../convex/_generated/dataModel";

export function TrashTableActions({ table }: { table: Table<Doc<"notes">> }) {
  const selected = table.getSelectedRowModel().flatRows;

  return (
    <Button
      variant="outline"
      disabled={!selected.length}
      onClick={() =>
        handleDeleteNotePermanently(selected.map((row) => row.original._id))
      }
    >
      Delete {selected.length}
    </Button>
  );
}
