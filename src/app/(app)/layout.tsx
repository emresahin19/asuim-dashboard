import { AppLayout } from '@/layouts/app-layout';
import { ThemeSettings } from '@/components/ui/theme-settings/theme-settings';

export default function AppSegmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout>
      {children}
      <ThemeSettings />
    </AppLayout>
  );
}
