import { EmbedAuthorData, EmbedBuilder, ImageURLOptions, User, EmbedAssetData, Attachment, AttachmentBuilder, ColorResolvable, EmbedFooterData } from "discord.js";
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
type EmbedColor = ColorResolvable | (string & {});
type BaseEmbedField = {
    name: string;
    value: string;
    inline?: boolean;
};
type BaseEmbedData = {
    title?: string;
    color?: EmbedColor;
    description?: string;
    url?: string;
    timestamp?: string | number | Date;
    footer?: EmbedFooterData;
    image?: EmbedAssetData;
    thumbnail?: EmbedAssetData;
    author?: EmbedAuthorData;
    fields?: BaseEmbedField[];
};
type CreateEmbedOptions = BaseEmbedData & {
    extend?: BaseEmbedData;
    modify?: {
        fields?(fields: BaseEmbedField[]): BaseEmbedField[];
    };
};
export declare function createEmbed(options: CreateEmbedOptions): EmbedBuilder;
export {};
