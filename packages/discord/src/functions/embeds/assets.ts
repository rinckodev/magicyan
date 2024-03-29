import { EmbedAssetData, Attachment, AttachmentBuilder } from "discord.js";

type EmbedAssetOptions = Omit<EmbedAssetData, "url">
export type AssetSource = string | Attachment | AttachmentBuilder | EmbedAssetData | undefined | null;

export function createEmbedAsset(source: AssetSource, options?: EmbedAssetOptions): EmbedAssetData | undefined {
    if (source instanceof Attachment || source instanceof AttachmentBuilder){
        return { url: `attachment://${source.name}`, ...options };
    }
    if (source && typeof source === "object" && "url" in source){
        return source;
    }
    return source ? { url: source, ...options } : undefined;
}