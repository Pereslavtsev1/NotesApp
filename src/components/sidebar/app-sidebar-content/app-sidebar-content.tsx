'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Id } from '../../../../convex/_generated/dataModel';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '../../ui/sidebar';
import AppCreateNoteButton from './app-sidebar-create-note-button';
import AppSidebarNotesSection from './app-sidebar-notes-section/app-sidebar-notes-section';

export default function AppSidebarContent() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const router = useRouter();

  const handleExpand = (noteId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [noteId]: !prev[noteId],
    }));
  };

  const handleClick = (noteId: Id<'notes'>) => {
    router.push(`/notes/${noteId}`);
  };
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel className='font-semibold'>
          Favorites
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <AppSidebarNotesSection
            isFavorite={true}
            expanded={expanded}
            handleClick={handleClick}
            onExpand={handleExpand}
            items={10}
          />
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel className='relative font-semibold'>
          Workspaces
          <AppCreateNoteButton />
        </SidebarGroupLabel>

        <SidebarGroupContent>
          <AppSidebarNotesSection
            isFavorite={false}
            expanded={expanded}
            handleClick={handleClick}
            onExpand={handleExpand}
            items={10}
          />
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
