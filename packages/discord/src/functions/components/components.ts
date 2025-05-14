import { ActionRowBuilder, Attachment, AttachmentBuilder, type ContainerBuilder, FileBuilder, MediaGalleryBuilder, type MessageActionRowComponentBuilder, SectionBuilder, SeparatorBuilder, TextDisplayBuilder } from "discord.js";
import { isAttachment } from "../../guards/attachment";
import { isButtonBuilder } from "../../guards/button";
import { isAnySelectMenuBuilder } from "../../guards/selectmenu";
import { createMediaGallery } from "./gallery";
import { createRow } from "./row";
import { createTextDisplay } from "./text";

export type ComponentData =
    | TextDisplayBuilder
    | SeparatorBuilder
    | FileBuilder
    | SectionBuilder
    | MediaGalleryBuilder
    | ActionRowBuilder<MessageActionRowComponentBuilder>
    | MessageActionRowComponentBuilder[]
    | MessageActionRowComponentBuilder
    | Attachment | AttachmentBuilder
    | string
    | null
    | undefined


type CreateComponentData = ComponentData | ContainerBuilder;

export function createComponents(...data: (CreateComponentData | CreateComponentData[])[]) {
    return data.flat().filter(value => value !== null && value !== undefined).map(component => {
        if (typeof component === "string") {
            return createTextDisplay(component);
        }
        if (Array.isArray(component)) {
            return createRow(...component)
        }
        if (isAnySelectMenuBuilder(component)) {
            return createRow(component)
        }
        if (isButtonBuilder(component)){
            return createRow(component);
        }
        if (isAttachment(component)){
            return createMediaGallery(component);
        }
        return component;
    });
}