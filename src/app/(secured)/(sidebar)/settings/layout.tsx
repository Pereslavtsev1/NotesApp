import SettingsHeader from '@/components/settings/header';

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SettingsHeader />
      <div className='px-2 sm:px-4 md:px-8 lg:px-8'>{children}</div>
    </>
  );
}
