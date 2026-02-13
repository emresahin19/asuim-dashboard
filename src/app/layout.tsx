import '@/styles/globals.scss';

import RootLayout from '@/components/layout/root-layout/RootLayout';

export const metadata = {
    title: 'AsUIm Dashboard',
    description: 'Performance-first dashboard template',
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <RootLayout>
                    {children}
                </RootLayout>
            </body>
        </html>
    );
}
