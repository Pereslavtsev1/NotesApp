import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 py-3 backdrop-blur-md">
      <div className="flex w-full items-center gap-x-2">
        <SidebarTrigger />
        <div className="flex w-full items-center">
          <Skeleton className="h-4 w-24" />
          <div className="ml-auto flex items-center gap-x-2">
            <Skeleton className="size-9 rounded-md" />
            <Skeleton className="size-9 rounded-md" />
          </div>
        </div>
      </div>
    </header>
  );
}
