import { ActionRowBuilder, ComponentType, GuildMember, Message, StringSelectMenuBuilder, StringSelectMenuInteraction, User } from "discord.js";

interface StringSelectPromptOptions {
    executor: GuildMember | User;
    select: StringSelectMenuBuilder;
    render(components: ActionRowBuilder<StringSelectMenuBuilder>[]): Promise<Message>;
    onSelect(interaction: StringSelectMenuInteraction): void;
    time?: number;
    onTimeout?(): void;
}

export async function StringSelectPrompt(options: StringSelectPromptOptions){
    const { executor, select, render, onSelect, time, onTimeout } = options;

    const components = [
        new ActionRowBuilder<StringSelectMenuBuilder>({components: [select]})
    ];
    
    const message = await render(components);

    const collector = message.createMessageComponentCollector({ 
        componentType: ComponentType.StringSelect,
        filter(interaction){
            const isExecutor = interaction.user.id == executor.id;
            if (!isExecutor) interaction.deferUpdate();
            return isExecutor;
        },
        time
    });
    
    collector.on("collect", async interaction => {
        collector.stop();
        onSelect(interaction);
    });

    if (time && onTimeout){
        collector.on("end", (_, reason) => {
            if (reason == "time") onTimeout();
        });
    }
}