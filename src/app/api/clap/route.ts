import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const name = url.searchParams.get("name");

    const RAW_IP = req.headers.get("X-Forwarded-For") || "127.0.0.1";

    if (!id || !name) {
        return NextResponse.json(
            { error: "Bad Request! Id or Name not found!" },
            { status: 400 }
        );
    }

    try {
        const clapCount = await redis.get(`clap:${id}:${name}`);
        const hasClapped = await redis.get(`clap:${id}:${name}:${RAW_IP}`);
        return NextResponse.json(
            { clapCount: clapCount || 0, hasClapped: !!hasClapped },
            { status: 200 }
        );
    } catch (error) {
        let message = error;
        if (error instanceof Error) {
            message = error.message;
        }
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { id, name } = await req.json();

    const RAW_IP = req.headers.get("X-Forwarded-For") || "127.0.0.1";

    if (!id || !name) {
        return NextResponse.json(
            { error: "Bad Request! Id or Name not found!" },
            { status: 400 }
        );
    }

    const hasClapped = await redis.get(`clap:${id}:${name}:${RAW_IP}`);
    if (hasClapped) {
        return NextResponse.json(
            { error: "You have already clapped for this file." },
            { status: 400 }
        );
    }

    try {
        await redis.incr(`clap:${id}:${name}`);
        await redis.set(`clap:${id}:${name}:${RAW_IP}`, "1");

        const clapCount = await redis.get(`clap:${id}:${name}`);

        return NextResponse.json({ clapCount }, { status: 200 });
    } catch (error) {
        let message = error;
        if (error instanceof Error) {
            message = error.message;
        }
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
