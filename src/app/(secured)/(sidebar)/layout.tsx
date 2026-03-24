import SearchModal from '@/components/modals/search-modal/search/search-modal';
import PreloadedUserProvider from '@/components/providers/preloaded-user-proivder';
import AppSidebar from '@/components/sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { preloadAuthQuery } from '@/lib/auth-server';
import { api } from '../../../../convex/_generated/api';

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const preloadedQuery = preloadAuthQuery(api.auth.getCurrentUser);
  return (
    <PreloadedUserProvider preloadedQuery={preloadedQuery}>
      <SidebarProvider>
        <AppSidebar />
        <div className='w-full'>{children}</div>
        <SearchModal />
      </SidebarProvider>
    </PreloadedUserProvider>
  );
}
