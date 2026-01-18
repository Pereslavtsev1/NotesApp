'use client';

import { BaseHeader } from '@/components/general/header/base-header';
import { HeaderBreadcrumb } from '@/components/general/header/header-breadcrumb';
import HeaderNav from '@/components/general/header/header-nav';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function SettingsHeader() {
  return (
    <BaseHeader>
      <HeaderNav>
        <SidebarTrigger />
        <HeaderBreadcrumb title='Settings' />
      </HeaderNav>
    </BaseHeader>
  );
}
