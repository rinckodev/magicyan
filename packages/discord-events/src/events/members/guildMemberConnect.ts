import type { VoiceState } from "discord.js";

export function guildMemberConnect(newState: VoiceState){
    const { client, member, channel } = newState;
    if (member && channel){
        client.emit("guildMemberConnect", member, channel);
    }
}