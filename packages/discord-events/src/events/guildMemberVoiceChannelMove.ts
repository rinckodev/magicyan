import { AuditLogEvent, ChannelType, Client, VoiceState } from "discord.js";

export async function guildMemberVoiceChannelMove(client: Client, oldSate: VoiceState, newState: VoiceState){
    if (oldSate.channel?.type !== ChannelType.GuildVoice) return;
    if (newState.channel?.type !== ChannelType.GuildVoice) return;
    if (!newState.member) return;
    const { entries } = await newState.guild.fetchAuditLogs({
        type: AuditLogEvent.MemberMove,
        limit: 1,
    });
    const entry = entries.first();
    if (!entries.size || !entry) return;
    if (!entry.executor) return;
    const member = newState.guild.members.cache.get(entry.executor.id);
    if (!member) return;


    client.emit("guildMemberVoiceChannelMove", 
        newState.member, newState.channel,
        member, oldSate.channel
    );
}