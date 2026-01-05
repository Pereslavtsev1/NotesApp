import { BaseHeader } from "@/components/header/base-header";
import { HeaderBreadcrumb } from "@/components/header/header-breadcrumb";
import HeaderLeft from "@/components/header/header-left-side";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function TrashHeader() {
  return (
    <BaseHeader>
      <HeaderLeft>
        <SidebarTrigger />
        <HeaderBreadcrumb title="Trash" />
      </HeaderLeft>
    </BaseHeader>
  );
}
