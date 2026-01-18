import CoverImageModal from '@/components/modals/cover-image/cover-image-modal';
import { getToken } from '@/lib/auth-server';
import { preloadQuery } from 'convex/nextjs';
import { api } from '../../../../../../convex/_generated/api';
import { Id } from '../../../../../../convex/_generated/dataModel';
import NotePageHeader from '@/components/pages/note-page/header/note-page-header';
import IconPickerDrawer from '@/components/general/icon-picker/icon-picker-drawer';

export default async function CoverImageLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ noteId: string }>;
}>) {
  const { noteId } = await params;
  const token = await getToken();

  const preloadedQuery = await preloadQuery(
    api.notes.findNote,
    { id: noteId as Id<'notes'> },
    { token }
  );
  return (
    <>
      <NotePageHeader preloadedQuery={preloadedQuery} />
      {children}
      <CoverImageModal />
      <IconPickerDrawer noteId={noteId as Id<'notes'>} />
    </>
  );
}
