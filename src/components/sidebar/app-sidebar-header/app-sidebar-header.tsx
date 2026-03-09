import { preloadAuthQuery } from '@/lib/auth-server';
import { api } from '../../../../convex/_generated/api';
import {
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '../../ui/sidebar';
import AppSidebarNavUser from './app-sidbar-nav-user';
import AppSidebarNav from './app-sidebar-nav';

export default async function AppSidebarHeader() {
  const preloadedUserQuery = await preloadAuthQuery(
    api.auth.getCurrentUser,
    {}
  );
  return (
    <SidebarHeader className='px-0'>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <AppSidebarNavUser preloadedUserQuery={preloadedUserQuery} />
          </SidebarMenuItem>
          <AppSidebarNav />
        </SidebarMenu>
      </SidebarGroup>
    </SidebarHeader>
  );
}
