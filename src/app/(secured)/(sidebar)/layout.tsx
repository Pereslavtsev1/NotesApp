import SearchModal from "@/components/modals/search-modal/search/search-command";
import AppSidebar from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      {children}
      <SearchModal />
    </SidebarProvider>
  );
}
