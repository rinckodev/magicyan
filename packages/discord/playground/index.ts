import { createComponents, createSection, createSeparator } from "#package";
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

    interaction.reply(menu(0, interaction.user));
});

client.login(process.env.BOT_TOKEN);

client.on("interactionCreate", async interaction => {
    if (!interaction.isButton()) return;

    const [_, raw] = interaction.customId.split("/")

    interaction.update(menu(Number.parseInt(raw), interaction.user));
})

function menu<R>(current: number, user: User): R {
    const image = new AttachmentBuilder(
        user.displayAvatarURL({ size: 512 }),
        { name: "user.png" }
    );

    const section = createSection({
        content: "test",
        thumbnail: "",
    });

    const value: boolean | undefined = false;

    const a = value && "test";

    const c = createComponents(
        `# Counter menu ${current}`,
        "Text 01",
        createSeparator({ large: true, divider: false }),
        "Text 02"
        // createSection({
        //     content: ["-# Increment counter", "test"],
        //     accessory: new ButtonBuilder({
        //         customId: `counter/increment`,
        //         label: "+", 
        //         style: ButtonStyle.Success
        //     })
        // }),
        // createSection({
        //     content: ["-#", "-", "opa"],
        //     button: new ButtonBuilder({
        //         customId: `counter/${current-1}`,
        //         label: "\\/", 
        //         style: ButtonStyle.Danger
        //     })
        // }),
        // createSection({
        //     content: ["-#", "-", "2eae"],
        //     button: new ButtonBuilder({
        //         customId: `counter2/${current-1}`,
        //         label: "\\/", 
        //         style: ButtonStyle.Danger
        //     })
        // }),
        // createSeparator({ divider: false, large: true }),
        // `Current: ${current}`,
        // new UserSelectMenuBuilder({
        //     customId: "user/select",
        //     placeholder: "Selecione um usuário",
        // }),
        // createContainer("Random", "text"),
    )
    
    // const container = createContainer({
    //     accentColor: "Greyple",
    //     components: c,
    // })

    return {
        flags: [
            "Ephemeral", 
            "IsComponentsV2"],
        components: c,
        files: [image],
    } as R;
}