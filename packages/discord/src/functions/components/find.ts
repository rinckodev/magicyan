import { ButtonComponent, ChannelSelectMenuComponent, ComponentType, ContainerComponent, FileComponent, MediaGalleryComponent, MentionableSelectMenuComponent, MessageActionRowComponent, RoleSelectMenuComponent, SectionComponent, SeparatorComponent, StringSelectMenuComponent, TextDisplayComponent, ThumbnailComponent, UserSelectMenuComponent } from "discord.js";
import { MessageComponentSource, MessageComponentWithId } from "./utils";
import { flattenMessageComponents } from "./flatten";

/**
 * Finds a component by its identifier.
 */
export function findMessageComponentById(source: MessageComponentSource, id: number): MessageComponentWithId | null

/**
 * Finds a {@link ButtonComponent} by its identifier.
 */
export function findMessageComponentById(source: MessageComponentSource, id: number, type: ComponentType.Button): ButtonComponent | null

/**
 * Finds a {@link StringSelectMenuComponent} by its identifier.
 */
export function findMessageComponentById(source: MessageComponentSource, id: number, type: ComponentType.StringSelect): StringSelectMenuComponent | null

/**
 * Finds a {@link UserSelectMenuComponent} by its identifier.
 */
export function findMessageComponentById(source: MessageComponentSource, id: number, type: ComponentType.UserSelect): UserSelectMenuComponent | null

/**
 * Finds a {@link RoleSelectMenuComponent} by its identifier.
 */
export function findMessageComponentById(source: MessageComponentSource, id: number, type: ComponentType.RoleSelect): RoleSelectMenuComponent | null

/**
 * Finds a {@link MentionableSelectMenuComponent} by its identifier.
 */
export function findMessageComponentById(source: MessageComponentSource, id: number, type: ComponentType.MentionableSelect): MentionableSelectMenuComponent | null

/**
 * Finds a {@link ChannelSelectMenuComponent} by its identifier.
 */
export function findMessageComponentById(source: MessageComponentSource, id: number, type: ComponentType.ChannelSelect): ChannelSelectMenuComponent | null

/**
 * Finds a {@link ContainerComponent} by its identifier.
 */
export function findMessageComponentById(source: MessageComponentSource, id: number, type: ComponentType.Container): ContainerComponent | null

/**
 * Finds a {@link SectionComponent} by its identifier.
 */
export function findMessageComponentById(source: MessageComponentSource, id: number, type: ComponentType.Section): SectionComponent | null

/**
 * Finds a {@link MediaGalleryComponent} by its identifier.
 */
export function findMessageComponentById(source: MessageComponentSource, id: number, type: ComponentType.MediaGallery): MediaGalleryComponent | null

/**
 * Finds a {@link ThumbnailComponent} by its identifier.
 */
export function findMessageComponentById(source: MessageComponentSource, id: number, type: ComponentType.Thumbnail): ThumbnailComponent | null

/**
 * Finds a {@link SeparatorComponent} by its identifier.
 */
export function findMessageComponentById(source: MessageComponentSource, id: number, type: ComponentType.Separator): SeparatorComponent | null

/**
 * Finds a {@link FileComponent} by its identifier.
 */
export function findMessageComponentById(source: MessageComponentSource, id: number, type: ComponentType.File): FileComponent | null

/**
 * Finds a {@link TextDisplayComponent} by its identifier.
 */
export function findMessageComponentById(source: MessageComponentSource, id: number, type: ComponentType.TextDisplay): TextDisplayComponent | null
/**
 * Finds a {@link MessageActionRowComponent} by its identifier.
 */
export function findMessageComponentById(source: MessageComponentSource, id: number, type: ComponentType.ActionRow): MessageActionRowComponent | null
export function findMessageComponentById(source: MessageComponentSource, id: number, type?: ComponentType) {
    const components = flattenMessageComponents(source);

    return components.find(
        c => c.id === id && (type === undefined || c.type === type)
    ) ?? null;
}