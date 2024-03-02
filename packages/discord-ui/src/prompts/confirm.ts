import { ActionRowBuilder, ButtonBuilder, ComponentType } from "discord.js";
import { toMergeObject } from "../helpers/utils";
import { ConfirmPrompt, ConfirmPromptButtons, ConfirmPromptOptions, ConfirmPromptResult } from "./confirmManager";

export async function confirm<T extends boolean>(options: ConfirmPromptOptions<T>){
    const { render, onClick, buttons, time, components, filter, onTimeout } = options;

    const defaultButtons = ConfirmPrompt.defaultButtons;

    const buttonsData = Object.entries(toMergeObject(defaultButtons, buttons??{})).reduce(
        (prev, [key, data]) => Object.assign(prev, { [key]: { ...data,
            customId: `[discord-ui/${key}/${data.customId}]`
        } }), {}
    ) as Required<ConfirmPromptButtons>;

    const confirmButtons = {
        confirm: new ButtonBuilder(buttonsData.confirm),
        cancel: new ButtonBuilder(buttonsData.cancel),
    };

    const message = await render(components(confirmButtons));

    const collector = message.createMessageComponentCollector({
        componentType: ComponentType.Button, time, filter,
    });

    return new Promise<ConfirmPromptResult<T>>(resolve => {
        collector.on("collect", interaction => {
            collector.stop("clicked");
            const isCancel = interaction.customId === buttonsData.cancel.customId;
            if (onClick) onClick(interaction, isCancel);

            resolve({ interaction, action: isCancel ? "cancel" : "confirm" });
        });
        collector.on("end", (_, reason) => {
            if (reason === "clicked") return;
            if (reason === "time" && time && onTimeout) {
                onTimeout();
                resolve({ action: "timeout" });
            }
        });
    });
}