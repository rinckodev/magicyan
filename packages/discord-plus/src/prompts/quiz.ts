import { ActionRowBuilder, ComponentType, EmbedBuilder, GuildMember, Message, SelectMenuComponentOptionData, StringSelectMenuBuilder, StringSelectMenuInteraction, User } from "discord.js";

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

export async function QuizPrompt(options: QuizPromptOptions){
    const { render, onEnd, questions, executor } = options;

    const customId = options.customId || "quiz-prompt-select"
    let step = 0;

    const initial = {
        embed: questions[step].embed,
        components: [new ActionRowBuilder<StringSelectMenuBuilder>({components: [
            new StringSelectMenuBuilder({ customId,
                placeholder: questions[step].placeholder,
                options: questions[step].options
            })
        ]})]
    }

    const message = await render(initial.embed, initial.components);

    const collector = message.createMessageComponentCollector({
        componentType: ComponentType.StringSelect,
        filter(interaction){
            const isExecutor = interaction.user.id == executor.id;
            if (!isExecutor) interaction.deferUpdate();
            return isExecutor;
        }
    });

    const results: string[] = [];

    collector.on("collect", async interaction => {
        const { values: [value] } = interaction;
        results.push(value);
        step++;
        if (step >= questions.length){
            collector.stop();
            onEnd(interaction, results);
            return;
        }
        await interaction.update({
            embeds: [questions[step].embed],
            components: [new ActionRowBuilder<StringSelectMenuBuilder>({components: [
                new StringSelectMenuBuilder({ customId,
                    placeholder: questions[step].placeholder,
                    options: questions[step].options
                })
            ]})]
        })
    })
}