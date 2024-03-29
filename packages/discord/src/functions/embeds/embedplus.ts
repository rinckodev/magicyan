import { APIEmbed, ColorResolvable, Embed, EmbedBuilder, EmbedData } from "discord.js";
import { chars } from "../../constants/chars";
import { AssetSource, createEmbedAsset } from "./assets";
import { createEmbedFooter } from "./footer";

type EmbedPlusAssetData = AssetSource;
type EmbedPlusColorData = string&{} | ColorResolvable | null;
type EmbedPlusFieldData = { name: string; value: string; inline?: boolean }
type EmbedPlusFooterData = { text?: string | null; iconURL?: string | null; }
type EmbedPlusAuthorData = { name: string, url?: string, iconURL?: string }

interface EmbedPlusData {
    title?: string | null;
    color?: EmbedPlusColorData | null;
    description?: string | null;
    url?: string | null;
    thumbnail?: EmbedPlusAssetData | null;
    image?: EmbedPlusAssetData | null;
    fields?: Partial<EmbedPlusFieldData>[] | null
    timestamp?: string | number | Date | null;
    footer?: EmbedPlusFooterData;
    author?: EmbedPlusAuthorData
}

interface EmbedPlusOptions extends EmbedPlusData {
    extends?: Omit<EmbedPlusData, keyof EmbedPlusOptions> | EmbedData | APIEmbed | Embed;
    mergeFields?: boolean;
}

export class EmbedPlusBuilder extends EmbedBuilder {
    constructor(data: EmbedPlusOptions){
        
        const extendsEmbed = data.extends ? new EmbedPlusBuilder(
            data.extends instanceof Embed || data.extends instanceof EmbedBuilder
            ? data.extends.data : data.extends
        ).data : {};
        
        const { fields: extendsFields, ...exetendData } = extendsEmbed;

        const fields = (data.mergeFields 
            ? [extendsFields??[], data.fields??[]].flat() 
            : data.fields??extendsFields??[]
        ).map(({ name=chars.invisible, value=chars.invisible, inline }) => ({
            name, value, inline
        }));

        const embed = new EmbedBuilder({
            ...exetendData,
            ...data.title ? { title: data.title } : {},
            ...data.description ? { description: data.description } : {},
            ...data.url ? { url: data.url } : {},
            ...data.footer ? { footer: createEmbedFooter(data.footer) } : {},
            ...data.author ? { author: data.author } : {},
            ...data.image ? { image: createEmbedAsset(data.image) } : {},
            ...data.thumbnail ? { thumbnail: createEmbedAsset(data.thumbnail) } : {},
            ...fields.length > 0 ? { fields } : {}
        });
        if (data.timestamp) embed.setTimestamp(
            typeof data.timestamp === "string" 
            ? new Date(data.timestamp)
            : data.timestamp
        );
        if (data.color) embed.setColor(data.color as ColorResolvable);
        super(embed.data);
    }
    public has(property: keyof Omit<EmbedPlusData, keyof EmbedPlusOptions>){
        return Boolean(this.data[property]);
    }
    public toArray(){
        return Array.from([this]);
    }
    public toString(space = 2){
        return JSON.stringify(this, null, space);
    }
    public updateField(index: number, field: Partial<EmbedPlusFieldData>){
        if (this.fields.at(index)) {
            const fields = Array.from(this.fields);
            if (field.name) fields[index].name = field.name;
            if (field.value) fields[index].value = field.value;
            if (field.inline) fields[index].inline = field.inline;
            this.setFields(fields);
        }
        return this;
    }
    public deleteField(index: number): this{
        if (this.fields.at(index)){
            this.setFields(this.fields.toSpliced(index, 1));
        }
        return this;
    }
    public popField(){
        const fields = Array.from(this.fields);
        const field = fields.pop();
        this.setFields(fields);
        return field;
    }
    public setAsset(asset: "thumbnail" | "image", source: EmbedPlusAssetData){
        const assetData = createEmbedAsset(source);
        
        if (!assetData?.url) return this;

        asset === "image" 
        ? this.setImage(assetData.url)
        : this.setThumbnail(assetData.url);
        return this;
    }
    public get fieldsLength(){
        return this.data.fields?.length ?? 0;
    }
    public get fields() {
        return this.data.fields ?? [];
    }
}

export type EmbedPlusProperty<P extends keyof EmbedPlusData> = EmbedPlusData[P];

interface CreateEmbedOptions<B extends boolean> extends EmbedPlusOptions {
    array?: B 
}
type CreateEmbedReturn<B> = undefined extends B ? EmbedPlusBuilder : false extends B ? EmbedPlusBuilder : EmbedPlusBuilder[];
export function createEmbed<B extends boolean>(options: CreateEmbedOptions<B>): CreateEmbedReturn<B>{
    const { array=false, ...data } = options;
    const embed = new EmbedPlusBuilder(data);
    return (array ? [embed] : embed) as CreateEmbedReturn<B>; 
}