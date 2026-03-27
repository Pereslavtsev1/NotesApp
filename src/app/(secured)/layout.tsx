import { isAuthenticated } from '@/lib/auth-server';
import { redirect } from 'next/navigation';

export default async function SecuredLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect('/login');
  }
  return <>{children}</>;
}
