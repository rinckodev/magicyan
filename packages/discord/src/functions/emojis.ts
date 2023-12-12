
import type { Client, Guild } from "discord.js";

export function findEmoji(guildOrClient: Guild | Client){
    const emojis = guildOrClient.emojis.cache;
    return {
        byName(name: string, animated?: boolean){
            return animated 
            ? emojis.find(emoji => emoji.name == name && emoji.animated == animated)
            : emojis.find(emoji => emoji.name == name)
        },
        byId(id: string, animated?: boolean){
            return animated 
            ? emojis.find(emoji => emoji.id == id && emoji.animated == animated)
            : emojis.find(emoji => emoji.id == id)
        }
    }
}