import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, Client } from "discord.js";
import { createEmbed } from "../src";

const client = new Client({
    intents: ["Guilds"]
});

client.login(process.env.BOT_TOKEN);

client.on("ready", (c) => {
    console.log("ready");

    c.application.commands.set([
        {
            name: "test",
            description: "test",
            type: ApplicationCommandType.ChatInput,
        }
    ]);
});

client.on("interactionCreate", interaction => {
    if (!interaction.inCachedGuild()) return;
    if (interaction.isChatInputCommand()){
        const embed = createEmbed({
            extends: {
                title: "testando"
            },
            color: "Random",
            description: "Eae",
        });
        const row = new ActionRowBuilder<ButtonBuilder>({components: [
            new ButtonBuilder({
                customId: "test",
                label: "test",
                style: ButtonStyle.Success
            })
        ]});
        interaction.reply({ embeds: [embed], components: [row] });

        embed.fields.get(1);
        return;
    }
    if (interaction.isMessageComponent()){
        const embed = createEmbed({ interaction });

        embed.setDescription("testando2");
        
        interaction.update({ embeds: [embed] });
    }

    
});

process.on("SIGINT", () => process.exit(0));

const embed = createEmbed({
    fields: [
        { name: "a" },
        { name: "b" },
        { name: "c" },
    ]
});