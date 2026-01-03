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
  const [value, setValue] = useState(note.title);
  const [isEditing, setIsEditing] = useState(false);
  const [debouncedValue] = useDebounce(value, 350);

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
      inputRef.current.focus();
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    });
  };

  const onIconSelect = (icon: string) => handleSetIcon({ id: note._id, icon });

  const onIconRemove = () => handleRemoveIcon({ id: note._id });

  return (
    <>
      <div className="group relative mb-4 py-4">
        <div className="flex items-center gap-x-2 py-4 pl-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:pl-14">
          {!note.icon && (
            <IconPicker onChange={onIconSelect} asChild>
              <Button variant="ghost" size="sm" className="font-semibold">
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

        <div className="flex items-start gap-3 pl-8 sm:pl-14">
          {note.icon && (
            <div className="relative shrink-0">
              <span className="text-xl sm:text-2xl md:text-3xl">
                {note.icon}
              </span>

              <Button
                onClick={onIconRemove}
                variant="ghost"
                size="icon"
                className="absolute -top-2 -right-2 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="size-3" />
              </Button>
            </div>
          )}

          <div className="min-w-0 flex-1">
            {isEditing ? (
              <TextareaAutosize
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => setIsEditing(false)}
                className="w-full resize-none bg-transparent text-xl font-bold wrap-break-word outline-none sm:text-2xl md:text-3xl"
              />
            ) : (
              <button
                type="button"
                onClick={enableInput}
                className="w-full text-left"
              >
                <h1 className="text-xl font-bold wrap-break-word sm:text-2xl md:text-3xl">
                  {note.title}
                </h1>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
