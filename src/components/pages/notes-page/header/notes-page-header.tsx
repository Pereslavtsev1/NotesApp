import { BaseHeader } from '@/components/general/header/base-header';
import HeaderNav from '@/components/general/header/header-nav';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function NotesPageHeader() {
  return (
    <BaseHeader>
      <HeaderNav>
        <SidebarTrigger />
      </HeaderNav>
    </BaseHeader>
  );
}
