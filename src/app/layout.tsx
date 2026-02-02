import '@/styles/globals.scss';

import { ThemeProvider } from '@/context/theme/ThemeContext'

export const metadata = {
    title: 'AsUIm Dashboard',
    description: 'Performance-first dashboard template',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
