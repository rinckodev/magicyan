import { createContainer, createRow, createThumbArea, isDefined, Separator } from "#package";
import { ButtonBuilder, ButtonStyle, Client, ComponentType, ContainerBuilder, InteractionReplyOptions, User } from "discord.js";
import { isActionRowBuilder } from "src/guards/components/row";

const client = new Client({
    intents: []
});

client.on("ready", (c) => {
    console.log("ready!");

    c.application.commands.set([
        {
            name: "ping",
            description: "Replies with pong",
        }
    ])
});

client.on("interactionCreate", interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName !== "ping") return;

    interaction.reply(menu(interaction.user));
});

client.login(process.env.BOT_TOKEN);

client.on("interactionCreate", async interaction => {
    if (!interaction.isButton()) return;

    const isSuccess = interaction.customId === "success";
    const color = isSuccess ? "Green" : "Red";

    const toast = createContainer(color,
        isSuccess
            ? "Tudo certo!"
            : "Ocorreu um erro"
    );

    const container = createContainer({ from: interaction });
    container.components
        .filter(row => isActionRowBuilder(row, "buttons"))
        .flatMap(row => row.components)
        .forEach(button => {
            if (button.data.style === ButtonStyle.Success) {
                button.setDisabled(isSuccess);
            } else {
                button.setDisabled(!isSuccess);
            }
        });
    
    container.setColor(color);

    const text = container.componentAt(0, ComponentType.TextDisplay);
    console.log(text?.data.content);

    await interaction.update({
        components: [container, toast]
    });
})

function menu<R>(user?: User, toast?: ContainerBuilder): R {
    const container = createContainer("Green",
        Separator.Default,
        createThumbArea(
            `Escolha uma ação ${user?.displayName ?? ""}`,
            user?.displayAvatarURL({ size: 512 })
        ),
        createRow(
            new ButtonBuilder({
                customId: "success",
                label: "Success",
                style: ButtonStyle.Success
            }),
            new ButtonBuilder({
                customId: "danger",
                label: "Danger",
                style: ButtonStyle.Danger
            })
        ),
        "Meu texto"
    )

    return ({
        flags: ["Ephemeral", "IsComponentsV2"],
        components: [container, toast].filter(isDefined),
    } satisfies InteractionReplyOptions) as R;
}