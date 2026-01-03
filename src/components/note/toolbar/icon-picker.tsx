import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerSearch,
} from "@/components/ui/emoji-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { ReactNode } from "react";
interface IconPickerProps {
  onChange: (icon: string) => void;
  children: ReactNode;
  asChild?: boolean;
}

export default function IconPicker({
  onChange,
  children,
  asChild = false,
}: IconPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent
        className="w-full border-none p-0 shadow-none"
        side="bottom"
        sideOffset={10}
      >
        <EmojiPicker
          className="h-[326px] rounded-lg border shadow-md"
          onEmojiSelect={({ emoji }) => {
            onChange(emoji);
          }}
        >
          <EmojiPickerSearch className="font-semibold text-muted-foreground" />
          <EmojiPickerContent className="font-semibold text-muted-foreground" />
        </EmojiPicker>
      </PopoverContent>
    </Popover>
  );
}
