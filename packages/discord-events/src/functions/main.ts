import { Client } from "discord.js";
import { DiscordEvents, DiscordEventsList } from "../types/events";
import { listeners } from "../events";

type EventsList = Array<keyof DiscordEvents>

interface InitOptions {
    disable?: EventsList,
}

export function initDiscordEvents(client: Client, options?: InitOptions){
    const disable = options?.disable ?? [];
    const enabled = (Object.keys(listeners) as EventsList)
    .filter(eventName => !disable.includes(eventName));

    client.on("messageCreate", (message) => {
        if (enabled.includes("webhookMessageCreate")) listeners.webhookMessageCreate(message)
    })

    client.on("voiceStateUpdate", (oldState, newState) => {
        if (enabled.includes("guildMemberConnect")) listeners.guildMemberConnect(newState);
        if (enabled.includes("guildMemberDisconnect")) listeners.guildMemberDisconnect(oldState);
        if (enabled.includes("guildMemberMoved")) listeners.guildMemberMoved(oldState, newState);
    })

    client.on("guildAuditLogEntryCreate", (auditLogEntry, guild) => {
        if (enabled.includes("guildMemberTimeoutAdd")) listeners.guildMemberTimeoutAdd(auditLogEntry, guild);
        if (enabled.includes("guildMemberTimeoutRemove")) listeners.guildMemberTimeoutRemove(auditLogEntry, guild);
    })

}