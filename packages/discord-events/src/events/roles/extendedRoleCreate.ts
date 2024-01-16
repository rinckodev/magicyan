import { AuditLogEvent, Role, type ClientEvents } from "discord.js";

export function extendedRoleCreate(...[auditLogEntry, guild]: ClientEvents["guildAuditLogEntryCreate"]){
    const { executorId, action, target } = auditLogEntry;
    if (action !== AuditLogEvent.RoleCreate || !(target instanceof Role)) return;    
    
    const executor = guild.members.cache.get(executorId ?? "");
    if (!executor) return;

    guild.client.emit("extendedRoleCreate", target, executor);
    
}