import { getToken } from "@/lib/auth-server";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import AppSidebarNotesSection from "./app-sidebar-notes-section";

export default async function AppSidebarWorkspacesSection() {
  const token = await getToken();
  const notes = await preloadQuery(
    api.notes.findAllUserWorkspaces,
    {},
    {
      token,
    },
  );
  return <AppSidebarNotesSection preloadedQuery={notes} />;
}
