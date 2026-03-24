'use client';

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '../../ui/sidebar';
import AppCreateNoteButton from './app-sidebar-create-note-button';
import AppSidebarNotesSection from './app-sidebar-notes-section/app-sidebar-notes-section';

export default function AppSidebarContent() {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel className='font-semibold'>
          Favorites
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <AppSidebarNotesSection isFavorite={true} />
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel className='relative font-semibold'>
          Workspaces
          <AppCreateNoteButton />
        </SidebarGroupLabel>

        <SidebarGroupContent>
          <AppSidebarNotesSection isFavorite={false} />
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
