import "discord.js";
declare module "discord.js" {
	interface ClientEvents {
		webhookMessageCreate: [message: Message<true>, webhook: Webhook],
		guildMemberVoiceChannelJoin: [member: GuildMember, channel: VoiceChannel],
		guildMemberVoiceChannelLeave: [member: GuildMember, channel: VoiceChannel],
		guildMemberVoiceChannelMove: [member: GuildMember, newChannel: VoiceChannel, mover: GuildMember, oldChannel: VoiceChannel],
	}
}
export {};