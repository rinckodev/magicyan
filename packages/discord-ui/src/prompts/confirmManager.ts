import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CacheType, type ButtonInteraction, type ComponentEmojiResolvable, type Interaction, type InteractionResponse, type Message } from "discord.js";
import { toMergeObject } from "../helpers/utils";

interface PromptButton {
    customId?: string;
    style?: Exclude<ButtonStyle, ButtonStyle.Link>;
    label?: string;
    emoji?: ComponentEmojiResolvable
}

export interface ConfirmPromptButtons {
    confirm?: PromptButton,
    cancel?: PromptButton
}

type Cache<T extends boolean> = T extends true ? "cached" : CacheType 

export interface ConfirmPromptOptions<T extends boolean> {
    buttons?: ConfirmPromptButtons;
    components(buttons: Record<keyof ConfirmPromptButtons, ButtonBuilder>): ActionRowBuilder<ButtonBuilder>[]
    render(components: ActionRowBuilder<ButtonBuilder>[]): Promise<Message<T>>;
    onClick?(interaction: ButtonInteraction<Cache<T>>, isCancel: boolean): void;
    filter?(interaction: ButtonInteraction<Cache<T>>): boolean
    time?: number;
    onTimeout?(): void;
}
export type ConfirmPromptResult<T extends boolean> = 
    | { interaction: ButtonInteraction<Cache<T>>, action: "confirm" | "cancel" } 
    | { action: "timeout" }; 

export class ConfirmPrompt {
    public static defaultButtons: ConfirmPromptButtons = {
        confirm: {
            customId: "prompt/confirm",
            label: "✔", style: ButtonStyle.Success,
        },
        cancel: {
            customId: "prompt/cancel",
            label: "✖", style: ButtonStyle.Danger,
        }
    };
    public static setDefaultButtons(buttons: ConfirmPromptButtons = {}){
        ConfirmPrompt.defaultButtons = toMergeObject(ConfirmPrompt.defaultButtons, buttons);
    }

}