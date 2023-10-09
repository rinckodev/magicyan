# Magicyan Discord Events

Install with
```bash
npm install @magicyan/discord-events
```

This lib adds more discord.js specific events

## Setup
Create your bot client normally and pass it to the discordEvents function, so that events can be registered

```ts
import { Client } from "discord.js";
import { discordEvents } from "@magicyan/discord-events";

const client = new Client({
    intents: [// add your intents ...]
    // set your client options ...
});

discordEvents({ client });
```

You can enable or disable custom events
```ts
discordEvents({ client, events: {
    webhookMessageCreate: true,
    guildMemberVoiceChannelJoin: true,
    guildMemberVoiceChannelLeave: false,
    guildMemberVoiceChannelMove: true,
    // etc...
}})
```

## How to use
You can create a listener for the event in the same way you create it for standard discord.js events

```ts
client.on("guildMemberVoiceChannelJoin", (member, channel) => {
    console.log(member.displayName, "joined the" channel.name);
})
```

See below the list of all events and which ones are activated by default

| event | paramters | description | enabled by default |
| ----- | --------- |------------ | ------------------ |
| webhookMessageCreate | message, webhook | This event will be triggered when a webhook message is created. | ❌ false |
| guildMemberVoiceChannelJoin | member, voiceChannel | This event is triggered when a member joins a voice channel in a guild. | ✅ true |
| guildMemberVoiceChannelLeave | member, voiceChannel  | This event is triggered when a member leaves a voice channel in a guild. | ✅ true |
| guildMemberVoiceChannelMove | member, newVoiceChannel, mover, oldVoiceChannel  | This event is triggered when a member is moved from one voice channel to another. | ❌ false |