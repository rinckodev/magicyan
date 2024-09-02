import { type GuildMember, type VoiceBasedChannel, type VoiceState } from "discord.js";

export type GuildMemberConnectEvent = [
    member: GuildMember, 
    channel: VoiceBasedChannel,
    oldChannel: VoiceBasedChannel | null
];

export function guildMemberConnect(oldState: VoiceState, newState: VoiceState){
    if (newState.channel === null) return;
    if (newState.channelId === oldState.channelId) return;
    if (!newState.member) return;

    newState.client.emit("guildMemberConnect", newState.member, newState.channel, oldState.channel);
}