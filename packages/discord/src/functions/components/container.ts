import { hexToRgb } from "@magicyan/core";
import { ActionRowBuilder, ButtonBuilder, Colors, ContainerBuilder, FileBuilder, MediaGalleryBuilder, SectionBuilder, SeparatorBuilder, TextDisplayBuilder, type ContainerComponentData, type RGBTuple } from "discord.js";
import { isAnySelectMenuBuilder } from "../../guards/selectmenu";
import { isAttachment } from "../../guards/attachment";
import { createMediaGallery } from "./gallery";
import { ComponentData } from "./components";
import { createTextDisplay } from "./text";
import { createRow } from "./row";

export type PresetColor = keyof typeof Colors;

export interface ContainerData extends Omit<ContainerComponentData, "accentColor" | "type" | "components"> {
    accentColor?: (string&{}) | number | null | RGBTuple | PresetColor
    components: ComponentData[],
}

/**
 * Creates a {@link ContainerBuilder} component with customizable accent color and components.
 *
 * This function generates a container that can include various components such as text displays, action rows,
 * buttons, media galleries, and more. The container also allows for setting an accent color, which can be 
 * either a string (hex color), a number, a predefined color, or an RGB tuple.
 *
 * **Parameters:**
 * - `accentColor` (optional): The accent color for the container. This can be:
 *   - A hexadecimal color code (string) such as `"#ff5733"`.
 *   - A numeric value representing the color.
 *   - An {@link RGBTuple} (an array of three numbers representing RGB values).
 *   - A predefined color from the {@link Colors} enum (e.g., `Colors.Red`).
 * - `components`: An array of components that can be added to the container. These components can be:
 *   - {@link TextDisplayBuilder}, a string, {@link ActionRowBuilder}, {@link ButtonBuilder}, 
 *   - {@link SectionBuilder}, {@link MediaGalleryBuilder}, {@link FileBuilder}, or 
 *   - {@link SeparatorBuilder}. Attachments are also accepted and will be handled as media galleries.
 *
 * @param data - An object containing the properties `accentColor` and `components` for configuring the container.
 *
 * @returns A {@link ContainerBuilder} instance with the specified configuration.
 *
 * @example
 * // Creating a container with an accent color and a text display component
 * const container = createContainer({
 *   accentColor: "#ff5733", // Hex color code
 *   components: [
 *     "This is a text display component"
 *   ]
 * });
 *
 * @example
 * // Creating a container with predefined color and an action row containing a button
 * const container = createContainer({
 *   accentColor: Colors.Green, // Predefined color from Colors enum
 *   components: [
 *       createSection({
 *          content: "-# Increment counter",
 *          button: new ButtonBuilder({
 *              customId: `counter/increment`,
 *              label: "+", 
 *              style: ButtonStyle.Success
 *          })
 *      }),
 *   ]
 * });
 *
 * @example
 * // Creating a container with an RGB tuple as the accent color
 * const container = createContainer({
 *   accentColor: [255, 87, 51], // RGB tuple
 *   components: [
 *     "Here's some content."
 *   ]
 * });
 */
export function createContainer(data: ContainerData){
    const container = new ContainerBuilder();
    data.accentColor && container.setAccentColor(
        typeof data.accentColor === "string" 
        ? data.accentColor in Colors
            ? Colors[data.accentColor as keyof typeof Colors]
            : hexToRgb(data.accentColor)
        : data.accentColor
    );

    for(const component of data.components){
        if (!component) continue;
        if (typeof component === "string"){
            container.addTextDisplayComponents(
                createTextDisplay(component)
            );
        }
        if (component instanceof TextDisplayBuilder){
            container.addTextDisplayComponents(
                component
            );
        }
        if (component instanceof ActionRowBuilder){
            container.addActionRowComponents(component);
        }
        if (Array.isArray(component)){
            container.addActionRowComponents(
                createRow(...component)
            );
        }
        if (isAnySelectMenuBuilder(component) || component instanceof ButtonBuilder){
            container.addActionRowComponents(
                createRow(component)
            )
        }
        if (component instanceof SectionBuilder){
            container.addSectionComponents(component);
        }

        if (component instanceof FileBuilder){
            container.addFileComponents(component);
        }

        if (component instanceof MediaGalleryBuilder){
            container.addMediaGalleryComponents(component);
        }
        
        if (isAttachment(component)){
            container.addMediaGalleryComponents(
                createMediaGallery(component)
            );
        }
        if (component instanceof SeparatorBuilder){
            container.addSeparatorComponents(component);
        }
    }

    return container;
}