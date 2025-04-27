import { type LinkButtonComponentData, ButtonBuilder, ButtonStyle } from "discord.js";

interface CreateLinkButtonData extends Omit<LinkButtonComponentData, "style" | "type"> {}
export function createLinkButton(data: CreateLinkButtonData){
    data.label??=data.url;
    return new ButtonBuilder({ style: ButtonStyle.Link, ...data });
}