"use server";

import { handleCreate } from "@/lib/actions";
import { PlusIcon } from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "../ui/sidebar";

import { getToken } from "@/lib/auth-server";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { Button } from "../ui/button";
import AppSidebarNotesSection from "./app-sidebar-notes-section";

export default async function AppSidebarContent() {
  const token = await getToken();

  const favoritesNotes = await preloadQuery(
    api.notes.findAllUserNotes,
    { isFavorite: true },
    { token },
  );

  const workspaceNotes = await preloadQuery(
    api.notes.findAllUserNotes,
    { isFavorite: false },
    { token },
  );

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel className="font-semibold">
          Favorites
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <AppSidebarNotesSection preloadedQuery={favoritesNotes} />
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel className="relative font-semibold">
          Workspaces
          <Button
            type="button"
            variant="ghost"
            className="absolute right-2 size-5 rounded p-0 hover:bg-sidebar-accent"
            onClick={handleCreate}
          >
            <PlusIcon />
          </Button>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <AppSidebarNotesSection preloadedQuery={workspaceNotes} />
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
