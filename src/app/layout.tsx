import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Scripts from "@/components/Scripts";
import Providers from "@/components/providers/providers";
import { constructMetadata } from "@/lib/utils";
import { GeistSans } from "geist/font/sans";
import Script from "next/script";
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
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7334463510301650"
                    crossOrigin="anonymous"
                    strategy="lazyOnload"
                />
            </body>
        </html>
    );
}
