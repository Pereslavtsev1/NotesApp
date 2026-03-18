import CoverImageModal from '@/components/modals/cover-image-modal/cover-image-modal';

export default function NotePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <CoverImageModal />
    </>
  );
}
