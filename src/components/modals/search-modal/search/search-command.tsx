"use client";
import { useSearch } from "@/hooks/use-search";
import { usePaginatedQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../../../../convex/_generated/api";

import {
  Command,
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDebounce } from "use-debounce";
import CommandItemSkeleton from "../skeletons/command-item-skeleton";
import SearchCommandNotFoundState from "./search-command-not-found-state";
import SearchCommandNoteItem from "./search-command-note-item";
import SearchCommandEmptyFoundState from "./search-command-empty-state";

const ITEMS = 10;

export default function SearchModal() {
  const { open, setOpen } = useSearch();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebounce(searchInput, 300);
  const { ref, inView } = useInView({ rootMargin: "200px" });
  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.notes.findAllNotes,
    { search: debouncedSearch, isDeleted: false },
    { initialNumItems: ITEMS },
  );

  useEffect(() => {
    if (inView && status === "CanLoadMore") {
      loadMore(ITEMS);
    }
  }, [inView, status, loadMore]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command shouldFilter={false} className="h-72 w-full max-w-[520px]">
        <CommandInput
          className="font-medium text-muted-foreground"
          placeholder="Search notes..."
          value={searchInput}
          onValueChange={setSearchInput}
        />

        <CommandList className="h-full overflow-y-auto">
          {isLoading && (
            <>
              {Array.from({ length: ITEMS }).map((_, i) => (
                <CommandItemSkeleton key={i} />
              ))}
            </>
          )}

          {!isLoading &&
            results.length === 0 &&
            (debouncedSearch.trim() ? (
              <SearchCommandNotFoundState query={debouncedSearch} />
            ) : (
              <SearchCommandEmptyFoundState />
            ))}

          <CommandGroup>
            {results.map((note) => (
              <SearchCommandNoteItem
                key={note._id}
                note={note}
                onSelect={() => {
                  router.push(`/notes/${note._id}`);
                  setOpen(false);
                }}
              />
            ))}
          </CommandGroup>

          <div ref={ref} />
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
