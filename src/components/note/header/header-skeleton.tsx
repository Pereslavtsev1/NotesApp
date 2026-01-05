"use client";

import { BaseHeader } from "@/components/header/base-header";
import HeaderLeft from "@/components/header/header-left-side";
import HeaderRight from "@/components/header/header-right-side";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function HeaderSkeleton() {
  return (
    <BaseHeader>
      <HeaderLeft>
        <SidebarTrigger />
        <Skeleton className="h-4 w-24" />
      </HeaderLeft>

      <HeaderRight>
        <Skeleton className="size-9 rounded-md" />
        <Skeleton className="size-9 rounded-md" />
      </HeaderRight>
    </BaseHeader>
  );
}
