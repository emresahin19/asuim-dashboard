import { AppLayout } from '../app-layout';

import { ThemeProvider, BreakpointProvider, ToasterProvider } from '@/context'
import { ModalProvider } from '@/context/modal/ModalProvider'
import { ThemeSettings } from '@/components/features/theme-settings';
import { ThemeState } from '@/types/theme.types';

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
        <ModalProvider>
          <ToasterProvider>
            <AppLayout initialOpenGroups={openGroupsArray}>
              {children}
              <ThemeSettings />
            </AppLayout>
          </ToasterProvider>
        </ModalProvider>
      </ThemeProvider>
    </BreakpointProvider>
  );
}
