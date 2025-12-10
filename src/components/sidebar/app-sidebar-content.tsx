"use server";
import { handleCreate } from "@/lib/actions";
import { PlusIcon } from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "../ui/sidebar";

import AppSidebarWorkspacesSection from "./app-sidebar-workspaces-section";
import { Button } from "../ui/button";

export default async function AppSidebarContent() {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel className="font-semibold">
          Favorites
        </SidebarGroupLabel>
        <SidebarGroupContent></SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel className="relative items-center font-semibold">
          <span>Workspaces</span>
          <Button
            type="button"
            variant="ghost"
            className="absolute right-2 flex size-5 items-center justify-center rounded p-0 px-0 hover:bg-sidebar-accent"
            onClick={handleCreate}
          >
            <PlusIcon />
          </Button>
        </SidebarGroupLabel>
        <SidebarGroupContent className="">
          <AppSidebarWorkspacesSection />
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
