import { brBuilder } from "@magicyan/core";
import { type APIEmbed, type ColorResolvable, type Embed, type EmbedData, AttachmentBuilder, AttachmentData, EmbedBuilder } from "discord.js";
import { chars } from "../../constants/chars";
import { colors } from "../../constants/colors";
import { type EmbedPlusAssetData, createEmbedAsset } from "./assets";
import { type EmbedPlusFieldData, EmbedPlusFields } from "./fields";
import { type EmbedPlusFooterData, createEmbedFooter } from "./footer";

type EmbedPlusBuilderReturn<B> = 
    undefined extends B ? EmbedPlusBuilder :
    false extends B ? EmbedPlusBuilder :
    EmbedPlusBuilder[];

export type EmbedPlusColorData = string&{} | ColorResolvable | null;
export type EmbedPlusAuthorData = { name: string, url?: string, iconURL?: string }

type MaybeString = string | null | undefined;

export interface EmbedPlusData {
    title?: string | null;
    color?: EmbedPlusColorData | null;
    description?: MaybeString | MaybeString[];
    url?: string | null | { toString(): string };
    thumbnail?: EmbedPlusAssetData;
    image?: EmbedPlusAssetData;
    fields?: Partial<EmbedPlusFieldData>[] | null
    timestamp?: string | number | Date | null | boolean;
    footer?: EmbedPlusFooterData | string;
    author?: EmbedPlusAuthorData;
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

        if (builderData.url) builderData.url = builderData.url.toString();

        const { color, footer, image, thumbnail, timestamp, description } = embedData;
        if (!footer) delete builderData.footer;
        if (footer) {
            Object.assign(builderData, { footer: createEmbedFooter(footer) })
        };
        if (image) Object.assign(builderData, { image: createEmbedAsset(image) });
        if (thumbnail) Object.assign(builderData, { thumbnail: createEmbedAsset(thumbnail) });
        if (description) builderData.description = brBuilder(description);
        
        const embed = new EmbedBuilder(builderData);
        
        if (timestamp) embed.setTimestamp(
            typeof timestamp === "string" 
            ? new Date(timestamp)
            : typeof timestamp === "boolean"
            ? new Date()
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
    public toAttachment(data: AttachmentData = { name: "embed.json" }, space = 2){
        const buffer = Buffer.from(this.toString(space), "utf-8");
        return new AttachmentBuilder(buffer, data);
    }
    public override setColor(color: ColorResolvable | null): this {
        if (color === null){
            super.setColor(colors.embedbg as ColorResolvable);
        } else if (typeof color === "number"){
            this.update({ color });
        } else {
            super.setColor(color as ColorResolvable);
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
}

export type EmbedPlusProperty<P extends keyof EmbedPlusData> = EmbedPlusData[P];

interface CreateEmbedOptions<B extends boolean> extends EmbedPlusOptions {
    array?: B,
    from?: InteractionWithEmbeds | MessageWithEmbeds;
    fromIndex?: number;
}
export function createEmbed<B extends boolean>(options: CreateEmbedOptions<B>): EmbedPlusBuilderReturn<B>{
    const { array=false, from, fromIndex=0, ...data } = options;
    
    const fromEmbeds = from ? "message" in from ? from.message.embeds : from.embeds : [];

    return (array
        ? from && fromEmbeds.length > 0 
            ? fromEmbeds.map(embed => new EmbedPlusBuilder({ extends: embed })) 
            : [new EmbedPlusBuilder(data)]
        : from && fromEmbeds.length > 0 
            ? new EmbedPlusBuilder({ extends: fromEmbeds[fromIndex], ...data }) 
            : new EmbedPlusBuilder(data)
    ) as EmbedPlusBuilderReturn<B>;
}