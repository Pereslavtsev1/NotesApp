import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { ReactNode } from 'react';
import IconPicker from './icon-picker';
interface IconPickerProps {
  onChange: (icon: string) => void;
  children: ReactNode;
  asChild?: boolean;
}

export default function IconPickerPopover({
  onChange,
  children,
  asChild = false,
}: IconPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent
        className='w-full border-none p-0 shadow-none'
        side='bottom'
        align='start'
        sideOffset={10}
      >
        <IconPicker onChange={(icon) => onChange(icon)} columns={10} />
      </PopoverContent>
    </Popover>
  );
}
