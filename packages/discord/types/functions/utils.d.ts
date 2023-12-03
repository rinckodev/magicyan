import type { AnyComponentBuilder, LinkButtonComponentData, TextInputComponentData } from "discord.js";
import { ActionRowBuilder, ButtonBuilder, TextInputBuilder } from "discord.js";
export declare function createRow<Component extends AnyComponentBuilder>(...components: Component[]): ActionRowBuilder<Component>;
export declare function createModalInput(data: Omit<TextInputComponentData, "type">): ActionRowBuilder<TextInputBuilder>;
type CreateLinkButtonData = Omit<LinkButtonComponentData, "style" | "type">;
export declare function createLinkButton(data: CreateLinkButtonData): ButtonBuilder;
export {};
