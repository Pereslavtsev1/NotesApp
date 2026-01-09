import HomePageFooter from "@/components/home/footer/footer";
import HomePageHeader from "@/components/home/header/header";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HomePageHeader />
      {children}
      <HomePageFooter />
    </>
  );
}
