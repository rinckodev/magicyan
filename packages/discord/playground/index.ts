import { brBuilder, createFileUpload, createLabel, createModalFields, createTextInput, CustomItents, modalFieldsToRecord } from "#package";
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
                placeholder: "\"Minha nova postagem\"",
                required: false
            })
        ),
        createLabel(
            "Canal",
            new ChannelSelectMenuBuilder({
                customId: "channel",
                placeholder: "Escolha o canal da postagem",
                channelTypes: [ChannelType.GuildText]
            })
        ),
        createLabel(
            "Envie arquivos",
            createFileUpload({
                customId: "upload",
                required: false
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
    const data = modalFieldsToRecord(interaction);
    
    console.log(data);
});
client.login(process.env.BOT_TOKEN);