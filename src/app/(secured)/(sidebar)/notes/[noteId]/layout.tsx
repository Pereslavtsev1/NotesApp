import IconPickerDrawer from '@/components/general/icon-picker/icon-picker-drawer';
import CoverImageModal from '@/components/modals/cover-image-modal/cover-image-modal';
import NotePageHeader from '@/components/pages/note-page/header/note-page-header';
import { preloadAuthQuery } from '@/lib/auth-server';
import { api } from '../../../../../../convex/_generated/api';
import { Id } from '../../../../../../convex/_generated/dataModel';

export default async function NotePageLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ noteId: Id<'notes'> }>;
}>) {
  const { noteId } = await params;

  const preloadedQuery = await preloadAuthQuery(api.notes.findNote, {
    id: noteId,
  });
  return (
    <>
      <NotePageHeader preloadedQuery={preloadedQuery} />
      {children}
      <CoverImageModal />
      <IconPickerDrawer noteId={noteId} />
    </>
  );
}
