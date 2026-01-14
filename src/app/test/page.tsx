"use client";

import * as React from "react";

import IconPicker from "@/components/note/toolbar/icon-picker";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Page() {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Pick emoji</Button>
      </DrawerTrigger>

      <DrawerContent className="flex bg-popover">
        <DrawerHeader className="shrink-0 text-left">
          <DrawerTitle>Choose icon</DrawerTitle>
          <DrawerDescription>Select an emoji for your note</DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-hidden px-2 pb-2">
          <IconPicker
            onChange={(emoji) => {
              console.log("selected:", emoji);
              setOpen(false);
            }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
