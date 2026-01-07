import { Skeleton } from "@/components/ui/skeleton";
import { CommandItem } from "cmdk";

export default function CommandItemSkeleton() {
  return (
    <CommandItem disabled className="pointer-events-none">
      <div className="flex w-full items-center justify-between gap-x-2">
        <div className="flex items-center gap-x-2">
          <Skeleton className="size-4 rounded" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-3 w-20" />
      </div>
    </CommandItem>
  );
}
