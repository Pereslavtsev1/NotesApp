import EditorSkeleton from '@/components/editor/editor-skeleton';
import HeaderSkeleton from '@/components/note/header/header-skeleton';
import ToolbarSkeleton from '@/components/note/toolbar/toolbar-skeleton';

export default function Loading() {
  return (
    <div className='w-full'>
      <HeaderSkeleton />
      <div className='pl-8 sm:pl-14'>
        <div className='py-4'>
          <ToolbarSkeleton />
          <EditorSkeleton />
        </div>
      </div>
    </div>
  );
}
