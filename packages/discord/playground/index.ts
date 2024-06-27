import { ApplicationCommandType, Client } from "discord.js";
import { brBuilder, commandMention, createEmbed, findCommand } from "../src";

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
        },
        {
            name: "say",
            description: "test",
            type: ApplicationCommandType.ChatInput,
        }
    ]);
});

client.on("interactionCreate", interaction => {
    if (!interaction.inCachedGuild()) return;
    if (!interaction.isChatInputCommand()) return;

    const { client } = interaction;

    const a = findCommand(client).byName("test")!;
    const b = findCommand(client).byName("say")!;

    const url = new URL("https://discord.com");
    const embed = createEmbed({
        url, 
        title: "testando",
        description: brBuilder(
            commandMention(a),
            commandMention(b, "hy"),
            commandMention(b),
            commandMention(a, "manage", "nicks"),
            commandMention(a, "manage", "coins"),
            commandMention(a, "manage"),
        ),
    });

    embed.fields.push({ name: "test" });


    interaction.reply({ embeds: [embed] });
    // if (interaction.isChatInputCommand()){

    //     const clientUser = interaction.guild.members.me!;

    //     const embed = createEmbed({
    //         author: createEmbedAuthor(clientUser, { url: interaction.guild.iconURL() }),
    //         description: "Eae",
    //     });
    //     const row = new ActionRowBuilder<ButtonBuilder>({components: [
    //         new ButtonBuilder({
    //             customId: "test",
    //             label: "test",
    //             style: ButtonStyle.Success
    //         })
    //     ]});

    //     interaction.reply({ embeds: [embed], components: [row], files: [] });

    //     embed.fields.get(1);
    //     return;
    // }
    // if (interaction.isMessageComponent()){
    //     const imageurl = "https://cdn.discordapp.com/avatars/264620632644255745/accca9cbaef6f1914cac640d3017c803.webp?size=1024";
    //     const embed = createEmbed({ from: interaction });

    //     console.log(new URL(imageurl));

    //     embed.setElementImageURL("author", null);
    //     embed.setElementImageURL("thumbnail", null);
    //     embed.setElementImageURL("image", null);
    //     embed.setElementImageURL("footer", null);
    //     embed.setDescription("testando2");
        
    //     interaction.update({ embeds: [embed] });
    // }    
});

process.on("SIGINT", () => process.exit(0));