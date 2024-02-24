import { AuditLogEvent, ClientEvents, User } from "discord.js";

export function guildMemberTimeoutAdd(...[auditLogEntry, guild]: ClientEvents["guildAuditLogEntryCreate"]){
    const { action, changes, target, executor: auditExecutor, reason } = auditLogEntry;

    if (changes?.[0]?.key !== "communication_disabled_until") return;
    if (action !== AuditLogEvent.MemberUpdate) return;
    if (typeof changes?.[0]?.new !== "string") return;
    if (!(target instanceof User)) return;
    if (!auditExecutor) return;
    
    const member = guild.members.cache.get(target.id);
    const executor = guild.members.cache.get(auditExecutor.id);
    const expireAt = new Date(changes?.[0]?.new);

    if (!member || !executor) return;
    guild.client.emit("guildMemberTimeoutAdd", member, executor, expireAt, reason);
}

