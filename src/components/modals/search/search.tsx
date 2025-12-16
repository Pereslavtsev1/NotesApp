"use client";

import { useSearch } from "@/hooks/use-search";
import { useQuery } from "convex/react";
import { FileIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "../../../../convex/_generated/api";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const SearchModal = () => {
  const { open, setOpen } = useSearch();
  const notes = useQuery(api.notes.search);
  const router = useRouter();

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        className="font-semibold text-muted-foreground"
        placeholder="Search..."
      />

      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Notes">
          {notes?.map((note) => (
            <CommandItem
              key={note._id}
              value={`${note._id}-${note.title}`}
              onSelect={() => {
                router.push(`/notes/${note._id}`);
                setOpen(false);
              }}
            >
              <div className="flex w-full items-center justify-between gap-x-2">
                <div className="flex items-center gap-x-2">
                  {note.icon ? <span>{note.icon}</span> : <FileIcon />}
                  <p className="max-w-40 truncate font-semibold">
                    {note.title}
                  </p>
                </div>

                <span className="text-sm text-muted-foreground">
                  {new Date(note._creationTime).toDateString()}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchModal;
