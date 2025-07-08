import { MediaGalleryBuilder, MediaGalleryItemBuilder } from "discord.js";
import { hasConstructor } from "../utils";

/**
 * Checks whether the given value is a {@link MediaGalleryBuilder}.
 *
 * This function returns `true` if the value is an instance of `MediaGalleryBuilder`,
 * or if it structurally matches by constructor name.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a `MediaGalleryBuilder`, otherwise `false`.
 *
 * @example
 * import type { MediaGalleryBuilder } from "discord.js";
 * 
 * function handle(input: MediaGalleryBuilder | unknown) {
 *   if (isMediaGalleryBuilder(input)) {
 *     input.addItems({ media: { url: "https://example.com/image.png" } });
 *   }
 * }
 */
export function isMediaGalleryBuilder(value: unknown): value is MediaGalleryBuilder {
  return value instanceof MediaGalleryBuilder ||
    (hasConstructor(value) && value.constructor.name === MediaGalleryBuilder.name);
}

/**
 * Checks whether the given value is a {@link MediaGalleryItemBuilder}.
 *
 * This function returns `true` if the value is an instance of `MediaGalleryItemBuilder`,
 * or if it structurally matches by constructor name.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a `MediaGalleryItemBuilder`, otherwise `false`.
 *
 * @example
 * import type { MediaGalleryItemBuilder } from "discord.js";
 * 
 * function handle(input: MediaGalleryItemBuilder | unknown) {
 *   if (isMediaGalleryItemBuilder(input)) {
 *     input.setURL("https://example.com/image.png");
 *   }
 * }
 */
export function isMediaGalleryItemBuilder(value: unknown): value is MediaGalleryItemBuilder {
  return value instanceof MediaGalleryItemBuilder ||
    (hasConstructor(value) && value.constructor.name === MediaGalleryItemBuilder.name);
}
