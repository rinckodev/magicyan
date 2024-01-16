import { AuditLogEvent, type ClientEvents } from "discord.js";

export function extendedRoleDelete(...[auditLogEntry, guild]: ClientEvents["guildAuditLogEntryCreate"]){
    const { executorId, action, targetId } = auditLogEntry;
    if (action !== AuditLogEvent.RoleDelete || !targetId) return;    
    
    const executor = guild.members.cache.get(executorId ?? "");
    if (!executor) return;

    guild.client.emit("extendedRoleDelete", { id: targetId }, executor);
}