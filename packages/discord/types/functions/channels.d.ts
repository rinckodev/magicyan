import type { CommandInteractionOption, Guild } from "discord.js";
import { ChannelType } from "discord.js";
type GetChannelType<Type extends ChannelType> = Extract<NonNullable<CommandInteractionOption<"cached">["channel"]>, {
    type: Type extends ChannelType.PublicThread | ChannelType.AnnouncementThread ? ChannelType.PublicThread | ChannelType.AnnouncementThread : Type;
}>;
export declare function findChannel<Type extends Exclude<ChannelType, ChannelType.DM> = ChannelType.GuildText>(guild: Guild, type?: Type): {
    byName(name: string): GetChannelType<Type> | undefined;
    byId(id: string): GetChannelType<Type> | undefined;
};
export {};
