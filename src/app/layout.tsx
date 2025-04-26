import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Scripts from "@/components/Scripts";
import Providers from "@/components/providers/providers";
import { constructMetadata } from "@/lib/utils";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata = constructMetadata();

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            {process.env.NODE_ENV === "production" && <Scripts />}
            <body className={GeistSans.className}>
                <Providers>
                    <div className="min-h-screen bg-background">
                        <Navbar />
                        {children}
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
