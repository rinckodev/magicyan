# Magicyan Discord

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