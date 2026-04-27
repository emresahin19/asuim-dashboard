import '@/styles/globals.scss';

import { cookies, headers } from 'next/headers';
import { Metadata } from 'next';
import RootLayout from '@/components/layout/root-layout/RootLayout';
import { getInitialTheme, readStoredTheme, THEME_STORAGE_KEY } from '@/context';
import { getThemeColorStyle } from '@/context/theme/theme.css-vars';
import { globalFontVariables } from './fonts';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata(): Promise<Metadata> {
    const headersList = await headers();
    const rawPathname = headersList.get('x-pathname') || '/';
    const normalizedPathname = rawPathname === '/' ? '/' : `/${rawPathname.replace(/^\/+|\/+$/g, '')}`;

    return {
        metadataBase: new URL(siteUrl),
        title: {
            default: 'AsUIm Dashboard',
            template: '%s | AsUIm Dashboard',
        },
        description: 'Performance-first dashboard template for component and design system documentation.',
        applicationName: 'AsUIm Dashboard',
        alternates: {
            canonical: normalizedPathname,
        },
        openGraph: {
            type: 'website',
            locale: 'tr_TR',
            url: `${siteUrl}${normalizedPathname}`,
            siteName: 'AsUIm Dashboard',
            title: 'AsUIm Dashboard',
            description: 'Performance-first dashboard template for component and design system documentation.',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'AsUIm Dashboard',
            description: 'Performance-first dashboard template for component and design system documentation.',
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const headersList = await headers();

  const viewport = (headersList.get('x-device-type') || 'desktop') as 'mobile' | 'desktop';

  const themeCookie = cookieStore.get(THEME_STORAGE_KEY)?.value;
  const storedTheme = readStoredTheme(themeCookie);
  const initialTheme = getInitialTheme(storedTheme);

  const initialSidebar = viewport === 'mobile' ? 'closed' : (initialTheme.sidebarState || 'open');
  initialTheme.sidebarState = initialSidebar;
  const initialThemeColors = getThemeColorStyle(initialTheme);

  return (
    <html
      lang="tr"
      data-theme={initialTheme.scheme}
      data-primary={initialTheme.primary}
      data-palette={initialTheme.palette}
      data-sidebar-state={initialSidebar}
      dir={initialTheme.direction}
      style={initialThemeColors}
    >
      <body className={globalFontVariables}>
        <RootLayout initialTheme={initialTheme}>
          {children}
        </RootLayout>
      </body>
    </html>
  );
}