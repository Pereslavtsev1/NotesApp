import { getToken } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function SecuredLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getToken();
  if (!token) {
    redirect("/login");
  }
  return <>{children}</>;
}
