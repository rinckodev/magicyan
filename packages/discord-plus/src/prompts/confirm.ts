import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ComponentEmojiResolvable, ComponentType, GuildMember, InteractionButtonComponentData, Message, User } from "discord.js";

interface CustomizeButtonOptions {
    customId: string
    style: Exclude<ButtonStyle, ButtonStyle.Link>
    label: string
    emoji: ComponentEmojiResolvable;
}

interface ConfirmPromptOptions {
    executor: User | GuildMember
    buttons?: {
        confirm?: Partial<CustomizeButtonOptions>
        cancel?: Partial<CustomizeButtonOptions>
    }
    render(components: ActionRowBuilder<ButtonBuilder>[]): Promise<Message>
    onConfirm(interaction: ButtonInteraction): void
    onCancel(interaction: ButtonInteraction): void
    time?: number;
    onTimeout?(): void
}
export async function ConfirmPrompt({ render, onConfirm, onCancel, ...options }: ConfirmPromptOptions){
    const { buttons, executor, time, onTimeout } = options;
    const buttonData = {
        confirm: {
            customId: buttons?.confirm?.customId || "confirm-prompt-button",
            label: buttons?.confirm?.label || "✓",
            emoji: buttons?.confirm?.emoji,
            style: buttons?.confirm?.style || ButtonStyle.Success
        },
        cancel: {
            customId: buttons?.cancel?.customId || "cancel-prompt-button",
            label: buttons?.cancel?.label || "X",
            emoji: buttons?.cancel?.emoji,
            style: buttons?.cancel?.style || ButtonStyle.Danger
        }
    } satisfies ConfirmPromptOptions["buttons"]

    const components = [
        new ActionRowBuilder<ButtonBuilder>({ components: [
            new ButtonBuilder(buttonData.confirm),
            new ButtonBuilder(buttonData.cancel),
        ]})
    ]

    const message = await render(components);

    const collector = message.createMessageComponentCollector({
        componentType: ComponentType.Button,
        filter(interaction){
            const isExecutor = interaction.user.id == executor.id;
            if (!isExecutor) interaction.deferUpdate();
            return isExecutor;
        },
        time: (time && onTimeout) ? time : undefined
    })

    collector.on("collect", interaction => {
        collector.stop();
        switch (interaction.customId){
            case buttonData.confirm.customId: {
                onConfirm(interaction)
                return;
            }
            case buttonData.cancel.customId: {
                onCancel(interaction);
                return;
            }
        }
    })
    if (time && onTimeout){
        collector.on("end", () => onTimeout())
    }
}