'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { BaseHeader } from '../header/base-header';
import HeaderLeft from '../header/header-left-side';
import { HeaderBreadcrumb } from '../header/header-breadcrumb';
import { ClassNameProps } from '@/lib/utils';

export default function SettingsHeader({ className }: ClassNameProps) {
  return (
    <BaseHeader className={className}>
      <HeaderLeft>
        <SidebarTrigger />
        <HeaderBreadcrumb title='Settings' />
      </HeaderLeft>
    </BaseHeader>
  );
}
