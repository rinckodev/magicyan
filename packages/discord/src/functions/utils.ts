import { ActionRowBuilder, AnyComponentBuilder, ButtonBuilder, ButtonStyle, LinkButtonComponentData, ModalBuilder, TextInputBuilder, TextInputComponentData, TextInputStyle } from "discord.js";

export function createRow<Component extends AnyComponentBuilder = AnyComponentBuilder>
    (...components: Component[]){
    return new ActionRowBuilder<Component>({components});
}

export function createModalInput(data: Omit<TextInputComponentData, "type">){
    return createRow(new TextInputBuilder(data))
}

export function createLinkButton(data: Omit<LinkButtonComponentData, "style" | "type">){
    return new ButtonBuilder({style: ButtonStyle.Link, ...data});
}