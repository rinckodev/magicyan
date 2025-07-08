import { isDefined } from "@magicyan/core";
import { ActionRowBuilder, Attachment, AttachmentBuilder, type ContainerBuilder, ContainerComponentBuilder, FileBuilder, MediaGalleryBuilder, type MessageActionRowComponentBuilder, SectionBuilder, SeparatorBuilder, TextDisplayBuilder } from "discord.js";
import { isAttachment } from "../../guards/attachment";
import { isButtonBuilder } from "../../guards/components/button";
import { isAnySelectMenuBuilder } from "../../guards/components/selectmenu";
import { createMediaGallery } from "./gallery";
import { createRow } from "./row";
import { createTextDisplay } from "./text";

export type MagicComponentData =
    | string
    | Attachment 
    | AttachmentBuilder
    | MessageActionRowComponentBuilder

export type ComponentBuildersData = 
    | TextDisplayBuilder
    | SeparatorBuilder
    | FileBuilder
    | SectionBuilder
    | MediaGalleryBuilder
    | ActionRowBuilder<MessageActionRowComponentBuilder>;

export type ComponentData =
    | ComponentBuildersData
    | MagicComponentData
    | null
    | undefined
    | boolean;

export type CreateComponentData = ComponentData | ContainerBuilder;

type CreateComponentsReturn<IsContainer> = IsContainer extends true 
    ? ContainerComponentBuilder[]
    : (ContainerComponentBuilder | ContainerBuilder)[];

type CreateComponentsData<IsContainer> = IsContainer extends true 
    ? ComponentData
    : ComponentData | ContainerBuilder;

export function createComponents<
    IsContainer extends boolean = false,
    Data extends CreateComponentsData<IsContainer> = CreateComponentsData<IsContainer>
>(...data: (Data | Data[])[]){
    return data.flat()
    .filter(value => isDefined(value))
    .filter(value => typeof value !== "boolean")
    .map((component) => {
        if (typeof component === "string") {
            return createTextDisplay(component);
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
    }) as CreateComponentsReturn<IsContainer>;
}