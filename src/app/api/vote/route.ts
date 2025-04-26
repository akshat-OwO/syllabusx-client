import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1, "5s"),
    analytics: true,
});

const EXPIRATION_TIME_SECONDS = 30 * 24 * 60 * 60;

type File = {
    id: string;
    name: string;
};

type VoteCount = {
    id: string;
    name: string;
    voteCount: number;
    hasVoted: boolean;
};

export async function POST(req: NextRequest) {
    const url = new URL(req.url);
    const action = url.searchParams.get("action");
    const RAW_IP = req.headers.get("X-Forwarded-For") || "127.0.0.1";
    const userAgent = req.headers.get("User-Agent") || "";
    const fingerprint = `${RAW_IP}:${userAgent}`;

    if (action === "getVotes") {
        return handleGetVotes(req, fingerprint);
    } else {
        return handleVote(req, fingerprint);
    }
}

async function handleGetVotes(req: NextRequest, fingerprint: string) {
    let files: File[];
    try {
        files = await req.json();
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Bad Request! Invalid JSON in request body." },
            { status: 400 }
        );
    }

    if (!Array.isArray(files) || files.length === 0) {
        return NextResponse.json(
            { error: "Bad Request! Files data is not a valid array." },
            { status: 400 }
        );
    }

    try {
        const voteKeys = files.map(({ id, name }) => `vote:${id}:${name}`);
        const voteFingerprintKeys = files.map(
            ({ id, name }) => `vote:${id}:${name}:${fingerprint}`
        );

        const results = await redis.mget(...voteKeys, ...voteFingerprintKeys);

        const voteCounts: VoteCount[] = files.map((file, index) => {
            const voteCountResult = results[index];
            const hasVotedResult = results[index + files.length];

            let voteCount = 0;
            let hasVoted = false;

            if (
                typeof voteCountResult === "number" &&
                voteCountResult !== null
            ) {
                voteCount = voteCountResult;
            }

            if (typeof hasVotedResult === "number" && hasVotedResult !== null) {
                hasVoted = true;
            }

            return {
                id: file.id,
                name: file.name,
                voteCount,
                hasVoted,
            };
        });

        return NextResponse.json(voteCounts, { status: 200 });
    } catch (error) {
        console.error("Error in handleGetVotes:", error);
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

async function handleVote(req: NextRequest, fingerprint: string) {
    const { id, name } = await req.json();

    if (!id || !name) {
        return NextResponse.json(
            { error: "Bad Request! Id or Name not found!" },
            { status: 400 }
        );
    }

    const hasVoted = await redis.get(`vote:${id}:${name}:${fingerprint}`);
    if (hasVoted) {
        return NextResponse.json(
            { error: "You have already voted for this file!" },
            { status: 400 }
        );
    }

    const { success, reset } = await ratelimit.limit(fingerprint);
    if (!success) {
        return NextResponse.json(
            {
                error: `Please wait ${reset} to vote again!`,
            },
            { status: 429 }
        );
    }

    try {
        const p = redis.pipeline();

        p.incr(`vote:${id}:${name}`);
        p.expire(`vote:${id}:${name}`, EXPIRATION_TIME_SECONDS);
        p.set(`vote:${id}:${name}:${fingerprint}`, "1");
        p.expire(`vote:${id}:${name}:${fingerprint}`, EXPIRATION_TIME_SECONDS);

        await p.exec();

        const voteCount = await redis.get(`vote:${id}:${name}`);

        return NextResponse.json({ voteCount }, { status: 200 });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
