import type { Client, Guild, GuildEmoji } from "discord.js";

type FindEmojiFilter = (emoji: GuildEmoji) => boolean

export function findEmoji(guildOrClient: Guild | Client){
    const emojis = guildOrClient.emojis.cache;
    return {
        byName(name: string, animated?: boolean, and: FindEmojiFilter = () => true){
            return animated
            ? emojis.find(emoji => emoji.name == name && emoji.animated == animated  && and(emoji))
            : emojis.find(emoji => emoji.name == name && and(emoji));
        },
        byId(id: string, animated?: boolean){
            return animated
            ? emojis.find(emoji => emoji.id == id && emoji.animated == animated)
            : emojis.find(emoji => emoji.id == id);
        },
        byFilter(filter: FindEmojiFilter){
            return guildOrClient.emojis.cache.find(filter);
        }
    };
}