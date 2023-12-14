<div align="center">
  <img src="../../assets/images/icon.png" alt="Icon" width="100" height="100">
  <div style="margin-left: 20px;">

  # Magicyan Discord
  
  </div>
</div>


Simple functions to facilitate discord bot development
> Also exports all [@magicyan/core](https://github.com/rinckodev/magicyan/tree/main/packages/core) functions

Install with
```bash
npm install @magicyan/discord
```

Some functions summarize the way we create things with discord.js

```ts
// Create an action row of buttons with discord.js
new ActionRowBuilder<ButtonBuilder>({
    components: [
        new ButtonBuilder({
            customId: "click-me-button",
            label: "Click me", style: ButtonStyle.Success,
        })
        new ButtonBuilder({
            customId: "dont-click-me-button",
            label: "Don't click me", style: ButtonStyle.Danger,
        })
    ]
})

// Create an action row of buttons with @magicyan/dicord
createRow(
    new ButtonBuilder({ 
        customId: "click-me-button", label: "Click me", 
        style: ButtonStyle.Success,
    })
    new ButtonBuilder({ 
        customId: "dont-click-me-button", label: "Don't click me", 
        style: ButtonStyle.Danger,
    })
)

// Add inputs to the modal with discord.js
new ModalBuilder({
    customId: "my-modal",
    title: "Modal Title",
    components: [
        new ActionRowBuilder<TextInputBuilder>({components: [
            new TextInputBuilder({
                customId: "name-input",
                label: "Name",
                placeholder: "Enter your name",
                style: TextInputStyle.Short,
                required: true
            }),
            new TextInputBuilder({
                customId: "nio-modal",
                label: "Bio",
                placeholder: "Enter your bio",
                style: TextInputStyle.Paragraph,
                required: true
            })
        ]})
    ]
})

// Add inputs to the modal with @magicyan/dicord
new ModalBuilder({
    customId: "my-modal", title: "Modal Title",
    components: [
        createModalInput({
            customId: "name-input", placeholder: "Enter your name",
            label: "Name", style: TextInputStyle.Short, required: true
        }),
        createModalInput({
            customId: "nio-modal", placeholder: "Enter your bio",
            label: "Bio", style: TextInputStyle.Paragraph, required: true
        }),
    ]
})
```

You can create a link button quickly
```ts
const url = "https://github.com/rinckodev";

createLinkButton({ url, label: "My github" });
```

You can create an embed author easily with a User object
```ts
const { user } = interaction

new EmbedBuilder({
    author: createEmbedAuthor({ user }),
    description: "My embed description"
})
```

Function to find a channel from the guild cache
```ts
const { guild } = interaction

const channel = findChannel(guild, ChannelType.GuildVoice).byName("Lounge 01") // VoiceChannel  | undefined
```

Function to find a role from the guild cache
```ts
const { guild } = interaction

const role = findChannel(guild).byName("Administrator") // Role  | undefined
```

Function to create embed asset
If the method used to obtain a url returns null or undefined the function will set undefined in the image property
```ts
const embed = new EmbedBuilder({
    image: createEmbedAsset(guild.iconURL()) // { url: guild.iconUrl() } | undefined
})
```

When passing an attachment to the function, it will return the url with local attachments
```ts
const image = new AttachmentBuilder(buffer, { name: "myImage.png" });

const embed = new EmbedBuilder({
    image: createEmbedAsset(image) // { url: attachment://myImage.png }
});

channel.send({ embeds: [embed], files: [image]})
```