import { AuditLogEvent, type VoiceState } from "discord.js";

export function guildMemberMoved(oldState: VoiceState, newState: VoiceState){
    if (!oldState.channel || !newState.channel) return;
    if (!newState.member || !newState.guild) return;

    const { member, guild, client, channel: newStateChannel } = newState;
    const oldStateChannel = oldState.channel;

    guild.fetchAuditLogs({ type: AuditLogEvent.MemberMove, limit: 1 })
    .then(({ entries }) => {
        const entry = entries.first();
        if (!entries.size || !entry) return;
        if (!entry.executor) return;
    
        const whoMoved = guild.members.cache.get(entry.executor.id);
        if (!whoMoved) return;
    
    
        client.emit("guildMemberMoved", member, whoMoved, oldStateChannel, newStateChannel);
    })
    .catch(() => null);
}