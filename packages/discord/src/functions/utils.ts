import { ActionRowBuilder, AnyComponentBuilder, ButtonBuilder, ButtonStyle, LinkButtonComponentData, TextInputBuilder, TextInputComponentData } from "discord.js";

export function createRow<Component extends AnyComponentBuilder>
    (...components: Component[]){
    return new ActionRowBuilder<Component>({components});
}

export function createModalInput(data: Omit<TextInputComponentData, "type">){
    return createRow(new TextInputBuilder(data));
}

export function createLinkButton(data: Omit<LinkButtonComponentData, "style" | "type">){
    if (!data.label) data.label = data.url;
    return new ButtonBuilder({style: ButtonStyle.Link, ...data});
}