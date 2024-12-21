import type { Guild, GuildMember } from "discord.js";

type FindMemberFilter = (member: GuildMember) => boolean;

export function findMember(guild: Guild){
    const cache = guild.members.cache;
    return {
        byGlobalName(globalName: string, and: FindMemberFilter = () => true){
            return cache.find(member => member.user.globalName == globalName && and(member));
        },
        byNickname(nickname: string, and: FindMemberFilter = () => true){
            return cache.find(member => member.nickname && member.nickname == nickname && and(member));
        },
        byUsername(username: string, and: FindMemberFilter = () => true){
            return cache.find(member => member.user.username === username && and(member));
        },
        byDisplayName(displayName: string, and: FindMemberFilter = () => true){
            return cache.find(member => member.displayName === displayName && and(member));
        },
        byId(id: string){
            return cache.get(id); 
        },
        byFilter(filter: FindMemberFilter){
            return cache.find(filter);
        }
    };
}