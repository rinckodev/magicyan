import { APIUnfurledMediaItem, Attachment, AttachmentBuilder, FileBuilder } from "discord.js";
import { isAttachment } from "../../guards/attachment";

type FileSource = string | Attachment | AttachmentBuilder

interface CreateFileOptions extends Omit<APIUnfurledMediaItem, "url"> {
    spoiler?: boolean;
}

/**
 * Creates a {@link FileBuilder} from an {@link AttachmentBuilder} or an attachment reference string.
 *
 * If the `source` is an {@link AttachmentBuilder}, it automatically prefixes the file name with `"attachment://"`.
 * If the `source` is a string, it must already be a valid attachment reference in the format `"attachment://filename.ext"`.
 *
 * You can optionally provide file metadata through the `options` parameter, such as dimensions
 * or whether the file should be marked as a spoiler.
 *
 * @param source - The source of the file. Must be an {@link AttachmentBuilder} or an attachment reference string.
 * @param options - Optional metadata for the file, such as `width`, `height`, `spoiler`, and `size`.
 * 
 * @returns A {@link FileBuilder} ready to be used inside a message component.
 * 
 * @example
 * // Creating a file from an AttachmentBuilder
 * const attachment = new AttachmentBuilder("path/to/image.png");
 * const file = createFile(attachment);
 *
 * @example
 * // Creating a file from an attachment reference string
 * const file = createFile("attachment://image.png");
 *
 * @example
 * // Creating a file with additional options like marking it as a spoiler
 * const file = createFile("attachment://secret.png", { spoiler: true });
 */
export function createFile(source: FileSource, options: CreateFileOptions = {}): FileBuilder {
    const prefix = "attachment://"
    const url = isAttachment(source)
        ? `${prefix}${source.name}`
        : source

    return new FileBuilder({
        spoiler: options.spoiler,
        file: { ...options, url }
    });
}