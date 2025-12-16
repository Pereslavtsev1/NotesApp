"use client";
import { useSearch } from "@/hooks/use-search";
import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { SidebarMenuItem } from "../ui/sidebar";

export default function SidebarNav() {
  const { toggle } = useSearch();
  return (
    <SidebarMenuItem>
      <Button
        variant="ghost"
        className="w-full justify-start text-muted-foreground"
        onClick={toggle}
      >
        <SearchIcon />
        Search
      </Button>
    </SidebarMenuItem>
  );
}
