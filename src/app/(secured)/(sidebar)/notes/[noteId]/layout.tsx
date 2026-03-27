import CoverImageModal from '@/components/modals/cover-image-modal/cover-image-modal';
import NotePageHeader from '@/components/pages/note-page/header/note-page-header';
import PreloadedNoteProvider from '@/components/providers/preloaded-note-provider';
import { preloadAuthQuery } from '@/lib/auth-server';
import { api } from '../../../../../../convex/_generated/api';
import { Id } from '../../../../../../convex/_generated/dataModel';

export default async function NotePageLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ noteId: string }>;
}>) {
  const { noteId } = await params;
  const preloadedQuery = preloadAuthQuery(api.notes.findNote, {
    id: noteId as Id<'notes'>,
  });
  return (
    <PreloadedNoteProvider preloadedQuery={preloadedQuery}>
      <NotePageHeader />
      {children}
      <CoverImageModal />
    </PreloadedNoteProvider>
  );
}
