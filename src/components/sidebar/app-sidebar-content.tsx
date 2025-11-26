"use server";
import { getToken } from "@/lib/auth-server";
import { fetchMutation } from "convex/nextjs";
import { PlusIcon } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "../ui/sidebar";
import AppSidebarWorkspacesSection from "./app-sidebar-workspaces-section";

export default async function AppSidebarContent() {
  async function handleCreate() {
    "use server";
    const token = await getToken();
    console.log("Here");
    const res = await fetchMutation(
      api.notes.createNote,
      {
        title: "Untitled",
      },
      { token },
    );

    console.log(res);
  }
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
