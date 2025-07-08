import { type EmbedAssetData, Attachment, AttachmentBuilder } from "discord.js";
import { isAttachment } from "../../guards/attachment";

export type EmbedPlusAssetData = string | Attachment | AttachmentBuilder | EmbedAssetData | undefined | null;

type EmbedAssetOptions = Omit<EmbedAssetData, "url">
export function createEmbedAsset(source: EmbedPlusAssetData, options: EmbedAssetOptions={}): EmbedAssetData | undefined {
    if (isAttachment(source)){
        return { url: `attachment://${source.name}`, ...options };
    }
    if (source && typeof source === "object" && "url" in source){
        return { ...source, ...options };
    }
    return source ? { url: source, ...options } : undefined; 
}