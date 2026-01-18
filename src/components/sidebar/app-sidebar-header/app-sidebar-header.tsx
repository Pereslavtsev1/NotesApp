import { getToken } from '@/lib/auth-server';
import { preloadQuery } from 'convex/nextjs';
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
  const token = await getToken();
  const preloadedUserQuery = await preloadQuery(
    api.user.getCurrentUser,
    {},
    { token }
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
