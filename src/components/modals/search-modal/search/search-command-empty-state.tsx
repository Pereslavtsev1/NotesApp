import { CommandEmpty } from "@/components/ui/command";
import { FileIcon } from "lucide-react";

export default function SearchCommandEmptyFoundState() {
  return (
    <CommandEmpty className="flex flex-col items-center gap-y-3 py-16">
      <FileIcon className="size-8 text-muted-foreground" />
      <div className="space-y-1 text-center">
        <p className="text-sm font-medium text-foreground">No notes yet</p>
        <p className="text-xs font-medium text-muted-foreground">
          Start by creating your first note
        </p>
      </div>
    </CommandEmpty>
  );
}
