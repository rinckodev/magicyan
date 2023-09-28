import { EmbedAuthorData, ImageURLOptions, User } from "discord.js";
export declare function createEmbedAuthor({ user, property, imageSize: size, iconURL, url, prefix, suffix }: {
    user: User;
    property?: keyof Pick<User, "username" | "displayName" | "id">;
    imageSize?: ImageURLOptions["size"];
    iconURL?: string;
    url?: string;
    prefix?: string;
    suffix?: string;
}): EmbedAuthorData;
