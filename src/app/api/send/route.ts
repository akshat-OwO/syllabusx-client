import EmailTemplate, { EmailAdminTemplate } from "@/components/EmailTemplate";
import { FeedbackSchema, TFeedbackSchema } from "@/lib/schemas";
import { Ratelimit } from "@upstash/ratelimit";
import { Resend } from "resend";
import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";
import { getRemainingTime } from "@/lib/utils";

declare global {
    var resend: Resend;
}

if (process.env.RESEND_API_KEY) {
    global.resend = new Resend(process.env.RESEND_API_KEY);
} else {
    console.log("Missing Resend API Key");
}

const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1, "1h"),
    analytics: true,
});

export async function POST(req: Request) {
    const url = new URL(req.url);
    const action = url.searchParams.get("action");
    const RAW_IP = req.headers.get("X-Forwarded-For") || "127.0.0.1";
    const userAgent = req.headers.get("User-Agent") || "";
    const fingerprint = `${RAW_IP}:${userAgent}`;

    const { values } = await req.json();

    const { success, reset } = await ratelimit.limit(fingerprint);
    if (!success) {
        return NextResponse.json(
            {
                error: `Please wait ${getRemainingTime(reset)} to give feedback again!`,
            },
            { status: 429 }
        );
    }

    if (!FeedbackSchema.safeParse(values).success)
        return Response.json({ error: "Invalid fields" }, { status: 401 });

    const validatedFormFields = values as TFeedbackSchema;

    try {
        const data = await Promise.all([
            resend.emails.send({
                from: "SyllabusX <mail@syllabusx.live>",
                to: ["iboard990@gmail.com"],
                subject: "New response has arrived",
                react: EmailAdminTemplate(
                    validatedFormFields
                ) as React.ReactElement,
            }),
            resend.emails.send({
                from: "SyllabusX <mail@syllabusx.live>",
                to: [validatedFormFields.email],
                subject: "Thanks for the feedback",
                react: EmailTemplate({
                    name: validatedFormFields.name,
                }) as React.ReactElement,
            }),
        ]);
        return Response.json(data);
    } catch (error) {
        return Response.json({ error });
    }
}
