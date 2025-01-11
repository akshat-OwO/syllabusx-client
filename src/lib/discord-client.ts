import { REST } from "@discordjs/rest";
import {
    RESTPostAPIChannelMessageResult,
    Routes,
    APIEmbed,
} from "discord-api-types/v10";

export class DiscordClient {
    private rest: REST;

    constructor(token: string) {
        this.rest = new REST({ version: "10" }).setToken(token);
    }

    async sendEmbed(
        channelId: string,
        embed: APIEmbed
    ): Promise<RESTPostAPIChannelMessageResult> {
        return this.rest.post(Routes.channelMessages(channelId), {
            body: { embeds: [embed] },
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
}) {
    const botToken = process.env.DISCORD_BOT_TOKEN;
    const channelId = process.env.DISCORD_CHANNEL_ID;

    if (!botToken || !channelId) {
        console.error(
            "Discord bot token or channel ID is missing from environment variables."
        );
        throw new Error("Discord configuration is incomplete.");
    }

    const discord = new DiscordClient(botToken);

    const embed: APIEmbed = {
        title: "📝 Mock Test Generated",
        description: `A new mock test has been generated for ${data.subject}`,
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
                value:
                    data.maxMarks?.toString() ||
                    (data.type === "midSem" ? "30" : "60"),
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
        await discord.sendEmbed(channelId, embed);
        return true;
    } catch (error) {
        console.error("Failed to send Discord notification:", error);
        throw error;
    }
}
