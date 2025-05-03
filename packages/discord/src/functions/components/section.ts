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
 * Creates a {@link SectionBuilder} component with customizable content, thumbnail, and optional button.
 *
 * This function generates a section that can either have a button, a thumbnail, or both as accessories,
 * along with the provided content. The content can be a single string or an array of strings.
 * If both a button and a thumbnail are provided, only one can be set, as specified in the types.
 *
 * **Parameters:**
 * - `content`: The main content of the section. This can either be a single string or an array of strings to be displayed.
 * - `button` (optional): A {@link ButtonBuilder} instance to be added as a button accessory. If provided, no thumbnail can be set.
 * - `thumbnail` (optional): A {@link ThumbnailData} object to set as the thumbnail accessory. If provided, no button can be set.
 *
 * @param data - An object containing the properties `content`, `button`, and `thumbnail` for configuring the section.
 *
 * @returns A {@link SectionBuilder} instance with the specified configuration.
 *
 * @example
 * // Creating a section with a success button
 * const section = createSection({
 *   content: "Welcome to the section!",
 *   button: new ButtonBuilder({
 *     customId: "welcome/button",
 *     label: "Click Me",
 *     style: ButtonStyle.Success,
 *   }),
 * });
 *
 * @example
 * // Creating a section with a thumbnail and content
 * const section = createSection({
 *   content: "This is a section with a thumbnail.",
 *   thumbnail: "https://example.com/image.png"
 * });
 *
 * @example
 * // Creating a section with an array of content strings and a thumbnail
 * const section = createSection({
 *   content: ["Line 1", "Line 2", "Line 3"],
 *   thumbnail: "https://example.com/image.png"
 * });
 */
export function createSection(data: SectionData): SectionBuilder {
    const section = new SectionBuilder();

    function setAccessory(data: SectionAccessory){
        if (data instanceof ButtonBuilder) {
            return section.setButtonAccessory(data);
        }
        if (data instanceof ThumbnailBuilder){
            return section.setThumbnailAccessory(data);
        }
        if (typeof data === "string"){
            return section.setThumbnailAccessory(
                createThumbnail(data)
            );
        }
        if ("media" in data || "description" in data){
            return section.setThumbnailAccessory(
                createThumbnail(data)
            );
        }
        return section.setButtonAccessory(
            new ButtonBuilder(data)
        );
    }

    if (data.accessory || data.button || data.thumbnail){
        setAccessory(data.accessory ?? data.button ?? data.thumbnail);
    }

    if (Array.isArray(data.content)) {
        section.addTextDisplayComponents(
            data.content.map(text => createTextDisplay(text))
        );
    } else {
        section.addTextDisplayComponents(
            createTextDisplay(data.content)
        );
    }
    return section;
}