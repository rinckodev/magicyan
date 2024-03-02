import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, Client, EmbedBuilder, Partials } from "discord.js";
import { pagination } from "../src";

const client = new Client({
    intents: [
        "GuildVoiceStates", "GuildMembers", "Guilds", 
        "MessageContent", "GuildMessages",
        "GuildPresences", "GuildModeration",
    ],
    partials: [Partials.Channel, Partials.GuildMember, Partials.User]
});

// discordUi({
//     prompts: {
//         confirm: {
//             buttons: {
//                 confirm: { label: "Confirm", style: ButtonStyle.Success },
//                 cancel: { label: "Cancel", style: ButtonStyle.Secondary }
//             }
//         }
//     },
//     menus: {
//         pagination: {
//             buttons: {
//                 previous: { style: ButtonStyle.Danger },
//                 home: { label: "Home", emoji: "🏠" },
//                 next: { label: "Next", style: ButtonStyle.Success },
//                 close: { emoji: "❌" }
//             }
//         }
//     }
// });

client.on("ready", (client) => {
    console.log("Bot online");

    client.application.commands.set([
        {
            name: "ping",
            description: "ping command",
            type: ApplicationCommandType.ChatInput,
        } 
    ]);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.inCachedGuild() || !interaction.isChatInputCommand()) return;

    const roles = interaction.member.roles.cache;

    pagination({
        embeds: Array.from(roles.values()).map((role, index) => new EmbedBuilder({
            description: `${role} ${role.name}`,
            color: role.color,
            footer: {
                text: `${index+1}/${roles.size}`
            }
        })),
        components: ({ action, close, ...buttons }) => [
            new ActionRowBuilder<ButtonBuilder>({
                components: [...Object.values(buttons)]
            }),
            new ActionRowBuilder<ButtonBuilder>({
                components: [action, close]
            })
        ],
        render: (embed, components) => interaction.reply({ 
            fetchReply: true, ephemeral: true, embeds:[embed], components 
        }),
        onClick(interaction, embed) {
            interaction.reply({ ephemeral: true, embeds: [embed] });
        }
    });
});


client.login(process.env.BOT_TOKEN);

process.on("SIGINT", () => process.exit(0));