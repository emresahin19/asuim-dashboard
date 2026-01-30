import '@/styles/globals.scss';

import { AppLayout } from '@/layouts/app-layout';
import { ThemeProvider } from '@/theme/ThemeContext'
import { ThemeSettings } from '@/components/ui/theme-settings/theme-settings';

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
    <html lang="en" data-theme="light">
      <body>
        <ThemeProvider>
          <AppLayout>
            {children}
            <ThemeSettings />
          </AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
