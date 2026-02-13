import { AppLayout } from '../app-layout';

import { ThemeProvider, BreakpointProvider } from '@/context'
import { ThemeSettings } from '@/components';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BreakpointProvider>
      <ThemeProvider>
        <AppLayout>
          {children}
          <ThemeSettings />
        </AppLayout>
      </ThemeProvider>
    </BreakpointProvider>
  );
}
