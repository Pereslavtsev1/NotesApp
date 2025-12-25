"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Preloaded, usePreloadedQuery } from "convex/react";
import NotePageNav from "./note-page-nav";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ImageIcon,
  MoreHorizontal,
  RotateCcw,
  Star,
  Trash2,
} from "lucide-react";

import { useCoverImage } from "@/hooks/use-cover-image";
import { handleDelete, handleFavorite } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { api } from "../../../../convex/_generated/api";

export default function Header({
  preloadedQuery,
}: {
  preloadedQuery: Preloaded<typeof api.notes.findNote>;
}) {
  const note = usePreloadedQuery(preloadedQuery);
  const { toggle } = useCoverImage();

  const menuItems = [
    {
      icon: <ImageIcon />,
      label: note.coverImageKey ? "Remove cover" : "Add cover",
      className: "",
      onClick: () => toggle(),
    },
    {
      icon: note.isDeleted ? <RotateCcw /> : <Trash2 />,
      label: note.isDeleted ? "Restore" : "Delete",
      className: !note.isDeleted ? "hover:text-red-500" : "",
      onClick: () => handleDelete(note._id),
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 py-3 backdrop-blur-md">
      <div className="flex w-full items-center gap-x-2 font-semibold text-muted-foreground">
        <SidebarTrigger />
        <NotePageNav note={note} />
        <div className="ml-auto flex gap-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              handleFavorite({
                id: note._id,
                isFavorite: note.isFavorite,
                recursive: true,
              })
            }
          >
            <Star
              className={cn(
                note.isFavorite
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-muted-foreground",
              )}
            />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              {menuItems.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-x-4 font-semibold text-muted-foreground hover:bg-accent",
                      item.className,
                    )}
                    onClick={item.onClick}
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
