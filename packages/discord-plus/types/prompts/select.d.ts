import { ActionRowBuilder, GuildMember, Message, StringSelectMenuBuilder, StringSelectMenuInteraction, User } from "discord.js";
interface StringSelectPromptOptions {
    executor: GuildMember | User;
    select: StringSelectMenuBuilder;
    render(components: ActionRowBuilder<StringSelectMenuBuilder>[]): Promise<Message>;
    onSelect(interaction: StringSelectMenuInteraction): void;
    time?: number;
    onTimeout?(): void;
}
export declare function StringSelectPrompt(options: StringSelectPromptOptions): Promise<void>;
export {};
