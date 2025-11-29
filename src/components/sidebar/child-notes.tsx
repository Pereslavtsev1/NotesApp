import { preloadQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import NotesList from "./notes-list";

export default async function ChildNotes({
  parentId,
  level,
}: {
  parentId: Id<"notes">;
  level: number;
}) {
  const query = await preloadQuery(api.notes.findAllCurrentUserNotes, {
    parentNote: parentId,
  });

  return <NotesList preloadedQuery={query} level={level} />;
}
