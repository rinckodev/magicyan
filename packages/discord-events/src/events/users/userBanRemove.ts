import { AuditLogEvent, User, type ClientEvents } from "discord.js";

export function userBanRemove(...[auditLogEntry, guild]: ClientEvents["guildAuditLogEntryCreate"]){
    const { action, executor, target } = auditLogEntry;
    
    if (action !== AuditLogEvent.MemberBanRemove || !executor || !(target instanceof User)) return;

    guild.client.emit("userBanRemove", target, executor, guild);
}