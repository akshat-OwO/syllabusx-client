import EmailTemplate, { EmailAdminTemplate } from "@/components/EmailTemplate";
import { FeedbackSchema, TFeedbackSchema } from "@/lib/schemas";
import { Ratelimit } from "@upstash/ratelimit";
import { Resend } from "resend";
import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";
import { getRemainingTime } from "@/lib/utils";
import { DiscordClient } from "@/lib/discord-client";
import { APIEmbed } from "discord-api-types/v10";

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
        await notifyFeedbackReceived(validatedFormFields);

        const data = await Promise.all([
            // resend.emails.send({
            //     from: "SyllabusX <mail@syllabusx.live>",
            //     to: ["iboard990@gmail.com"],
            //     subject: "New response has arrived",
            //     react: EmailAdminTemplate(
            //         validatedFormFields
            //     ) as React.ReactElement,
            // }),
            resend.emails.send({
                from: "SyllabusX <support@syllabusx.live>",
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

async function notifyFeedbackReceived(feedback: TFeedbackSchema) {
    const botToken = process.env.DISCORD_BOT_TOKEN;
    const channelId = process.env.DISCORD_CHANNEL_ID;

    if (!botToken || !channelId) {
        throw new Error("Discord configuration is incomplete.");
    }

    const discord = new DiscordClient(botToken);

    const feedbackEmbed: APIEmbed = {
        title: "📝 New Feedback/Query Received",
        description: feedback.query,
        color: 0x3498db,
        fields: [
            {
                name: "Name",
                value: feedback.name,
                inline: true,
            },
            {
                name: "Email",
                value: feedback.email,
                inline: true,
            },
            {
                name: "Course",
                value: feedback.course,
                inline: true,
            },
            {
                name: "College",
                value: feedback.college,
                inline: true,
            },
            {
                name: "Semester",
                value: feedback.semester,
                inline: true,
            },
            {
                name: "Branch",
                value: feedback.branch,
                inline: true,
            },
            {
                name: "Received At",
                value: new Date().toISOString(),
                inline: false,
            },
        ],
        timestamp: new Date().toISOString(),
        footer: {
            text: "SyllabusX Feedback System",
        },
    };

    try {
        await discord.sendEmbed(channelId, feedbackEmbed);
        return true;
    } catch (error) {
        console.error("Failed to send Discord notification:", error);
        throw error;
    }
}
