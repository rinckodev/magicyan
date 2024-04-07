import { EmbedAuthorData, GuildMember, ImageURLOptions, User } from "discord.js";

interface UserAuthorOption {
    user: User,
    property?: "username" | "displayName" | "id" | "globalName"
}
interface MemberAuthorOption {
    member: GuildMember,
    property?: "username" | "displayName" | "id" | "globalName" | "nickname"
}
type AuthorOption = UserAuthorOption | MemberAuthorOption;
type CreateEmbedAuthorOptions = AuthorOption & ImageURLOptions & {
    iconURL?: string; url?: string; prefix?: string; suffix?: string;
}
export function createEmbedAuthor(options: CreateEmbedAuthorOptions): EmbedAuthorData {
    const { prefix="", suffix="", url, iconURL } = options;
    const { size=512, extension, forceStatic } = options;
    const avatarOptions = { size, extension, forceStatic };
    
    if ("member" in options){
        const { member, property="displayName" } = options;
        const name = {
            id: member.id,
            username: member.user.username,
            displayName: member.displayName,
            globalName: member.user.globalName,
            nickname: member.nickname
        }[property] ?? member.displayName;

        return { name: `${prefix}${name}${suffix}`, url,
            iconURL: iconURL || member.displayAvatarURL(avatarOptions)
        };
    }
    const { property="displayName", user } = options;
    return {
        name: `${prefix}${options.user[property]}${suffix}`, url, 
        iconURL: iconURL || user.displayAvatarURL(avatarOptions) 
    };
}