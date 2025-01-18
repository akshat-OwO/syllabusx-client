import { nanoid } from "nanoid";
import { redis } from "./redis";

const URL_EXPIRATION = 60 * 60 * 24 * 30;

interface ShortenedURL {
    originalUrl: string;
    createdAt: number;
}

export async function createShortUrl(originalUrl: string): Promise<string> {
    const shortId = nanoid(8);
    const baseUrl = process.env.NEXT_PUBLIC_URL;

    const urlData: ShortenedURL = {
        originalUrl,
        createdAt: Date.now(),
    };

    await redis.setex(`url:${shortId}`, URL_EXPIRATION, urlData);

    return `${baseUrl}/api/short/${shortId}`;
}

export async function resolveShortUrl(shortId: string): Promise<string | null> {
    try {
        const data = await redis.get<ShortenedURL>(`url:${shortId}`);
        if (!data) return null;

        return data.originalUrl;
    } catch (error) {
        console.error("Error resolving short URL:", error);
        return null;
    }
}
