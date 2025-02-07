import { AuditLogEvent, ClientEvents, GuildMember, User } from "discord.js";

export type GuildMemberTimeoutAddEvent = [member: GuildMember, executor: GuildMember, expireAt: Date, reason: string | null];

export function guildMemberTimeoutAdd([auditLogEntry, guild]: ClientEvents["guildAuditLogEntryCreate"]){
    const { action, changes, target, targetType, executorId, reason } = auditLogEntry;

    if (changes?.[0]?.key !== "communication_disabled_until") return;
    if (action !== AuditLogEvent.MemberUpdate) return;
    if (typeof changes?.[0]?.new !== "string") return;
    if (targetType !== "User") return;
    if (!executorId) return;
    
    const member = guild.members.cache.get((target as User).id);
    const executor = guild.members.cache.get(executorId);
    const expireAt = new Date(changes?.[0]?.new);

    if (!member || !executor) return;
    guild.client.emit("guildMemberTimeoutAdd", member, executor, expireAt, reason);
}