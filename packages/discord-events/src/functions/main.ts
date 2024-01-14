import { Client } from "discord.js";
import { listeners } from "../events";

export function initDiscordEvents(client: Client){

    client.on("messageCreate", (message) => {
        listeners.webhookMessageCreate(message)
    })

    client.on("voiceStateUpdate", (oldState, newState) => {
        listeners.guildMemberConnect(newState);
        listeners.guildMemberDisconnect(oldState);
        listeners.guildMemberMoved(oldState, newState);
    })

    client.on("guildAuditLogEntryCreate", (auditLogEntry, guild) => {
        listeners.guildMemberTimeoutAdd(auditLogEntry, guild);
        listeners.guildMemberTimeoutRemove(auditLogEntry, guild);

        listeners.userKick(auditLogEntry, guild);
        listeners.userBanAdd(auditLogEntry, guild);
        listeners.userBanRemove(auditLogEntry, guild);
    })

}