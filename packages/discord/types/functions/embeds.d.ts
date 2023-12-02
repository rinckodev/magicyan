import type { EmbedAuthorData, ImageURLOptions, User } from "discord.js";
interface CreateEmbedAuthorOptions {
    user: User;
    property?: "username" | "displayName" | "id" | "globalName";
    imageSize?: ImageURLOptions["size"];
    iconURL?: string;
    url?: string;
    prefix?: string;
    suffix?: string;
}
export declare function createEmbedAuthor(options: CreateEmbedAuthorOptions): EmbedAuthorData;
export {};
