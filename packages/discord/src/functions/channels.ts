import { type CommandInteractionOption, type Guild, ChannelType } from "discord.js";

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
        byId(id: string): GetChannelType<Type> | undefined {
            return cache.find(c => 
                c.id === id && 
                c.type === channelType
            ) as GetChannelType<Type>;
        },
        byName(name: string, and: FindChannelFilter<Type> = () => true): GetChannelType<Type> | undefined {
            return cache.find(c => 
                c.name === name && 
                c.type === channelType &&
                and(c as GetChannelType<Type>)
            ) as GetChannelType<Type>;
        },
        byFilter(filter: FindChannelFilter<Type>): GetChannelType<Type> | undefined{
            return cache.find(c => c.type == type && filter(c as GetChannelType<Type>)) as GetChannelType<Type>;
        },
        inCategoryId(id: string){
            return {
                byId(id: string): GetChannelType<Type> | undefined {
                    return cache.find(c => 
                        c.id === id && 
                        c.type === channelType && 
                        c.parentId == id
                    ) as GetChannelType<Type>;
                },
                byName(name: string, and: FindChannelFilter<Type> = () => true): GetChannelType<Type> | undefined {
                    return cache.find(c => 
                        c.name === name && 
                        c.type === channelType && 
                        c.parentId == id &&
                        and(c as GetChannelType<Type>)
                    ) as GetChannelType<Type>;
                },
                byFilter(filter: FindChannelFilter<Type>): GetChannelType<Type> | undefined{
                    return cache.find(c => 
                        c.type === channelType && 
                        c.parent?.id == id &&
                        filter(c as GetChannelType<Type>)
                    ) as GetChannelType<Type>;
                },
            };
        },
        inCategoryName(name: string){
            return {
                byId(id: string): GetChannelType<Type> | undefined {
                    return cache.find(c => 
                        c.id === id && 
                        c.type === channelType && 
                        c.parent?.name == name
                    ) as GetChannelType<Type>;
                },
                byName(name: string, and: FindChannelFilter<Type> = () => true): GetChannelType<Type> | undefined {
                    return cache.find(c => 
                        c.name === name && 
                        c.type === channelType  && 
                        c.parent?.name == name &&
                        and(c as GetChannelType<Type>)
                    ) as GetChannelType<Type>;
                },
                byFilter(filter: FindChannelFilter<Type>): GetChannelType<Type> | undefined{
                    return cache.find(c => 
                        c.type === channelType && 
                        c.parent?.name == name &&
                        filter(c as GetChannelType<Type>)
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
    const regex = new RegExp(/^https:\/\/discord\.com\/channels\/\d+\/\d+$/);
    if (!regex.test(url)) return {};
    const [channelId, guildId] = url.split("/").reverse();
    return { channelId, guildId };
}