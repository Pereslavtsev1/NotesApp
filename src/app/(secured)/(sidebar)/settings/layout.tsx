import SettingsHeader from "@/components/settings/header";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <div className="px-2 sm:px-4 md:px-6 lg:px-8">
        <SettingsHeader />
      </div>

      <div className="mt-6 px-2 sm:px-4 md:px-6 lg:px-8">{children}</div>
    </div>
  );
}
