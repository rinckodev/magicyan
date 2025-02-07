import { type EmbedAssetData, Attachment, AttachmentBuilder } from "discord.js";

export type EmbedPlusAssetData = string | Attachment | AttachmentBuilder | EmbedAssetData | undefined | null;

type EmbedAssetOptions = Omit<EmbedAssetData, "url">
export function createEmbedAsset(source: EmbedPlusAssetData, options: EmbedAssetOptions={}): EmbedAssetData | undefined {
    if (source instanceof Attachment || source instanceof AttachmentBuilder){
        return { url: `attachment://${source.name}`, ...options };
    }
    if (source && typeof source === "object" && "url" in source){
        return Object.assign(source, options);
    }
    return source ? Object.assign({ url: source }, options) : undefined;
}