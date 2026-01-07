import { CommandEmpty } from "@/components/ui/command";
import { SearchIcon } from "lucide-react";

export default function SearchCommandNotFoundState({
  query,
}: {
  query: string;
}) {
  return (
    <CommandEmpty className="flex flex-col items-center gap-y-3 py-16">
      <SearchIcon className="size-8 text-muted-foreground" />
      <p className="text-sm font-semibold text-foreground">No notes found</p>
      <p className="text-xs font-medium text-muted-foreground">
        Try searching for “{query}” or use different keywords
      </p>
    </CommandEmpty>
  );
}
