"use client";

import {
  handleAddChildren,
  handleDelete,
  handleDuplicate,
  handleFavorite,
} from "@/lib/actions";
import { cn, runWithToast } from "@/lib/utils";
import {
  ChevronRight,
  Copy,
  MoreHorizontal,
  Plus,
  Star,
  StarOff,
  Trash2,
} from "lucide-react";
import type { Doc } from "../../../convex/_generated/dataModel";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type NoteButtonProps = {
  note: Doc<"notes">;
  expanded?: boolean;
  onExpand?: () => void;
  level: number;
};

const getActionsList = (
  note: Doc<"notes">,
  onExpand?: () => void,
  expanded?: boolean,
) => [
  {
    label: "Add children",
    icon: Plus,
    className: "hover:text-green-500",
    onClick: () =>
      runWithToast(
        () => handleAddChildren(note._id),
        {
          success: "Child note added",
          error: "Failed to add child note",
        },
        () => {
          if (!expanded) onExpand?.();
        },
      ),
  },
  {
    label: note.isFavorite ? "Remove from favorite" : "Mark as favorite",
    icon: note.isFavorite ? StarOff : Star,
    className: "hover:text-yellow-500",
    onClick: () =>
      runWithToast(
        () =>
          handleFavorite({
            id: note._id,
            isFavorite: !note.isFavorite,
            recursive: true,
          }),
        {
          success: note.isFavorite
            ? "Removed from favorites"
            : "Added to favorites",
          error: "Failed to update favorite",
        },
      ),
  },
  {
    label: "Duplicate",
    icon: Copy,
    className: "hover:text-blue-500",
    onClick: () =>
      runWithToast(() => handleDuplicate(note._id), {
        success: "Note duplicated",
        error: "Failed to duplicate note",
      }),
  },
  {
    label: "Delete",
    icon: Trash2,
    className: "hover:text-destructive",
    onClick: () =>
      runWithToast(() => handleDelete(note._id), {
        success: "Note deleted",
        error: "Failed to delete note",
      }),
  },
];

export default function NoteButton({
  note,
  level,
  expanded,
  onExpand,
  ...props
}: NoteButtonProps & React.ComponentProps<"button">) {
  return (
    <DropdownMenu>
      <div className={cn("relative flex items-center")}>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onExpand?.();
          }}
          variant="ghost"
          className={cn(
            "absolute size-6 shrink-0 items-center rounded text-muted-foreground",
          )}
          style={{
            left: `${4 + level * 12}px`,
          }}
        >
          <ChevronRight
            className={cn(
              expanded ? "rotate-90" : "rotate-0",
              "size-4 transition-transform duration-200",
            )}
          />
        </Button>

        <Button
          className={cn(
            "flex w-full items-center justify-between truncate text-sm font-medium text-muted-foreground",
          )}
          style={{
            paddingLeft: `${32 + level * 12}px`,
          }}
          variant="ghost"
          {...props}
        >
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex-1 truncate">{note.title}</span>
          </div>
        </Button>
        <DropdownMenuTrigger asChild>
          <Button
            className="absolute right-2 size-6 shrink-0 items-center rounded text-muted-foreground"
            variant="ghost"
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
      </div>

      <DropdownMenuContent align="start" className="flex flex-col">
        {getActionsList(note, onExpand, expanded).map(
          ({ label, icon: Icon, className, onClick }) => (
            <Button
              key={label}
              variant="ghost"
              className={cn(
                "justify-start text-sm font-medium text-muted-foreground",
                className,
              )}
              onClick={onClick}
            >
              <Icon className="size-4" />
              {label}
            </Button>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
