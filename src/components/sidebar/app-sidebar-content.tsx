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
  const notes = await preloadQuery(
    api.notes.findAllUserWorkspaces,
    {},
    {
      token,
    },
  );

  const favoritesNotes = await preloadQuery(
    api.notes.findAllUserWorkspaces,
    { isFavorite: true },
    {
      token,
    },
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
        <SidebarGroupContent>
          <AppSidebarNotesSection preloadedQuery={notes} />
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
