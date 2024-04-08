import { APIEmbed, ColorResolvable, Embed, EmbedBuilder, EmbedData } from "discord.js";
import { chars } from "../../constants/chars";
import { createEmbedAsset, EmbedPlusAssetData } from "./assets";
import { createEmbedFooter, EmbedPlusFooterData } from "./footer";
import { EmbedPlusFields, EmbedPlusFieldData } from "./fields";

type EmbedPlusColorData = string&{} | ColorResolvable | null;
type EmbedPlusAuthorData = { name: string, url?: string, iconURL?: string }

export interface EmbedPlusData {
    title?: string | null;
    color?: EmbedPlusColorData | null;
    description?: string | null;
    url?: string | null;
    thumbnail?: EmbedPlusAssetData;
    image?: EmbedPlusAssetData;
    fields?: Partial<EmbedPlusFieldData>[] | null
    timestamp?: string | number | Date | null;
    footer?: EmbedPlusFooterData;
    author?: EmbedPlusAuthorData
}

export type AnyEmbed = APIEmbed | Embed | EmbedBuilder | EmbedData;

interface MessageWithEmbeds {
    embeds: Array<Embed>
}
interface InteractionWithEmbeds {
    message: MessageWithEmbeds
}

interface EmbedPlusOptions extends EmbedPlusData {
    extends?: Omit<EmbedPlusData, keyof EmbedPlusOptions> | AnyEmbed;
    mergeFields?: boolean;
}

export class EmbedPlusBuilder extends EmbedBuilder {
    public fields: EmbedPlusFields;
    constructor(data: EmbedPlusOptions){
        const { mergeFields=false, extends: extendsEmbed, ...embedData } = data;
        
        const extendsEmbedData = extendsEmbed
        ? "data" in extendsEmbed ? extendsEmbed.data : data
        : {};

        const { fields: extendsFields, ...extendsData } = extendsEmbedData;

        const fields = (mergeFields
            ? [extendsFields??[], data.fields??[]].flat() 
            : data.fields??extendsFields??[]
        )
        .map(field => Object.assign(
            { name: field.name??chars.invisible, value: field.value??chars.invisible },
            field.inline !== undefined ? { inline: field.inline } : {}, 
        ));
        const builderData = Object.assign({}, extendsData, embedData, { fields }) as EmbedData;

        const { color, footer, image, thumbnail, timestamp } = embedData;
        if (footer) Object.assign(builderData, { footer: createEmbedFooter(footer) });
        if (image) Object.assign(builderData, { image: createEmbedAsset(image) });
        if (thumbnail) Object.assign(builderData, { thumbnail: createEmbedAsset(thumbnail) });

        const embed = new EmbedBuilder(builderData);
        if (timestamp) embed.setTimestamp(
            typeof timestamp === "string" 
            ? new Date(timestamp)
            : timestamp
        );
        if (color) embed.setColor(color as ColorResolvable);
        super(embed.data);
        this.fields = new EmbedPlusFields(this);
    }
    public update(data: EmbedPlusData): this {
        const updated = createEmbed({ mergeFields: true, extends: this, ...data });
        Object.assign(this.data, updated.data);
        return this;
    }
    public has(property: keyof Omit<EmbedPlusData, keyof EmbedPlusOptions>){
        return Boolean(this.data[property]);
    }
    public toArray(): EmbedPlusBuilder[]{
        return Array.from([this]);
    }
    public toString(space = 2){
        return JSON.stringify(this, null, space);
    }
    public setBorderColor(color: EmbedPlusColorData | null): this {
        if (color === null){
            this.setColor("#2B2D31");
        } else {
            this.setColor(color as ColorResolvable);
        }
        return this;
    }
    public setAsset(asset: "thumbnail" | "image", source: EmbedPlusAssetData){
        const assetData = createEmbedAsset(source);
        
        if (!assetData?.url) return this;

        asset === "image" 
        ? this.setImage(assetData.url)
        : this.setThumbnail(assetData.url);
        return this;
    }
    public static fromInteraction(interaction: InteractionWithEmbeds, index=0, data: EmbedPlusData = {}){
        return EmbedPlusBuilder.fromMessage(interaction.message, index, data);
    }
    public static fromMessage(message: MessageWithEmbeds, index=0, data: EmbedPlusData = {}){
        return new EmbedPlusBuilder(Object.assign({ extends: message.embeds[index] }, data));
    }
}

export type EmbedPlusProperty<P extends keyof EmbedPlusData> = EmbedPlusData[P];

interface CreateEmbedOptions<B extends boolean> extends EmbedPlusOptions {
    array?: B, interaction?: InteractionWithEmbeds;
}
type CreateEmbedReturn<B> = undefined extends B ? EmbedPlusBuilder : false extends B ? EmbedPlusBuilder : EmbedPlusBuilder[];
export function createEmbed<B extends boolean>(options: CreateEmbedOptions<B>): CreateEmbedReturn<B>{
    const { array=false, interaction, ...data } = options;
    const embed = interaction 
    ? EmbedPlusBuilder.fromInteraction(interaction, 0, data) 
    : new EmbedPlusBuilder(data);
    return (array ? [embed] : embed) as CreateEmbedReturn<B>; 
}
