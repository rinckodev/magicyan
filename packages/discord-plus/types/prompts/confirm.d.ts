import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ComponentEmojiResolvable, GuildMember, Message, User } from "discord.js";
interface CustomizeButtonOptions {
    customId: string;
    style: Exclude<ButtonStyle, ButtonStyle.Link>;
    label: string;
    emoji: ComponentEmojiResolvable;
}
interface ConfirmPromptOptions {
    executor: User | GuildMember;
    buttons?: {
        confirm?: Partial<CustomizeButtonOptions>;
        cancel?: Partial<CustomizeButtonOptions>;
    };
    render(components: ActionRowBuilder<ButtonBuilder>[]): Promise<Message>;
    onConfirm(interaction: ButtonInteraction): void;
    onCancel(interaction: ButtonInteraction): void;
    time?: number;
    onTimeout?(): void;
}
export declare function ConfirmPrompt({ render, onConfirm, onCancel, ...options }: ConfirmPromptOptions): Promise<void>;
export {};
