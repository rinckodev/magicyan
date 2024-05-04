import { AuditLogEvent, DMChannel, GuildMember, NonThreadGuildBasedChannel } from "discord.js";

export type GuildChannelDeleteEvent = [channel: NonThreadGuildBasedChannel, executor: GuildMember];

export function guildChannelDelete(channel: DMChannel | NonThreadGuildBasedChannel){
    if (channel.isDMBased()) return;
    
    const { guild } = channel;

    guild.fetchAuditLogs({ type: AuditLogEvent.ChannelDelete })
    .then(({ entries }) => {
        const auditLogEntry = entries.find(entry => entry.targetId === channel.id);

        if (!auditLogEntry || !auditLogEntry.executorId) return;

        const member = guild.members.cache.get(auditLogEntry.executorId);
        if (!member) return;

        guild.client.emit("guildChannelDelete", channel, member);
    })
    .catch(() => {});

}