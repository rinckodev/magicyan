import { AuditLogEvent, Role, type ClientEvents } from "discord.js";
import { RoleChanges } from "../../types/utils";

export function extendedRoleUpdate(...[auditLogEntry, guild]: ClientEvents["guildAuditLogEntryCreate"]){
    const { executorId, action, target, changes } = auditLogEntry;
    if (action !== AuditLogEvent.RoleUpdate || !(target instanceof Role)) return;    
    
    const executor = guild.members.cache.get(executorId ?? "");
    if (!executor) return;

    const changeList = Object.values(changes).map(
        ({ key, new: newChange, old, }) => 
        ({ [key]: { new: newChange, old }})
    );

    const roleChanges = changeList.reduce(
        (prev, current) => ({ ...prev, ...current })
    ) as RoleChanges;

    guild.client.emit("extendedRoleUpdate", target, roleChanges, executor);
}