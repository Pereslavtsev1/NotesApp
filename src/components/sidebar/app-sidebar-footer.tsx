import {
  SearchIcon,
  Settings2Icon,
  SettingsIcon,
  Trash2Icon,
  TrashIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

export default function AppSidebarFooter() {
  return (
    <SidebarFooter>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button
                variant="ghost"
                className="justify-start text-muted-foreground"
              >
                <Trash2Icon />
                Trash
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button
                variant="ghost"
                className="justify-start text-muted-foreground"
              >
                <SettingsIcon />
                Settings
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarFooter>
  );
}
