"use client";

import Script from "next/script";

const AdUnit = () => {
    return (
        <>
            <div id="syllabusx_live_1000x100_anchor_responsive">
                <Script id="ad-component">
                    {`googletag.cmd.push(function() { 
                        googletag.display('syllabusx_live_1000x100_anchor_responsive'); 
                        stpd.initializeAdUnit('syllabusx_live_1000x100_anchor_responsive');
                    });`}
                </Script>
            </div>

            <Script id="on-demand-ad-placement">
                {`window.stpd = window.stpd || {que: []};
                stpd.que.push((function() {
                    stpd.refreshAdUnit('syllabusx_live_1000x100_anchor_responsive');
                }));`}
            </Script>
        </>
    );
};

export default AdUnit;
