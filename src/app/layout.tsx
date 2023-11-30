import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import Scripts from '@/components/Scripts';
import { cn, constructMetadata } from '@/lib/utils';
import { GeistSans } from 'geist/font/sans';
import Script from 'next/script';
import './globals.css';

export const metadata = constructMetadata();

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Scripts />
            <body
                className={cn(
                    'min-h-screen bg-gradient-to-br from-primary-foreground to-background dark:to-background',
                    GeistSans.className
                )}
            >
                <Providers>
                    <Navbar />
                    {children}
                    <Footer />
                </Providers>
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7334463510301650"
                    crossOrigin="anonymous"
                    strategy="beforeInteractive"
                />
            </body>
        </html>
    );
}
