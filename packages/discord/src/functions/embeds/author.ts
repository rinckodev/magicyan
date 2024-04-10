import { Guild, GuildMember, ImageURLOptions, User } from "discord.js";

interface MemberAuthor {
    property?: "username" | "displayName" | "id" | "globalName" | "nickname"
}
interface UserAuthor {
    property?: "username" | "displayName" | "id" | "globalName"
}
interface GuildAuthor {
    property?: "name" | "id"
}
type AuthorType = Guild | GuildMember | User;

type CreateEmbedAuthorOptions<T extends AuthorType> = {
    iconURL?: string; url?: string | null; prefix?: string; suffix?: string;
} & ImageURLOptions & (
    T extends User 
        ? UserAuthor :
    T extends GuildMember
        ? MemberAuthor :
    T extends Guild
        ? GuildAuthor :
    never
)

export function createEmbedAuthor<T extends AuthorType>(type: T, options?: CreateEmbedAuthorOptions<T>){
    const { prefix="", suffix="", url, iconURL: icon, extension, forceStatic, size=1024 } = options??{};
    let name = "";
    let iconURL = icon;
    const imageOptions = { extension, forceStatic, size };
    switch(true){
        case type instanceof User:{
            const { property="displayName" } = (options??{}) as CreateEmbedAuthorOptions<User>;
            name = type[property] ?? type.displayName;
            iconURL = type.displayAvatarURL(imageOptions);
            break;
        }
        case type instanceof GuildMember:{
            const { property="displayName" } = (options??{}) as CreateEmbedAuthorOptions<GuildMember>;
            name = (property == "username" || property == "globalName" 
            ? type.user[property] : type[property]) ?? type.displayName;
            iconURL = type.displayAvatarURL(imageOptions);
            break;
        }
        case type instanceof Guild:{
            const { property="name" } = (options??{}) as CreateEmbedAuthorOptions<Guild>;
            name = type[property];
            iconURL = type.iconURL(imageOptions) ?? undefined;
            break;
        }
    }
    return { name: `${prefix}${name}${suffix}`, url: url??undefined, iconURL };
}