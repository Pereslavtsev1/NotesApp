"use server";
import { PlusIcon } from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "../ui/sidebar";
import { handleCreate } from "./actions";
import AppSidebarWorkspacesSection from "./app-sidebar-workspaces-section";

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
          <button
            type="button"
            className="absolute right-2 flex items-center justify-center rounded p-1 hover:bg-sidebar-accent"
            onClick={handleCreate}
          >
            <PlusIcon className="size-4" />
          </button>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <AppSidebarWorkspacesSection />
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
