"use server";
import NotePageNav from "@/components/note/note-page-nav";
import { getToken } from "@/lib/auth-server";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";

export default async function NoteLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;

  params: Promise<{ noteId: Id<"notes"> }>;
}>) {
  const { noteId } = await params;
  console.log("noteId", noteId);
  const token = await getToken();
  const note = await preloadQuery(
    api.notes.findNote,
    { id: noteId },
    { token },
  );

  return (
    <>
      <div className="w-full">
        <NotePageNav preloadedQuery={note} />
        {children}
      </div>
    </>
  );
}
