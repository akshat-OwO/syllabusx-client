import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import Scripts from '@/components/Scripts';
import { cn, constructMetadata } from '@/lib/utils';
import { GeistSans } from 'geist/font/sans';
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
            </body>
        </html>
    );
}
