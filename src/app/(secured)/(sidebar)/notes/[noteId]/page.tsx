"use server";

import EditorWrapper from "@/components/editor/editor-wrapper";
import CoverImage from "@/components/note/cover-image/cover-image";
import Header from "@/components/note/header/header";
import Toolbar from "@/components/note/toolbar/toolbar";
import { getToken } from "@/lib/auth-server";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../../convex/_generated/api";
import type { Id } from "../../../../../../convex/_generated/dataModel";

export default async function NotePage({
  params,
}: {
  params: Promise<{ noteId: Id<"notes"> }>;
}) {
  const { noteId } = await params;
  console.log("noteId", noteId);
  const token = await getToken();
  const preloadedQuery = await preloadQuery(
    api.notes.findNote,
    { id: noteId },
    { token },
  );

  return (
    <div className="w-full">
      <div className="px-2 sm:px-4 md:px-6 lg:px-8">
        <Header preloadedQuery={preloadedQuery} />
      </div>
      <CoverImage preloadedQuery={preloadedQuery} />

      <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
        <Toolbar preloadedQuery={preloadedQuery} />
        <EditorWrapper preloadedQuery={preloadedQuery} />
      </div>
    </div>
  );
}
