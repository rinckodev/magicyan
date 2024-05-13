import { ApplicationCommandType, ButtonStyle, Client, EmbedBuilder, Message, Partials } from "discord.js";
import { discordUI, multimenu } from "../src";

const client = new Client({
    intents: [
        "GuildVoiceStates", "GuildMembers", "Guilds", 
        "MessageContent", "GuildMessages",
        "GuildPresences", "GuildModeration",
    ],
    partials: [Partials.Channel, Partials.GuildMember, Partials.User]
});

discordUI({
    prompts: {
        confirm: {
            buttons: {
                confirm: { label: "Confirm", style: ButtonStyle.Success },
                cancel: { label: "Cancel", style: ButtonStyle.Danger }
            }
        }
    },
    menus: {
        pagination: {
            buttons: {
                previous: { style: ButtonStyle.Danger },
                home: { label: "Home", emoji: "🏠" },
                next: { label: "Next", style: ButtonStyle.Success },
                close: { emoji: "❌" }
            }
        },
        multimenu: {
            placeholder: "Select any item",
            viewType: "blocks"
        }
    }
});

client.on("ready", (client) => {
    console.log("Bot online");

    client.application.commands.set([
        {
            name: "ping",
            description: "ping command",
            type: ApplicationCommandType.ChatInput
        } 
    ]);
});

// client.on("interactionCreate", async (interaction) => {
//     if (!interaction.inCachedGuild() || !interaction.isChatInputCommand()) return;
//     const { channel } = interaction;
//     if (!channel) return;

//     confirm({
//         buttons: {
//             cancel: {
//                 emoji: "✏️"
//             }
//         },
//         time: 1000,
//         // components: buttons => [new ActionRowBuilder({ components: [buttons.confirm, buttons.cancel] })],
//         render: (components) => interaction.reply({
//             components, fetchReply: true, content: "test"
//         }),
//         async onClick(interaction, isCancel) {
//             interaction.update({ components: [] });
//             console.log(isCancel);
//         },
//     });
// });
client.on("interactionCreate", async (interaction) => {
    if (!interaction.inCachedGuild() || !interaction.isChatInputCommand()) return;
    const { channel, guild } = interaction;
    if (!channel) return;

    await interaction.deferReply({ ephemeral: true });

    const limit = Infinity;

    const messages: Message[] = [];
    let lastMessageId: string | undefined;

    while(true){
        const fetched = await channel.messages.fetch({ limit: 100, before: lastMessageId });
        
        messages.push(...fetched.values());
        lastMessageId = fetched.lastKey();
        if (fetched.size < 100 || messages.length >= limit) break;
    }

    if (limit < messages.length) {
        const sliced = messages.slice(0, limit);
        messages.length = 0;
        messages.push(...sliced);
    }

    // pagination({
    //     components: ({ previous, home, next, action }) => [
    //         new ActionRowBuilder<ButtonBuilder>({ 
    //             components: [previous, home, next, action] 
    //         })
    //     ],
    //     embeds: messages.map((m, index, { length }) => new EmbedBuilder({
    //         title: m.id,
    //         description: m.content.slice(0, 3000),
    //         author: { name: m.author.username, iconURL: m.author.displayAvatarURL() },
    //         color: m.member?.displayColor,
    //         footer: {
    //             text: `${index+1}/${length}`,
    //         }
    //     })),
    //     async onClick(interaction, embed) {
    //         interaction.reply({ ephemeral: true, embeds: [embed] });
    //     },
    //     render: (embeds, components) => interaction.editReply({ embeds, components }),
    // });
    
    // return messages.reverse();

    multimenu({
        embed: new EmbedBuilder({
            title: "test",
            description: "test2",
            color: 302010,
        }),
        render: (embeds, components) => interaction.editReply({ embeds, components }),
        items: guild.members.cache.map(m => ({
            // title: m.displayName,
            description: `${m}`,
            option: {
                label: m.displayName,
                value: m.id,
                emoji: "✅"
            },
            color: "Aqua",
            thumbnail: m.displayAvatarURL()
        })),
        onSelect(interaction, item) {
            interaction.reply({ ephemeral: true, content: JSON.stringify(item, null, 2) });
        },
    });
});


client.login(process.env.BOT_TOKEN);

process.on("SIGINT", () => process.exit(0));