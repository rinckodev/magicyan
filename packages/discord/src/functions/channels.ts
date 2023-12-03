import type { CommandInteractionOption, Guild } from "discord.js";
import { ChannelType } from "discord.js";

type GetChannelType<Type extends ChannelType> = Extract<NonNullable<CommandInteractionOption<"cached">["channel"]>, {
    type: Type extends ChannelType.PublicThread | ChannelType.AnnouncementThread
      ? ChannelType.PublicThread | ChannelType.AnnouncementThread
      : Type;
}>
export function findChannel<Type extends Exclude<ChannelType, ChannelType.DM> = ChannelType.GuildText>(guild: Guild, type?: Type){
    const channelType = type || ChannelType.GuildText;
    return {
        byName(name: string): GetChannelType<Type> | undefined {
            return guild.channels.cache.find(channel => channel.name === name && channel.type === channelType) as GetChannelType<Type>;
        },
        byId(id: string): GetChannelType<Type> | undefined {
            return guild.channels.cache.find(channel => channel.id === id && channel.type === channelType) as GetChannelType<Type>;
        }
    }
}