import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Table } from "@tanstack/react-table";

export function TrashTableSearch<T>({ table }: { table: Table<T> }) {
  const column = table.getColumn("title");

  if (!column) return null;

  return (
    <div className="relative flex-1 sm:max-w-md">
      <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search deleted notes..."
        className="pl-9"
        value={(column.getFilterValue() as string) ?? ""}
        onChange={(e) => column.setFilterValue(e.target.value)}
      />
    </div>
  );
}
