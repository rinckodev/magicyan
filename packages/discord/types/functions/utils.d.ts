import type { AnyComponentBuilder, LinkButtonComponentData, TextInputComponentData } from "discord.js";
import { ActionRowBuilder, ButtonBuilder, TextInputBuilder } from "discord.js";
export declare function createRow<Component extends AnyComponentBuilder>(...components: Component[]): ActionRowBuilder<Component>;
type CreateModalInputData = Omit<TextInputComponentData, "type">;
export declare function createModalInput(data: CreateModalInputData): ActionRowBuilder<TextInputBuilder>;
type CreateLinkButtonData = Omit<LinkButtonComponentData, "style" | "type">;
export declare function createLinkButton(data: CreateLinkButtonData): ButtonBuilder;
export {};
