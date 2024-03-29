import type { Guild, Role } from "discord.js";

type FindRoleFilter = (role: Role) => boolean;

/**
 * 
 * @param guild Discord guild
 * 
 * ```ts
 * const memberRole = findRole(guild).byName("Member");
 * const adminRole = findRole(guild).byHexColor("#ff5454");
 * const leaderRole = findRole(guild).byId("537818031728885771");
 * ```
 */
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