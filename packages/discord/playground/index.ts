import { createContainer, Separator } from "#package";
import { AttachmentBuilder, Client, User } from "discord.js";

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

    interaction.reply(menu(0));
});

client.login(process.env.BOT_TOKEN);

client.on("interactionCreate", async interaction => {
    if (!interaction.isButton()) return;

    const [_, raw] = interaction.customId.split("/")

    interaction.update(menu(Number.parseInt(raw)));
})

function menu<R>(current: number, user?: User): R {
    const container = createContainer("Greyple",
        `# Counter menu ${current}`,
        "Text 01",
        user && user.displayName,
        Separator.Default,
        "Text 02",
        [new AttachmentBuilder(""), "test"],
    )

    return {
        flags: [
            "Ephemeral",
            "IsComponentsV2"],
        components: [container],
    } as R;
}