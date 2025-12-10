import CoverImageModal from "@/components/modals/cover-image/cover-image";

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
