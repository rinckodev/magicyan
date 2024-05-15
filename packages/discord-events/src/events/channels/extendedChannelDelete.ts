import { AuditLogEvent, DMChannel, GuildMember, NonThreadGuildBasedChannel } from "discord.js";

export type ExtendedChannelDeleteEvent = [channel: NonThreadGuildBasedChannel, executor: GuildMember];

export function extendedChannelDelete(channel: DMChannel | NonThreadGuildBasedChannel){
    if (channel.isDMBased()) return;
    
    const { guild } = channel;

    guild.fetchAuditLogs({ type: AuditLogEvent.ChannelDelete })
    .then(({ entries }) => {
        const auditLogEntry = entries.find(entry => entry.targetId === channel.id);

        if (!auditLogEntry || !auditLogEntry.executorId) return;

        const member = guild.members.cache.get(auditLogEntry.executorId);
        if (!member) return;

        guild.client.emit("extendedChannelDelete", channel, member);
    })
    .catch(() => {});
}