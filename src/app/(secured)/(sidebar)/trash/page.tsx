import { preloadQuery } from "convex/nextjs";
import { CircleAlert } from "lucide-react";
import { TrashboxTable } from "@/components/trash/table/trashbox-table";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { getToken } from "@/lib/auth-server";
import { api } from "../../../../../convex/_generated/api";

export default async function TrashPage() {
  const token = await getToken();
  const notes = await preloadQuery(
    api.notes.findAllUserDeletedNotes,
    {},
    {
      token,
    },
  );
  return (
    <>
      <Card className="mb-6 border-border/50 bg-sidebar shadow-sm">
        <CardContent className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <div className="mx-auto shrink-0 rounded-full bg-amber-500/10 p-2 sm:mx-0">
            <CircleAlert className="size-5 text-amber-600 dark:text-amber-500" />
          </div>

          <CardDescription className="text-sm leading-relaxed text-muted-foreground md:text-base">
            All deleted items will be permanently removed after{" "}
            <span className="font-semibold text-foreground">30 days</span>. If
            any of these items are still in use, make sure to restore them
            before this period ends.
          </CardDescription>
        </CardContent>
      </Card>
      <TrashboxTable preloadedQuery={notes} />
    </>
  );
}
