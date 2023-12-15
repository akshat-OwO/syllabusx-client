import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import Scripts from "@/components/Scripts";
import { constructMetadata } from "@/lib/utils";
import { GeistSans } from "geist/font/sans";
import "public/theme.css";
import "./globals.css";

export const metadata = constructMetadata();

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Scripts />
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
