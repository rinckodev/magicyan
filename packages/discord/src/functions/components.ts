import { type AnyComponentBuilder, type LinkButtonComponentData, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export function createRow<Component extends AnyComponentBuilder>(...components: Component[]){
    return new ActionRowBuilder<Component>({ components });
}
interface CreateLinkButtonData extends Omit<LinkButtonComponentData, "style" | "type"> {}
export function createLinkButton(data: CreateLinkButtonData){
    data.label??=data.url;
    return new ButtonBuilder({ style: ButtonStyle.Link, ...data });
}