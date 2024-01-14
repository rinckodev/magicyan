import { AuditLogEvent, User, type ClientEvents } from "discord.js";

export function userBanAdd(...[auditLogEntry, guild]: ClientEvents["guildAuditLogEntryCreate"]){
    const { action, reason, executor, target } = auditLogEntry;
    
    if (action !== AuditLogEvent.MemberBanAdd || !executor || !(target instanceof User)) return;

    guild.client.emit("userBanAdd", target, executor, reason, guild);
}

