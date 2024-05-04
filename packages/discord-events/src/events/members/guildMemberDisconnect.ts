import type { GuildMember, VoiceBasedChannel, VoiceState } from "discord.js";

export type GuildMemberDisconnectEvent = [member: GuildMember, channel: VoiceBasedChannel];

export function guildMemberDisconnect(oldState: VoiceState, newState: VoiceState){
    if (oldState.channel === null) return;
    if (newState.channel !== null) return;
    if (!newState.member) return;

    newState.client.emit("guildMemberDisconnect", newState.member, oldState.channel);
}