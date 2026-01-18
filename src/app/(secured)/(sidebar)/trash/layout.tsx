import TrashHeader from '@/components/trash/header/header';

export default function TrashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TrashHeader />
      <div className='px-2 sm:px-4 md:px-8 lg:px-8'>{children}</div>
    </>
  );
}
