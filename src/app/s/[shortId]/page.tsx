import { redirect } from "next/navigation";
import { resolveShortUrl } from "@/lib/url-shortner";

interface PageProps {
    params: {
        shortId: string;
    };
}

export default async function ShortUrlRedirect({ params }: PageProps) {
    const originalUrl = await resolveShortUrl(params.shortId);

    if (!originalUrl) {
        redirect("/404");
    }

    redirect(originalUrl);
}
