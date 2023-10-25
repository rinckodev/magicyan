import { ChannelType, Client } from "discord.js";
import { guildMemberVoiceChannelMove } from "./events/guildMemberVoiceChannelMove";
import { webhookMessageCreate } from "./events/webhookMessageCreate";
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
    }
}
export function discordEvents(options: DiscordEventsOptions){
    const { client, events } = options;

    // Message create events
    if (
        (events?.webhookMessageCreate ?? false)
    ){
        client.on("messageCreate", async message => {
            if (events?.webhookMessageCreate ?? false){
                webhookMessageCreate(client, message);
            }
        });
    }

    // Voice State Update Events
    if (
        (events?.guildMemberVoiceChannelJoin ?? true) ||
        (events?.guildMemberVoiceChannelLeave ?? true)
    ){
        client.on("voiceStateUpdate", async (oldSate, newState) => {
            if (
                (events?.guildMemberVoiceChannelJoin ?? true) &&
                newState.member && newState.channel?.type === ChannelType.GuildVoice
            ){
                client.emit("guildMemberVoiceChannelJoin", newState.member, newState.channel);
            }

            if (
                (events?.guildMemberVoiceChannelLeave ?? true) &&
                newState.member && oldSate.channel?.type === ChannelType.GuildVoice
            ){
                client.emit("guildMemberVoiceChannelLeave", newState.member, oldSate.channel);
            }
            if (
                (events?.guildMemberVoiceChannelMove ?? false) &&
                oldSate.channel && newState.channel
            ){
                guildMemberVoiceChannelMove(client, oldSate, newState);
            }
        });
    }
}