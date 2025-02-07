import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ComponentType, EmbedBuilder, InteractionButtonComponentData, Message } from "discord.js";

type PaginationMenuButtons = Record<"next" | "home" | "previous" | "close" | "action", InteractionButtonComponentData>;
const originalButtons: PaginationMenuButtons = {
    next: {
        type: ComponentType.Button,
        customId: "[discordui/menu/pagination/next]",
        label: ">", style: ButtonStyle.Primary
    },
    home: {
        type: ComponentType.Button,
        customId: "[discordui/menu/pagination/home]",
        label: ".", style: ButtonStyle.Secondary
    },
    previous: {
        type: ComponentType.Button,
        customId: "[discordui/menu/pagination/previous]",
        label: "<", style: ButtonStyle.Secondary
    },
    close: {
        type: ComponentType.Button,
        customId: "[discordui/menu/pagination/close]",
        label: "✖", style: ButtonStyle.Danger
    },
    action: {
        type: ComponentType.Button,
        customId: "[discordui/menu/pagination/action]",
        label: "!", style: ButtonStyle.Success
    }
};
export interface CustomizePaginationMenuButtons {
    next?: Partial<Omit<InteractionButtonComponentData, "disabled" | "customId" | "type">>;
    home?: Partial<Omit<InteractionButtonComponentData, "disabled" | "customId" | "type">>;
    previous?: Partial<Omit<InteractionButtonComponentData, "disabled" | "customId" | "type">>;
    close?: Partial<Omit<InteractionButtonComponentData, "disabled" | "customId" | "type">>;
    action?: Partial<Omit<InteractionButtonComponentData, "disabled" | "customId" | "type">>;
}
export function customizePaginationMenu(customizedButtons: CustomizePaginationMenuButtons, buttons = originalButtons){
    const { previous, home, next, close, action } = customizedButtons;
    if (previous) Object.assign(buttons.previous, previous);
    if (home) Object.assign(buttons.home, home);
    if (next) Object.assign(buttons.next, next);
    if (close) Object.assign(buttons.close, close);
    if (action) Object.assign(buttons.action, action);
}

interface PaginationMenuOptions {
    buttons?: CustomizePaginationMenuButtons;
    embeds: EmbedBuilder[];
    components?(buttons: PaginationMenuButtons): ActionRowBuilder<ButtonBuilder>[]
    render(embeds: EmbedBuilder[], components: ActionRowBuilder<ButtonBuilder>[]): PromiseLike<Message>;
    onClick?(interaction: ButtonInteraction, embed: EmbedBuilder): void;
    onClose?(interaction: ButtonInteraction): void;
    filter?(interaction: ButtonInteraction): boolean;
    time?: number;
    onTimeout?(): void;
}
export async function pagination(options: PaginationMenuOptions){
    const { embeds, components: componentsRender, filter, time } = options;

    const localButtons: PaginationMenuButtons = Object.create(originalButtons);
    if (options.buttons) customizePaginationMenu(options.buttons, localButtons);

    localButtons.previous.disabled = true;
    localButtons.home.disabled = true;
    if (embeds.length <= 1) localButtons.next.disabled = true;

    const getComponents: () => ActionRowBuilder<ButtonBuilder>[] = () => {
        return componentsRender 
        ? componentsRender(localButtons)
        : [new ActionRowBuilder({ components: [
            localButtons.previous,
            localButtons.home,
            localButtons.next,
            localButtons.close,
        ]})]; 
    };
    
    const components: ActionRowBuilder<ButtonBuilder>[] = getComponents();

    const message = await options.render([embeds[0]], components);
    const collector = message.createMessageComponentCollector({
        componentType: ComponentType.Button, time, filter
    });
    let index = 0;
    collector.on("collect", async interaction => {
        localButtons.home.disabled = false;
        localButtons.previous.disabled = false;
        localButtons.next.disabled = false;

        switch(interaction.customId){
            case localButtons.previous.customId: index--; break;
            case localButtons.home.customId: index = 0; break;
            case localButtons.next.customId: index++; break;
            case localButtons.close.customId: {
                collector.stop("closed");
                if (options.onClose){
                    options.onClose(interaction);
                    return;
                }
                await interaction.deferUpdate({ fetchReply: true });
                await interaction.deleteReply();
                return;
            }
            case localButtons.action.customId: {
                if (options.onClick) options.onClick(interaction, embeds[index]);
                return;
            }
        }

        if (index === 0){
            localButtons.home.disabled = true;
            localButtons.previous.disabled = true;
        }
        if (index+1 >= embeds.length){
            localButtons.next.disabled = true;
        }
        interaction.update({ embeds: [embeds[index]], components: getComponents() });
    });
    collector.on("end", (_, reason) => {
        if (reason === "time" && options.onTimeout) options.onTimeout();
    });
}