import TrashWarningCard from "@/components/trash/trash-warning-card/trash-warning-card";
import { TrashboxTable } from "@/components/trash/trashbox-table/trashbox-table";
import { Suspense } from "react";

export default function TrashPage() {
  return (
    <>
      <TrashWarningCard className="mb-6" />
      <Suspense fallback={<div>Loading...</div>}>
        <TrashboxTable />
      </Suspense>
    </>
  );
}
