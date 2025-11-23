import { getToken } from "@/lib/auth-server";
import { preloadQuery } from "convex/nextjs";
import { SearchIcon } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { Button } from "../ui/button";
import {
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import AppSidebarNavUser from "./app-sidbar-nav-user";

export default async function AppSidebarHeader() {
  const token = await getToken();

  const preloadedUserQuery = await preloadQuery(
    api.user.getCurrentUser,
    {},
    { token },
  );
  return (
    <SidebarHeader>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <AppSidebarNavUser preloadedUserQuery={preloadedUserQuery} />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button
                variant="ghost"
                className="justify-start text-muted-foreground"
              >
                <SearchIcon />
                Search
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarHeader>
  );
}
