import { EmbedAuthorData, ImageURLOptions, User } from "discord.js";

export function createEmbedAuthor({ 
    user, property="displayName", imageSize: size=512, 
    iconURL, url, prefix="", suffix=""
}: {
    user: User,
    property?: keyof Pick<User, "username" | "displayName" | "id">
    imageSize?: ImageURLOptions["size"],
    iconURL?: string, url?: string, prefix?: string, suffix?: string,
}): EmbedAuthorData{
    return { 
        name: `${prefix}${user[property]}${suffix}`, url, 
        iconURL: iconURL || user.displayAvatarURL({ size }) 
    };
}