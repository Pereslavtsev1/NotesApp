import { SidebarGroup, SidebarHeader, SidebarMenu } from '../../ui/sidebar';
import AppSidebarNav from './nav/nav';

export default function AppSidebarHeader() {
  return (
    <SidebarHeader className='px-0'>
      <SidebarGroup>
        <SidebarMenu>
          <AppSidebarNav />
        </SidebarMenu>
      </SidebarGroup>
    </SidebarHeader>
  );
}
