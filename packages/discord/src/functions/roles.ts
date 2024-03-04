import type { Guild, Role } from "discord.js";

type FindRoleFilter = (role: Role) => boolean;

export function findRole(guild: Guild){
    return {
        byColor(color: number, and: FindRoleFilter = () => true){
            return guild.roles.cache.find(role => role.color == color && and(role));
        },
        byHexColor(hexColor: string, and: FindRoleFilter = () => true){
            return guild.roles.cache.find(role => role.hexColor == hexColor && and(role));
        },
        byName(name: string, and: FindRoleFilter = () => true){
            return guild.roles.cache.find(role => role.name == name && and(role));
        },
        byId(id: string){
            return guild.roles.cache.get(id); 
        },
        byFilter(filter: FindRoleFilter){
            return guild.roles.cache.find(filter);
        }
    };
}