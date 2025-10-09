import { Attachment, AttachmentBuilder, MediaGalleryBuilder, MediaGalleryItemData } from "discord.js";
import { isAttachment } from "../../guards/attachment";
import { isDefined } from "@magicyan/core";


export type MediaGallerySource = MediaGalleryItemData | string | Attachment | AttachmentBuilder | null | undefined

/**
 * Creates a {@link MediaGalleryBuilder} instance with a collection of media items, which can be images, attachments, or URLs.
 *
 * This function allows you to add multiple media items to a gallery, where each item can be a URL, 
 * an {@link Attachment}, or an {@link AttachmentBuilder}. It processes each item and adds it to the gallery, 
 * converting it into the appropriate format for rendering.
 *
 * **Parameters:**
 * - `items`: An array of media items to be added to the gallery. Each item can be:
 *   - A {@link MediaGalleryItemData} object, which includes media information such as URLs.
 *   - A string URL pointing to an external resource (e.g., an image URL).
 *   - An {@link Attachment} or {@link AttachmentBuilder}, which are Discord attachments.
 *
 * @param items - The media items to be added to the gallery. Each item is processed and converted into a format suitable for the gallery.
 *
 * @returns A {@link MediaGalleryBuilder} instance populated with the specified media items.
 *
 * @example
 * // Creating a media gallery with URLs and an attachment
 * const gallery = createMediaGallery(
 *   "https://example.com/image1.png",
 *   new AttachmentBuilder("image2.png", { name: "image2.png" }),
 *   { media: { url: "https://example.com/image3.png" } }
 * );
 *
 * @example
 * // Creating a media gallery with only attachments
 * const gallery = createMediaGallery(
 *   new AttachmentBuilder("file1.png", { name: "file1.png" }),
 *   new AttachmentBuilder("file2.png", { name: "file2.png" })
 * );
 *
 * @example
 * // Creating a media gallery with mixed media types (URL and attachment)
 * const gallery = createMediaGallery(
 *   "https://example.com/image1.png",
 *   new AttachmentBuilder("image2.png", { name: "image2.png" })
 * );
 *
 */
export function createMediaGallery(...items: (MediaGallerySource | MediaGallerySource[])[]): MediaGalleryBuilder {
    return new MediaGalleryBuilder({
        items: items.flat().filter(isDefined)
            .map(item => {
                if (typeof item === "string"){
                    return { media: { url: item } }
                }
                if (isAttachment(item)){
                    return { media: { url: `attachment://${item.name}` } }
                }
                return item;
            })
    });
}