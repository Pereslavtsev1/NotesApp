import { BaseHeader } from '@/components/header/base-header';
import HeaderLeft from '@/components/header/header-left-side';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function Notes() {
  return (
    <BaseHeader>
      <HeaderLeft>
        <SidebarTrigger />
      </HeaderLeft>
    </BaseHeader>
  );
}
