import type { Message, Webhook, GuildMember, VoiceBasedChannel, User } from "discord.js";

export interface DiscordEvents {
    webhookMessageCreate: [message: Message<true>, webhook: Webhook],
    
    guildMemberConnect: [member: GuildMember, channel: VoiceBasedChannel],
    guildMemberDisconnect: [member: GuildMember, channel: VoiceBasedChannel],
    guildMemberMoved: [member: GuildMember, executor: GuildMember, oldChannel: VoiceBasedChannel, newChannel: VoiceBasedChannel]
    guildMemberTimeoutAdd: [member: GuildMember, executor: GuildMember, expireAt: Date, reason: string | null]
    guildMemberTimeoutRemove: [member: GuildMember, executor: GuildMember]

    userBanAdd: [user: User, executor: User, reason: string | null],
    userBanRemove: [user: User, executor: User]
    
    userKick: [user: User, executor: User, reason: string | null],

}

export type DiscordEventsList<T> = Record<keyof DiscordEvents, T>