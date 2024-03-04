import { notFound } from "@magicyan/core";
import { APIEmbed, Attachment, AttachmentBuilder, ColorResolvable, Embed, EmbedAssetData, EmbedAuthorData, EmbedBuilder, EmbedData, EmbedFooterData, ImageURLOptions, User } from "discord.js";
import { chars } from "../constants/chars";

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
        name: prefix+user[property]+suffix, url, 
        iconURL: iconURL || user.displayAvatarURL({ size }) 
    };
}

interface CreateEmbedFooterOptions {
    text?: string | null;
    iconURL?: string | null;
}
export function createEmbedFooter(options: CreateEmbedFooterOptions): EmbedFooterData | undefined {
    const { text, iconURL } = options;
    return !text && !iconURL ? undefined 
    : { text: text ?? "\u200b", iconURL: notFound(iconURL) };
}

type EmbedAssetOptions = Omit<EmbedAssetData, "url">
type AssetSource = string | Attachment | AttachmentBuilder | EmbedAssetData | undefined | null;

export function createEmbedAsset(source: AssetSource, options?: EmbedAssetOptions): EmbedAssetData | undefined {
    if (source instanceof Attachment || source instanceof AttachmentBuilder){
        return { url: `attachment://${source.name}`, ...options };
    }
    if (source && typeof source === "object" && "url" in source){
        return source;
    }
    return source ? { url: source, ...options } : undefined;
}

type EmbedBuilderPlusAssetData = AssetSource;
type EmbedBuilderPlusColorData = string&{} | ColorResolvable | null;
type EmbedBuilderPlusFieldData = { name: string; value: string; inline?: boolean }
type EmbedBuilderPlusFooterData = { text?: string | null; iconURL?: string | null; }
type EmbedBuilderPlusAuthorData = { name: string, url?: string, iconURL?: string }

interface EmbedBuilderPlusOptions {
    extend?: Omit<EmbedBuilderPlusData, keyof EmbedBuilderPlusOptions> | EmbedData | APIEmbed | Embed;
    mergeFields?: boolean
}

interface EmbedBuilderPlusData extends EmbedBuilderPlusOptions {
    title?: string | null;
    color?: EmbedBuilderPlusColorData | null;
    description?: string | null;
    url?: string | null;
    thumbnail?: EmbedBuilderPlusAssetData | null;
    image?: EmbedBuilderPlusAssetData | null;
    fields?: Partial<EmbedBuilderPlusFieldData>[] | null
    timestamp?: string | number | Date | null;
    footer?: EmbedBuilderPlusFooterData;
    author?: EmbedBuilderPlusAuthorData
}

export class EmbedBuilderPlus extends EmbedBuilder {
    constructor(data: EmbedBuilderPlusData){

        const fields = (data.mergeFields 
            ? [data.extend?.fields??[], data.fields??[]].flat() 
            : data.fields??[]
        )
        .map(({ name=chars.invisible, value=chars.invisible, inline }) => ({
            name, value, inline
        }));

        const extend = data.extend ? new EmbedBuilderPlus(
            data.extend instanceof Embed ? data.extend.data : 
            data.extend instanceof EmbedBuilder ? data.extend.data : 
            data.extend
        ).data : {};
        
        const { fields: _, ...exetendData } = extend;

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
    public has(property: keyof Omit<EmbedBuilderPlusData, keyof EmbedBuilderPlusOptions>){
        return Object.hasOwn(this, property);
    }
    public toArray(){
        return [this];
    }
    public toString(space = 2){
        return JSON.stringify(this, null, space);
    }
    public updateField(index: number, field: Partial<EmbedBuilderPlusFieldData>){
        if (this.fields.at(index)) {
            const fields = Array.from(this.fields);
            if (field.name) fields[index].name = field.name;
            if (field.value) fields[index].value = field.value;
            if (field.inline) fields[index].inline = field.inline;
            this.setFields(fields);
        }
        return this;
    }
    public deleteField(index: number){
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
    public setAsset(asset: "thumbnail" | "image", source: EmbedBuilderPlusAssetData){
        let url: string | undefined = undefined;
        if (source instanceof Attachment || source instanceof AttachmentBuilder){
            url = `attachment://${source.name}`;
        }
        if (source && typeof source === "object" && "url" in source){
            url = source.url;
        }
        if (!url) return this;
        if (asset === "thumbnail"){
            this.setImage(url);
        } else {
            this.setThumbnail(url);
        }
        return this;
    }
    public get fieldsLength(){
        return this.data.fields?.length ?? 0;
    }
    public get fields() {
        return this.data.fields ?? [];
    }
    public createFromThis(data: EmbedBuilderPlusData = {}){
        data.extend = this;
        return new EmbedBuilderPlus(data);
    }
}

export type EmbedPropery<T extends keyof EmbedBuilderPlusData> = EmbedBuilderPlusData[T];

export function createEmbed(data: EmbedBuilderPlusData){
    return new EmbedBuilderPlus(data);
}
