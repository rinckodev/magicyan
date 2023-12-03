import { EmbedAuthorData, ImageURLOptions, User, EmbedAssetData, Attachment, AttachmentBuilder } from "discord.js";

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
type EmbedAssetOptions = Omit<EmbedAssetData, "url">
type AssetSource = string | null | Attachment | AttachmentBuilder;

export function createEmbedAsset(source?: AssetSource, options?: EmbedAssetOptions): EmbedAssetData | undefined {
    if (source instanceof Attachment || source instanceof AttachmentBuilder){
        return { url: `attachment://${source.name}`, ...options }
    }
    return source ? { url: source, ...options } : undefined;
}