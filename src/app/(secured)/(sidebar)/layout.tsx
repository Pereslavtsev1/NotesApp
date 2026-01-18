import SearchModal from '@/components/modals/search-modal/search/search-command';
import AppSidebar from '@/components/sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default async function SidebarLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ noteId: string }>;
}>) {
  const { noteId } = await params;
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className='w-full'>{children}</div>
      <SearchModal />
    </SidebarProvider>
  );
}
