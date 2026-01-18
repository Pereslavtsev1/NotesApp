import { BaseHeader } from '@/components/header/base-header';
import HeaderLeft from '@/components/header/header-left-side';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function Notes() {
  return (
    <BaseHeader className='px-4 sm:px-6 md:px-6 lg:px-10'>
      <HeaderLeft>
        <SidebarTrigger />
      </HeaderLeft>
    </BaseHeader>
  );
}
