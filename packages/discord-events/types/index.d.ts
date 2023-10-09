import { Client } from "discord.js";
export * from "./discordjs";
interface DiscordEventsOptions {
    /**
     * The associated discord.js client.
     * @type {Client}
     */
    client: Client;
    events?: {
        /**
         * This event will be triggered when a webhook message is created.
         * @default false
         */
        webhookMessageCreate?: boolean;
        /**
         * This event is triggered when a member joins a voice channel in a guild.
         * @default true
         */
        guildMemberVoiceChannelJoin?: boolean;
        /**
         * This event is triggered when a member leaves a voice channel in a guild.
         * @default true
         */
        guildMemberVoiceChannelLeave?: boolean;
        /**
         * This event is triggered when a member is moved from one voice channel to another.
         * @default false
         */
        guildMemberVoiceChannelMove?: boolean;
    };
}
export declare function discordEvents(options: DiscordEventsOptions): void;
