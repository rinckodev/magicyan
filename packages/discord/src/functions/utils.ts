import type { AnyComponentBuilder, LinkButtonComponentData, TextInputComponentData } from "discord.js";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, } from "discord.js";

export function createRow<Component extends AnyComponentBuilder>(...components: Component[]){
    return new ActionRowBuilder<Component>({components});
}
type CreateModalInputData = Omit<TextInputComponentData, "type">;

export function createModalInput(data: CreateModalInputData){
    return createRow(new TextInputBuilder(data));
}

type CreateLinkButtonData = Omit<LinkButtonComponentData, "style" | "type">

export function createLinkButton(data: CreateLinkButtonData){
    if (!data.label) data.label = data.url;
    return new ButtonBuilder({style: ButtonStyle.Link, ...data});
}