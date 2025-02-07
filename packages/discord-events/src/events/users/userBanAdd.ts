import { AuditLogEvent, type ClientEvents, type Guild, type GuildMember, type User } from "discord.js";

export type UserBanAddEvent = [user: User, executor: GuildMember, reason: string | null, guild: Guild];

export function userBanAdd([auditLogEntry, guild]: ClientEvents["guildAuditLogEntryCreate"]){
    const { action, executorId, reason, target, targetType } = auditLogEntry;

    if (action !== AuditLogEvent.MemberBanAdd) return;
    if (targetType !== "User") return;
    if (!executorId) return;
    
    const executor = guild.members.cache.get(executorId);
    if (!executor) return;

    guild.client.emit("userBanAdd", target as User, executor, reason, guild);
}