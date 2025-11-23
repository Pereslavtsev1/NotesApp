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
import { Doc } from "../../../convex/_generated/dataModel";

function getMenuItems(note: Doc<"notes">) {
  return [
    {
      label: "Add children",
      icon: <Plus className="size-4" />,
      className: "hover:text-green-500",
    },
    {
      label: note.isFavorite ? "Remove from favorite" : "Mark as favorite",
      icon: note.isFavorite ? (
        <StarOff className="size-4" />
      ) : (
        <Star className="size-4" />
      ),
      className: "hover:text-yellow-500",
    },
    {
      label: "Duplicate",
      icon: <Copy className="size-4" />,
      className: "hover:text-blue-500",
    },
    {
      label: "Delete",
      icon: <Trash2 className="size-4" />,
      className: "hover:text-red-500",
    },
  ];
}

export default function AppSidebarNotesSection({
  preloadedQuery,
}: {
  preloadedQuery: Preloaded<typeof api.notes.findAllCurrentUserNotes>;
}) {
  const notes = usePreloadedQuery(preloadedQuery);

  return (
    <>
      {notes.map((note) => {
        const menuItems = getMenuItems(note);

        return (
          <DropdownMenu key={note._id}>
            <Button
              className="w-full justify-start font-medium text-muted-foreground"
              variant="ghost"
            >
              {note.title}

              <DropdownMenuTrigger asChild>
                <div className="absolute right-4 flex items-center justify-center rounded p-0.5 hover:bg-sidebar-accent">
                  <MoreHorizontal className="size-4" />
                </div>
              </DropdownMenuTrigger>
            </Button>

            <DropdownMenuContent align="start" className="flex flex-col">
              {menuItems.map((item, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  className={`${item.className} justify-start font-medium text-muted-foreground`}
                >
                  {item.icon}
                  {item.label}
                </Button>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}
    </>
  );
}
