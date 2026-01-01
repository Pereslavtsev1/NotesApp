import TrashHeader from "@/components/trash/header/header";

export default function TrashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <TrashHeader />
      <div className="mx-auto max-w-7xl">{children}</div>
    </div>
  );
}
