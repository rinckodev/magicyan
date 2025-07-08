import { Attachment, AttachmentBuilder } from "discord.js";
import { hasConstructor } from "./utils";

/**
 * Checks whether the given value is an {@link Attachment} or an {@link AttachmentBuilder}.
 *
 * This function returns `true` if the value is an instance of either class,
 * or if it structurally matches by constructor name (useful across module boundaries).
 *
 * @param value - The value to check.
 * @returns `true` if the value is an attachment or attachment builder, otherwise `false`.
 *
 * @example
 * import { Attachment, AttachmentBuilder } from "discord.js";
 * 
 * function handle(input: Attachment | AttachmentBuilder | unknown) {
 *   if (isAttachment(input)) {
 *     console.log("Attachment name:", input.name);
 *   }
 * }
 */
export function isAttachment(value: unknown): value is Attachment | AttachmentBuilder {
    return value instanceof Attachment || 
        value instanceof AttachmentBuilder ||
        (
            hasConstructor(value) &&
            [
                Attachment.name,
                AttachmentBuilder.name,
            ].some(name =>
                name === value.constructor.name
            )
        );
}