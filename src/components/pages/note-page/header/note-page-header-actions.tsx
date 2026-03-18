'use client';

import HeaderActions from '@/components/general/header/header-actions';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNoteHeaderMenu } from '@/hooks/use-note-header-menu';
import { handleFavoriteNote } from '@/lib/actions';
import { cn, runWithToast } from '@/lib/utils';
import { Preloaded, usePreloadedQuery } from 'convex/react';
import { MoreHorizontalIcon, Star } from 'lucide-react';
import { api } from '../../../../../convex/_generated/api';
import { use } from 'react';

type NoteActionsProps = {
  preloadedQuery: Promise<Preloaded<typeof api.notes.findNote>>;
};

export default function NotePageHeaderActions({
  preloadedQuery,
}: NoteActionsProps) {
  const note = usePreloadedQuery(use(preloadedQuery));
  const menuItems = useNoteHeaderMenu({ note });

  const toggleFavorite = () =>
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
    <HeaderActions>
      <Button variant='ghost' size='icon' onClick={toggleFavorite}>
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
                <item.icon />
                {item.label}
              </Button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </HeaderActions>
  );
}
