import SettingsHeader from "@/components/settings/header";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <SettingsHeader />
      <div className="mx-auto my-6">{children}</div>
    </div>
  );
}
