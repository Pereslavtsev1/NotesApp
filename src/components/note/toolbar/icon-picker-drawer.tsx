'use client';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useIconPickerDrawer } from '@/hooks/use-icon-picker-drawer';
import { Id } from '../../../../convex/_generated/dataModel';
import IconPicker from './icon-picker';
import { handleSetIcon } from '@/lib/actions';

export default function IconPickerDrawer({ noteId }: { noteId: Id<'notes'> }) {
  const { open, setOpen } = useIconPickerDrawer();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className='flex h-full flex-col bg-popover'>
        <DrawerHeader className='px-4 pb-2 text-center'>
          <DrawerTitle>Choose icon</DrawerTitle>
          <DrawerDescription className='font-medium'>
            Select an emoji for your note
          </DrawerDescription>
        </DrawerHeader>

        <div className='flex-1 overflow-hidden px-2 pb-2'>
          <IconPicker
            columns={6}
            onChange={(icon) => {
              handleSetIcon({ id: noteId, icon: icon });
              setOpen(false);
            }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
