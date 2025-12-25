"use client";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function TrashboxTable({
  preloadedQuery,
}: {
  preloadedQuery: Preloaded<typeof api.notes.findAllUserNotes>;
}) {
  const notes = usePreloadedQuery(preloadedQuery);
  return <DataTable columns={columns} data={notes} />;
}
