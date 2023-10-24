import Providers from '@/components/Providers';
import Scripts from '@/components/Scripts';
import { constructMetadata } from '@/lib/utils';
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
            <body className="min-h-screen bg-gradient-to-br from-primary-foreground to-background dark:to-background">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
