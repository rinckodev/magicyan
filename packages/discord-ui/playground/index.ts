import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, Client, EmbedBuilder, Message, Partials, StringSelectMenuBuilder } from "discord.js";
import { discordUi, multimenu } from "../src";

const client = new Client({
    intents: [
        "GuildVoiceStates", "GuildMembers", "Guilds", 
        "MessageContent", "GuildMessages",
        "GuildPresences", "GuildModeration",
    ],
    partials: [Partials.Channel, Partials.GuildMember, Partials.User]
});

discordUi({
    prompts: {
        confirm: {
            buttons: {
                confirm: { label: "Confirm", style: ButtonStyle.Success },
                cancel: { label: "Cancel", style: ButtonStyle.Secondary }
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
    // return messages.reverse();

    multimenu({
        embed: new EmbedBuilder({
            title: "test",
            description: "test2",
            color: 302010,
        }),
        components: (buttons, selectMenu) => [
            new ActionRowBuilder<ButtonBuilder>({
                components: [
                    buttons.previous, buttons.home,
                    buttons.next, buttons.view, buttons.close
                ],
            }),
            new ActionRowBuilder<StringSelectMenuBuilder>({
                components: [selectMenu],
            })
        ],
        render: (embed, components) => interaction.editReply({
            embeds: [embed], components
        }),
        items: guild.members.cache.map(m => ({
            title: m.displayName,
            description: `${m}`,
            value: m.id,
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