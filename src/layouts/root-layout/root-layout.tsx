"use client";
import { ThemeProvider } from '@/context/theme/ThemeContext'
import { resolveBreadcrumbs, resolveRouteByPathname } from '@/utils/route-resolver';
import { usePathname } from 'next/navigation';
import { RouteProvider } from '@/context/route/RouteContext';
import { AppLayout } from '../app-layout';
import { BreakpointProvider } from '@/context/breakpoint/Provider';
import { ThemeSettings } from '@/components/ui/theme-settings/theme-settings';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const route = resolveRouteByPathname(pathname);
    const breadcrumbs = resolveBreadcrumbs(pathname);

    return (
        <RouteProvider
            value={{
                title: route?.title,
                breadcrumbs,
            }}
        >
            <BreakpointProvider>
                <ThemeProvider>
                    <AppLayout>
                        {children}
                        <ThemeSettings />
                    </AppLayout>
                </ThemeProvider>
            </BreakpointProvider>
        </RouteProvider>
    );
}
