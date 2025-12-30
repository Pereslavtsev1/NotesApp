import SettingsHeader from "@/components/settings/header";

export default function SettingsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="w-full">
			<SettingsHeader />
			{children}
		</div>
	);
}
