'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { handleFavoriteNote } from '@/lib/actions';
import { ClassNameProps, cn, runWithToast } from '@/lib/utils';
import { type Preloaded, usePreloadedQuery } from 'convex/react';
import { MoreHorizontalIcon, Star } from 'lucide-react';
import { api } from '../../../../../convex/_generated/api';

import { BaseHeader } from '@/components/general/header/base-header';
import HeaderActions from '@/components/general/header/header-actions';
import HeaderNav from '@/components/general/header/header-nav';
import { useNoteHeaderMenu } from '@/hooks/use-note-header-menu';
import NotePageNav from './note-page-nav';

export default function NotePageHeader({
  preloadedQuery,
  className,
}: {
  preloadedQuery: Preloaded<typeof api.notes.findNote>;
} & ClassNameProps) {
  const note = usePreloadedQuery(preloadedQuery);
  const menuItems = useNoteHeaderMenu({ note });
  const favoriteToggle = () =>
    runWithToast({
      action: () =>
        handleFavoriteNote({
          id: note._id,
          isFavorite: !note.isFavorite,
          recursive: true,
        }),
      messages: {
        success: note.isFavorite
          ? 'Removed from favorites'
          : 'Added to favorites',
        error: 'Failed to update favorite',
      },
    });

  return (
    <BaseHeader className={className}>
      <HeaderNav>
        <SidebarTrigger />
        <NotePageNav note={note} />
      </HeaderNav>

      <HeaderActions>
        <Button variant='ghost' size='icon' onClick={() => favoriteToggle()}>
          <Star
            className={cn(
              note.isFavorite
                ? 'text-yellow-500 fill-yellow-500'
                : 'text-muted-foreground'
            )}
          />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon'>
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end' className='w-48'>
            {menuItems.map((item) => (
              <DropdownMenuItem key={item.label} asChild>
                <Button
                  variant='ghost'
                  className={cn(
                    'w-full justify-start gap-x-4 font-medium text-muted-foreground hover:bg-accent',
                    item.className
                  )}
                  onClick={item.onClick}
                >
                  {<item.icon />}
                  {item.label}
                </Button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </HeaderActions>
    </BaseHeader>
  );
}
