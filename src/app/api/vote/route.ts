import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1, "5s"),
    analytics: true,
});

const EXPIRATION_TIME_SECONDS = 30 * 24 * 60 * 60;

export async function GET(req: NextRequest) {
    return NextResponse.json(null, { status: 200 });
    // const url = new URL(req.url);
    // const id = url.searchParams.get("id");
    // const name = url.searchParams.get("name");

    // const RAW_IP = req.headers.get("X-Forwarded-For") || "127.0.0.1";

    // if (!id || !name) {
    //     return NextResponse.json(
    //         { error: "Bad Request! Id or Name not found!" },
    //         { status: 400 }
    //     );
    // }

    // try {
    //     const voteCount = await redis.get(`vote:${id}:${name}`);
    //     const hasVoted = await redis.get(`vote:${id}:${name}:${RAW_IP}`);
    //     return NextResponse.json(
    //         { voteCount: voteCount || 0, hasVoted: !!hasVoted },
    //         { status: 200 }
    //     );
    // } catch (error) {
    //     let message = error;
    //     if (error instanceof Error) {
    //         message = error.message;
    //     }
    //     return NextResponse.json({ error: message }, { status: 500 });
    // }
}

export async function POST(req: NextRequest) {
    return NextResponse.json(null, { status: 200 });
    // const { id, name } = await req.json();

    // const RAW_IP = req.headers.get("X-Forwarded-For") || "127.0.0.1";

    // if (!id || !name) {
    //     return NextResponse.json(
    //         { error: "Bad Request! Id or Name not found!" },
    //         { status: 400 }
    //     );
    // }

    // const hasVoted = await redis.get(`vote:${id}:${name}:${RAW_IP}`);
    // if (hasVoted) {
    //     return NextResponse.json(
    //         { error: "You have already voted for this file!" },
    //         { status: 400 }
    //     );
    // }

    // const { success, remaining } = await ratelimit.limit(RAW_IP);

    // if (!success) {
    //     return NextResponse.json(
    //         {
    //             error: `Please wait ${remaining}s to vote again!`,
    //         },
    //         { status: 429 }
    //     );
    // }

    // try {
    //     const p = redis.pipeline();

    //     p.incr(`vote:${id}:${name}`);
    //     p.expire(`vote:${id}:${name}`, EXPIRATION_TIME_SECONDS);
    //     p.set(`vote:${id}:${name}:${RAW_IP}`, "1");
    //     p.expire(`vote:${id}:${name}:${RAW_IP}`, EXPIRATION_TIME_SECONDS);

    //     await p.exec();

    //     const voteCount = await redis.get(`vote:${id}:${name}`);

    //     return NextResponse.json({ voteCount }, { status: 200 });
    // } catch (error) {
    //     let message = error;
    //     if (error instanceof Error) {
    //         message = error.message;
    //     }
    //     return NextResponse.json({ error: message }, { status: 500 });
    // }
}
