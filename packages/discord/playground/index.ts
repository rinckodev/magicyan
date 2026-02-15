import { createContainer, createLabel, createModalFields, CustomItents, Separator, sleep } from "#package";
import { Client, ComponentType } from "discord.js";

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

    createLabel({
        
    })

    await interaction.showModal({
        title: "test",
        customId: "test",
        components: createModalFields(
            "Texto de boas vindas",
            createLabel(
                "Nome",
                "Digite seu nome", {
                    type: ComponentType.Checkbox,
                    customId: "test12",
                    default: true,
                }
            ),
            createLabel(
                "Selecione", "test", {
                    type: ComponentType.CheckboxGroup,
                    customId: "test2",
                    minValues: 2,
                    maxValues: 5,
                    "options": [
                        { "value": "march-4", "label": "March 4th" },
                        { "value": "march-5", "label": "March 5th" },
                        { "value": "march-7", "label": "March 7th", "description": "I know this is a Saturday and is tough" },
                        { "value": "march-9", "label": "March 9th" },
                        { "value": "march-10", "label": "March 10th" }
                    ]
                }
            ),
            createLabel({
                label: "Selecione 2", 
                description: "test3",
                component: {
                    type: ComponentType.RadioGroup,
                    customId: "test3",
                    required: true,
                    "options": [
                        { "value": "march-4", "label": "March 4th" },
                        { "value": "march-5", "label": "March 5th" },
                        { "value": "march-7", "label": "March 7th", "description": "I know this is a Saturday and is tough" },
                        { "value": "march-9", "label": "March 9th" },
                        { "value": "march-10", "label": "March 10th" }
                    ]
                }
            }),
        )
    });
});

client.on("interactionCreate", async interaction => {
    if (interaction.isModalSubmit()){
        console.log(interaction.fields.fields.values());
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