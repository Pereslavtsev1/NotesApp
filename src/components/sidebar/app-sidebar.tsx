import { Sidebar } from '../ui/sidebar';
import AppSidebarContent from './app-sidebar-content/app-sidebar-content';
import AppSidebarFooter from './app-sidebar-footer/app-sidebar-footer';
import AppSidebarHeader from './app-sidebar-header/app-sidebar-header';

export default function AppSidebar() {
  return (
    <Sidebar>
      <AppSidebarHeader />
      <AppSidebarContent />
      <AppSidebarFooter />
    </Sidebar>
  );
}
