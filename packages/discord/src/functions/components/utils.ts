import { TopLevelComponent, MessageActionRowComponent, ThumbnailComponent, MediaGalleryComponent } from "discord.js";

export type MessageComponentWithId =
    | TopLevelComponent
    | MessageActionRowComponent
    | ThumbnailComponent
    | MediaGalleryComponent;

export type MessageComponentSource =
    | MessageComponentWithId[]
    | { components: MessageComponentWithId[] }
    | { message: { components: MessageComponentWithId[] } };

export function resolveComponentsSource(source: MessageComponentSource) {
    return Array.isArray(source)
        ? source
        : "message" in source
            ? source.message.components
            : source.components;
}