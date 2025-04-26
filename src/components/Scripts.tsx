"use client";

import Script from "next/script";

const Scripts = () => {
    return (
        <>
            <Script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-CPHDPDZJXM"
            />
            <Script id="google-analytics">
                {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-CPHDPDZJXM');`}
            </Script>
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
            <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7334463510301650"
                crossOrigin="anonymous"
                strategy="lazyOnload"
            />
        </>
    );
};

export default Scripts;
