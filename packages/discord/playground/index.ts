import { CustomItents, findMessageComponentById, flattenMessageComponents } from "#package";
import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle, Client, ComponentType, ContainerBuilder, FileBuilder, MediaGalleryBuilder, MediaGalleryItemBuilder, SectionBuilder, SeparatorBuilder, TextDisplayBuilder, ThumbnailBuilder } from "discord.js";

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

const menuIds = {
    Section: 1,
    SectionText: 2,
    SectionThumb: 3,
    Row: 4,
    RowButton: 5,
    Gallery: 6,
    Separator: 7,
    File: 8,
    Text: 9,
} as const;

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const container = new ContainerBuilder();

    container.addSectionComponents(
        new SectionBuilder()
            .setId(menuIds.Section)
            .addTextDisplayComponents(
                new TextDisplayBuilder()
                    .setContent("Magicyan is awesome!")
                    .setId(menuIds.SectionText)
            )
            .setThumbnailAccessory(
                new ThumbnailBuilder()
                    .setURL(interaction.user.displayAvatarURL())
                    .setId(menuIds.SectionThumb)
            )
    )
    container.addActionRowComponents(
        new ActionRowBuilder<ButtonBuilder>({
            id: menuIds.Row,
            components: [
                new ButtonBuilder({
                    id: menuIds.RowButton,
                    customId: "test",
                    style: ButtonStyle.Success,
                    label: "Test"
                })
            ]
        })
    )
    container.addMediaGalleryComponents(
        new MediaGalleryBuilder()
            .setId(menuIds.Gallery)
            .addItems(
                new MediaGalleryItemBuilder()
                    .setURL(interaction.user.displayAvatarURL())
            )
    )
    container.addSeparatorComponents(
        new SeparatorBuilder()
            .setId(menuIds.Separator)
    )
    container.addFileComponents(
        new FileBuilder()
            .setId(menuIds.File)
            .setURL("attachment://file.json")
    )
    container.addTextDisplayComponents(
        new TextDisplayBuilder()
            .setId(menuIds.Text)
            .setContent("-# Server")
    )

    await interaction.reply({
        flags: ["Ephemeral", "IsComponentsV2"],
        components: [container],
        files: [
            new AttachmentBuilder(Buffer.from("{}", "utf-8"), {
                name: "file.json"
            })
        ]
    })
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isButton()) return;
    await interaction.deferUpdate();

    const flatten = flattenMessageComponents(interaction);

    const File = findMessageComponentById(flatten, menuIds.File, ComponentType.File)
    const Gallery = findMessageComponentById(flatten, menuIds.Gallery, ComponentType.MediaGallery)
    const Row = findMessageComponentById(flatten, menuIds.Row, ComponentType.ActionRow)
    const RowButton = findMessageComponentById(flatten, menuIds.RowButton, ComponentType.Button)
    const Section = findMessageComponentById(flatten, menuIds.Section, ComponentType.Section)
    const SectionText = findMessageComponentById(flatten, menuIds.SectionText, ComponentType.TextDisplay)
    const SectionThumb = findMessageComponentById(flatten, menuIds.SectionThumb, ComponentType.Thumbnail)
    const Separator = findMessageComponentById(flatten, menuIds.Separator, ComponentType.Separator)
    const Text = findMessageComponentById(flatten, menuIds.Text, ComponentType.TextDisplay)

    console.log(
        File,
        Gallery,
        Row,
        RowButton,
        Section,
        SectionText,
        SectionThumb,
        Separator,
        Text,
    )
})

client.login(process.env.BOT_TOKEN);