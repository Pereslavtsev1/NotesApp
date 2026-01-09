"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useCoverImage } from "@/hooks/use-cover-image";
import {
  handleDelete,
  handleFavorite,
  handleRemoveCoverImage,
} from "@/lib/actions";
import { cn } from "@/lib/utils";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import {
  ImageIcon,
  MoreHorizontal,
  RotateCcw,
  Star,
  Trash2,
} from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import NotePageNav from "./note-page-nav";

import { BaseHeader } from "@/components/header/base-header";
import HeaderLeft from "@/components/header/header-left-side";
import HeaderRight from "@/components/header/header-right-side";

export default function NoteHeader({
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
      onClick: () =>
        note.coverImageKey
          ? handleRemoveCoverImage({ id: note._id })
          : toggle(),
    },
    {
      icon: note.isDeleted ? <RotateCcw /> : <Trash2 />,
      label: note.isDeleted ? "Restore" : "Delete",
      className: !note.isDeleted ? "hover:text-red-500" : "",
      onClick: () => handleDelete(note._id),
    },
  ];

  return (
    <BaseHeader>
      <HeaderLeft>
        <SidebarTrigger />
        <NotePageNav note={note} />
      </HeaderLeft>

      <HeaderRight>
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            handleFavorite({
              id: note._id,
              isFavorite: !note.isFavorite,
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
      </HeaderRight>
    </BaseHeader>
  );
}
