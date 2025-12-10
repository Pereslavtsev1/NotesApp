"use client";

import { Button } from "@/components/ui/button";
import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useDebounce } from "use-debounce";
import { api } from "../../../../convex/_generated/api";

export default function Toolbar({
  preloadedQuery,
}: {
  preloadedQuery: Preloaded<typeof api.notes.findNote>;
}) {
  const note = usePreloadedQuery(preloadedQuery);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState(note.title);
  const [isEditing, setIsEditing] = useState(false);

  const debouncedValue = useDebounce(value, 350);

  const updateNote = useMutation(api.notes.updateNote);

  useEffect(() => {
    if (!isEditing) return;

    updateNote({
      id: note._id,
      title: debouncedValue[0].trim() || "Untitled",
    });
  }, [debouncedValue, isEditing, note._id, updateNote]);

  const enableInput = () => {
    setIsEditing(true);

    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const length = value.length;
        inputRef.current.setSelectionRange(length, length);
      }
    });
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  return (
    <div className="group relative mb-4 py-4">
      <div className="flex items-center gap-x-1 py-4 pl-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:pl-14" />

      <div className="flex items-start gap-x-4">
        {note.icon && (
          <div className="absolute">
            <div className="relative">
              <span className="text-xl sm:text-2xl md:text-3xl">
                {note.icon}
              </span>

              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-4 -right-4 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
        )}

        <div className="min-w-0 flex-1 pl-8 sm:pl-14">
          {isEditing ? (
            <TextareaAutosize
              ref={inputRef}
              onBlur={disableInput}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full resize-none bg-transparent text-xl font-bold wrap-break-word outline-none sm:text-2xl md:text-3xl"
            />
          ) : (
            <button
              type="button"
              onClick={enableInput}
              className="w-full text-left"
            >
              <h1 className="text-xl font-bold break-all sm:text-2xl md:text-3xl">
                {note.title}
              </h1>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
