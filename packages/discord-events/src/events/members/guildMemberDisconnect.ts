import type { VoiceState } from "discord.js";

export function guildMemberDisconnect(oldState: VoiceState){
    const { client, member, channel } = oldState;
    if (member && channel){
        client.emit("guildMemberDisconnect", member, channel);
    }
}