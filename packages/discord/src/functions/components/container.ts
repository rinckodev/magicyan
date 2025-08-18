import { isDefined } from "@magicyan/core";
import { ActionRowBuilder, APIContainerComponent, ButtonBuilder, ColorResolvable, ComponentType, ContainerBuilder, ContainerComponent, ContainerComponentBuilder, FileBuilder, MediaGalleryBuilder, Message, resolveColor, SectionBuilder, SeparatorBuilder, TextDisplayBuilder, type ContainerComponentData } from "discord.js";
import { ComponentData, createComponents } from "./components";
import { isMessage } from "../../guards/message";

export type ContainerColor = (string & {}) | ColorResolvable;

export type ContainerInComponentType =
    | ComponentType.TextDisplay
    | ComponentType.ActionRow
    | ComponentType.Section
    | ComponentType.Separator
    | ComponentType.MediaGallery
    | ComponentType.File

type ContainerType = ContainerBuilder | ContainerPlusBuilder | ContainerComponent;

type InteractionWithMessage = { message: Message };

export interface ContainerData extends Omit<ContainerComponentData, "accentColor" | "type" | "components"> {
    accentColor?: ContainerColor | null
    components?: ComponentData[],
    from?: ContainerType | Message | InteractionWithMessage;
    fromIndex?: number;
}
export class ContainerPlusBuilder extends ContainerBuilder {
    constructor(data?: ContainerData) {
        const extractData = (message: Message) => message.components
            .filter(v => v.type === ComponentType.Container)
            .at(data?.fromIndex ?? 0)?.toJSON() ?? {}

        const constructorData: Partial<APIContainerComponent> = isDefined(data?.from)
            ? "message" in data.from ? extractData(data.from.message) 
            : isMessage(data.from) ? extractData(data.from) 
                : data.from.toJSON()
                : {}

        if (isDefined(data?.accentColor)) {
            constructorData.accent_color = resolveColor(
                data.accentColor as ColorResolvable
            );
        }
        super(constructorData);

        if (isDefined(data?.components) && data.components.length >= 1) {
            this.spliceComponents(0, 0,
                ...createComponents<true>(data.components)
            );
        }
    }
    /**
     * Sets the accent color of the container.
     *
     * If a color is provided, it resolves and sets the accent color accordingly.
     * If no color or `null` is provided, it clears the accent color.
     *
     * @param color - The color to set as the accent color, or `null` to clear it.
     * @returns The current instance for chaining.
     *
     * @example
     * container.setColor("#ff0000"); // Sets the accent color to red.
     * container.setColor(null);      // Clears the accent color.
     */
    public setColor(color?: ContainerColor | null) {
        return isDefined(color)
            ? this.setAccentColor(resolveColor(color as ColorResolvable))
            : this.setAccentColor();
    }
    /**
     * Replaces or removes a component at the specified index in the container.
     *
     * If `data` is provided, it replaces the component at the given index with the new component(s).
     * If `null` is provided, it removes the component at that index.
     *
     * @param index - The index of the component to replace or remove.
     * @param data - The new component data to set, or `null` to remove the component.
     * @returns The current instance for chaining.
     *
     * @example
     * container.setComponent(0, new ButtonBuilder({ label: "Click" }));
     * container.setComponent(1, null); // Removes the component at index 1.
     */
    public setComponent(index: number, data: ComponentData | null) {
        const args: [number, number, ...ContainerComponentBuilder[]] = [index, 1];
        if (isDefined(data)) args.push(...createComponents<true>(data));
        return this.spliceComponents(...args);
    }
    /**
     * Retrieves a component from the container at the specified index, optionally filtering by component type.
     *
     * When the `type` is specified, it filters components by that type and returns the one at the given index.
     * If `type` is omitted, it returns the component at the index without filtering.
     *
     * @param index - The index of the component to retrieve.
     * @param type - (Optional) The type of component to filter by.
     * @returns The component builder if found; otherwise `undefined`.
     *
     * @example
     * const button = container.componentAt(0, ComponentType.ActionRow);
     * const firstComponent = container.componentAt(0);
     */
    public componentAt(index: number): ContainerComponentBuilder | undefined
    public componentAt(index: number, type: ComponentType.TextDisplay): TextDisplayBuilder | undefined
    public componentAt(index: number, type: ComponentType.ActionRow): ActionRowBuilder | undefined
    public componentAt(index: number, type: ComponentType.Separator): SeparatorBuilder | undefined
    public componentAt(index: number, type: ComponentType.MediaGallery): MediaGalleryBuilder | undefined
    public componentAt(index: number, type: ComponentType.File): FileBuilder | undefined
    public componentAt(index: number, type?: ContainerInComponentType): ContainerComponentBuilder | undefined {
        return isDefined(type)
            ? this.components
                .filter(builder => builder.data.type === type)
                .at(index)
            : this.components.at(index);
    }
}
/**
 * Creates one or multiple {@link ContainerPlusBuilder} components with optional accent color and child components.
 *
 * This function supports two main usage patterns:
 * 1. Passing a `ContainerData` object with optional `array` flag:
 *    - If `array` is `true` and `from` is a message, returns an array of containers extracted from the message components.
 *    - If `array` is `true` without a message `from`, returns an array with one container.
 *    - Otherwise, returns a single container.
 * 2. Passing an accent color (string, number, or RGB tuple) directly, followed by one or more components.
 *
 * The container can include various types of components such as:
 * - `string` (converted to {@link TextDisplayBuilder})
 * - {@link TextDisplayBuilder}
 * - {@link ActionRowBuilder}
 * - {@link ButtonBuilder}
 * - {@link SectionBuilder}
 * - {@link MediaGalleryBuilder}
 * - {@link FileBuilder}
 * - {@link SeparatorBuilder}
 * - Discord attachments (treated as media galleries)
 *
 * @param data - A `ContainerData` object (with optional `array` and `from` properties) or a color value.
 * @param items - When `data` is a color, this is the list of components to include in the container.
 *
 * @returns Either a single {@link ContainerPlusBuilder} or an array of them, depending on the `array` flag and `from` property.
 *
 * @example
 * // Create a single container with accent color and components
 * const container = createContainer({
 *   accentColor: "#ff5733",
 *   components: ["Welcome!"]
 * });
 *
 * @example
 * // Create multiple containers extracted from a message
 * const containers = createContainer({
 *   array: true,
 *   from: message
 * });
 *
 * @example
 * // Create container by passing color and components separately
 * const container = createContainer("Blue",
 *   new TextDisplayBuilder().setText("Notice"),
 *   new SeparatorBuilder()
 * );
 */
export function createContainer(data: ContainerData & { array?: boolean }): ContainerPlusBuilder
export function createContainer(data: ContainerData & { array?: true }): ContainerPlusBuilder[]
export function createContainer(data: ColorResolvable | string, ...components: (ComponentData | ComponentData[])[]): ContainerPlusBuilder
export function createContainer(data: ContainerColor | (ContainerData & { array?: boolean }), ...items: (ComponentData | ComponentData[])[]): ContainerPlusBuilder | ContainerBuilder[] {
    const isContainerData = (value: unknown): value is ContainerData =>
        typeof value === "object" && isDefined(value) && !Array.isArray(value);

    if (isContainerData(data)) {
        const { array, from } = data;

        if (array) {
            if (isMessage(from)) {
                return from.components
                    .filter(c => c.type === ComponentType.Container)
                    .map(component => new ContainerPlusBuilder({ from: component }));
            }
            return [new ContainerPlusBuilder(data)];
        }
        return new ContainerPlusBuilder(data);
    }

    return new ContainerPlusBuilder({
        accentColor: data,
        components: items.flat(),
    });
}