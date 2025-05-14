import { ActionRowBuilder, ButtonBuilder, ColorResolvable, ContainerBuilder, FileBuilder, MediaGalleryBuilder, resolveColor, SectionBuilder, SeparatorBuilder, TextDisplayBuilder, type ContainerComponentData } from "discord.js";
import { isAttachment } from "../../guards/attachment";
import { isAnySelectMenuBuilder } from "../../guards/selectmenu";
import { ComponentData } from "./components";
import { createMediaGallery } from "./gallery";
import { createRow } from "./row";
import { createTextDisplay } from "./text";

export type ContainerColor = (string&{}) | ColorResolvable

export interface ContainerData extends Omit<ContainerComponentData, "accentColor" | "type" | "components"> {
    accentColor?: ContainerColor
    components: ComponentData[],
}
/**
 * Creates a {@link ContainerBuilder} component with optional accent color and a set of child components.
 *
 * This function can be used in two ways:
 * 1. By passing an object with `accentColor` and `components` properties.
 * 2. By passing the `accentColor` directly followed by a list of components.
 *
 * The container can include various types of components such as:
 * - `string` (converted to `TextDisplayBuilder`)
 * - {@link TextDisplayBuilder}
 * - {@link ActionRowBuilder}
 * - Arrays of components (converted to an action row)
 * - {@link ButtonBuilder}
 * - {@link SectionBuilder}
 * - {@link MediaGalleryBuilder}
 * - {@link FileBuilder}
 * - {@link SeparatorBuilder}
 * - Discord attachments (treated as media galleries)
 *
 * @param data - Either a `ContainerData` object containing `accentColor` and `components`, or the accent color directly.
 * @param components - When using the overload with accent color as the first parameter, this is the list of components to include in the container.
 *
 * @returns A {@link ContainerBuilder} instance with all components and styles applied.
 *
 * @example
 * // Using ContainerData object
 * const container = createContainer({
 *   accentColor: "#ff5733",
 *   components: ["Welcome to the app!"]
 * });
 *
 * @example
 * // Using color and components as separate arguments
 * const container = createContainer("Red",
 *   new TextDisplayBuilder().setText("Alert!"),
 *   new SeparatorBuilder()
 * );
 *
 * @example
 * // Using RGB tuple
 * const container = createContainer([255, 0, 0], "Red alert");
 */
export function createContainer(data: ContainerData): ContainerBuilder
export function createContainer(data: ColorResolvable | string, ...components: (ComponentData | ComponentData[])[]): ContainerBuilder
export function createContainer(data: ContainerColor | ContainerData, ...items: (ComponentData | ComponentData[])[]): ContainerBuilder{
    const container = new ContainerBuilder();
    const addComponent = (component: ComponentData) => {
        if (!component) return;
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
    const setColor = (color: ContainerColor) => {
        container.setAccentColor(
            resolveColor(color as ColorResolvable)
        )
    }
    
    const isContainerData = (value: any): value is ContainerData =>
        typeof value === "object" 
        && "components" in value 
        && Array.isArray(value.components)

    if (isContainerData(data)){
        if (data.accentColor) setColor(data.accentColor);
        if (data.spoiler !== undefined) container.setSpoiler(data.spoiler);
        if (data.id !== undefined) container.setId(data.id);
        for(const component of data.components) addComponent(component);
        return container;
    }
    
    setColor(data);
    
    for(const component of items.flat()) addComponent(component);

    return container;
}