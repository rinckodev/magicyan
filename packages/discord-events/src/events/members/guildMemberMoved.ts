import { AuditLogEvent, type GuildMember, type VoiceBasedChannel, type VoiceState } from "discord.js";

export type GuildMemberMovedEvent = [
    member: GuildMember, executor: GuildMember, 
    oldChannel: VoiceBasedChannel, newChannel: VoiceBasedChannel,
];

export function guildMemberMoved(oldState: VoiceState, newState: VoiceState){
    if (!oldState.channel) return;
    if (!newState.channel) return;
    if (oldState.channelId === newState.channelId) return;
    
    const { member, guild, client } = newState;

    if (!member) return;

    const newChannel = newState.channel;
    const oldChannel = oldState.channel;

    guild.fetchAuditLogs({ type: AuditLogEvent.MemberMove })
    .then(({ entries }) => {
        const entry = entries.find(entry => entry.targetId === member.id);

        if (!entry || !entry.executor) return;
    
        const executor = guild.members.cache.get(entry.executor.id);
        if (!executor) return;
    
        client.emit("guildMemberMoved", member, executor, oldChannel, newChannel);
    })
    .catch(() => null);
}