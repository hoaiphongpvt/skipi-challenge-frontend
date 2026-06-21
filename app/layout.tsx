import type { Metadata } from 'next';
import Provider from '@/app/provider';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
    title: 'Classroom Management',
    description: 'Skipli Challenge',
};

export default function RootLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body style={{ height: '100vh' }}>
                <Toaster richColors position="top-right" />
                <Provider>
                    {children}
                    {modal}
                </Provider>
            </body>
        </html>
    );
}
