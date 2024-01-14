import { AuditLogEvent, User, type ClientEvents } from "discord.js";

export function userKick(...[auditLogEntry, guild]: ClientEvents["guildAuditLogEntryCreate"]){
    const { action, reason, executor, target } = auditLogEntry;
    
    if (action !== AuditLogEvent.MemberKick || !executor || !(target instanceof User)) return;

    guild.client.emit("userKick", target, executor, reason);
}