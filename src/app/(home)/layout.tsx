import HomePageFooter from '@/components/pages/home-page/footer/home-page-footer';
import HomePageHeader from '@/components/pages/home-page/header/home-page-header';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className='mx-auto max-w-7xl'>
        <HomePageHeader />
        {children}
        <HomePageFooter />
      </div>
    </>
  );
}
