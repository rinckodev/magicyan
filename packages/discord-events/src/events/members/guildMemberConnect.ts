import type { GuildMember, VoiceBasedChannel, VoiceState } from "discord.js";

export type GuildMemberConnectEvent = [member: GuildMember, channel: VoiceBasedChannel];

export function guildMemberConnect(oldState: VoiceState, newState: VoiceState){
    if (oldState.channel !== null) return;
    if (newState.channel === null) return;
    if (!newState.member) return;

    newState.client.emit("guildMemberConnect", newState.member, newState.channel);
}