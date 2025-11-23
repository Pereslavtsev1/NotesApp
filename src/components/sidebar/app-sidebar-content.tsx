import { PlusIcon } from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "../ui/sidebar";
import AppSidebarNotesSection from "./app-sidebar-notes-section";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import AppSidebarWorkspacesSection from "./app-sidebar-workspaces-section";

async function handleClick() {
  "use server";
  const token = await getToken();
  console.log("Here");
  const res = await fetchMutation(
    api.notes.createNote,
    { title: "Untitled" },
    { token },
  );

  console.log(res);
}
export default function AppSidebarContent() {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel className="font-semibold">
          Favorites
        </SidebarGroupLabel>
        <SidebarGroupContent></SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel className="font-semibold">
          Workspaces
        </SidebarGroupLabel>
        <SidebarGroupAction
          className="text-muted-foreground"
          onClick={handleClick}
        >
          <PlusIcon />
        </SidebarGroupAction>

        <SidebarGroupContent>
          <AppSidebarWorkspacesSection />
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
