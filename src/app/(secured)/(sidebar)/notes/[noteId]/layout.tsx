import CoverImageModal from "@/components/modals/cover-image/cover-image";
import SearchModal from "@/components/modals/search/search";

export default function CoverImageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <CoverImageModal />
      <SearchModal />
    </>
  );
}
