import { NextResponse, NextRequest } from "next/server";
import { resolveShortUrl } from "@/lib/url-shortner";

export async function GET(
    request: NextRequest,
    { params }: { params: { shortId: string } }
) {
    try {
        const originalUrl = await resolveShortUrl(params.shortId);

        if (!originalUrl) {
            return NextResponse.redirect(new URL("/404", request.url));
        }

        const redirectUrl = originalUrl.startsWith("http")
            ? originalUrl
            : `https://${originalUrl}`;

        return NextResponse.redirect(new URL(redirectUrl));
    } catch (error) {
        console.error("Error processing short URL:", error);
        return NextResponse.redirect(new URL("/500", request.url));
    }
}
