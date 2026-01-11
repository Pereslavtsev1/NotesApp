"use client";

import { Button } from "@/components/ui/button";
import { useCoverImage } from "@/hooks/use-cover-image";
import { handleRemoveIcon, handleSetIcon } from "@/lib/actions";
import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import { ImageIcon, Smile, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useDebounce } from "use-debounce";
import { api } from "../../../../convex/_generated/api";
import IconPicker from "./icon-picker";

type ToolbarProps = {
  preloadedQuery: Preloaded<typeof api.notes.findNote>;
};

export default function Toolbar({ preloadedQuery }: ToolbarProps) {
  const note = usePreloadedQuery(preloadedQuery);
  const { toggle } = useCoverImage();

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [title, setTitle] = useState(note.title);
  const [isEditing, setIsEditing] = useState(false);
  const [debouncedValue] = useDebounce(title, 200);

  const updateNote = useMutation(api.notes.updateNote);

  useEffect(() => {
    if (!isEditing) return;

    updateNote({
      id: note._id,
      title: debouncedValue.trim() || "Untitled",
    });
  }, [debouncedValue, isEditing, note._id, updateNote]);

  const enableInput = () => {
    setIsEditing(true);
    requestAnimationFrame(() => {
      if (!inputRef.current) return;
      const el = inputRef.current;
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    });
  };

  return (
    <div className="group relative mb-4 py-3 sm:py-4 md:py-6">
      <div className="flex items-center gap-x-2 py-2 opacity-0 transition-opacity group-hover:opacity-100">
        {!note.icon && (
          <IconPicker
            onChange={(icon) => handleSetIcon({ id: note._id, icon })}
            asChild
          >
            <Button variant="ghost" className="font-semibold">
              <Smile className="mr-1 size-4" />
              Add icon
            </Button>
          </IconPicker>
        )}

        {!note.coverImageKey && (
          <Button
            variant="ghost"
            size="sm"
            className="font-semibold"
            onClick={toggle}
          >
            <ImageIcon className="mr-1 size-4" />
            Add cover
          </Button>
        )}
      </div>

      <div className="flex items-start gap-3">
        {note.icon && (
          <div className="relative shrink-0">
            <span className="text-xl sm:text-2xl md:text-3xl">{note.icon}</span>

            <Button
              onClick={() => handleRemoveIcon({ id: note._id })}
              variant="ghost"
              size="icon"
              className="absolute -top-2 -right-2 rounded-full opacity-0 group-hover:opacity-100"
            >
              <X className="size-3" />
            </Button>
          </div>
        )}

        <div className="min-w-0 flex-1">
          {isEditing ? (
            <TextareaAutosize
              ref={inputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setIsEditing(false)}
              className="
                  w-full resize-none bg-transparent text-lg
                  leading-tight font-bold outline-none
                  sm:text-2xl
                  md:text-3xl
                "
            />
          ) : (
            <button onClick={enableInput} className="w-full text-left">
              <h1 className="text-lg leading-tight font-bold wrap-anywhere sm:text-2xl md:text-3xl">
                {title}
              </h1>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
