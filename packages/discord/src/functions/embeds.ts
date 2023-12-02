import type { EmbedAuthorData, ImageURLOptions, User } from "discord.js";

interface CreateEmbedAuthorOptions {
    user: User,
    property?: "username" | "displayName" | "id" | "globalName"
    imageSize?: ImageURLOptions["size"],
    iconURL?: string, url?: string, prefix?: string, suffix?: string,
}
export function createEmbedAuthor(options: CreateEmbedAuthorOptions): EmbedAuthorData {
    const { user, property="displayName", imageSize: size=512, 
        iconURL, url, prefix="", suffix=""
    } = options;
    return {
        name: `${prefix}${user[property]}${suffix}`, url, 
        iconURL: iconURL || user.displayAvatarURL({ size }) 
    };
}