import { AuditLogEvent, Client, VoiceState } from "discord.js";

export async function guildMemberVoiceChannelMove(client: Client, oldSate: VoiceState, newState: VoiceState){
    if (!oldSate.channel || !newState.channel) return;
    const { entries } = await newState.guild.fetchAuditLogs({
        type: AuditLogEvent.MemberMove,
        limit: 1,
    });
    const entry = entries.first();
    if (!entries.size || !entry) return;
    if (!entry.executor) return;

    client.emit("guildMemberVoiceChannelMove", 
        newState.member, newState.channel,
        entry.executor, oldSate.channel
    )
}