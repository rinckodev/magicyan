import { AttachmentBuilder, EmbedBuilder } from "discord.js";

type ImageFileExtention = "png" | "jpg" | "gif" | "webp";
type ImageElementProperty = "author" | "thumbnail" | "image" | "footer";

interface CreateEmbedFilesOptions {
    ignore?: ImageElementProperty[]
    extentions?: Partial<Record<ImageElementProperty, ImageFileExtention>>;
    names?: Partial<Record<ImageElementProperty, string>>;
}
/**
 * Turns any embed image url into an attachment and returns an attachment array
 */
export function createEmbedFiles(embed: EmbedBuilder, options?: CreateEmbedFilesOptions): AttachmentBuilder[] {
    const { thumbnail, image, footer, author } = embed.data;
    const extentions = options?.extentions;
    const ignore = options?.ignore;
    const names = options?.names;

    const files: AttachmentBuilder[] = [];

    const handle = (url: string, name: string, ext: string = "png") => {
        files.push(new AttachmentBuilder(url, { name: `${name}.${ext}` }));
        return `attachment://${name}.${ext}`;
    };

    if (thumbnail?.url && !ignore?.includes("thumbnail")){
        const url = handle(thumbnail.url, names?.thumbnail??"thumbnail", extentions?.thumbnail);
        embed.setThumbnail(url);
    }
    if (image?.url && !ignore?.includes("image")){
        const url = handle(image.url, names?.image??"image", extentions?.image);
        embed.setImage(url);
    }
    if (author?.icon_url && !ignore?.includes("author")){
        const url = handle(author?.icon_url, names?.author??"author", extentions?.author);
        embed.setAuthor({ name: author.name, iconURL: url, url: author.url });
    }
    if (footer?.icon_url && !ignore?.includes("footer")){
        const url = handle(footer.icon_url, names?.footer??"footer", extentions?.footer);
        embed.setFooter({ text: footer.text, iconURL: url });
    }
    return files;
}