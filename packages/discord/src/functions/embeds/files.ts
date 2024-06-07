import { AttachmentBuilder, EmbedBuilder } from "discord.js";

type ImageFileExtention = "png" | "jpg" | "gif" | "webp";
type ImageElementProperty = "author" | "thumbnail" | "image" | "footer";

interface CreateEmbedFilesOptions {
    ignore?: ImageElementProperty[]
    extentions?: Record<ImageElementProperty, ImageFileExtention>;
}
/**
 * Turns any embed image url into an attachment and returns an attachment array
 */
export function createEmbedFiles(embed: EmbedBuilder, options?: CreateEmbedFilesOptions): AttachmentBuilder[] {
    const { thumbnail, image, footer, author } = embed.data;

    const files: AttachmentBuilder[] = [];

    const handle = (url: string, name: string, ext: string = "png") => {
        files.push(new AttachmentBuilder(url, { name: `${name}.${ext}` }));
        return `attachment://${name}.${ext}`;
    };

    if (thumbnail?.url && !options?.ignore?.includes("thumbnail")){
        const url = handle(thumbnail.url, "thumbnail", options?.extentions?.thumbnail);
        embed.setThumbnail(url);
    }
    if (image?.url && !options?.ignore?.includes("image")){
        const url = handle(image.url, "image", options?.extentions?.image);
        embed.setImage(url);
    }
    if (author?.icon_url && !options?.ignore?.includes("author")){
        const url = handle(author?.icon_url, "author", options?.extentions?.author);
        embed.setAuthor({ name: author.name, iconURL: url, url: author.url });
    }
    if (footer?.icon_url && !options?.ignore?.includes("footer")){
        const url = handle(footer.icon_url, "footer", options?.extentions?.footer);
        embed.setFooter({ text: footer.text, iconURL: url });
    }
    return files;
}