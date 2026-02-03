"use client";
import { ThemeProvider } from '@/context/theme/ThemeContext'
import { resolveBreadcrumbs, resolveRouteByPathname } from '@/utils/route-resolver';
import { usePathname } from 'next/navigation';
import { RouteProvider } from '@/context/route/RouteContext';

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
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </RouteProvider>
    );
}
