import { AppLayout } from '@/components/layout/app-layout/AppLayout';
import { collectActiveGroupIds } from '@/components/layout/sidebar/utils/toc.utils';
import { createSidebarConfig } from '@/config/sidebar';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const cookieStore = await cookies();

  const pathname = headersList.get('x-pathname') || '/';
  const resolvedSidebarConfig = createSidebarConfig({
    apps: [],
  });

  const initialOpenGroups = new Set<string>();
  collectActiveGroupIds(resolvedSidebarConfig, pathname, initialOpenGroups);
  const openGroupsArray = Array.from(initialOpenGroups);

  return (
    <AppLayout initialOpenGroups={openGroupsArray}>
      {children}
    </AppLayout>
  );
}
