import { ChannelType, type CommandInteractionOption, type Guild } from "discord.js";

type GuildChannelType = Exclude<ChannelType, ChannelType.DM>;
type FindChannelFilter<T extends GuildChannelType> = (channel: GetChannelType<T>) => boolean;

type GetChannelType<Type extends GuildChannelType> = Extract<NonNullable<CommandInteractionOption<"cached">["channel"]>, {
    type: Type extends ChannelType.PublicThread | ChannelType.AnnouncementThread
        ? ChannelType.PublicThread | ChannelType.AnnouncementThread
        : Type;
}>
export function findChannel<Type extends GuildChannelType = ChannelType.GuildText>(guild: Guild, type?: Type){
    const channelType = type ?? ChannelType.GuildText;
    const cache = guild.channels.cache;
    return {
        byName(name: string, filter: FindChannelFilter<Type> = () => true): GetChannelType<Type> | undefined {
            return cache.find(c => 
                c.name === name && 
                c.type === channelType &&
                filter
            ) as GetChannelType<Type>;
        },
        byId(id: string): GetChannelType<Type> | undefined {
            return cache.find(c => 
                c.id === id && 
                c.type === channelType
            ) as GetChannelType<Type>;
        },
        byFilter(filter: FindChannelFilter<Type>): GetChannelType<Type> | undefined{
            return cache.find(c => c.type == type && filter) as GetChannelType<Type>;
        },
        inCategoryId(id: string){
            return {
                byName(name: string, filter: FindChannelFilter<Type> = () => true): GetChannelType<Type> | undefined {
                    return cache.find(c => 
                        c.name === name && 
                        c.type === channelType && 
                        c.parentId == id &&
                        filter
                    ) as GetChannelType<Type>;
                },
                byId(id: string, filter: FindChannelFilter<Type> = () => true): GetChannelType<Type> | undefined {
                    return cache.find(c => 
                        c.id === id && 
                        c.type === channelType && 
                        c.parentId == id &&
                        filter
                    ) as GetChannelType<Type>;
                },
                byFilter(filter: FindChannelFilter<Type>): GetChannelType<Type> | undefined{
                    return cache.find(c => 
                        c.type === channelType && 
                        c.parent?.id == id &&
                        filter
                    ) as GetChannelType<Type>;
                },
            };
        },
        inCategoryName(name: string){
            return {
                byName(name: string, filter: FindChannelFilter<Type> = () => true): GetChannelType<Type> | undefined {
                    return cache.find(c => 
                        c.name === name && 
                        c.type === channelType  && 
                        c.parent?.name == name &&
                        filter
                    ) as GetChannelType<Type>;
                },
                byId(id: string, filter: FindChannelFilter<Type> = () => true): GetChannelType<Type> | undefined {
                    return cache.find(c => 
                        c.id === id && 
                        c.type === channelType && 
                        c.parent?.name == name &&
                        filter
                    ) as GetChannelType<Type>;
                },
                byFilter(filter: FindChannelFilter<Type>): GetChannelType<Type> | undefined{
                    return cache.find(c => 
                        c.type === channelType && 
                        c.parent?.name == name &&
                        filter
                    )as GetChannelType<Type>;
                },
            };
        }
    };
}

interface ChannelUrlInfo {
    channelId?: string;
    guildId?: string;
}
export function getChannelUrlInfo(url: string): ChannelUrlInfo{
    const [channelId, guildId] = url.split("/").reverse();
    return { channelId, guildId };
}