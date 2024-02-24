import { AuditLogEvent, ClientEvents, User } from "discord.js";

export function guildMemberTimeoutRemove(...[auditLogEntry, guild]: ClientEvents["guildAuditLogEntryCreate"]){
    const { action, changes, target, executor: auditExecutor } = auditLogEntry;

    if (changes?.[0]?.key !== "communication_disabled_until") return;
    if (action !== AuditLogEvent.MemberUpdate) return;
    if (typeof changes?.[0]?.old !== "string") return;
    if (typeof changes?.[0]?.new !== "undefined") return;
    if (!(target instanceof User)) return;
    if (!auditExecutor) return;
    
    const member = guild.members.cache.get(target.id);
    const executor = guild.members.cache.get(auditExecutor.id);

    if (!member || !executor) return;
    guild.client.emit("guildMemberTimeoutRemove", member, executor);
}

