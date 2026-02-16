import { AppLayout } from '../app-layout';

import { ThemeProvider, BreakpointProvider } from '@/context'
import { ThemeSettings } from '@/components';
import { ThemeState } from '@/types';

export default function RootLayout({
 children,
 initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: ThemeState;
}) {
  return (
    <BreakpointProvider>
      <ThemeProvider initialTheme={initialTheme}>
        <AppLayout>
          {children}
          <ThemeSettings />
        </AppLayout>
      </ThemeProvider>
    </BreakpointProvider>
  );
}
