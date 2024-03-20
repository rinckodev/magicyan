import { ButtonBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuComponentData } from "discord.js";
import { toMergeObject } from "../helpers/utils";
import { MultimenuMenu, MultimenuMenuButtons, MultimenuMenutOptions } from "./multimenuManager";

export async function multimenu<T extends boolean>(options: MultimenuMenutOptions<T>){
    const { 
        itemsPerPage=10, selectMenu: selectMenuData, 
        buttons, time, items, embed, 
        render, filter, onClose, onSelect, 
        onTimeout, components, 
    } = options;
    
    const { defaultButtons, defaultSelectMenu } = MultimenuMenu;

    const buttonsData = Object.entries(toMergeObject(defaultButtons, buttons??{})).reduce(
        (prev, [key, data]) => Object.assign(prev, { [key]: { ...data,
            customId: `[discord-ui/${key}/${data.customId}]`
        } }), {}
    ) as Required<MultimenuMenuButtons>;

    const multimenuButtons = {
        previous: new ButtonBuilder(buttonsData.previous),
        home: new ButtonBuilder(buttonsData.home),
        next: new ButtonBuilder(buttonsData.next),
        close: new ButtonBuilder(buttonsData.close),
        view: new ButtonBuilder(buttonsData.view), 
    };

    const selectMenu = new StringSelectMenuBuilder({
        customId: selectMenuData?.customId 
        ? `[discord-ui/multimenu/${selectMenuData?.customId??"select"}]`
        : defaultSelectMenu.customId,
        placeholder: selectMenuData?.placeholder ?? defaultSelectMenu.placeholder,
    });

    multimenuButtons.previous.setDisabled(true);
    multimenuButtons.home.setDisabled(true);
    
    let { viewType="grid" } = options;
    let page = 0;

    const refreshItems = () => {
        const embeds: EmbedBuilder[] = [];
        if (viewType !== "blocks"){
            embeds.push(embed ?? new EmbedBuilder({
                fields: []
            }));
            embeds[0].setFields();
        }
        
        const options: StringSelectMenuComponentData["options"] = [];
        const voidField = { name: "\u200b", value: "\u200b", inline: true };

        let itemsPushed = 0;
        for (let i = 0; i < itemsPerPage; i++) {
            const index = itemsPerPage * page + i;
            const item = items[index];

            if (!item) break;

            itemsPushed++;

            const field = {
                name: item.title,
                value: item.description,
                inline: true,
            };

            options.push({
                label: item.title,
                value: item.value,
                description: item.description.slice(0, 100),
                emoji: item.emoji,
            });

            switch(viewType){
                case "list":{
                    field.inline = false;
                    embeds[0].addFields(field);
                    break;
                } 
                case "items":{
                    embeds[0].addFields(field);
                    if (itemsPushed == 2) {
                        embeds[0].addFields(voidField);
                        itemsPushed=0;
                    }
                    break;
                } 
                case "grid":{
                    embeds[0].addFields(field);
                    break;
                }
                case "blocks":{
                    const embed = new EmbedBuilder({
                        title: item.title,
                        description: item.description,
                    });
                    if (item.thumbnail) embed.setThumbnail(item.thumbnail);
                    embed.setColor(item.color??"#2F3136");
                    embeds.push(embed);
                    break;
                }
            }
        }
        selectMenu.setOptions(options);
        return embeds;
    };

    const message = await render(refreshItems()[0], components(multimenuButtons, selectMenu));
    const collector = message.createMessageComponentCollector({ time, filter });

    const maxPages = Math.ceil(items.length / itemsPerPage);
    
    collector.on("collect", async interaction => {
        if (interaction.isButton()){
            multimenuButtons.home.setDisabled(false);
            multimenuButtons.previous.setDisabled(false);
            multimenuButtons.next.setDisabled(false);
    
            switch(interaction.customId){
                case buttonsData.previous.customId: page--; break;
                case buttonsData.home.customId: page=0; break;
                case buttonsData.next.customId: {
                    if (page+1 >= maxPages) break;
                    page == 0 ? page = 1 : page++; 
                    break;
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
                case buttonsData.view.customId:{
                    const switcher = {
                        list:()=> viewType = "items",
                        items:()=> viewType = "grid",
                        grid:()=> viewType = "blocks",
                        blocks:()=> viewType = "list",
                    };
                    switcher[viewType]();
                }
            }
    
            if (page === 0){
                multimenuButtons.home.setDisabled(true);
                multimenuButtons.previous.setDisabled(true);
            }
            if (page+1 >= maxPages){
                multimenuButtons.next.setDisabled(true);
            }
            
            interaction.update({ 
                embeds: refreshItems(), 
                components: components(multimenuButtons, selectMenu) 
            });
            return;
        }
        if (!interaction.isStringSelectMenu() || !onSelect) return;
        
        const item = items.find(item => item.value === interaction.values[0])!;
        onSelect(interaction, item);
    });
    collector.on("end", (_, reason) => {
        if (reason === "time" && time && onTimeout) {
            onTimeout();
        }
    });
}