import { ActionRowBuilder, AnyComponentBuilder, ButtonBuilder, LinkButtonComponentData, TextInputBuilder, TextInputComponentData } from "discord.js";
export declare function createRow<Component extends AnyComponentBuilder>(...components: Component[]): ActionRowBuilder<Component>;
export declare function createModalInput(data: Omit<TextInputComponentData, "type">): ActionRowBuilder<TextInputBuilder>;
export declare function createLinkButton(data: Omit<LinkButtonComponentData, "style" | "type">): ButtonBuilder;
