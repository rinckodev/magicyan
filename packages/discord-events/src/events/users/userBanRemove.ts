import { AuditLogEvent, type ClientEvents, type Guild, type GuildMember, type User } from "discord.js";

export type UserBanRemoveEvent = [user: User, executor: GuildMember, guild: Guild];

export function userBanRemove([auditLogEntry, guild]: ClientEvents["guildAuditLogEntryCreate"]){
    const { action, executorId, target, targetType } = auditLogEntry;

    if (action !== AuditLogEvent.MemberBanRemove) return;
    if (targetType !== "User") return;
    if (!executorId) return;
    
    const executor = guild.members.cache.get(executorId);
    if (!executor) return;

    guild.client.emit("userBanRemove", target as User, executor, guild);
}