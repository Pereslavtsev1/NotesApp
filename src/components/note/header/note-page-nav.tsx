"use client";

import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import type { Doc, Id } from "../../../../convex/_generated/dataModel";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";
import { Skeleton } from "../../ui/skeleton";
import { Button } from "../../ui/button";

export default function NotePageNav({ note }: { note: Doc<"notes"> }) {
  return (
    <Breadcrumb>
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
  const router = useRouter();
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

  const handleClick = () => {
    router.push(`/notes/${parentNoteId}`);
  };

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
        <Button onClick={handleClick} variant="ghost" className="px-2">
          {parentNote.title}
        </Button>
      </BreadcrumbLink>
      <BreadcrumbSeparator />
    </>
  );
};
