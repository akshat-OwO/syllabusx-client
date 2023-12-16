import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://syllabusx.live",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: "https://syllabusx.live/courses",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: "https://syllabusx.live/about-us",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: "https://syllabusx.live/contact-us",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: "https://syllabusx.live/changelog",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.4,
        },
        {
            url: "https://syllabusx.live/privacy-policy",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.2,
        },
        {
            url: "https://syllabusx.live/t&c",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.2,
        },
    ];
}
