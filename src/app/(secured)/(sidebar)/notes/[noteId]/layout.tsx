import CoverImageModal from "@/components/modals/cover-image/cover-image-modal";

export default function CoverImageLayout({
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
