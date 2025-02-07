import { AuditLogEvent, ClientEvents, GuildMember } from "discord.js";

export type GuildMemberTimeoutRemoveEvent = [member: GuildMember, executor: GuildMember];

export function guildMemberTimeoutRemove([auditLogEntry, guild]: ClientEvents["guildAuditLogEntryCreate"]){
    const { action, changes, targetType, targetId, executorId } = auditLogEntry;

    if (changes?.[0]?.key !== "communication_disabled_until") return;
    if (action !== AuditLogEvent.MemberUpdate) return;
    if (typeof changes?.[0]?.old !== "string") return;
    if (typeof changes?.[0]?.new !== "undefined") return;
    if (targetType !== "User") return;
    if (!executorId || !targetId) return;
    
    const member = guild.members.cache.get(targetId);
    const executor = guild.members.cache.get(executorId);

    if (!member || !executor) return;
    guild.client.emit("guildMemberTimeoutRemove", member, executor);
}

