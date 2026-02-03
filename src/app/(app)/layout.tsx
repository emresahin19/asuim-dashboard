import { AppLayout } from '@/layouts/app-layout';
import { ThemeSettings } from '@/components/ui/theme-settings/theme-settings';
import { BreakpointProvider } from '@/context/breakpoint/Provider';

export default function AppSegmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BreakpointProvider>
      <AppLayout>
        {children}
        <ThemeSettings />
      </AppLayout>
    </BreakpointProvider>
  );
}
