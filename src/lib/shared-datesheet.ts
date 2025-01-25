"use server";

import { nanoid } from "nanoid";
import { redis } from "./redis";
import { ratelimit } from "./rate-limit";
import { headers } from "next/headers";

const DATESHEET_EXPIRATION = 60 * 60 * 24;

export interface SharedDatesheet {
    title: string;
    authorName: string;
    dates: Array<{ name: string; date: number }>;
    createdAt: number;
}

export async function createSharedDatesheet(
    data: Omit<SharedDatesheet, "createdAt">
): Promise<string> {
    const headersList = headers();
    const ip = headersList.get("X-Forwarded-For") || "127.0.0.1";
    const userAgent = headersList.get("User-Agent") || "";
    const fingerprint = `${ip}:${userAgent}`;

    const { success, reset } = await ratelimit.limit(fingerprint);

    if (!success) {
        throw new Error(
            `You can only create one shared datesheet per 24 hours. Please try again after ${new Date(
                reset
            ).toLocaleTimeString()}.`
        );
    }

    const shareId = nanoid(8);
    const baseUrl = process.env.NEXT_PUBLIC_URL;

    const shareData: SharedDatesheet = {
        ...data,
        createdAt: Date.now(),
    };

    await redis.setex(`datesheet:${shareId}`, DATESHEET_EXPIRATION, shareData);
    return `${baseUrl}shared-datesheets/${shareId}`;
}

export async function getSharedDatesheet(
    shareId: string
): Promise<SharedDatesheet | null> {
    try {
        const data = await redis.get<SharedDatesheet>(`datesheet:${shareId}`);
        if (!data) return null;

        await redis.setex(`datesheet:${shareId}`, DATESHEET_EXPIRATION, data);

        return data;
    } catch (error) {
        console.error("Error getting shared datesheet:", error);
        return null;
    }
}

export async function getAllSharedDatesheets(): Promise<
    Array<SharedDatesheet & { id: string }>
> {
    try {
        const keys = await redis.keys("datesheet:*");
        const datesheets = await Promise.all(
            keys.map(async (key) => {
                const data = await redis.get<SharedDatesheet>(key);
                if (!data) return null;

                return {
                    ...data,
                    id: key.replace("datesheet:", ""),
                };
            })
        );

        return datesheets.filter(
            (d): d is SharedDatesheet & { id: string } => d !== null
        );
    } catch (error) {
        console.error("Error getting all shared datesheets:", error);
        return [];
    }
}
