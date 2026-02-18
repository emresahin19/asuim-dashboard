import { AppLayout } from '../app-layout';

import { ThemeProvider, BreakpointProvider } from '@/context'
import { ThemeSettings } from '@/components';
import { ThemeState } from '@/types';

export default function RootLayout({
 children,
 initialTheme,
 openGroupsArray,
}: {
  children: React.ReactNode;
  initialTheme: ThemeState;
  openGroupsArray: string[];
}) {
  return (
    <BreakpointProvider>
      <ThemeProvider 
        initialTheme={initialTheme}
      >
        <AppLayout initialOpenGroups={openGroupsArray}>
          {children}
          <ThemeSettings />
        </AppLayout>
      </ThemeProvider>
    </BreakpointProvider>
  );
}
