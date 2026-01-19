'use client';
import { SettingsIcon, Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../../ui/button';
import {
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from '../../ui/sidebar';

export default function AppSidebarFooter() {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarFooter className='px-0'>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button
              variant='ghost'
              className='w-full justify-start text-muted-foreground'
              onClick={() => {
                router.push('/trash');
                setOpenMobile(false);
              }}
            >
              <Trash2Icon />
              Trash
            </Button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button
              variant='ghost'
              className='w-full justify-start text-muted-foreground'
              onClick={() => {
                router.push('/settings');
                setOpenMobile(false);
              }}
            >
              <SettingsIcon />
              Settings
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarFooter>
  );
}
