import { ButtonBuilder, SectionBuilder } from "discord.js";
import { createTextDisplay } from "./text";
import { createThumbnail, ThumbnailData } from "./thumbnail";

export type SectionAcessoryData = {
    button?: never
    thumbnail: ThumbnailData
} | {
    button: ButtonBuilder
    thumbnail?: never
}

export type SectionData = SectionAcessoryData & {
    content: string | string[];
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

    if (data.button){
        section.setButtonAccessory(data.button);
    }
    if (data.thumbnail){
        section.setThumbnailAccessory(
            createThumbnail(data.thumbnail)
        );
    }

    if (Array.isArray(data.content)){
        section.addTextDisplayComponents(
            data.content.map(createTextDisplay)
        );
    } else {
        section.addTextDisplayComponents(
            createTextDisplay(data.content)
        );
    }
    return section;
}