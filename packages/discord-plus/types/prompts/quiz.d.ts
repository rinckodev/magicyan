import { ActionRowBuilder, EmbedBuilder, GuildMember, Message, SelectMenuComponentOptionData, StringSelectMenuBuilder, StringSelectMenuInteraction, User } from "discord.js";
interface QuizQuestion {
    embed: EmbedBuilder;
    placeholder: string;
    options: SelectMenuComponentOptionData[];
}
interface QuizPromptOptions {
    executor: User | GuildMember;
    questions: QuizQuestion[];
    customId?: string;
    render(embed: EmbedBuilder, components: ActionRowBuilder<StringSelectMenuBuilder>[]): Promise<Message>;
    onEnd(interaction: StringSelectMenuInteraction, results: string[]): void;
}
export declare function QuizPrompt(options: QuizPromptOptions): Promise<void>;
export {};
