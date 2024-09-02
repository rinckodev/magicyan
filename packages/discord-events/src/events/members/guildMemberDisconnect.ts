import type { GuildMember, VoiceBasedChannel, VoiceState } from "discord.js";

export type GuildMemberDisconnectEvent = [
    member: GuildMember, 
    channel: VoiceBasedChannel,
    newChannel: VoiceBasedChannel | null,
];

export function guildMemberDisconnect(oldState: VoiceState, newState: VoiceState){
    if (oldState.channel === null) return;
    if (!newState.member) return;
    if (oldState.channelId === newState.channelId) return;
    
    newState.client.emit("guildMemberDisconnect", newState.member, oldState.channel, newState.channel);
}