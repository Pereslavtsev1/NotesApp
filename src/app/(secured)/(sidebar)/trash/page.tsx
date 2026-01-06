"use client";

import TrashWarningCard from "@/components/trash/trash-warning-card/trash-warning-card";
import TrashboxTable from "@/components/trash/trashbox-table/trashbox-table";

export default function TrashPage() {
  return (
    <div className="p-6">
      <TrashWarningCard className="mb-6" />
      <TrashboxTable />
    </div>
  );
}
