import { Attachment, AttachmentBuilder, ThumbnailBuilder, ThumbnailComponentData } from "discord.js";

export type ThumbnailData = 
| Partial<Omit<ThumbnailComponentData, "type">> 
| Attachment | AttachmentBuilder
| string 

/**
 * Creates a {@link ThumbnailBuilder} from a URL, an attachment, or partial thumbnail data.
 *
 * This function helps create a thumbnail component for a container. 
 * It supports different input formats, such as a direct URL string, 
 * an {@link AttachmentBuilder}, an {@link Attachment}, or a partial {@link ThumbnailComponentData}.
 *
 * **Important:**  
 * - If providing a string, it must either be a valid URL or a reference to an attachment using the `attachment://filename.ext` format.
 *
 * @param data - The thumbnail source: a URL, an attachment builder, an attachment, or partial thumbnail data.
 * 
 * @returns A {@link ThumbnailBuilder} instance populated with the provided data.
 * 
 * @example
 * // Creating a thumbnail from a URL
 * const thumbnail = createThumbnail("https://example.com/image.png");
 * 
 * @example
 * // Creating a thumbnail from partial data
 * const thumbnail = createThumbnail({
 *   media: { url: "attachment://image.png" },
 *   spoiler: true
 * });
 */
export function createThumbnail(data: ThumbnailData): ThumbnailBuilder {
    const thumbnail = new ThumbnailBuilder();

    if (typeof data === "string"){
        return thumbnail.setURL(data);
    }
    if (data instanceof AttachmentBuilder || data instanceof Attachment){
        return thumbnail
        .setURL(`attachment://${data.name}`)
        .setSpoiler(data.spoiler);
    }
    return new ThumbnailBuilder(data);
}