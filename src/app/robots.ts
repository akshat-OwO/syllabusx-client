import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
            },
            {
                userAgent: 'Googlebot',
            },
            {
                userAgent: 'Mediapartners-Google',
            },
            {
                userAgent: 'Adsbot-Google',
            },
        ],
        sitemap: 'https://syllabusx-git-dev-akshatowo.vercel.app/sitemap.xml',
    };
}
