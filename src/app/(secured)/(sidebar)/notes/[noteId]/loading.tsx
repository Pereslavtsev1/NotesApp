import EditorSkeleton from "@/components/editor/editor-skeleton";
import HeaderSkeleton from "@/components/note/header/header-skeleton";
import ToolbarSkeleton from "@/components/note/toolbar/toolbar-skeleton";

export default function Loading() {
  return (
    <div className="w-full">
      <div className="px-2 sm:px-4 md:px-6 lg:px-8">
        <HeaderSkeleton />
        <div className="pl-8 sm:pl-14">
          <div className="py-4">
            <ToolbarSkeleton />
            <EditorSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
