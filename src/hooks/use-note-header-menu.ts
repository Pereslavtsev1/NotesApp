import {
  handleDeleteNote,
  handleRemoveCoverImage,
  handleRemoveIcon,
} from '@/lib/actions';
import { runWithToast } from '@/lib/utils';
import {
  Edit,
  ImageIcon,
  LucideIcon,
  RotateCcw,
  Smile,
  Trash2,
} from 'lucide-react';
import { Doc } from '../../convex/_generated/dataModel';
import { useCoverImage } from './use-cover-image';
import { useIconPickerDrawer } from './use-icon-picker-drawer';
import { useMediaQuery } from './use-media-query';

type MenuItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
  hidden?: boolean;
};

type UseNoteHeaderMenuProps = {
  note: Doc<'notes'>;
};
export function useNoteHeaderMenu({ note }: UseNoteHeaderMenuProps) {
  const { toggle: toggleIconPickerDrawer } = useIconPickerDrawer();
  const { toggle: toggleCoverImage } = useCoverImage();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const hasCover = !!note.coverImageKey;
  const hasIcon = !!note.icon;
  console.log('Is mobile:', isMobile, 'hasIcon:', hasIcon);

  const removeCover = () =>
    runWithToast({
      action: () => handleRemoveCoverImage({ id: note._id }),
      messages: {
        success: 'Cover removed',
        error: 'Failed to remove cover',
      },
    });

  const deleteOrRestore = () =>
    runWithToast({
      action: () => handleDeleteNote({ id: note._id }),
      messages: {
        success: note.isDeleted ? 'Note restored' : 'Note deleted',
        error: 'Failed to update note',
      },
    });

  const removeIcon = () =>
    runWithToast({
      action: () => handleRemoveIcon({ id: note._id }),
      messages: {
        success: 'Icon removed',
        error: 'Failed to remove icon',
      },
    });

  const items: MenuItem[] = [
    {
      id: 'cover',
      icon: ImageIcon,
      label: hasCover ? 'Remove cover' : 'Add cover',
      onClick: hasCover ? removeCover : toggleCoverImage,
    },

    {
      id: 'delete',
      icon: note.isDeleted ? RotateCcw : Trash2,
      label: note.isDeleted ? 'Restore note' : 'Delete note',
      className: !note.isDeleted ? 'hover:text-destructive' : undefined,
      onClick: deleteOrRestore,
    },

    {
      id: 'icon',
      icon: Smile,
      label: hasIcon ? 'Remove icon' : 'Add icon',
      hidden: !isMobile,
      onClick: hasIcon ? removeIcon : toggleIconPickerDrawer,
    },

    {
      id: 'edit-icon',
      icon: Edit,
      label: 'Edit icon',
      hidden: !isMobile && hasIcon,
      onClick: toggleIconPickerDrawer,
    },

    {
      id: 'edit-cover',
      icon: ImageIcon,
      label: 'Edit cover image',
      hidden: !hasCover,
      onClick: toggleCoverImage,
    },
  ];

  return items.filter((item) => !item.hidden);
}
