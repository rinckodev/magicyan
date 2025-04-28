import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, type ContainerBuilder, FileBuilder, MediaGalleryBuilder, type MessageActionRowComponentBuilder, SectionBuilder, SeparatorBuilder, TextDisplayBuilder } from "discord.js";
import { isAnySelectMenuBuilder } from "../../guards/selectmenu";
import { isAttachment } from "../../guards/attachment";
import { createMediaGallery } from "./gallery";
import { createTextDisplay } from "./text";
import { createRow } from "./row";

export type ComponentData =
    | TextDisplayBuilder
    | SeparatorBuilder
    | FileBuilder
    | SectionBuilder
    | MediaGalleryBuilder
    | ActionRowBuilder<MessageActionRowComponentBuilder>
    | MessageActionRowComponentBuilder[]
    | MessageActionRowComponentBuilder
    | AttachmentBuilder | AttachmentBuilder
    | string
    | null
    | undefined

export function createComponents(...data: (ComponentData | ContainerBuilder)[]) {
    return data.filter(value => value !== null).map(component => {
        if (typeof component === "string") {
            return createTextDisplay(component);
        }
        if (Array.isArray(component)) {
            return createRow(...component)
        }
        if (isAnySelectMenuBuilder(component) || component instanceof ButtonBuilder) {
            return createRow(component)
        }
        if (isAttachment(component)){
            return createMediaGallery(component);
        }
        return component;
    });
}