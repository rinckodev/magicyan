import { ChannelType, type CommandInteractionOption, type Guild } from "discord.js";

type FindChannelFilter<T extends ChannelType> = (channel: GetChannelType<T>) => boolean;

type GetChannelType<Type extends ChannelType> = Extract<NonNullable<CommandInteractionOption<"cached">["channel"]>, {
    type: Type extends ChannelType.PublicThread | ChannelType.AnnouncementThread
        ? ChannelType.PublicThread | ChannelType.AnnouncementThread
        : Type;
}>
export function findChannel<Type extends Exclude<ChannelType, ChannelType.DM> = ChannelType.GuildText>(guild: Guild, type?: Type){
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
        byFilter(filter: FindChannelFilter<Type>){
            return cache.find(c => c.type == type && filter);
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
                byFilter(filter: FindChannelFilter<Type>){
                    return cache.find(c => 
                        c.type === channelType && 
                        c.parent?.id == id &&
                        filter
                    );
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
                byFilter(filter: FindChannelFilter<Type>){
                    return cache.find(c => 
                        c.type === channelType && 
                        c.parent?.name == name &&
                        filter
                    );
                },
            };
        }
    };
}