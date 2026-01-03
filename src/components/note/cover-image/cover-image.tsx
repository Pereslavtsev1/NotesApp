"use client";
import { buildImageUrl } from "@/lib/utils";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Image from "next/image";

export default function CoverImage({
  preloadedQuery,
}: {
  preloadedQuery: Preloaded<typeof api.notes.findNote>;
}) {
  const note = usePreloadedQuery(preloadedQuery);

  if (!note.coverImageKey) return null;

  return (
    <div className="relative h-48 w-full sm:h-64">
      <Image
        src={buildImageUrl(note.coverImageKey)}
        alt={note.title}
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
