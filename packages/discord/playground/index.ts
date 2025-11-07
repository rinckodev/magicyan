import { createComponents, createContainer, createMediaGallery, createRow, createSection, CustomItents, Separator, sleep } from "#package";
import { ButtonBuilder, ButtonStyle, Client, StringSelectMenuBuilder } from "discord.js";

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

    const container = createContainer("Random",
        createSection(
            "Section example",
            new ButtonBuilder({
                customId: "/example/section",
                label: "Example button section",
                style: ButtonStyle.Primary
            })
        ),
        "Text Display example",
        Separator.Large,
        new StringSelectMenuBuilder({
            customId: "/example/select",
            placeholder: "Select menu example",
            options: [
                { label: "A", value: "a" },
                { label: "B", value: "b" }
            ]
        }),
        Separator.Default,
        createRow(
            new ButtonBuilder({
                customId: "/example/row/button/a",
                label: "Example row button A",
                style: ButtonStyle.Success
            }),
            new ButtonBuilder({
                customId: "/example/row/button/b",
                label: "Example row button B",
                style: ButtonStyle.Danger
            }),
        ),
        createMediaGallery(
            "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1&pp=ygUXbmV2ZXIgZ29ubmEgZ2l2ZSB5b3UgdXCgBwE%3D"
        )
    )

    await interaction.reply({
        flags: ["Ephemeral", "IsComponentsV2"],
        components: [container]
    });
    await interaction.followUp({
        flags: ["Ephemeral", "IsComponentsV2"],
        components: createComponents(
            createSection(
                "Section example",
                new ButtonBuilder({
                    customId: "/example/section",
                    label: "Example button section",
                    style: ButtonStyle.Primary
                })
            ),
            "Text Display example",
            Separator.Large,
            new StringSelectMenuBuilder({
                customId: "/example/select",
                placeholder: "Select menu example",
                options: [
                    { label: "A", value: "a" },
                    { label: "B", value: "b" }
                ]
            }),
            Separator.Default,
            createRow(
                new ButtonBuilder({
                    customId: "/example/row/button/a",
                    label: "Example row button A",
                    style: ButtonStyle.Success
                }),
                new ButtonBuilder({
                    customId: "/example/row/button/b",
                    label: "Example row button B",
                    style: ButtonStyle.Danger
                }),
            ),
            createMediaGallery(
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1&pp=ygUXbmV2ZXIgZ29ubmEgZ2l2ZSB5b3UgdXCgBwE%3D"
            )
        )
    });
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isMessageComponent()) return;
    const container = createContainer({
        from: interaction
    });

    container.buttonComponents.forEach(button => {
        button.setDisabled(true);
    });
    container.separatorComponents.forEach(button => {
        button.setDivider(false);
    });

    container.insertComponent(0, Separator.Default);

    await interaction.update({
        components: [container]
    });

    console.log("buttons", container.buttonComponents.length);
    console.log("selects", container.selectMenuComponents.length);
    console.log("sections", container.sectionComponents.length);
    console.log("texts", container.textDisplayComponents.length);
    console.log("galleries", container.mediaGalleryComponents.length);
    console.log("separators", container.separatorComponents.length);

    await sleep.seconds(4);

    container.buttonComponents.forEach(button => {
        button.setDisabled(false);
    });
    container.separatorComponents.forEach(button => {
        button.setDivider(true);
    });


    await interaction.editReply({
        components: [container]
    });
});
client.login(process.env.BOT_TOKEN);