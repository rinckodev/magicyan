import { type APIEmbed, type ColorResolvable, type Embed, type EmbedData, AttachmentBuilder, AttachmentData, EmbedBuilder } from "discord.js";
import { type EmbedPlusAssetData, createEmbedAsset } from "./assets";
import { type EmbedPlusFieldData, EmbedPlusFields } from "./fields";
import { type EmbedPlusFooterData, createEmbedFooter } from "./footer";
import { chars } from "../../constants/chars";

export type EmbedPlusColorData = string&{} | ColorResolvable | null;
export type EmbedPlusAuthorData = { name: string, url?: string, iconURL?: string }

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

export type AnyEmbedData = APIEmbed | Embed | EmbedData;

interface MessageWithEmbeds {
    embeds: Array<Embed>
}
interface InteractionWithEmbeds {
    message: MessageWithEmbeds
}

interface EmbedPlusOptions extends EmbedPlusData {
    extends?: EmbedPlusData | AnyEmbedData | EmbedBuilder;
    mergeFields?: boolean;
}
export class EmbedPlusBuilder extends EmbedBuilder {
    public fields: EmbedPlusFields;
    constructor(data: EmbedPlusOptions){
        const { mergeFields=false, extends: extendsEmbed, ...embedData } = data;
        
        const extendsEmbedData = extendsEmbed
        ? "data" in extendsEmbed ? extendsEmbed.data : extendsEmbed
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
    public has(property: keyof EmbedPlusData){
        return Boolean(this.data[property]);
    }
    public toArray(): EmbedPlusBuilder[]{
        return Array.from([this]);
    }
    public toString(space = 2){
        return JSON.stringify(this, null, space);
    }
    public toAttachment(data: AttachmentData = { name: "embed.png" }, space = 2){
        const buffer = Buffer.from(this.toString(space), "utf-8");
        return new AttachmentBuilder(buffer, data);
    }
    public setBorderColor(color: EmbedPlusColorData | null): this {
        if (color === null){
            this.setColor("#2B2D31");
        } else if (typeof color === "number"){
            this.update({ color });
        } else {
            this.setColor(color as ColorResolvable);
        }
        return this;
    }
    public setAsset(asset: "thumbnail" | "image", source: EmbedPlusAssetData){
        this.update({ [asset]: source });
        return this;
    }
    public setElementImageURL(element: "thumbnail" | "image" | "author" | "footer", url: string | null){
        switch(element){
            case "thumbnail":
            case "image":{
                this.setAsset(element, url);
                break;
            }
            case "author":{
                const author = this.data.author;
                this.setAuthor({
                    name: author?.name??chars.invisible,
                    iconURL: url??undefined,
                });
                break;
            }
            case "footer":{
                const footer = this.data.footer;
                this.setFooter({
                    text: footer?.text??chars.invisible,
                    iconURL: url??undefined,
                });
                break;
            }
        }
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
    array?: B, 
    from?: InteractionWithEmbeds | MessageWithEmbeds;
    fromIndex?: number;
}
type CreateEmbedReturn<B> = undefined extends B ? EmbedPlusBuilder : false extends B ? EmbedPlusBuilder : EmbedPlusBuilder[];
export function createEmbed<B extends boolean>(options: CreateEmbedOptions<B>): CreateEmbedReturn<B>{
    const { array=false, from, fromIndex=0, ...data } = options;

    const embed = from
        ? "message" in from ? EmbedPlusBuilder.fromInteraction(from, fromIndex, data) 
        : EmbedPlusBuilder.fromMessage(from, fromIndex, data)
    : new EmbedPlusBuilder(data);

    return (array ? [embed] : embed) as CreateEmbedReturn<B>; 
}
