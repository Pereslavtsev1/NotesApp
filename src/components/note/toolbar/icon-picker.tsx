import { cn } from '@/lib/utils';
import { EmojiPicker } from 'frimousse';
interface IconPickerProps {
  onChange: (icon: string) => void;
  columns: number;
}

export default function IconPicker({ onChange, columns }: IconPickerProps) {
  return (
    <EmojiPicker.Root
      className='isolate flex h-200 w-full flex-col overflow-hidden rounded-2xl bg-background font-medium text-muted-foreground dark:bg-popover'
      columns={columns}
      onEmojiSelect={({ emoji }) => {
        onChange(emoji);
      }}
    >
      <EmojiPicker.Search
        className={cn(
          'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-9 w-full min-w-0 rounded-md  bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
        )}
      />
      <EmojiPicker.Viewport className='relative flex-1 outline-hidden'>
        <EmojiPicker.Loading className='absolute inset-0 flex items-center justify-center text-sm'>
          Loading…
        </EmojiPicker.Loading>
        <EmojiPicker.Empty className='absolute inset-0 flex items-center justify-center text-sm'>
          No emoji found.
        </EmojiPicker.Empty>
        <EmojiPicker.List
          className='pb-1.5 select-none '
          components={{
            CategoryHeader: ({ category, ...props }) => (
              <div
                className='bg-popover/80 px-3 pt-3 pb-1.5 text-xs font-medium backdrop-blur-md'
                {...props}
              >
                {category.label}
              </div>
            ),
            Row: ({ children, ...props }) => (
              <div className='flex scroll-my-1.5 justify-center' {...props}>
                {children}
              </div>
            ),
            Emoji: ({ emoji, ...props }) => (
              <button
                className='flex size-14 items-center justify-center rounded-md text-lg '
                {...props}
              >
                {emoji.emoji}
              </button>
            ),
          }}
        />
      </EmojiPicker.Viewport>
    </EmojiPicker.Root>
  );
}
