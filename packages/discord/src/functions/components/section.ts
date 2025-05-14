import { ButtonBuilder, ButtonComponentData, SectionBuilder, ThumbnailBuilder } from "discord.js";
import { createTextDisplay } from "./text";
import { createThumbnail, ThumbnailData } from "./thumbnail";

export type SectionThumbnailAccessory = ThumbnailBuilder | ThumbnailData;
export type SectionButtonAccessory = ButtonBuilder | Partial<ButtonComponentData>;

export type SectionAccessory = SectionThumbnailAccessory | SectionButtonAccessory;

export type SectionAccessoryData =
    | {
        accessory: SectionAccessory
        button?: never
        thumbnail?: never
    }
    | {
        button: SectionButtonAccessory
        thumbnail?: never
        accessory?: never
    }
    | {
        thumbnail: SectionThumbnailAccessory
        button?: never
        accessory?: never
    }

export type SectionData = SectionAccessoryData & {
    content: | string | string[]
}

/**
 * Creates a {@link SectionBuilder} component with customizable text content and a single visual accessory.
 *
 * This function allows you to generate a section with content (as a string or an array of strings)
 * and optionally include a single accessory, which can be a button or a thumbnail.
 * You can provide the accessory in multiple forms: a builder instance, a plain data object, or a URL string (for thumbnails).
 *
 * ---
 * ### Overloads:
 *
 * 1. `createSection(content, accessory)`  
 *    Pass content as a string and an accessory separately.
 *
 * 2. `createSection({ content, accessory | button | thumbnail })`  
 *    Pass an object with full configuration, using only one of the accessory types.
 *
 * ---
 *
 * @param content - The main content of the section. Only used in overload 1.
 * @param accessory - A {@link ButtonBuilder}, {@link ThumbnailBuilder}, or raw data used to build the accessory. Only used in overload 1.
 *
 * @param data - An object in overload 2 containing:
 * - `content`: A string or array of strings for display.
 * - `accessory`: (optional) A single accessory, either a button or thumbnail.
 * - `button`: (optional) A {@link ButtonBuilder} or partial button data. Mutually exclusive with `thumbnail` and `accessory`.
 * - `thumbnail`: (optional) A {@link ThumbnailBuilder}, {@link ThumbnailData}, or image URL. Mutually exclusive with `button` and `accessory`.
 *
 * @returns A configured {@link SectionBuilder} instance with the provided content and accessory.
 *
 * @example
 * // Overload 1: Using content and accessory separately
 * const section = createSection("Hello World", new ButtonBuilder().setLabel("Click"));
 *
 * @example
 * // Overload 2: Using content and thumbnail URL via `thumbnail`
 * const section = createSection({
 *   content: "Here's an image section",
 *   thumbnail: "https://example.com/image.png"
 * });
 *
 * @example
 * // Overload 2: Using content and button via `accessory`
 * const section = createSection({
 *   content: "Button section",
 *   accessory: new ButtonBuilder().setCustomId("id").setLabel("Press").setStyle(ButtonStyle.Primary)
 * });
 */
export function createSection(content: string, accessory: SectionAccessory): SectionBuilder;
export function createSection(data: SectionData): SectionBuilder;
export function createSection(argA: SectionData | string, argB?: SectionAccessory): SectionBuilder {
    const section = new SectionBuilder();

    function setAccessory(data: SectionAccessory) {
        if (data instanceof ButtonBuilder) {
            return section.setButtonAccessory(data);
        }
        if (data instanceof ThumbnailBuilder) {
            return section.setThumbnailAccessory(data);
        }
        if (typeof data === "string") {
            return section.setThumbnailAccessory(createThumbnail(data));
        }
        if ("media" in data || "description" in data) {
            return section.setThumbnailAccessory(createThumbnail(data));
        }
        return section.setButtonAccessory(new ButtonBuilder(data));
    }

    const data: SectionData =
        typeof argA === "string"
            ? { content: argA, accessory: argB! }
            : argA;

    if (data.accessory || data.button || data.thumbnail) {
        setAccessory(data.accessory ?? data.button ?? data.thumbnail);
    }

    if (Array.isArray(data.content)) {
        section.addTextDisplayComponents(
            data.content.map((text) => createTextDisplay(text))
        );
    } else {
        section.addTextDisplayComponents(createTextDisplay(data.content));
    }

    return section;
}