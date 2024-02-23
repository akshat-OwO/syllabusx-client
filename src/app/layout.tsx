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
                <Script
                    async
                    src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
                />
                <Script id="setupad-id">
                    {`stpd = window.stpd || {que: []};
                    window.googletag = window.googletag || {};
                    googletag.cmd = googletag.cmd || [];
                    googletag.cmd.push (function () {
                        if (window.innerWidth >= 1024) {
                            googletag.defineSlot('/147246189,23074770258/syllabusx.live_1000x100_anchor_desktop', [[1000,100],[970,90],[990,90],[970,50],[960,90],[950,90],[980,90]], 'syllabusx_live_1000x100_anchor_responsive').addService(googletag.pubads());
                        } else {
                            googletag.defineSlot('/147246189,23074770258/syllabusx.live_320x100_anchor_mobile', [[320,100],[300,100],[320,50],[300,50]], 'syllabusx_live_1000x100_anchor_responsive').addService(googletag.pubads());
                        }
                
                        var interstitialSlot = googletag.defineOutOfPageSlot('/147246189,23074770258/syllabusx.live_interstitial', googletag.enums.OutOfPageFormat.INTERSTITIAL);
                        if (interstitialSlot) interstitialSlot.addService(googletag.pubads());
                        
                        googletag.pubads().disableInitialLoad();
                        googletag.pubads().enableSingleRequest();
                        googletag.pubads().collapseEmptyDivs();
                        googletag.pubads().setTargeting('category', 'education').setTargeting('audience_interest', 'education');
                        googletag.enableServices();
                        googletag.display(interstitialSlot);
                
                        window.stpd = window.stpd || {que: []};
                        stpd.que.push((function() {
                              stpd.initialize();
                        }));
                    });`}
                </Script>
                <Script async src="https://stpd.cloud/saas/6965" />
                <div id="syllabusx_live_1000x100_anchor_responsive">
                    <Script id="ad-component">
                        {`googletag.cmd.push(function() { 
                            googletag.display('syllabusx_live_1000x100_anchor_responsive'); 
                            stpd.initializeAdUnit('syllabusx_live_1000x100_anchor_responsive');
                        });`}
                    </Script>
                </div>
            </body>
        </html>
    );
}
