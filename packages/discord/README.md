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

## Components
Easily create action rows

```ts
import { createRow } from "@magicyan/discord";

const row = createRow(
    new ButtonBuilder(/* button data... */),
    new ButtonBuilder(/* button data... */),
    new ButtonBuilder(/* button data... */),
);
const selectRow = createRow(
    new StringSelectMenuBuilder(/* select data... */)
);
interaction.reply({ components: [row, selectRow] });
```
Create a link button quickly
```ts
import { createRow, createLinkButton } from "@magicyan/discord";

const row = createRow(
    createLinkButton({ label: "Github", url: "https://github.com/rinckodev" })
    createLinkButton({ label: "Youtube", url: "https://youtube.com/@rinckodev" })
);
interaction.reply({ components: [row] });
```

## Modals
A row only supports a single input, so use this function that already creates it within a row
```ts
import { createModalInput } from "@magicyan/discord";

const modal = new ModalBuilder({
    customId: "my/modal",
    title: "My modal",
    components: [
        createModalInput({
            customId: "name",
            label: "Name",
            style: TextInputStyle.Short,
        }),
        createModalInput({
            customId: "age",
            label: "Age",
            style: TextInputStyle.Short,
        }),
    ]
});
interaction.showModal(modal);
```
Or if you prefer, you can create a record where the key is the customId
```ts
import { createModalFields } from "@magicyan/discord";

const modal = new ModalBuilder({
    customId: "my/modal",
    title: "My modal",
    components: createModalFields({
        name: {
            label: "Name",
            style: TextInputStyle.Short,
        },
        age:{
            label: "Age",
            style: TextInputStyle.Short,
        },
    })
});
```
Don't forget that you can define the custom id however you want
```ts
createModalFields({
    ["my-custom-input-name"]: {
        label: "Name",
        style: TextInputStyle.Short,
    }
})
```
You can transform the fields received from the interaction into a record
```ts
import { modalFieldsToRecord } from "@magicyan/discord";

function run(interaction: ModalSubmitInteraction){
    const fields = modalFieldsToRecord(interaction.fields);
    console.log(fields["my-custom-input-name"]);
    console.log(fields.age);
}
```
It is also possible to pass a union type in the function generic
```ts
type FormFields = "id" | "nickname" | "bio";
function run(interaction: ModalSubmitInteraction){
    const fields = modalFieldsToRecord<FormFields>(interaction.fields);
    console.log(fields.id);
    console.log(fields.nickname);
    console.log(fields.bio);
}
```

## Embeds
Easily create embeds with this function
```ts
const embed = createEmbed({
    title: "Welcome",
    description: "Hello world",
    color: "Random"
});
```
You can set the thumbnail and image in a simple way
```ts
const embed = createEmbed({
    // ...
    thumbnail: "https://github.com/rinckodev.png",
    image: guild.iconURL()
});

// Or passing an options object
const embed = createEmbed({
    // ...
    image: { url: "imageurl", width: 400, height: 100 }
});

//Or passing an attachment
const attachment = new AttachmentBuilder(buffer, { name: "myimage.png" });
const embed = createEmbed({
    // ...
    image: attachment // attachment://myimage.png
});
```

## Channels
You can try to get information from a channel url
```ts
import { getChannelUrlInfo } from "@magicyan/discord";

const url = "https://discord.com/channels/537817462272557057/832829213651763210";
const { guildId, channelId } = getChannelUrlInfo(url);
console.log(guildId); // 537817462272557057
console.log(channelId); // 832829213651763210
```
If the url does not follow the pattern of a discord channel url, the return will be an empty object
```ts
const url = "https://github.com/rinckodev";
const { guildId, channelId } = getChannelUrlInfo(url);
console.log(guildId); // undefined
console.log(channelId); // undefined
```
Find a guild channel easily with the findChannel function
```ts
import { findChannel } from "@magicyan/discord";

function run(interaction: ChatInputCommandInteraction<"cached">){
    const { guild } = interaction; 
    const channel = findChannel(guild).byId("832829213651763210");
    channel // TextChannel | undefined
}
```
This function searches for channels in the guild cache, by default it tries to find channels of the GuildText type, but you can change it to any type of guild channel
```ts
const channel = findChannel(guild, ChannelType.GuildVoice).byId("832829213651763210");
// VoiceChannel | undefined
```
You can find channels in other ways
```ts
const general = findChannel(guild).byName("general");
const updates = findChannel(guild, ChannelType.GuildAnnouncement).byName("updates");
const lounge = findChannel(guild, ChannelType.GuildVoice).byName("Lounge 01");
const popular = findChannel(guild, ChannelType.GuildStageVoice).byFilter(f => f.members.size >= 12);
const hotforum = findChannel(guild, ChannelType.GuildForum).byFilter(f => f.threads.cache.size >= 100);

general; // TextChannel | undefined
updates; // NewsChannel | undefined
lounge; // VoiceChannel | undefined
popular; // StageChannel | undefined
hotforum; // ForumChannel | undefined
```
Find a channel in a category easily
```ts
const ticket = findChannel(guild)
    .inCategoryName("Tickets")
    .byName(`ticket-${member.id}`);

ticket; // TextChannel | undefined
```
## Roles
Find guild roles easily
```ts
import { findRole } from "@magicyan/discord";

function run(interaction: ChatInputCommandInteraction<"cached">){
    const { guild } = interaction; 
    
    const memberRole = findRole(guild).byName("Member");
    const adminRole = findRole(guild).byHexColor("#ff5454");
    const leaderRole = findRole(guild).byId("537818031728885771");
    
    memberRole // Role | undefined
    adminRole // Role | undefined
    leaderRole // Role | undefined
}
```
## Members
Find guild members easily
```ts
import { findMember } from "@magicyan/discord";

function run(interaction: ChatInputCommandInteraction<"cached">){
    const { guild } = interaction;
    const finder = findMember(guild);
    const member = finder.byId("264620632644255745")
    ?? finder.byUsername("rincko")
    ?? finder.byGlobalName("Rincko")
    ?? finder.byNickname("RinckoZ_");

    member; // GuildMember | undefined
}
```
## Messages
You can try to get information from a channel url
```ts
import { getMessageUrlInfo } from "@magicyan/discord";

const url = "https://discord.com/channels/537817462272557057/1101949941712171078/1101950570035691530";
const { guildId, channelId, messageId } = getMessageUrlInfo(url);
console.log(guildId); // 537817462272557057
console.log(channelId); // 1101949941712171078
console.log(messageId); // 1101950570035691530
```
## Commands
Find a command easily
```ts
import { findCommand } from "@magicyan/discord";

function run(interaction: ChatInputCommandInteraction<"cached">){
    const { client } = interaction;
    const command = findCommand(client).byName("register");
    command; // ApplicationCommand | undefined
}
```

## Emojis
Find a emoji easily
```ts
import { findEmoji } from "@magicyan/discord";

function run(interaction: ChatInputCommandInteraction<"cached">){
    const { client } = interaction;
    const emoji = findEmoji(client).byName("discord");
    emoji; // GuildEmoji | undefined
}
```

## Regex
Extract the id of any mention
```ts
import { extractMentionId } from "@magicyan/discord";

const user = "<@264620632644255745>";
const channel = "<#1068689068256403457>";
const role = "<@&929925182796226632>";

extractMentionId(user) // 264620632644255745
extractMentionId(channel) // 1068689068256403457
extractMentionId(role) // 929925182796226632
```