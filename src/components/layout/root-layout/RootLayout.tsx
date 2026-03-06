import { AppLayout } from '../app-layout';

import { ThemeProvider, BreakpointProvider, ToasterProvider } from '@/context'
import { ThemeSettings } from '@/components/features/theme-settings';
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
        <ToasterProvider>
          <AppLayout initialOpenGroups={openGroupsArray}>
            {children}
            <ThemeSettings />
          </AppLayout>
        </ToasterProvider>
      </ThemeProvider>
    </BreakpointProvider>
  );
}
