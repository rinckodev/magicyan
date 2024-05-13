import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ComponentType, InteractionButtonComponentData, Message } from "discord.js";

type ConfirmPromptButtons = Record<"confirm" | "cancel", InteractionButtonComponentData>;
const originalButtons: ConfirmPromptButtons = {
    confirm: {
        type: ComponentType.Button,
        customId: "[discordui/prompt/confirm/confirm]",
        label: "✔", style: ButtonStyle.Success
    },
    cancel: {
        type: ComponentType.Button,
        customId: "[discordui/prompt/confirm/cancel]",
        label: "✖", style: ButtonStyle.Danger
    }
};
export interface CustomizeConfirmPromptButtons {
    confirm?: Partial<Omit<InteractionButtonComponentData, "disabled" | "customId" | "type">>;
    cancel?: Partial<Omit<InteractionButtonComponentData, "disabled" | "customId" | "type">>;
}
export function customizeConfirmPrompt(customizedButtons: CustomizeConfirmPromptButtons, buttons = originalButtons){
    const { confirm, cancel } = customizedButtons;
    if (confirm) Object.assign(buttons.confirm, confirm);
    if (cancel) Object.assign(buttons.cancel, cancel);
}
interface ConfirmPromptOptions {
    buttons?: CustomizeConfirmPromptButtons;
    components?(buttons: ConfirmPromptButtons): ActionRowBuilder<ButtonBuilder>[];
    render(components: ActionRowBuilder<ButtonBuilder>[]): PromiseLike<Message>;
    onClick(interaction: ButtonInteraction, isCancel: boolean): void;
    onTimeout?(): void;
    time?: number;
    filter?(interaction: ButtonInteraction): boolean;
}
export async function confirm(options: ConfirmPromptOptions){
    const { filter, render, components: componentsRender, onClick, onTimeout, time } = options;

    const localButtons: ConfirmPromptButtons = Object.create(originalButtons);
    if (options.buttons) customizeConfirmPrompt(options.buttons, localButtons);

    const getComponents: () => ActionRowBuilder<ButtonBuilder>[] = () => {
        return componentsRender 
        ? componentsRender(localButtons)
        : [new ActionRowBuilder({ components: [
            localButtons.confirm, localButtons.cancel
        ]})]; 
    };
    
    const components = getComponents(); 
    
    // componentsRender 
    //     ? Array.isArray(componentsRender(localButtons))
    //         ? componentsRender(localButtons) as ActionRowBuilder<ButtonBuilder>[]
    //         : [componentsRender(localButtons)] as ActionRowBuilder<ButtonBuilder>[]
    //     : [new ActionRowBuilder({ components: Object.values(localButtons) })];

    const message = await render(components);
    const collector = message.createMessageComponentCollector({
        componentType: ComponentType.Button,
        time, filter,
    });
    collector.on("collect", interaction => {
        onClick(interaction, originalButtons.cancel.customId === interaction.customId);
        collector.stop("clicked");
    });
    collector.on("end", (_, reason) => {
        if (reason === "time" && onTimeout) onTimeout();
    });
}