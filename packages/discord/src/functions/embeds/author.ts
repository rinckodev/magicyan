import { type ImageURLOptions, type ClientUser, Guild, GuildMember, User } from "discord.js";

type IdentityProperty = "username" | "displayName" | "id" | "globalName" | "nickname"

interface MemberAuthor {
    type: GuildMember;
    property?: IdentityProperty;
}
interface UserAuthor {
    type: User | ClientUser;
    property?: Exclude<IdentityProperty, "nickname">
}
interface GuildAuthor {
    type: Guild;
    property?: "name" | "id"
}
type AuthorOption = MemberAuthor | UserAuthor | GuildAuthor;
type AuthorType = Guild | GuildMember | User | ClientUser;

type CreateEmbedAuthorOptions<T extends AuthorType> = {
    iconURL?: string; url?: string | null; prefix?: string; suffix?: string;
} & ImageURLOptions & Omit<Extract<AuthorOption, { type: T }>, "type">

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
    return { name: `${prefix}${name}${suffix}`, url: url?.toString(), iconURL };
}