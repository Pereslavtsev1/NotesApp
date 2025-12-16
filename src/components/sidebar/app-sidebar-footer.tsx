import { SettingsIcon, Trash2Icon } from "lucide-react";
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
    <SidebarFooter className="px-0">
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
