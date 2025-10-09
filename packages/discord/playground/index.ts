import { brBuilder, createLabel, createModalFields, createTextInput, CustomItents, modalFieldsToRecord } from "#package";
import { ChannelSelectMenuBuilder, ChannelType, Client, codeBlock } from "discord.js";

const client = new Client({
    intents: CustomItents.All
});

client.on("clientReady", (c) => {
    console.log("ready!", c.user.username);

    c.application.commands.set([
        {
            name: "test",
            description: "test",
        }
    ]);
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName !== "test") return;

    const fields = createModalFields(
        brBuilder(
            "# Header",
            "Este é um text-area",
            codeBlock("Rincko dev"),
            "-# Footer",
        ),
        createLabel(
            "Título",
            createTextInput({
                customId: "title",
                placeholder: "\"Minha nova postagem\""
            })
        ),
        createLabel(
            "Canal",
            new ChannelSelectMenuBuilder({
                customId: "channel",
                placeholder: "Escolha o canal da postagem",
                channelTypes: [ChannelType.GuildText]
            })
        )
    );

    console.log(fields);

    await interaction.showModal({
        title: "Meu modal",
        customId: "my-modal",
        components: fields
    });
    
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isModalSubmit()) return;
    console.log(modalFieldsToRecord(interaction.fields));
    console.log(modalFieldsToRecord(interaction.fields.fields));
});
client.login(process.env.BOT_TOKEN);

// client.on("interactionCreate", async interaction => {
//     if (!interaction.isButton()) return;

//     const isSuccess = interaction.customId === "success";
//     const color = isSuccess ? "Green" : "Red";

//     const toast = createContainer(color,
//         isSuccess
//             ? "Tudo certo!"
//             : "Ocorreu um erro"
//     );

//     const container = createContainer({ from: interaction });
//     container.components
//         .filter(row => isActionRowBuilder(row, "buttons"))
//         .flatMap(row => row.components)
//         .forEach(button => {
//             if (button.data.style === ButtonStyle.Success) {
//                 button.setDisabled(isSuccess);
//             } else {
//                 button.setDisabled(!isSuccess);
//             }
//         });
    
//     container.setColor(color);

//     const text = container.componentAt(0, ComponentType.TextDisplay);
//     console.log(text?.data.content);

//     await interaction.update({
//         components: [container, toast]
//     });
// })

// function menu<R>(user?: User, toast?: ContainerBuilder): R {
//     const container = createContainer("Green",
//         Separator.Default,
//         createThumbArea(
//             `Escolha uma ação ${user?.displayName ?? ""}`,
//             user?.displayAvatarURL({ size: 512 })
//         ),
//         createRow(
//             new ButtonBuilder({
//                 customId: "success",
//                 label: "Success",
//                 style: ButtonStyle.Success
//             }),
//             new ButtonBuilder({
//                 customId: "danger",
//                 label: "Danger",
//                 style: ButtonStyle.Danger
//             })
//         ),
//         "Meu texto"
//     )

//     return ({
//         flags: ["Ephemeral", "IsComponentsV2"],
//         components: [container, toast].filter(isDefined),
//     } satisfies InteractionReplyOptions) as R;
// }