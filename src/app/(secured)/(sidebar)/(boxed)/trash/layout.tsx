import TrashHeader from "@/components/trash/header/header";

export default function TrashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TrashHeader />
      {children}
    </>
  );
}
