import { redirect } from "next/navigation";
import { resolveShortUrl } from "@/lib/url-shortner";

interface PageProps {
    params: {
        shortId: string;
    };
}

export default async function ShortUrlRedirect({ params }: PageProps) {
    try {
        const originalUrl = await resolveShortUrl(params.shortId);
        if (!originalUrl) {
            console.log("No URL found, redirecting to 404");
            redirect("/404");
        }
        redirect(originalUrl);
    } catch (error) {
        console.error("Error in redirect page:", error);
        throw error;
    }
}
