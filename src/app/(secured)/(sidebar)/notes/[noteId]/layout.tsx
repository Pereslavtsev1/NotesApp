import CoverImageModal from "@/components/modals/cover-image/cover-image-modal";
import IconPickerDrawer from "@/components/note/toolbar/icon-picker-drawer";
import { Id } from "../../../../../../convex/_generated/dataModel";

export default async function CoverImageLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ noteId: string }>;
}>) {
  const { noteId } = await params;
  return (
    <>
      {children}
      <CoverImageModal />
      <IconPickerDrawer noteId={noteId as Id<"notes">} />
    </>
  );
}
