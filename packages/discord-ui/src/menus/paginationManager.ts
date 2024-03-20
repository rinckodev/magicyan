import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CacheType, EmbedBuilder, type ButtonInteraction, type ComponentEmojiResolvable, type Message } from "discord.js";
import { toMergeObject } from "../helpers/utils";

interface PaginationMenuButton {
    customId?: string;
    style?: Exclude<ButtonStyle, ButtonStyle.Link>;
    label?: string;
    emoji?: ComponentEmojiResolvable
}

export interface PaginationMenuButtons {
    next?: PaginationMenuButton,
    home?: PaginationMenuButton
    previous?: PaginationMenuButton
    close?: PaginationMenuButton
    action?: PaginationMenuButton
}

type Cache<T extends boolean> = T extends true ? "cached" : CacheType 

export interface PaginationMenutOptions<T extends boolean> {
    buttons?: PaginationMenuButtons;
    embeds: EmbedBuilder[]
    components(buttons: Record<keyof PaginationMenuButtons, ButtonBuilder>): ActionRowBuilder<ButtonBuilder>[]
    render(embed: EmbedBuilder, components: ActionRowBuilder<ButtonBuilder>[]): Promise<Message<T>>;
    onClick?(interaction: ButtonInteraction<Cache<T>>, embed: EmbedBuilder): void;
    onClose?(interaction: ButtonInteraction<Cache<T>>): void;
    filter?(interaction: ButtonInteraction<Cache<T>>): boolean
    time?: number;
    onTimeout?(): void;
}
export type PaginationMenuResult<T extends boolean> = 
    | { interaction: ButtonInteraction<Cache<T>>, action: "confirm" | "cancel" } 
    | { action: "timeout" }; 

export class PaginationMenu {
    public static defaultButtons: PaginationMenuButtons = {
        next: {
            customId: "menu/pagination/next",
            label: ">",
            style: ButtonStyle.Secondary,
        },
        home: {
            customId: "menu/pagination/home",
            label: ".",
            style: ButtonStyle.Primary,
        },
        previous: {
            customId: "menu/pagination/previous",
            label: "<",
            style: ButtonStyle.Secondary,
        },
        close: {
            customId: "menu/pagination/close",
            label: "x",
            style: ButtonStyle.Danger,
        },
        action: {
            customId: "menu/pagination/action",
            style: ButtonStyle.Success,
            label: "!",
        },
    };
    public static setDefaultButtons(buttons: PaginationMenuButtons = {}){
        PaginationMenu.defaultButtons = toMergeObject(PaginationMenu.defaultButtons, buttons);
    }

}