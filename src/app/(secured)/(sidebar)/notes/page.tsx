import { BaseHeader } from "@/components/header/base-header";
import HeaderLeft from "@/components/header/header-left-side";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Notes() {
  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-8">
      <BaseHeader>
        <HeaderLeft>
          <SidebarTrigger />
        </HeaderLeft>
      </BaseHeader>
    </div>
  );
}
