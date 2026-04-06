import { createCheckboxGroup, createContainer, createLabel, createModalFields, createRadioGroup, CustomItents, Separator, sleep } from "#package";
import { Client } from "discord.js";

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

    await interaction.showModal({
        title: "test",
        customId: "test",
        components: createModalFields(
            "Texto de boas vindas",
            createLabel(
                "Nome 123",
                "Digite seu nome 123",
                createRadioGroup({
                    customId: "test",
                    options: [
                        { label: "a", value: "a" },
                        { label: "b", value: "b", default: true },
                        { label: "c", value: "c" },
                    ]
                })
                // createCheckbox("test",  true)
            ),
            createLabel(
                "Selecione", "test", 
                createCheckboxGroup({
                    customId: "test2",
                    minValues: 2,
                    maxValues: 3,
                    required: false,
                    options: [
                        { "value": "march-4", "label": "March 4th" },
                        { "value": "march-5", "label": "March 5th" },
                        { "value": "march-7", "label": "March 7th", "description": "I know this is a Saturday and is tough" },
                        { "value": "march-9", "label": "March 9th" },
                        { "value": "march-10", "label": "March 10th" }
                    ]
                })
            ),
            // createLabel({
            //     label: "Selecione 2", 
            //     description: "test3",
            //     component: new RadioGroupBuilder({
            //         custom_id: "test3",
            //         required: true,
            //         "options": [
            //             { "value": "march-4", "label": "March 4th" },
            //             { "value": "march-5", "label": "March 5th" },
            //             { "value": "march-7", "label": "March 7th", "description": "I know this is a Saturday and is tough" },
            //             { "value": "march-9", "label": "March 9th" },
            //             { "value": "march-10", "label": "March 10th" }
            //         ]
            //     })
            // }),
        )
    });
});

client.on("interactionCreate", async interaction => {
    if (interaction.isModalSubmit()) {
        console.log(interaction.fields.fields.values());
        await interaction.deferUpdate();
    }
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