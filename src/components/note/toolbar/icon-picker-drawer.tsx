"use client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIconPickerDrawer } from "@/hooks/use-icon-picker-drawer";
import { Id } from "../../../../convex/_generated/dataModel";
import IconPicker from "./icon-picker";
import { handleSetIcon } from "@/lib/actions";
import { Button } from "@/components/ui/button";

export default function IconPickerDrawer({ noteId }: { noteId: Id<"notes"> }) {
  const { open, setOpen } = useIconPickerDrawer();
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="flex bg-popover">
        <DrawerHeader className="shrink-0 text-left">
          <DrawerTitle>Choose icon</DrawerTitle>
          <DrawerDescription>Select an emoji for your note</DrawerDescription>
          <Button variant="ghost">Remove icon</Button>
        </DrawerHeader>

        <div className="flex-1 overflow-hidden px-2 pb-2">
          <IconPicker
            onChange={(emoji) => {
              handleSetIcon({ id: noteId, icon: emoji });
              setOpen(false);
            }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
