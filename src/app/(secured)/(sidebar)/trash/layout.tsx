import TrashPageHeader from '@/components/pages/trash-page/header/trash-page-header';

export default function TrashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TrashPageHeader />
      <div className='px-2 sm:px-4 md:px-8 lg:px-8'>{children}</div>
    </>
  );
}
