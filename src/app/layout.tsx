import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'MemoryMaster - Brain Training App',
    description: 'Train your Brain and Memory with simple game.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): React.ReactElement {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>{children} </Providers>
            </body>
        </html>
    );
}
