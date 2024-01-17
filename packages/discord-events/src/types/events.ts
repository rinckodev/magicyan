import type { Message, Webhook, GuildMember, VoiceBasedChannel, User, Guild, Role } from "discord.js";
import { DeletedChannel, DeletedRole, RoleChanges } from "./utils";

export interface DiscordEvents {
    webhookMessageCreate: [message: Message<true>, webhook: Webhook],
    
    guildMemberConnect: [member: GuildMember, channel: VoiceBasedChannel],
    guildMemberDisconnect: [member: GuildMember, channel: VoiceBasedChannel],
    guildMemberMoved: [member: GuildMember, executor: GuildMember, oldChannel: VoiceBasedChannel, newChannel: VoiceBasedChannel]
    guildMemberTimeoutAdd: [member: GuildMember, executor: GuildMember, expireAt: Date, reason: string | null]
    guildMemberTimeoutRemove: [member: GuildMember, executor: GuildMember]

    userBanAdd: [user: User, executor: User, reason: string | null, guild: Guild],
    userBanRemove: [user: User, executor: User, guild: Guild],
    
    userKick: [user: User, executor: User, reason: string | null, guild: Guild],

    extendedRoleCreate: [role: Role, executor: GuildMember];
    extendedRoleUpdate: [role: Role, changes: RoleChanges, executor: GuildMember];
    extendedRoleDelete: [role: DeletedRole, executor: GuildMember];
    
    extendedChannelDelete: [channel: DeletedChannel, executor: GuildMember];

}

export type DiscordEventsList<T> = Record<keyof DiscordEvents, T>