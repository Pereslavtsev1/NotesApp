"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ToolbarSkeleton() {
  return (
    <div className="flex items-center gap-x-2 py-4">
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-8 w-24" />
    </div>
  );
}
