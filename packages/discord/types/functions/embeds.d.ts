import { EmbedAuthorData, ImageURLOptions, User, EmbedAssetData, Attachment, AttachmentBuilder } from "discord.js";
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
type EmbedAssetOptions = Omit<EmbedAssetData, "url">;
type AssetSource = string | null | Attachment | AttachmentBuilder;
export declare function createEmbedAsset(source?: AssetSource, options?: EmbedAssetOptions): EmbedAssetData | undefined;
export {};
