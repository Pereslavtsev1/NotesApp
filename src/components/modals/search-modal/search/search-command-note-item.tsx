import { CommandItem } from '@/components/ui/command';
import { FileIcon } from 'lucide-react';
import { Doc } from '../../../../../convex/_generated/dataModel';

export default function SearchCommandNoteItem({
  note,
  onSelect,
}: {
  note: Doc<'notes'>;
  onSelect: () => void;
}) {
  return (
    <CommandItem value={note._id} onSelect={onSelect}>
      <div className='flex w-full items-center justify-between gap-x-2'>
        <div className='flex items-center gap-x-2'>
          {note.icon ? <span>{note.icon}</span> : <FileIcon />}
          <p className='max-w-40 truncate font-medium'>{note.title}</p>
        </div>
        <span className='text-sm text-muted-foreground'>
          {new Date(note._creationTime).toLocaleDateString()}
        </span>
      </div>
    </CommandItem>
  );
}
