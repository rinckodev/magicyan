import "discord.js";
declare module "discord.js" {
    interface Client {
        on(event: "webhookMessageCreate", listener: (message: Message<true>, webhook: Webhook) => void | Promise<void>): void;
        on(event: "guildMemberVoiceChannelJoin", listener: (member: GuildMember, channel: VoiceChannel) => void | Promise<void>): void;
        on(event: "guildMemberVoiceChannelLeave", listener: (member: GuildMember, channel: VoiceChannel) => void | Promise<void>): void;
        on(event: "guildMemberVoiceChannelMove", listener: (member: GuildMember, newChannel: VoiceChannel, mover: GuildMember, oldChannel: VoiceChannel) => void | Promise<void>): void;
    }
}
export {};
