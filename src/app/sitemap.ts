import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://syllabusx-git-dev-akshatowo.vercel.app',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://syllabusx-git-dev-akshatowo.vercel.app/courses',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://syllabusx-git-dev-akshatowo.vercel.app/about-us',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: 'https://syllabusx-git-dev-akshatowo.vercel.app/contact-us',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: 'https://syllabusx-git-dev-akshatowo.vercel.app/changelog',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.4,
        },
        {
            url: 'https://syllabusx-git-dev-akshatowo.vercel.app/privacy-policy',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.2,
        },
        {
            url: 'https://syllabusx-git-dev-akshatowo.vercel.app/t&c',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.2,
        },
    ];
}
