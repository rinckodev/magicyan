import { ApplicationCommandOptionType, ApplicationCommandType, Client } from "discord.js";
import { createSubCommandsGroups } from "../src";

const client = new Client({
    intents: ["Guilds"]
});

const a = createSubCommandsGroups({
    manage: {
        description: "test",
        subcommands: {
            nicks: {
                description: "test",
            },
            coins: {
                description: "salve",
                options: {
                    player: {
                        type: ApplicationCommandOptionType.User,
                        description: "test",
                    }
                }
            }
        }
    }
});

client.login(process.env.BOT_TOKEN);

client.on("ready", (c) => {
    console.log("ready");

    c.application.commands.set([
        {
            name: "test",
            description: "test",
            type: ApplicationCommandType.ChatInput,
            options: a,
        }
    ]);
});

client.on("interactionCreate", interaction => {
    if (!interaction.inCachedGuild()) return;
    if (!interaction.isChatInputCommand()) return;
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