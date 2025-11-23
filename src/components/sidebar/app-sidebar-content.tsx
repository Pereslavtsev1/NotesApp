import { PlusIcon, StarIcon } from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "../ui/sidebar";

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
        <SidebarGroupAction className="text-muted-foreground">
          <PlusIcon />
        </SidebarGroupAction>

        <SidebarGroupContent></SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
