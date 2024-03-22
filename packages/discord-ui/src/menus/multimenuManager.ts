import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CacheType, ColorResolvable, EmbedBuilder, MessageComponentInteraction, SelectMenuComponentOptionData, StringSelectMenuBuilder, StringSelectMenuInteraction, type ButtonInteraction, type ComponentEmojiResolvable, type Message } from "discord.js";
import { toMergeObject } from "../helpers/utils";

interface MultimenuMenuButton {
    customId?: string;
    style?: Exclude<ButtonStyle, ButtonStyle.Link>;
    label?: string;
    emoji?: ComponentEmojiResolvable
}

export interface MultimenuMenuButtons {
    next?: MultimenuMenuButton,
    home?: MultimenuMenuButton
    previous?: MultimenuMenuButton
    close?: MultimenuMenuButton
    view?: MultimenuMenuButton
}
export interface MultimenuMenuSelect {
    customId?: string;
    placeholder?: string;
}

interface MultimenuMenuItem {
    title?: string;
    description: string;
    option?: SelectMenuComponentOptionData
    color?: ColorResolvable,
    thumbnail?: string
}

export type MultiMenuViewType = "list" | "items" | "grid" | "blocks";

type Cache<T extends boolean> = T extends true ? "cached" : CacheType 
type Components = (ActionRowBuilder<ButtonBuilder> | ActionRowBuilder<StringSelectMenuBuilder>)[];

export interface MultimenuMenutOptions<T extends boolean> {
    embed?: EmbedBuilder;
    buttons?: MultimenuMenuButtons;
    selectMenu?: MultimenuMenuSelect;
    viewType?: MultiMenuViewType;
    itemsPerPage?: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    items: MultimenuMenuItem[];
    components(buttons: Record<keyof MultimenuMenuButtons, ButtonBuilder>, selectMenu: StringSelectMenuBuilder): Components
    render(embed: EmbedBuilder, components: Components): Promise<Message<T>>;
    onSelect?(interaction: StringSelectMenuInteraction<Cache<T>>, item: MultimenuMenuItem): void;
    onClose?(interaction: ButtonInteraction<Cache<T>>): void;
    filter?(interaction: MessageComponentInteraction<Cache<T>>): boolean
    time?: number;
    onTimeout?(): void;
}
export type MultimenuMenuResult<T extends boolean> = 
    | { interaction: ButtonInteraction<Cache<T>>, action: "confirm" | "cancel" } 
    | { action: "timeout" };

export class MultimenuMenu {
    public static defaultButtons: MultimenuMenuButtons = {
        next: {
            customId: "menu/multimenu/next",
            label: ">",
            style: ButtonStyle.Secondary,
        },
        home: {
            customId: "menu/multimenu/home",
            label: ".",
            style: ButtonStyle.Primary,
        },
        previous: {
            customId: "menu/multimenu/previous",
            label: "<",
            style: ButtonStyle.Secondary,
        },
        close: {
            customId: "menu/multimenu/close",
            label: "x",
            style: ButtonStyle.Danger,
        },
        view: {
            customId: "menu/multimenu/view",
            style: ButtonStyle.Primary,
            emoji: "👀"
        },
    };
    public static defaultViewType: MultiMenuViewType = "grid";
    public static defaultSelectMenu: MultimenuMenuSelect = {
        customId: "[discord-ui/multimenu/select]",
        placeholder: "Select item",
    };
    public static setDefaultButtons(buttons: MultimenuMenuButtons = {}){
        MultimenuMenu.defaultButtons = toMergeObject(MultimenuMenu.defaultButtons, buttons);
    }
    public static setDefaultViewType(viewType: MultiMenuViewType = "grid"){
        MultimenuMenu.defaultViewType = viewType;
    }
    public static setDefaultSelectMenu(selectMenu: MultimenuMenuSelect = {}){
        MultimenuMenu.defaultSelectMenu = toMergeObject(MultimenuMenu.defaultSelectMenu, selectMenu);;
    }

}