import { AuditLogEvent, type ClientEvents } from "discord.js";

export function extendedChannelDelete(...[auditLogEntry, guild]: ClientEvents["guildAuditLogEntryCreate"]){
    const { executorId, action, targetId } = auditLogEntry;
    if (action !== AuditLogEvent.ChannelDelete || !targetId) return;
    
    const executor = guild.members.cache.get(executorId ?? "");
    if (!executor) return;
    
    const deletedChannel = { id: targetId };

    guild.client.emit("extendedChannelDelete", deletedChannel, executor);
}