import '@/styles/globals.scss';

import RootLayout from '@/layouts/root-layout/root-layout';

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
