import { ButtonBuilder, ComponentType } from "discord.js";
import { toMergeObject } from "../helpers/utils";
import { PaginationMenu, PaginationMenuButtons, PaginationMenutOptions } from "./paginationManager";

export async function pagination<T extends boolean>(options: PaginationMenutOptions<T>){
    const { render, embeds, components, buttons, onClick, filter, onClose, onTimeout, time } = options;

    const defaultButtons = PaginationMenu.defaultButtons;

    const buttonsData = Object.entries(toMergeObject(defaultButtons, buttons??{})).reduce(
        (prev, [key, data]) => Object.assign(prev, { [key]: { ...data,
            customId: `[discord-ui/${key}/${data.customId}]`
        } }), {}
    ) as Required<PaginationMenuButtons>;

    const paginationButtons = {
        previous: new ButtonBuilder(buttonsData.previous),
        home: new ButtonBuilder(buttonsData.home),
        next: new ButtonBuilder(buttonsData.next),
        close: new ButtonBuilder(buttonsData.close),
        action: new ButtonBuilder(buttonsData.action), 
    };

    paginationButtons.previous.setDisabled(true);
    paginationButtons.home.setDisabled(true);

    const message = await render(embeds[0], components(paginationButtons));

    const collector = message.createMessageComponentCollector({
        componentType: ComponentType.Button, time, filter,
    });

    let index = 0;

    collector.on("collect", async interaction => {
        if (!Object.values(buttonsData).some(d => d.customId === interaction.customId)) return;
        
        paginationButtons.home.setDisabled(false);
        paginationButtons.previous.setDisabled(false);
        paginationButtons.next.setDisabled(false);

        switch(interaction.customId){
            case buttonsData.previous.customId: index--; break;
            case buttonsData.home.customId: index=0; break;
            case buttonsData.next.customId: {
                if (index+1 >= embeds.length) break;
                index++; break;
            }
            case buttonsData.close.customId:{
                collector.stop("close");
                if (onClose){
                    onClose(interaction);
                    return;
                }
                await interaction.deferUpdate();
                await interaction.deleteReply();
                return;
            }
            case buttonsData.action.customId:{
                if (onClick) onClick(interaction, embeds[index]);
                return;
            }
        }

        if (index === 0){
            paginationButtons.home.setDisabled(true);
            paginationButtons.previous.setDisabled(true);
        }
        if (index+1 >= embeds.length){
            paginationButtons.next.setDisabled(true);
        }
        interaction.update({ 
            embeds: [embeds[index]], 
            components: components(paginationButtons) 
        });
    });
    collector.on("end", (_, reason) => {
        if (reason === "time" && time && onTimeout) {
            onTimeout();
        }
    });
}