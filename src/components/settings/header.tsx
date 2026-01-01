"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function SettingsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 py-4 backdrop-blur-md">
      <div className="flex w-full items-center gap-x-2 font-semibold text-muted-foreground">
        <SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="max-w-36 truncate font-semibold text-muted-foreground">
                Settings
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
