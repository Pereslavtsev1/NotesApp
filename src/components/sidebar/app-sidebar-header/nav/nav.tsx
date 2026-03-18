'use client';
import { Button } from '@/components/ui/button';
import { SidebarMenuItem } from '@/components/ui/sidebar';
import { useSearch } from '@/hooks/use-search';
import { SearchIcon } from 'lucide-react';

export default function AppSidebarNav() {
  const { toggle } = useSearch();
  return (
    <SidebarMenuItem>
      <Button
        variant='ghost'
        className='w-full justify-start text-muted-foreground'
        onClick={toggle}
      >
        <SearchIcon />
        Search
      </Button>
    </SidebarMenuItem>
  );
}
