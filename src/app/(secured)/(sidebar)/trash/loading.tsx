import HeaderSkeleton from "@/components/note/header/header-skeleton";

export default function TrashLoading() {
  return (
    <div className="w-full">
      <div className="px-2 sm:px-4 md:px-6 lg:px-8">
        <HeaderSkeleton />
        <div className="pl-8 sm:pl-14">
          <div className="py-4"></div>
        </div>
      </div>
    </div>
  );
}
