"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { BaseHeader } from "../header/base-header";
import HeaderLeft from "../header/header-left-side";
import { HeaderBreadcrumb } from "../header/header-breadcrumb";

export default function SettingsHeader() {
  return (
    <BaseHeader>
      <HeaderLeft>
        <SidebarTrigger />
        <HeaderBreadcrumb title="Settings" />
      </HeaderLeft>
    </BaseHeader>
  );
}
