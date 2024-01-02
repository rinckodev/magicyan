import { notFound } from "@magicyan/core";
import { Attachment, AttachmentBuilder, ColorResolvable, EmbedAssetData, EmbedAuthorData, EmbedBuilder, EmbedFooterData, Guild, GuildMember, ImageURLOptions, User } from "discord.js";

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

interface CreateEmbedFooterOptions {
    text?: string | null;
    iconURL?: string | null;
}
export function createEmbedFooter(options: CreateEmbedFooterOptions): EmbedFooterData {
    const { text, iconURL } = options;
    return { text: text ?? "\u200b", iconURL: notFound(iconURL) };
}

type EmbedAssetOptions = Omit<EmbedAssetData, "url">
type AssetSource = string | null | Attachment | AttachmentBuilder;

export function createEmbedAsset(source?: AssetSource, options?: EmbedAssetOptions): EmbedAssetData | undefined {
    if (source instanceof Attachment || source instanceof AttachmentBuilder){
        return { url: `attachment://${source.name}`, ...options }
    }
    return source ? { url: source, ...options } : undefined;
}

type EmbedColor = ColorResolvable | (string & {});
type BaseEmbedField = {
    name: string;
    value: string;
    inline?: boolean
}
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
}
type CreateEmbedOptions = BaseEmbedData & {
    extend?: BaseEmbedData;
    modify?: {
        fields?(fields: BaseEmbedField[]): BaseEmbedField[];
    }
}
export function createEmbed(options: CreateEmbedOptions){
    const { extend: extendRaw = {}, ...embedRaw } = options;

    const { color: embedColor, modify, ...embedData } = embedRaw;
    const { color: extendColor, ...extendData } = extendRaw;

    const data = { ...extendData, ...embedData };
    const builder = new EmbedBuilder(data);
    
    if (extendColor) builder.setColor(extendColor as ColorResolvable);
    if (embedColor) builder.setColor(embedColor as ColorResolvable);

    if (modify?.fields && typeof modify.fields == "function"){
        const fields = modify.fields(builder.data.fields || []);
        builder.setFields(fields);
    }
    return builder;
}