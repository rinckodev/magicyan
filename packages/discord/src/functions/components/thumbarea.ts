import { SectionBuilder, TextDisplayBuilder } from "discord.js";
import { createSection, SectionThumbnailAccessory } from "./section";
import { createTextDisplay } from "./text";

export type ThumbAreaThumbnail = SectionThumbnailAccessory | null | undefined;

export type ThumbAreaData = {
    content: string;
    thumbnail?: ThumbAreaThumbnail;
}
/**
 * Creates either a {@link SectionBuilder} or a {@link TextDisplayBuilder} based on the presence of a thumbnail.
 *
 * If a thumbnail is provided, this function will return a {@link SectionBuilder} with the content and thumbnail.
 * Otherwise, it will return a {@link TextDisplayBuilder} with only the provided content.
 *
 * ---
 * **Overloads:**
 * - Provide `content` and optional `thumbnail` as separate parameters.
 * - Provide a single object with `content` and optional `thumbnail` properties.
 *
 * @param content - The text content to be displayed.
 * @param thumbnail - (Optional) A thumbnail to include. If provided, a section will be created; otherwise, a simple text display.
 * 
 * @param data - An object containing `content` and optional `thumbnail` properties.
 *
 * @returns A {@link SectionBuilder} if a thumbnail is provided, otherwise a {@link TextDisplayBuilder}.
 *
 * @example
 * // Using positional parameters with a thumbnail
 * const thumbSection = createThumbArea("Welcome!", "https://example.com/image.png");
 *
 * @example
 * // Using an object without a thumbnail
 * const textOnly = createThumbArea({ content: "Just text here" });
 *
 * @example
 * // Using an object with a thumbnail
 * const thumbSection = createThumbArea({
 *   content: "Check this out!",
 *   thumbnail: "https://example.com/image.png"
 * });
 */
export function createThumbArea(content: string, thumbnail?: ThumbAreaThumbnail): SectionBuilder | TextDisplayBuilder;
export function createThumbArea(data: ThumbAreaData): SectionBuilder | TextDisplayBuilder;
export function createThumbArea(argA: ThumbAreaData | string, argB?: ThumbAreaThumbnail): SectionBuilder | TextDisplayBuilder {
    const data: ThumbAreaData =
        typeof argA === "string"
            ? { content: argA, thumbnail: argB }
            : argA;

    return data.thumbnail
        ? createSection(data.content, data.thumbnail) 
        : createTextDisplay(data.content); 
}