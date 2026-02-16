import '@/styles/globals.scss';

import { cookies, headers } from 'next/headers';
import RootLayout from '@/components/layout/root-layout/RootLayout';
import { getInitialTheme, readStoredTheme, THEME_STORAGE_KEY } from '@/context';

export const metadata = {
  title: 'AsUIm Dashboard',
  description: 'Performance-first dashboard template',
};

export default async function Layout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const headersList = await headers();
    
    const viewport = (headersList.get('x-device-type') || 'desktop') as 'mobile' | 'desktop';
    
    const themeCookie = cookieStore.get(THEME_STORAGE_KEY)?.value;
    const storedTheme = readStoredTheme(themeCookie);
    const initialTheme = getInitialTheme(storedTheme);

    const initialSidebar = viewport === 'mobile' ? 'closed' : (initialTheme.sidebarState || 'open');

    return (
        <html 
            lang="tr"
            data-theme={initialTheme.scheme}
            data-primary={initialTheme.primary}
            data-palette={initialTheme.palette}
            data-sidebar-state={initialSidebar}
            dir={initialTheme.direction}
        >
            <body>
                <RootLayout initialTheme={initialTheme}>
                    {children}
                </RootLayout>
            </body>
        </html>
    );
}