"use client";
import { usePreloadedQuery, useQuery } from "convex/react";
import Link from "next/link";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Skeleton } from "../ui/skeleton";

import { Preloaded } from "convex/react";

export default function NotePageNav({
  preloadedQuery,
}: {
  preloadedQuery: Preloaded<typeof api.notes.findNote>;
}) {
  const note = usePreloadedQuery(preloadedQuery);

  return (
    <Breadcrumb className="py-2">
      <BreadcrumbList>
        {note.parentNote && (
          <ParentBreadcrumbItem parentNoteId={note.parentNote} />
        )}
        <BreadcrumbItem>
          <BreadcrumbPage className="max-w-36 truncate font-semibold text-muted-foreground">
            {note.title}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

const ParentBreadcrumbItem = ({
  parentNoteId,
}: {
  parentNoteId: Id<"notes">;
}) => {
  const parentNote = useQuery(api.notes.findNote, { id: parentNoteId });
  if (parentNote === undefined)
    return (
      <>
        <BreadcrumbItem>
          <Skeleton className="h-4 w-24" />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
      </>
    );

  if (!parentNote) {
    return null;
  }

  return (
    <>
      {parentNote.parentNote && (
        <>
          <BreadcrumbEllipsis className="pt-1" />
          <BreadcrumbSeparator />
        </>
      )}
      <BreadcrumbLink
        className="max-w-36 truncate font-semibold text-muted-foreground"
        asChild
      >
        <Link href={`/notes/${parentNoteId}`}>{parentNote.title}</Link>
      </BreadcrumbLink>
      <BreadcrumbSeparator />
    </>
  );
};
