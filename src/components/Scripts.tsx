'use client';

import Script from 'next/script';
import { FC } from 'react';

interface ScriptsProps {}

const Scripts: FC<ScriptsProps> = ({}) => {
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
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7334463510301650"
                crossOrigin="anonymous"
            />
        </>
    );
};

export default Scripts;
