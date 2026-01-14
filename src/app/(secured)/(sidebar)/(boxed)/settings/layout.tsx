import SettingsHeader from "@/components/settings/header";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SettingsHeader />
      {children}
    </>
  );
}
