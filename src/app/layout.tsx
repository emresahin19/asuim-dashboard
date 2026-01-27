import '@/styles/globals.scss';

import { AppLayout } from '@/layouts/app-layout';

export const metadata = {
  title: 'AsUIm Dashboard',
  description: 'Performance-first dashboard template',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
