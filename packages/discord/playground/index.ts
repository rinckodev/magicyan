import { brBuilder, createFileUpload, createLabel, createModalFields, CustomItents, modalFieldsToRecord } from "#package";
import { Client, codeBlock } from "discord.js";

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
            "Envie arquivos",
            createFileUpload("upload")
        ),
        createLabel(
            "Envie arquivos mais",
            createFileUpload("uploadplus1", false)
        ),
        createLabel(
            "Envie arquivos mais ainda",
            createFileUpload("uploadplus2", true, 5)
        ),
        createLabel(
            "Envie arquivos mais do que mais ainda",
            createFileUpload("uploadplus3", false, 4)
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