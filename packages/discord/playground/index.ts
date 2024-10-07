import { ApplicationCommandType, Client } from "discord.js";
import { createEmbed } from "../src";

const client = new Client({
    intents: ["Guilds"]
});

client.login(process.env.BOT_TOKEN);

client.on("ready", (c) => {
    console.log("ready");

    c.application.commands.set([
        {
            name: "from",
            type: ApplicationCommandType.Message,
        },
        {
            name: "test",
            description: "test",
            type: ApplicationCommandType.ChatInput,
        }
    ]);
});

client.on("interactionCreate", interaction => {
    switch(true){
        case interaction.isMessageContextMenuCommand():{
            const embeds = createEmbed({ array: false, from: interaction.targetMessage });
            interaction.reply({ ephemeral: true, embeds: [embeds] });
            return;
        }
        case interaction.isChatInputCommand():{
            const embed = createEmbed({
                description: "testando a",
                fields: [
                    { name: "a" },
                    { name: "b" },
                    { name: "c" },
                    { name: "d" },
                ]
            });

            embed.fields.insert(1, { name: "rincko" });
            // const embed2 = createEmbed({
            //     description: "testando b",
            //     fields: [
            //         { value: "salve" }
            //     ]
            // });
            // const embed3 = createEmbed({
            //     title: "test",
            //     color: "Random",
            //     description: "testando c"
            // });
            interaction.deferReply({ ephemeral: true });
            interaction.channel?.send({ embeds: [embed] });
            return;
        }
    }
});

process.on("SIGINT", () => process.exit(0));