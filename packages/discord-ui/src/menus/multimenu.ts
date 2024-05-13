import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ColorResolvable, ComponentType, EmbedBuilder, InteractionButtonComponentData, Message, MessageComponentInteraction, SelectMenuComponentOptionData, StringSelectMenuBuilder, StringSelectMenuComponentData, StringSelectMenuInteraction } from "discord.js";

type MultimenuMenuButtons = Record<"next" | "home" | "previous" | "close" | "view", InteractionButtonComponentData>;

const originalOptions = {
    placeholder: "Select item",
    viewType: "items" as MultiMenuViewType
};
const originalButtons: MultimenuMenuButtons = {
    next: {
        type: ComponentType.Button,
        customId: "[discordui/menu/multimenu/next]",
        label: ">", style: ButtonStyle.Primary
    },
    home: {
        type: ComponentType.Button,
        customId: "[discordui/menu/multimenu/home]",
        label: ".", style: ButtonStyle.Secondary
    },
    previous: {
        type: ComponentType.Button,
        customId: "[discordui/menu/multimenu/previous]",
        label: "<", style: ButtonStyle.Secondary
    },
    close: {
        type: ComponentType.Button,
        customId: "[discordui/menu/multimenu/close]",
        label: "✖", style: ButtonStyle.Danger
    },
    view: {
        type: ComponentType.Button,
        customId: "[discordui/menu/multimenu/view]",
        emoji: "👀", style: ButtonStyle.Primary
    }
};
export interface CustomizeMultimenuMenuButtons {
    next?: Partial<Omit<InteractionButtonComponentData, "disabled" | "customId" | "type">>;
    home?: Partial<Omit<InteractionButtonComponentData, "disabled" | "customId" | "type">>;
    previous?: Partial<Omit<InteractionButtonComponentData, "disabled" | "customId" | "type">>;
    close?: Partial<Omit<InteractionButtonComponentData, "disabled" | "customId" | "type">>;
    view?: Partial<Omit<InteractionButtonComponentData, "disabled" | "customId" | "type">>;
}
type Components = (ActionRowBuilder<ButtonBuilder> | ActionRowBuilder<StringSelectMenuBuilder>)[];
export interface CustomizeMultimenuMenuOptions {
    placeholder?: string;
    viewType?: MultiMenuViewType;
}
export function customizeMultimenuMenuOptions(customizedOptions: CustomizeMultimenuMenuOptions, options = originalOptions){
    const { placeholder, viewType } = customizedOptions;
    if (placeholder) Object.assign(options, { placeholder });
    if (viewType) Object.assign(options, { viewType });
}
export function customizeMultimenuMenuButtons(customizedButtons: CustomizeMultimenuMenuButtons, buttons = originalButtons){
    const { previous, home, next, close, view } = customizedButtons;
    if (previous) Object.assign(buttons.previous, previous);
    if (home) Object.assign(buttons.home, home);
    if (next) Object.assign(buttons.next, next);
    if (close) Object.assign(buttons.close, close);
    if (view) Object.assign(buttons.view, view);
}
export type MultiMenuViewType = "list" | "items" | "grid" | "blocks";
interface MultimenuItem {
    title?: string;
    description: string;
    color?: string | ColorResolvable;
    thumbnail?: string;
    option?: SelectMenuComponentOptionData
}
interface MultimenuMenuOptions extends CustomizeMultimenuMenuOptions {
    embed?: EmbedBuilder;
    buttons?: CustomizeMultimenuMenuButtons;
    items: MultimenuItem[];
    itemsPerPage?: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    components?(buttons: MultimenuMenuButtons, selectMenu: StringSelectMenuBuilder): Components
    render(embeds: EmbedBuilder[], components: Components): PromiseLike<Message>;
    onSelect?(interaction: StringSelectMenuInteraction, item: MultimenuItem): void;
    onClose?(interaction: ButtonInteraction): void;
    filter?(interaction: MessageComponentInteraction): boolean;
    time?: number;
    onTimeout?(): void;
}
export async function multimenu(options: MultimenuMenuOptions){
    const { embed, items, components: componentsRender, filter, time, itemsPerPage=10 } = options;

    const localButtons: MultimenuMenuButtons = Object.create(originalButtons);
    if (options.buttons) customizeMultimenuMenuButtons(options.buttons, localButtons);
    const localOptions: Required<CustomizeMultimenuMenuOptions> = Object.create(originalOptions);
    customizeMultimenuMenuOptions(options, localOptions);

    const selectMenu = new StringSelectMenuBuilder({
        customId: "[discordui/menu/multimenu/select]",
        placeholder: localOptions.placeholder,
    });

    const getComponents: () => Components = () => {
        return componentsRender 
        ? componentsRender(localButtons, selectMenu)
        : [
            ...selectMenu.options.length >= 1 
                ? [new ActionRowBuilder({ components: [selectMenu]})]
                : [],
            new ActionRowBuilder({ components: [
                localButtons.previous,
                localButtons.home,
                localButtons.next,
                localButtons.view,
                localButtons.close,
            ]})
        ] as Components; 
    };

    let page = 0;
    const maxPages = Math.ceil(items.length / itemsPerPage);

    if (page+1 >= maxPages) localButtons.next.disabled = true;
    localButtons.previous.disabled = true;
    localButtons.home.disabled = true;

    const refreshItems = () => {
        const embeds: EmbedBuilder[] = [];
        if (originalOptions.viewType !== "blocks"){
            embeds.push(embed ?? new EmbedBuilder({ fields: [] }));
            embeds[0].setFields();
        }
        
        const options: StringSelectMenuComponentData["options"] = [];
        const voidField = { name: "\u200b", value: "\u200b", inline: true };

        let itemsPushed = 0;
        for (let i = 0; i < itemsPerPage; i++) {
            const index = itemsPerPage * page + i;
            const item = items[index];

            if (!item) break;

            itemsPushed++;

            const field = {
                name: item.title??"\u200b",
                value: item.description,
                inline: true,
            };

            if (item.option) options.push({
                label: item.option.label,
                value: item.option.value,
                description: item.option.description,
                emoji: item.option.emoji,
            });

            switch(localOptions.viewType){
                case "list":{
                    field.inline = false;
                    embeds[0].addFields(field);
                    break;
                } 
                case "items":{
                    embeds[0].addFields(field);
                    if (itemsPushed == 2) {
                        embeds[0].addFields(voidField);
                        itemsPushed=0;
                    }
                    break;
                } 
                case "grid":{
                    embeds[0].addFields(field);
                    break;
                }
                case "blocks":{
                    const embed = new EmbedBuilder({
                        title: item.title,
                        description: item.description,
                    });
                    if (item.thumbnail) embed.setThumbnail(item.thumbnail);
                    embed.setColor((item.color??"#2F3136") as ColorResolvable);
                    embeds.push(embed);
                    break;
                }
            }
        }
        selectMenu.setOptions(options);
        return embeds;
    };

    const embeds = refreshItems();
    const components = getComponents();

    const message = await options.render(embeds, components);
    const collector = message.createMessageComponentCollector({ time, filter });
    collector.on("collect", async interaction => {
        localButtons.home.disabled = false;
        localButtons.previous.disabled = false;
        localButtons.next.disabled = false;

        switch(interaction.customId){
            case localButtons.previous.customId: page--; break;
            case localButtons.home.customId: page = 0; break;
            case localButtons.next.customId: page++; break;
            case localButtons.close.customId: {
                collector.stop("closed");
                if (options.onClose){
                    options.onClose(interaction as ButtonInteraction);
                    return;
                }
                await interaction.deferUpdate({ fetchReply: true });
                await interaction.deleteReply();
                return;
            }
            case localButtons.view.customId: {
                const switcher = {
                    list:()=> originalOptions.viewType = "items",
                    items:()=> originalOptions.viewType = "grid",
                    grid:()=> originalOptions.viewType = "blocks",
                    blocks:()=> originalOptions.viewType = "list",
                };
                switcher[originalOptions.viewType]();
                break;
            }
            case selectMenu.data.custom_id: {
                const selectInteraction = interaction as StringSelectMenuInteraction;
                if (options.onSelect){
                    const item = items.find(item => item.option?.value === selectInteraction.values[0]);
                    if (!item) return; 
                    options.onSelect(selectInteraction, item);
                }
                return;
            }
        }

        if (page === 0){
            localButtons.home.disabled = true;
            localButtons.previous.disabled = true;
        }
        if (page+1 >= maxPages){
            localButtons.next.disabled = true;
        }
        interaction.update({ embeds: refreshItems(), components: getComponents() });
    });
    collector.on("end", (_, reason) => {
        if (reason === "time" && options.onTimeout) options.onTimeout();
    });
}