import { REST } from "@discordjs/rest";
import {
    RESTPostAPIChannelMessageResult,
    Routes,
    APIEmbed,
} from "discord-api-types/v10";
import { TMockSchema } from "@/lib/schemas";
import { generatePDFUrl } from "./utils";
import { createShortUrl } from "./url-shortner";

export class DiscordClient {
    private rest: REST;
    constructor(token: string) {
        this.rest = new REST({ version: "10" }).setToken(token);
    }

    async sendEmbed(
        channelId: string,
        embed: APIEmbed,
        thread?: boolean
    ): Promise<RESTPostAPIChannelMessageResult> {
        return this.rest.post(Routes.channelMessages(channelId), {
            body: { embeds: [embed] },
        }) as Promise<RESTPostAPIChannelMessageResult>;
    }
    async sendMessage(
        channelId: string,
        content: string
    ): Promise<RESTPostAPIChannelMessageResult> {
        return this.rest.post(Routes.channelMessages(channelId), {
            body: { content },
        }) as Promise<RESTPostAPIChannelMessageResult>;
    }
}

export async function notifyMockGeneration(data: {
    subject: string;
    semester: string;
    branch: string;
    type: "midSem" | "endSem";
    maxMarks?: number;
    units: string[];
    mockData: TMockSchema;
}) {
    const botToken = process.env.DISCORD_BOT_TOKEN;
    const channelId = process.env.DISCORD_CHANNEL_ID;
    const baseUrl = process.env.NEXT_PUBLIC_URL;

    if (!botToken || !channelId || !baseUrl) {
        throw new Error("Discord configuration is incomplete.");
    }

    const discord = new DiscordClient(botToken);
    const fullPdfUrl = generatePDFUrl(data.mockData, baseUrl);

    const shortPdfUrl = await createShortUrl(fullPdfUrl);

    const mainEmbed: APIEmbed = {
        title: "📝 Mock Test Generated",
        description: `A new mock test has been generated for ${data.subject}\n\n[📥 Download PDF](${shortPdfUrl})`,
        color: 0x00ff00,
        fields: [
            {
                name: "Subject",
                value: data.subject,
                inline: true,
            },
            {
                name: "Semester",
                value: data.semester,
                inline: true,
            },
            {
                name: "Branch",
                value: data.branch,
                inline: true,
            },
            {
                name: "Exam Type",
                value: data.type === "midSem" ? "Mid Semester" : "End Semester",
                inline: true,
            },
            {
                name: "Max Marks",
                value: data.mockData.output.examMetadata.totalMarks.toString(),
                inline: true,
            },
            {
                name: "Duration",
                value: data.mockData.output.examMetadata.duration,
                inline: true,
            },
            {
                name: "Questions to Attempt",
                value: data.mockData.output.examMetadata.questionsToAttempt.toString(),
                inline: true,
            },
            {
                name: "Total Questions",
                value: data.mockData.output.examMetadata.totalQuestions.toString(),
                inline: true,
            },
            {
                name: "Units Covered",
                value:
                    data.units.length > 0 ? data.units.join(", ") : "All Units",
                inline: true,
            },
        ],
        timestamp: new Date().toISOString(),
        footer: {
            text: "Mock Test Generator",
        },
    };

    try {
        await discord.sendEmbed(channelId, mainEmbed);
        return true;
    } catch (error) {
        console.error("Failed to send Discord notification:", error);
        throw error;
    }
}
