"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import {
  Copy,
  MoreHorizontal,
  Plus,
  Star,
  StarOff,
  Trash2,
} from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { handleDelete, handleDuplicate, handleFavorite } from "./actions";

export default function AppSidebarNotesSection({
  preloadedQuery,
}: {
  preloadedQuery: Preloaded<typeof api.notes.findAllCurrentUserNotes>;
}) {
  const notes = usePreloadedQuery(preloadedQuery);

  return (
    <>
      {notes.map((note) => (
        <DropdownMenu key={note._id}>
          <Button
            className="w-full justify-start font-medium text-muted-foreground"
            variant="ghost"
          >
            {note.title}

            <DropdownMenuTrigger asChild>
              <div className="absolute right-4 flex items-center justify-center rounded p-1 hover:bg-sidebar-accent">
                <MoreHorizontal className="size-4" />
              </div>
            </DropdownMenuTrigger>
          </Button>

          <DropdownMenuContent align="start" className="flex flex-col">
            {/* Add children */}
            <Button
              variant="ghost"
              className="justify-start font-medium text-muted-foreground hover:text-green-500"
              onClick={() => console.log("add children")}
            >
              <Plus className="size-4" />
              Add children
            </Button>

            {/* Favorite toggle */}
            <Button
              variant="ghost"
              className="justify-start font-medium text-muted-foreground hover:text-yellow-500"
              onClick={() =>
                handleFavorite({ id: note._id, isFavorite: note.isFavorite })
              }
            >
              {note.isFavorite ? (
                <StarOff className="size-4" />
              ) : (
                <Star className="size-4" />
              )}
              {note.isFavorite ? "Remove from favorite" : "Mark as favorite"}
            </Button>

            {/* Duplicate */}
            <Button
              variant="ghost"
              className="justify-start font-medium text-muted-foreground hover:text-blue-500"
              onClick={() => handleDuplicate(note._id)}
            >
              <Copy className="size-4" />
              Duplicate
            </Button>

            {/* Delete */}
            <Button
              variant="ghost"
              className="justify-start font-medium text-muted-foreground hover:text-red-500"
              onClick={() => handleDelete(note._id)}
            >
              <Trash2 className="size-4" />
              Delete
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </>
  );
}
