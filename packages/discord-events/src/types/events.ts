import type { Message, Webhook, GuildMember, VoiceBasedChannel } from "discord.js";

export interface DiscordEvents {
    webhookMessageCreate: [message: Message<true>, webhook: Webhook],
    
    guildMemberConnect: [member: GuildMember, channel: VoiceBasedChannel],
    guildMemberDisconnect: [member: GuildMember, channel: VoiceBasedChannel],
    guildMemberMoved: [member: GuildMember, executor: GuildMember, oldChannel: VoiceBasedChannel, newChannel: VoiceBasedChannel]
    guildMemberTimeoutAdd: [member: GuildMember, executor: GuildMember, expireAt: Date, reason: string | null]
    guildMemberTimeoutRemove: [member: GuildMember, executor: GuildMember]
}

export type DiscordEventsList<T> = Record<keyof DiscordEvents, T>