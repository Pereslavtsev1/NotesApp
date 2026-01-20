'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useCoverImage } from '@/hooks/use-cover-image';
import {
  handleDeleteNote,
  handleFavoriteNote,
  handleRemoveCoverImage,
  handleRemoveIcon,
} from '@/lib/actions';
import { ClassNameProps, cn, runWithToast } from '@/lib/utils';
import { type Preloaded, usePreloadedQuery } from 'convex/react';
import {
  Edit,
  ImageIcon,
  MoreHorizontalIcon,
  RotateCcw,
  Smile,
  Star,
  Trash2,
} from 'lucide-react';
import { api } from '../../../../../convex/_generated/api';

import { BaseHeader } from '@/components/general/header/base-header';
import HeaderActions from '@/components/general/header/header-actions';
import HeaderNav from '@/components/general/header/header-nav';
import { useIconPickerDrawer } from '@/hooks/use-icon-picker-drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import NotePageNav from './note-page-nav';

export default function NotePageHeader({
  preloadedQuery,
  className,
}: {
  preloadedQuery: Preloaded<typeof api.notes.findNote>;
} & ClassNameProps) {
  const note = usePreloadedQuery(preloadedQuery);
  const { toggle: toggleIconPickerDrawer } = useIconPickerDrawer();
  const { toggle: toggleCoverImage } = useCoverImage();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const menuItems = [
    {
      icon: <ImageIcon />,
      label: note.coverImageKey ? 'Remove cover' : 'Add cover',
      onClick: () =>
        note.coverImageKey
          ? runWithToast({
              action: () => handleRemoveCoverImage({ id: note._id }),
              messages: {
                success: 'Cover removed',
                error: 'Failed to remove cover',
              },
            })
          : toggleCoverImage(),
    },

    {
      icon: note.isDeleted ? <RotateCcw /> : <Trash2 />,
      label: note.isDeleted ? 'Restore note' : 'Delete note',
      className: !note.isDeleted ? 'hover:text-destructive' : '',
      onClick: () =>
        runWithToast({
          action: () => handleDeleteNote({ id: note._id }),
          messages: {
            success: note.isDeleted ? 'Note restored' : 'Note deleted',
            error: 'Failed to update note',
          },
        }),
    },

    ...(isMobile
      ? [
          {
            icon: <Smile />,
            label: note.icon ? 'Remove icon' : 'Add icon',
            onClick: () =>
              note.icon
                ? runWithToast({
                    action: () => handleRemoveIcon({ id: note._id }),
                    messages: {
                      success: 'Icon removed',
                      error: 'Failed to remove icon',
                    },
                  })
                : toggleIconPickerDrawer(),
          },
        ]
      : []),

    ...(note.icon
      ? [
          {
            icon: <Edit />,
            label: 'Edit icon',
            onClick: toggleIconPickerDrawer,
          },
        ]
      : []),

    ...(note.coverImageKey
      ? [
          {
            icon: <ImageIcon />,
            label: 'Edit cover image',
            onClick: toggleCoverImage,
          },
        ]
      : []),
  ];

  return (
    <BaseHeader className={className}>
      <HeaderNav>
        <SidebarTrigger />
        <NotePageNav note={note} />
      </HeaderNav>

      <HeaderActions>
        <Button
          variant='ghost'
          size='icon'
          onClick={() =>
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
            })
          }
        >
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
                  {item.icon}
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
