import { AuditLogEvent, Role, RoleChanges, type ClientEvents } from "discord.js";

export function extendedRoleUpdate(...[auditLogEntry, guild]: ClientEvents["guildAuditLogEntryCreate"]){
    const { executorId, action, target, changes } = auditLogEntry;
    if (action !== AuditLogEvent.RoleUpdate || !(target instanceof Role)) return;    
    
    const executor = guild.members.cache.get(executorId ?? "");
    if (!executor) return;

    const roleChanges: RoleChanges = {};
    for(const change of changes){
        const newChange = change.new as unknown as any;
        const oldChange = change.old as unknown as any;
        roleChanges[change.key as keyof RoleChanges] = { new: newChange, old: oldChange }; 
    }

    guild.client.emit("extendedRoleUpdate", target, roleChanges, executor);
}