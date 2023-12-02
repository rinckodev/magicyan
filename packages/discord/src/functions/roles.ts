import type { Guild } from "discord.js";

export function findRole(guild: Guild){
    return {
        byName(name: string){
            return guild.roles.cache.find(role => role.name == name);
        },
        byId(id: string){
            return guild.roles.cache.get(id); 
        }
    }
}