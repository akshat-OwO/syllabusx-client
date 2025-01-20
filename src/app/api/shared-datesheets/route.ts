import { NextResponse } from "next/server";
import { createSharedDatesheet } from "@/lib/shared-datesheet";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, authorName, dates } = body;

        if (!title || !authorName || !dates) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const shareUrl = await createSharedDatesheet({
            title,
            authorName,
            dates,
        });
        return NextResponse.json({ url: shareUrl });
    } catch (error) {
        console.error("Error creating shared datesheet:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
