import {
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '../../ui/sidebar';
import AppSidebarNavUser from './nav/nav-user';
import AppSidebarNav from './nav/nav';

export default function AppSidebarHeader() {
  return (
    <SidebarHeader className='px-0'>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <AppSidebarNavUser />
          </SidebarMenuItem>
          <AppSidebarNav />
        </SidebarMenu>
      </SidebarGroup>
    </SidebarHeader>
  );
}
