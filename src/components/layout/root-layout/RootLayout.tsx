import { ThemeProvider, BreakpointProvider, ToasterProvider } from '@/context'
import { ModalProvider } from '@/context/modal/ModalProvider'
import { NavigationProgress } from '@/components/layout/navigation-progress'
import { ThemeState } from '@/types/theme.types';
import { ThemeSettings } from '@/components/features';

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
        <ModalProvider>
          <ToasterProvider>
            <NavigationProgress />
            {children}
            <ThemeSettings />
          </ToasterProvider>
        </ModalProvider>
      </ThemeProvider>
    </BreakpointProvider>
  );
}
