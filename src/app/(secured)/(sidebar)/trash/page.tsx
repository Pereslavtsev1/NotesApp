"use client";

import TrashWarningCard from "@/components/trash/trash-warning-card/trash-warning-card";
import TrashboxTable from "@/components/trash/trashbox-table/trashbox-table";

export default function TrashPage() {
  return (
    <>
      <TrashWarningCard className="my-6" />
      <TrashboxTable className="mt-12" />
    </>
  );
}
